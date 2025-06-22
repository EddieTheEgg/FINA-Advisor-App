"""update_snapshot_type_enum_values

Revision ID: 7475ede0fac9
Revises: b7f13ff7d818
Create Date: 2025-06-21 21:52:20.724844

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7475ede0fac9'
down_revision: Union[str, None] = 'b7f13ff7d818'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # First, temporarily change the column to use VARCHAR to avoid enum constraint issues
    op.execute("ALTER TABLE monthly_snapshots ALTER COLUMN snapshot_type TYPE VARCHAR")
    
    # Drop the existing enum type
    op.execute("DROP TYPE IF EXISTS snapshottype")
    
    # Create the new enum with uppercase values
    op.execute("CREATE TYPE snapshottype AS ENUM ('ACCOUNT', 'NET_WORTH', 'BUDGET_PROGRESS', 'CATEGORY_SPENDING')")
    
    # Update existing data to uppercase (if any exists)
    op.execute("""
        UPDATE monthly_snapshots 
        SET snapshot_type = CASE 
            WHEN snapshot_type = 'account' THEN 'ACCOUNT'
            WHEN snapshot_type = 'net_worth' THEN 'NET_WORTH'
            WHEN snapshot_type = 'budget_progress' THEN 'BUDGET_PROGRESS'
            WHEN snapshot_type = 'category_spending' THEN 'CATEGORY_SPENDING'
            ELSE snapshot_type
        END
    """)
    
    # Change the column back to use the enum type
    op.execute("ALTER TABLE monthly_snapshots ALTER COLUMN snapshot_type TYPE snapshottype USING snapshot_type::snapshottype")


def downgrade() -> None:
    """Downgrade schema."""
    # Temporarily change the column to VARCHAR
    op.execute("ALTER TABLE monthly_snapshots ALTER COLUMN snapshot_type TYPE VARCHAR")
    
    # Drop the uppercase enum
    op.execute("DROP TYPE IF EXISTS snapshottype")
    
    # Recreate the original lowercase enum
    op.execute("CREATE TYPE snapshottype AS ENUM ('account', 'net_worth', 'budget_progress', 'category_spending')")
    
    # Update existing data back to lowercase
    op.execute("""
        UPDATE monthly_snapshots 
        SET snapshot_type = CASE 
            WHEN snapshot_type = 'ACCOUNT' THEN 'account'
            WHEN snapshot_type = 'NET_WORTH' THEN 'net_worth'
            WHEN snapshot_type = 'BUDGET_PROGRESS' THEN 'budget_progress'
            WHEN snapshot_type = 'CATEGORY_SPENDING' THEN 'category_spending'
            ELSE snapshot_type
        END
    """)
    
    # Change the column back to use the enum type
    op.execute("ALTER TABLE monthly_snapshots ALTER COLUMN snapshot_type TYPE snapshottype USING snapshot_type::snapshottype")
