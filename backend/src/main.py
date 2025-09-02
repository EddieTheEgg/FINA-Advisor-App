import logging
import time
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from backend.src.database.core import engine, Base
from backend.src.entities.user import User
from backend.src.entities.category import Category
from backend.src.entities.transaction import Transaction
from backend.src.entities.audit_logs import AuditLog
from backend.src.entities.password_reset_token import PasswordResetToken
from backend.src.api import register_routes
from backend.src.logging import configure_logging, LogLevels

configure_logging(LogLevels.info)

app = FastAPI(title="Expense Insights API", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add request/response logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    
    # Log incoming request
    logging.info(f"🚀 REQUEST: {request.method} {request.url}")
    logging.info(f"📋 Headers: {dict(request.headers)}")
    
    # Log request body for POST/PUT requests (be careful with sensitive data)
    if request.method in ["POST", "PUT", "PATCH"]:
        try:
            body = await request.body()
            if body:
                logging.info(f"📦 Body: {body.decode('utf-8')[:500]}...")  # Limit to 500 chars
        except Exception as e:
            logging.warning(f"Could not read request body: {e}")
    
    # Process request
    try:
        response = await call_next(request)
        process_time = time.time() - start_time
        
        # Log response
        logging.info(f"✅ RESPONSE: {response.status_code} - {process_time:.3f}s")
        
        return response
    except Exception as e:
        process_time = time.time() - start_time
        logging.error(f"❌ ERROR: {str(e)} - {process_time:.3f}s")
        logging.error(f"❌ Error type: {type(e).__name__}")
        import traceback
        logging.error(f"❌ Traceback: {traceback.format_exc()}")
        raise

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