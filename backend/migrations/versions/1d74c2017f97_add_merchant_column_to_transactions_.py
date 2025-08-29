"""add merchant column to transactions table

Revision ID: 1d74c2017f97
Revises: ecf91847eb0f
Create Date: 2025-08-29 08:19:27.292909

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '1d74c2017f97'
down_revision: Union[str, None] = 'ecf91847eb0f'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # Add merchant column to transactions table
    op.add_column('transactions', sa.Column('merchant', sa.String(), nullable=True))


def downgrade() -> None:
    """Downgrade schema."""
    # Remove merchant column from transactions table
    op.drop_column('transactions', 'merchant')
