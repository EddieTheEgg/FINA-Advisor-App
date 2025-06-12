from fastapi import FastAPI
from backend.src.users.controller import router as users_router
from backend.src.categories.controller import router as categories_router
from backend.src.transactions.controller import router as transactions_router
from backend.src.auth.controller import router as auth_router
from backend.src.ai.controller import router as ai_router
from backend.src.dashboard.controller import router as dashboard_router
from backend.src.accounts.controller import router as accounts_router

def register_routes(app: FastAPI):
    app.include_router(users_router)
    app.include_router(categories_router)
    app.include_router(transactions_router)
    app.include_router(dashboard_router)
    app.include_router(auth_router)
    app.include_router(ai_router)
    app.include_router(accounts_router)

