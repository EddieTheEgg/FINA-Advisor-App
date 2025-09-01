from fastapi import FastAPI
from src.database.core import engine, Base
from src.entities.user import User
from src.entities.category import Category
from src.entities.transaction import Transaction
from src.entities.audit_logs import AuditLog
from src.api import register_routes
from src.logging import configure_logging, LogLevels

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