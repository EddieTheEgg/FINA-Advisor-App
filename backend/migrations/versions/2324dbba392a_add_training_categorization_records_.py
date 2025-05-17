"""add training categorization records table

Revision ID: 2324dbba392a
Revises: 59e69375fbc2
Create Date: 2025-05-16 23:04:20.152353

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '2324dbba392a'
down_revision: Union[str, None] = '59e69375fbc2'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'training_categorization_records',
        sa.Column('record_id', sa.dialects.postgresql.UUID(as_uuid=True), primary_key=True, server_default=sa.text('gen_random_uuid()')),
        sa.Column('user_reference', sa.dialects.postgresql.UUID(as_uuid=True), sa.ForeignKey('users.user_id'), nullable=False),
        sa.Column('transaction_reference', sa.dialects.postgresql.UUID(as_uuid=True), sa.ForeignKey('transactions.transaction_id'), nullable=False),
        sa.Column('category_reference', sa.dialects.postgresql.UUID(as_uuid=True), sa.ForeignKey('categories.category_id'), nullable=True),
        sa.Column('source_method', sa.String(), nullable=False),
        sa.Column('category_confidence', sa.Float(), nullable=True),
        sa.Column('user_confirmed', sa.Boolean(), nullable=False, server_default=sa.text('false')),
        sa.Column('alt_category_suggestion', sa.String(), nullable=True),
        sa.Column('created_timestamp', sa.DateTime(), server_default=sa.text('now()')),
    )

def downgrade() -> None:
    op.drop_table('training_categorization_records')