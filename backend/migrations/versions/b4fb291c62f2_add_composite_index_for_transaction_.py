"""add_composite_index_for_transaction_queries

Revision ID: b4fb291c62f2
Revises: 44ccb9411954
Create Date: 2025-08-17 15:29:26.362225

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b4fb291c62f2'
down_revision: Union[str, None] = '44ccb9411954'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Create composite index for transaction queries to improve performance
    # This index will help with queries that filter by user_id, transaction_date, and transaction_type
    op.create_index(
        'ix_transactions_user_date_type', 
        'transactions', 
        ['user_id', 'transaction_date', 'transaction_type']
    )
    
    # Create index for transaction_date range queries
    op.create_index(
        'ix_transactions_date_range', 
        'transactions', 
        ['transaction_date']
    )
    
    # Create composite index for account and category filtering
    op.create_index(
        'ix_transactions_user_account_category', 
        'transactions', 
        ['user_id', 'account_id', 'category_id']
    )


def downgrade() -> None:
    """Downgrade schema."""
    # Remove the indexes in reverse order
    op.drop_index('ix_transactions_user_account_category', table_name='transactions')
    op.drop_index('ix_transactions_date_range', table_name='transactions')
    op.drop_index('ix_transactions_user_date_type', table_name='transactions')
