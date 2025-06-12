"""add account type enum

Revision ID: ad4671dccd05
Revises: 67d3e951ee05
Create Date: 2025-06-11 19:44:48.139179

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = 'ad4671dccd05'
down_revision: Union[str, None] = '67d3e951ee05'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Create the enum type first
    account_type = postgresql.ENUM('CHECKING', 'SAVINGS', 'CREDIT_CARD', 'INVESTMENT', 'LOAN', 'CASH', 'OTHER', name='accounttype', create_type=True)
    account_type.create(op.get_bind())

    # Add new columns
    op.add_column('accounts', sa.Column('bank_name', sa.String(), nullable=True))
    op.add_column('accounts', sa.Column('account_number', sa.String(), nullable=True))
    op.add_column('accounts', sa.Column('routing_number', sa.String(), nullable=True))
    op.add_column('accounts', sa.Column('icon', sa.String(), nullable=True))
    
    # Modify existing columns
    op.alter_column('accounts', 'user_id',
               existing_type=sa.UUID(),
               nullable=True)
    
    # Convert account_type to enum with proper casting
    op.execute("""
        ALTER TABLE accounts 
        ALTER COLUMN account_type TYPE accounttype 
        USING CASE 
            WHEN account_type = 'checking' THEN 'CHECKING'::accounttype
            WHEN account_type = 'savings' THEN 'SAVINGS'::accounttype
            WHEN account_type = 'credit_card' THEN 'CREDIT_CARD'::accounttype
            WHEN account_type = 'investment' THEN 'INVESTMENT'::accounttype
            WHEN account_type = 'loan' THEN 'LOAN'::accounttype
            WHEN account_type = 'cash' THEN 'CASH'::accounttype
            ELSE 'OTHER'::accounttype
        END
    """)
    
    op.alter_column('accounts', 'color',
               existing_type=sa.VARCHAR(),
               nullable=True)
    
    # Drop old columns
    op.drop_column('accounts', 'institution_name')
    op.drop_column('accounts', 'account_number_last4')


def downgrade() -> None:
    """Downgrade schema."""
    # Add back old columns
    op.add_column('accounts', sa.Column('account_number_last4', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.add_column('accounts', sa.Column('institution_name', sa.VARCHAR(), autoincrement=False, nullable=False))
    
    # Modify columns back
    op.alter_column('accounts', 'color',
               existing_type=sa.VARCHAR(),
               nullable=False)
    
    # Convert account_type back to string
    op.execute("""
        ALTER TABLE accounts 
        ALTER COLUMN account_type TYPE VARCHAR 
        USING account_type::VARCHAR
    """)
    
    op.alter_column('accounts', 'user_id',
               existing_type=sa.UUID(),
               nullable=False)
    
    # Drop new columns
    op.drop_column('accounts', 'icon')
    op.drop_column('accounts', 'routing_number')
    op.drop_column('accounts', 'account_number')
    op.drop_column('accounts', 'bank_name')
    
    # Drop the enum type
    op.execute('DROP TYPE accounttype')
