"""add_composite_index_for_categories

Revision ID: ecf91847eb0f
Revises: b4fb291c62f2
Create Date: 2025-08-17 15:45:26.362225

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'ecf91847eb0f'
down_revision: Union[str, None] = 'b4fb291c62f2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Create composite index for category queries to improve performance
    # This index will help with queries that filter by user_id and transaction_type
    op.create_index(
        'ix_categories_user_transaction_type', 
        'categories', 
        ['user_id', 'transaction_type']
    )
    
    # Create index for transaction_type alone (useful for system-wide queries)
    op.create_index(
        'ix_categories_transaction_type', 
        'categories', 
        ['transaction_type']
    )


def downgrade() -> None:
    """Downgrade schema."""
    # Remove the indexes in reverse order
    op.drop_index('ix_categories_transaction_type', table_name='categories')
    op.drop_index('ix_categories_user_transaction_type', table_name='categories')
