from fastapi import FastAPI
from backend.src.users.controller import router as users_router
from backend.src.categories.controller import router as categories_router
from backend.src.transactions.controller import router as transactions_router
from backend.src.auth.controller import router as auth_router

def register_routes(app: FastAPI):
    app.include_router(users_router)
    app.include_router(categories_router)
    app.include_router(transactions_router)
    app.include_router(auth_router)

