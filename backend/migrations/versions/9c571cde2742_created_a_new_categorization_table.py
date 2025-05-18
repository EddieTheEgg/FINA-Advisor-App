"""Created a new categorization table

Revision ID: 9c571cde2742
Revises: ab5f537b8676
Create Date: 2025-05-17 20:06:44.795287

"""
from typing import Sequence, Union
import uuid

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID

# revision identifiers, used by Alembic.
revision: str = '9c571cde2742'
down_revision: Union[str, None] = 'ab5f537b8676'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'category_suggestions',
        sa.Column('suggestion_id', UUID(as_uuid=True), primary_key=True, default=uuid.uuid4),
        sa.Column('user_id', UUID(as_uuid=True), nullable=False, index=True),
        sa.Column('transaction_id', UUID(as_uuid=True), nullable=True),
        sa.Column('request_data', sa.JSON, nullable=False),
        sa.Column('suggested_category_id', UUID(as_uuid=True), nullable=True),
        sa.Column('suggested_category_name', sa.String, nullable=True),
        sa.Column('confidence', sa.Float, nullable=False),
        sa.Column('client_reference', sa.String, nullable=True),
        sa.Column('was_applied', sa.Boolean, default=False),
        sa.Column('model', sa.String, nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column('updated_at', sa.DateTime(timezone=True), onupdate=sa.func.now())
    )

def downgrade() -> None:
    op.drop_table('category_suggestions') 
