"""update tables

Revision ID: 0e9d96b57aeb
Revises: 87bd6585645e
Create Date: 2024-03-21 10:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '0e9d96b57aeb'
down_revision: Union[str, None] = '87bd6585645e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create accounts table
    op.create_table('accounts',
        sa.Column('account_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('account_type', sa.String(), nullable=False),
        sa.Column('balance', sa.Float(), nullable=False),
        sa.Column('institution_name', sa.String(), nullable=False),
        sa.Column('account_number_last4', sa.String(), nullable=False),
        sa.Column('is_active', sa.Boolean(), nullable=False),
        sa.Column('is_default', sa.Boolean(), nullable=False),
        sa.Column('include_in_totals', sa.Boolean(), nullable=False),
        sa.Column('color', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint('account_id')
    )
    op.create_index(op.f('ix_accounts_user_id'), 'accounts', ['user_id'], unique=False)

    # Add account_id as nullable first
    op.add_column('transactions', sa.Column('account_id', postgresql.UUID(as_uuid=True), nullable=True))
    op.create_index(op.f('ix_transactions_account_id'), 'transactions', ['account_id'], unique=False)

    # Create a default account for each user and update existing transactions
    op.execute("""
        WITH default_accounts AS (
            INSERT INTO accounts (account_id, user_id, name, account_type, balance, institution_name, account_number_last4, is_active, is_default, include_in_totals, color)
            SELECT 
                gen_random_uuid(),
                user_id,
                'Default Account',
                'checking',
                0,
                'Default Bank',
                '0000',
                true,
                true,
                true,
                '#000000'
            FROM (SELECT DISTINCT user_id FROM transactions) t
            RETURNING account_id, user_id
        )
        UPDATE transactions t
        SET account_id = da.account_id
        FROM default_accounts da
        WHERE t.user_id = da.user_id
    """)

    # Now make account_id non-nullable
    op.alter_column('transactions', 'account_id',
               existing_type=postgresql.UUID(as_uuid=True),
               nullable=False)

    # Add foreign key constraint
    op.create_foreign_key(None, 'transactions', 'accounts', ['account_id'], ['account_id'])

    # Drop old columns
    op.drop_column('transactions', 'payment_account')
    op.drop_column('transactions', 'payment_type')


def downgrade() -> None:
    # Add back old columns
    op.add_column('transactions', sa.Column('payment_type', sa.String(), nullable=True))
    op.add_column('transactions', sa.Column('payment_account', sa.String(), nullable=True))

    # Drop foreign key and index
    op.drop_constraint(None, 'transactions', type_='foreignkey')
    op.drop_index(op.f('ix_transactions_account_id'), table_name='transactions')

    # Drop account_id column
    op.drop_column('transactions', 'account_id')

    # Drop accounts table and its index
    op.drop_index(op.f('ix_accounts_user_id'), table_name='accounts')
    op.drop_table('accounts')
