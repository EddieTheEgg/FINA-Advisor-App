from fastapi import FastAPI
from backend.src.database.core import engine, Base
from backend.src.entities.user import User
from backend.src.entities.category import Category
from backend.src.entities.transaction import Transaction
from backend.src.entities.audit_logs import AuditLog
from backend.src.api import register_routes
from backend.src.logging import configure_logging, LogLevels

configure_logging(LogLevels.info)

app = FastAPI()
register_routes(app)

#Root route test
@app.get("/")
def read_root():
    return {"message": "Welcome to Expense Insights API"}

#Only uncomment beolow to create new tables,
# otherwise the tests will fail if not connected

# Base.metadata.create_all(bind=engine)

# For dev purposes: To run the backend, run
# uvicorn backend.src.main:app --reload
# uvicorn backend.src.main:app --reload --host 0.0.0.0 --port 8000