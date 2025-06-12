"""modified is_income into type INCOME, EXPENSE, or TRANSFER transaction type for future readability

Revision ID: 67d3e951ee05
Revises: cd18334b3746
Create Date: 2025-06-11 18:05:57.423457

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = '67d3e951ee05'
down_revision: Union[str, None] = 'cd18334b3746'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Create the enum type
    transaction_type = postgresql.ENUM('INCOME', 'EXPENSE', 'TRANSFER', name='transactiontype', create_type=True)
    transaction_type.create(op.get_bind())

    # Add new columns
    op.add_column('categories', sa.Column('transaction_type', sa.Enum('INCOME', 'EXPENSE', 'TRANSFER', name='transactiontype'), nullable=False, server_default='EXPENSE'))
    op.add_column('transactions', sa.Column('transaction_type', sa.Enum('INCOME', 'EXPENSE', 'TRANSFER', name='transactiontype'), nullable=False, server_default='EXPENSE'))
    op.add_column('transactions', sa.Column('to_account_id', sa.UUID(), nullable=True))

    # Create index and foreign key
    op.create_index(op.f('ix_transactions_to_account_id'), 'transactions', ['to_account_id'], unique=False)
    op.create_foreign_key(None, 'transactions', 'accounts', ['to_account_id'], ['account_id'])

    # Migrate existing data
    op.execute("""
        UPDATE transactions 
        SET transaction_type = CASE 
            WHEN is_income = true THEN 'INCOME'::transactiontype
            ELSE 'EXPENSE'::transactiontype
        END
    """)
    op.execute("""
        UPDATE categories 
        SET transaction_type = CASE 
            WHEN is_income = true THEN 'INCOME'::transactiontype
            ELSE 'EXPENSE'::transactiontype
        END
    """)

    # Drop old columns
    op.drop_column('transactions', 'is_income')
    op.drop_column('categories', 'is_income')


def downgrade() -> None:
    """Downgrade schema."""
    # Add back is_income columns
    op.add_column('transactions', sa.Column('is_income', sa.BOOLEAN(), server_default=sa.text('false'), autoincrement=False, nullable=False))
    op.add_column('categories', sa.Column('is_income', sa.BOOLEAN(), server_default=sa.text('false'), autoincrement=False, nullable=False))

    # Migrate data back
    op.execute("""
        UPDATE transactions 
        SET is_income = CASE 
            WHEN transaction_type = 'INCOME' THEN true
            ELSE false
        END
    """)
    op.execute("""
        UPDATE categories 
        SET is_income = CASE 
            WHEN transaction_type = 'INCOME' THEN true
            ELSE false
        END
    """)

    # Drop new columns and constraints
    op.drop_constraint(None, 'transactions', type_='foreignkey')
    op.drop_index(op.f('ix_transactions_to_account_id'), table_name='transactions')
    op.drop_column('transactions', 'to_account_id')
    op.drop_column('transactions', 'transaction_type')
    op.drop_column('categories', 'transaction_type')

    # Drop the enum type
    op.execute('DROP TYPE transactiontype')
