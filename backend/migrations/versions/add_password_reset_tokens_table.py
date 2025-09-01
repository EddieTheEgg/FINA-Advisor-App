"""Add password reset tokens table

Revision ID: add_password_reset_tokens
Revises: 6fa500dbc6e7
Create Date: 2024-01-01 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'pwd_reset_001'
down_revision = '6fa500dbc6e7'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create password_reset_tokens table
    op.create_table('password_reset_tokens',
        sa.Column('token_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('token', sa.String(), nullable=False),
        sa.Column('expires_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
        sa.Column('used_at', sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('token_id')
    )
    
    # Create index on token for fast lookups
    op.create_index(op.f('ix_password_reset_tokens_token'), 'password_reset_tokens', ['token'], unique=True)


def downgrade() -> None:
    # Drop index
    op.drop_index(op.f('ix_password_reset_tokens_token'), table_name='password_reset_tokens')
    
    # Drop table
    op.drop_table('password_reset_tokens')
