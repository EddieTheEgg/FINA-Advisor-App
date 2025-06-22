from datetime import date, datetime
import logging
from uuid import UUID
from sqlalchemy.orm import Session

from backend.src.entities.monthly_snapshot import MonthlySnapshot
from backend.src.entities.account import Account
from backend.src.entities.enums import SnapshotType
from backend.src.snapshots.model import SnapshotResponse
from backend.src.exceptions import MonthlySnapshotsJobError, SnapshotCreationError, SnapshotNotFoundError
from backend.src.accounts import service as accounts_service


#Create initial baseline snapshot for user (called during onboarding).
def create_user_baseline_snapshot(db: Session, user_id: UUID) -> SnapshotResponse:
    try:
        month_first_date = date.today()
        snapshot_date = month_first_date.replace(day=1)
        
        # Check if baseline snapshot already exists for this month (prevent duplicate snapshots)
        existing_snapshot = db.query(MonthlySnapshot).filter(
            MonthlySnapshot.user_id == user_id,
            MonthlySnapshot.snapshot_type == SnapshotType.NET_WORTH,
            MonthlySnapshot.snapshot_date == snapshot_date
        ).first()
        
        if existing_snapshot:
            logging.info(f"Baseline snapshot already exists for user {user_id} for {snapshot_date}")
            return _convert_to_response(existing_snapshot)
        
        # Calculate current net worth
        net_worth = accounts_service.calculate_user_net_worth(db, user_id)
        
        # Create baseline snapshot
        snapshot = MonthlySnapshot(
            user_id=user_id,
            account_id=None,
            snapshot_date=snapshot_date,
            snapshot_type=SnapshotType.NET_WORTH,
            amount=net_worth,
            additional_data={"is_baseline": True}
        )
        
        db.add(snapshot)
        db.commit()
        db.refresh(snapshot)
        
        logging.info(f"Created baseline snapshot for user {user_id} with net worth {net_worth}")
        return _convert_to_response(snapshot)
        
    except Exception as e:
        logging.error(f"Failed to create baseline snapshot for user {user_id}. Error: {str(e)}")
        db.rollback()
        raise SnapshotCreationError(user_id)

# Monthly job that runs on 1st of each month to snapshot all users' net worth and individual account balances.
def create_monthly_snapshots(db: Session) -> None:
    try:
        # Get first day of current month
        month_first_date = date.today()
        snapshot_date = month_first_date.replace(day=1)
        
        # Get all active users' ids
        users = db.query(Account.user_id).distinct().all()
        user_ids = [user.user_id for user in users]
        
        for user_id in user_ids:
            try:
                # Check if there was already somehow an existing snapshot for this new month (net worth)
                existing_net_worth = db.query(MonthlySnapshot).filter(
                    MonthlySnapshot.user_id == user_id,
                    MonthlySnapshot.snapshot_type == SnapshotType.NET_WORTH,
                    MonthlySnapshot.snapshot_date == snapshot_date
                ).first()
                    
                if not existing_net_worth:
                    net_worth = accounts_service.calculate_user_net_worth(db, user_id)
                    net_worth_snapshot = MonthlySnapshot(
                        user_id=user_id,
                        account_id=None,
                        snapshot_date=snapshot_date,
                        snapshot_type=SnapshotType.NET_WORTH,
                        amount=net_worth,
                        additional_data={"monthly_job": True}
                    )
                    db.add(net_worth_snapshot)
                                    
                # Create individual account snapshots
                accounts = db.query(Account).filter(
                    Account.user_id == user_id,
                    Account.is_active == True
                ).all()
                
                for account in accounts:
                    #Check if there was already somehow an exisiting snapshot for this new month (account)
                    existing_account_snapshot = db.query(MonthlySnapshot).filter(
                        MonthlySnapshot.user_id == user_id,
                        MonthlySnapshot.account_id == account.account_id,
                        MonthlySnapshot.snapshot_type == SnapshotType.ACCOUNT,
                        MonthlySnapshot.snapshot_date == snapshot_date
                    ).first()
                    
                    if not existing_account_snapshot:
                        account_snapshot = MonthlySnapshot(
                            user_id=user_id,
                            account_id=account.account_id,
                            snapshot_date=snapshot_date,
                            snapshot_type=SnapshotType.ACCOUNT,
                            amount=account.balance,
                            additional_data={
                                "account_name": account.name,
                                "account_type": account.account_type.value,
                                "monthly_job": True
                            }
                        )
                        db.add(account_snapshot)
                        
            except Exception as e:
                logging.error(f"Failed to create monthly snapshots for user {user_id}. Error: {str(e)}")
                db.rollback()
                raise SnapshotCreationError(user_id)
        
        db.commit()
        logging.info(f"Monthly snapshot jobs completed")
    except Exception as e:
        logging.error(f"Failed to run monthly snapshot jobs. Error: {str(e)}")
        db.rollback()
        raise MonthlySnapshotsJobError()

#Helper function to convert entity to response model.
def _convert_to_response(snapshot: MonthlySnapshot) -> SnapshotResponse:
    return SnapshotResponse(
        snapshot_id=snapshot.snapshot_id,
        user_id=snapshot.user_id,
        account_id=snapshot.account_id,
        snapshot_date=snapshot.snapshot_date,
        snapshot_type=snapshot.snapshot_type,
        amount=snapshot.amount,
        additional_data=snapshot.additional_data,
        created_at=snapshot.created_at.isoformat() if snapshot.created_at else "",
        updated_at=snapshot.updated_at.isoformat() if snapshot.updated_at else None
    ) 
    
# Fetches the user's net worth snapshot for a given month
# (Used for calculating percent changes in net worth)
def get_user_month_net_worth_snapshot(db: Session, user_id: UUID, snapshot_date: date) -> MonthlySnapshot:
    month_snapshot = db.query(MonthlySnapshot).filter(
        MonthlySnapshot.user_id == user_id,
        MonthlySnapshot.snapshot_type == SnapshotType.NET_WORTH,
        MonthlySnapshot.snapshot_date == snapshot_date
    ).first()  
    if not month_snapshot:
        logging.warning(f"No net worth snapshot found for user {user_id} for {snapshot_date}")
        raise SnapshotNotFoundError(user_id, snapshot_date)
    return month_snapshot.amount 