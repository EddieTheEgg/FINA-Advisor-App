"""add special_transaction column to transactions table

Revision ID: f7da5b9c09d2
Revises: 1d74c2017f97
Create Date: 2025-08-29 08:21:10.739373

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'f7da5b9c09d2'
down_revision: Union[str, None] = '1d74c2017f97'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Add special_transaction column to transactions table
    op.add_column('transactions', sa.Column('special_transaction', sa.Boolean(), nullable=False, server_default='false'))


def downgrade() -> None:
    """Downgrade schema."""
    # Remove special_transaction column from transactions table
    op.drop_column('transactions', 'special_transaction')
