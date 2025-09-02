"""rename log_id to audit_id on audit_logs

Revision ID: 490c6c22cdef
Revises: merge_heads_001
Create Date: 2025-09-02 09:18:16.487577

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = '490c6c22cdef'
down_revision: Union[str, None] = 'merge_heads_001'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade():
    op.execute('create extension if not exists "pgcrypto";')
    # If PK exists on log_id, drop it first (name may vary)
    op.drop_constraint('audit_logs_pkey', 'audit_logs', type_='primary')
    # Rename
    op.alter_column('audit_logs', 'log_id', new_column_name='audit_id')
    # Ensure type/default/PK
    op.alter_column('audit_logs', 'audit_id',
                    type_=postgresql.UUID(as_uuid=True),
                    postgresql_using='audit_id::uuid')
    op.execute('alter table audit_logs alter column audit_id set default gen_random_uuid();')
    op.create_primary_key('pk_audit_logs', 'audit_logs', ['audit_id'])

def downgrade():
    op.drop_constraint('pk_audit_logs', 'audit_logs', type_='primary')
    op.alter_column('audit_logs', 'audit_id', new_column_name='log_id')
    op.create_primary_key('audit_logs_pkey', 'audit_logs', ['log_id'])
