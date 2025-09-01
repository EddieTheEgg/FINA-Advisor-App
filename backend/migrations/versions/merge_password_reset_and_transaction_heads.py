"""Merge password reset tokens and transaction heads

Revision ID: merge_password_reset_and_transaction_heads
Revises: add_password_reset_tokens, f7da5b9c09d2
Create Date: 2024-01-01 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'merge_heads_001'
down_revision = ('pwd_reset_001', 'f7da5b9c09d2')
branch_labels = None
depends_on = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
