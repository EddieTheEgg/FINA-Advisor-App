import logging
from typing import List
from uuid import UUID
import logging
from backend.src.categories.model import CategoryResponse, CategoryCreate, UpdateCategoryRequest, CategoryListResponse
from sqlalchemy.orm import Session

from backend.src.entities.category import Category
from backend.src.entities.transaction import Transaction
from backend.src.exceptions import CategoryNotFoundError, InvalidCategoryForDeletionError, InvalidTransactionTypeError, InvalidUserForCategoryError
from backend.src.transactions.model import TransactionType

# This is when a user makes a new category besides the default ones, which is custom
def create_category(db: Session, create_category_request: CategoryCreate, user_id: UUID) -> CategoryResponse:
    try:
        new_category = Category(
            category_name=create_category_request.category_name,
            icon=create_category_request.icon,
            color=create_category_request.color,
            transaction_type = create_category_request.transaction_type,
            is_custom = True,
            user_id = user_id
        )
        db.add(new_category)
        db.commit()
        db.refresh(new_category)
        return new_category
    except Exception as e:
        logging.error(f"Failed to create new category: {create_category_request.category_name}. Error {str(e)}")
        raise

# This gets "all" categories connected to the user
# indexing starts at 0, so for example limit = 5 means 5 categories per page but index from 0-4
def get_user_categories(
        db: Session,
        user_id: UUID,
        skip: int = 0,
        limit: int = 10, #Default limit is 10
        include_system_default_categories: bool = True,
        transaction_type: str | None = None,
) -> CategoryListResponse:
    possibleCategories = db.query(Category)

    #Gets all default and user's possible categories to work with if true
    # else only gets the user self-created categories
    if include_system_default_categories:
        possibleCategories = possibleCategories.filter(
            (Category.user_id == user_id) | ((Category.is_custom == False) & (Category.user_id == user_id)))
    else:
        possibleCategories = possibleCategories.filter((Category.user_id == user_id) & (Category.is_custom == True))
    
    # Filter by transaction type if provided
    if transaction_type:
        try:
            transaction_type_enum = TransactionType(transaction_type.upper())
            possibleCategories = possibleCategories.filter(Category.transaction_type == transaction_type_enum)
        except ValueError:
            logging.warning(f"Invalid transaction type: {transaction_type}")
            raise InvalidTransactionTypeError(transaction_type)
        
    return CategoryListResponse(
        categories=possibleCategories.offset(skip).limit(limit).all(),
        total=possibleCategories.count(),
        has_next=skip + limit < possibleCategories.count(),
        total_pages=possibleCategories.count() // limit,
        current_page=skip // limit + 1, 
        page_size=limit
    )

# This gets a specific category that is associated with the current active user
# Helper method for update and delete category methods
def get_category_by_id(db: Session, category_id: UUID, user_id: UUID) -> CategoryResponse:
    category = db.query(Category).filter(Category.category_id == category_id).first()
    if not category:
        logging.warning(f"Category with id {category_id} not found")
        raise CategoryNotFoundError(category_id)
    
    if category.user_id != user_id:
        logging.warning(f"Access denied: User {user_id} attempted to access category {category_id} which belongs to user {category.user_id}")
        raise InvalidUserForCategoryError(category_id)
    
    return category

# This updates a specific category that is associated with the current active user
def update_category(db: Session, category_id: UUID, update_category_request: UpdateCategoryRequest, user_id: UUID) -> CategoryResponse:
    category = get_category_by_id(db, category_id, user_id)
    logging.info(f"Before update: {category.category_id=}, {category.user_id=}")
    if update_category_request.category_name:
        category.category_name = update_category_request.category_name
        category.is_custom = True
    if update_category_request.icon:
        category.icon = update_category_request.icon
        category.is_custom = True
    if update_category_request.color:
        category.color = update_category_request.color
        category.is_custom = True
    if update_category_request.transaction_type:
        category.transaction_type = update_category_request.transaction_type
        category.is_custom = True

    db.commit()
    db.refresh(category)
    logging.info(f"After update: {category.category_id=}, {category.user_id=}")
    return category

# This deletes a specific category that is associated with the current active user
def delete_category(db: Session, category_id: UUID, user_id: UUID) -> None:
    delete_category = get_category_by_id(db, category_id, user_id)
    
    # For now we don't allow users to delete the default General Expense/Income and Transfer(default) category
    if delete_category.category_name in {"Uncategorized Expense", "Uncategorized Income", "Transfer"} and not delete_category.is_custom:
        logging.warning(f"Not allowed: User {user_id} attempted to delete Uncategorized Expense/Income or Transfer category")
        raise InvalidCategoryForDeletionError(category_id)

    # Get the General/Uncategorized category for this user, if it exists
    # These are general categories is where we move all transactions into when user deletes a category
    if delete_category.transaction_type == TransactionType.INCOME:
        general_category = db.query(Category).filter(
            Category.user_id == user_id,
            Category.category_name == "Uncategorized Income",
            Category.transaction_type == delete_category.transaction_type,
            Category.is_custom == False
        ).first()
    else:
        general_category = db.query(Category).filter(
            Category.user_id == user_id,
            Category.category_name == "Uncategorized Expense",
            Category.transaction_type == delete_category.transaction_type,
            Category.is_custom == False
        ).first()
    
    # In the scenario that the default General Expense/Income category does not exist, we create it
    if not general_category and delete_category.transaction_type == TransactionType.EXPENSE:
        general_category = Category(
            category_name="Uncategorized Expense",
            icon="📦",
            color="#808080",
            transaction_type=delete_category.transaction_type,
            is_custom=False,
            user_id=user_id
        )
    else:
         general_category = Category(
            category_name="Uncategorized Income",
            icon="📦",
            color="#808080",
            transaction_type=delete_category.transaction_type,
            is_custom=False,
            user_id=user_id
        )
    db.add(general_category)
    db.commit()
    db.refresh(general_category)
    
    # Move all transactions in to be deleted category into the general expense/income category
    db.query(Transaction).filter(
        Transaction.category_id == category_id
    ).update({
        Transaction.category_id: general_category.category_id
    })
    
    db.delete(delete_category)
    db.commit()
    logging.info(f"Deleted category {category_id} for user {user_id} and moved transactions to a Uncategorized Expense/Income category")
    
# Create default categories for a user (typically new registered user) if they don't exist
def create_default_categories(db: Session, user_id : UUID) -> List[CategoryResponse]:
    default_categories = [
        # Uncategorized Categories (Helpful when categories get deleted but keep transactions in those categories)
        {"category_name": "Uncategorized Expense", "icon": "📦", "color": "#808080", "transaction_type": TransactionType.EXPENSE, "is_custom": False, "user_id": user_id},
        {"category_name": "Uncategorized Income", "icon": "💰", "color": "#808080", "transaction_type": TransactionType.INCOME, "is_custom": False, "user_id": user_id},
        {"category_name": "Transfer", "icon": "↔️", "color": "#808080", "transaction_type": TransactionType.TRANSFER, "is_custom": False, "user_id": user_id},
        
        # Default Expense Categories
        {"category_name": "Food & Dining", "icon": "🍔", "color": "#FF5733", "transaction_type": TransactionType.EXPENSE, "is_custom": False, "user_id": user_id},
        {"category_name": "Transportation", "icon": "🚗", "color": "#33FF57", "transaction_type": TransactionType.EXPENSE, "is_custom": False, "user_id": user_id},
        {"category_name": "Entertainment", "icon": "🎉", "color": "#3357FF", "transaction_type": TransactionType.EXPENSE, "is_custom": False, "user_id": user_id},
        {"category_name": "Shopping", "icon": "🛍️", "color": "#FF33A1", "transaction_type": TransactionType.EXPENSE, "is_custom": False, "user_id": user_id},
        {"category_name": "Housing", "icon": "🏠", "color": "#FF3333", "transaction_type": TransactionType.EXPENSE, "is_custom": False, "user_id": user_id},
        {"category_name": "Utilities", "icon": "⚡", "color": "#33A1FF", "transaction_type": TransactionType.EXPENSE, "is_custom": False, "user_id": user_id},
        {"category_name": "Healthcare", "icon": "🏥", "color": "#A133FF", "transaction_type": TransactionType.EXPENSE, "is_custom": False, "user_id": user_id},
        {"category_name": "Personal Care", "icon": "💆‍♂️", "color": "#33FFA1", "transaction_type": TransactionType.EXPENSE, "is_custom": False, "user_id": user_id},
        {"category_name": "Education", "icon": "🎓", "color": "#FFA133", "transaction_type": TransactionType.EXPENSE, "is_custom": False, "user_id": user_id},
        {"category_name": "Gifts & Donations", "icon": "🎁", "color": "#A1FF33", "transaction_type": TransactionType.EXPENSE, "is_custom": False, "user_id": user_id},

        # Default Income/Inflow Categories
        {"category_name": "Salary", "icon": "💰", "color": "#33FFA1", "transaction_type": TransactionType.INCOME, "is_custom": False, "user_id": user_id},
        {"category_name": "Investments", "icon": "📈", "color": "#FFA133", "transaction_type": TransactionType.INCOME, "is_custom": False, "user_id": user_id},
        {"category_name": "Rental Income", "icon": "🏠", "color": "#3357FF", "transaction_type": TransactionType.INCOME, "is_custom": False, "user_id": user_id},
        {"category_name": "Interest Income", "icon": "💸", "color": "#FF33A1", "transaction_type": TransactionType.INCOME, "is_custom": False, "user_id": user_id},
        {"category_name": "Dividends", "icon": "💸", "color": "#FF33A1", "transaction_type": TransactionType.INCOME, "is_custom": False, "user_id": user_id},
        {"category_name": "Bonus", "icon": "💸", "color": "#FF33A1", "transaction_type": TransactionType.INCOME, "is_custom": False, "user_id": user_id},
    ]

    for default_category in default_categories:
        # Check if category with same name and transaction_type already exists for this user
        existing_category = db.query(Category).filter(
            Category.user_id == user_id,
            Category.category_name == default_category["category_name"],
            Category.transaction_type == default_category["transaction_type"]
        ).first()
        
        if not existing_category:
            category = Category(**default_category)
            db.add(category)
            db.commit()
            db.refresh(category)
    
    logging.info(f"Successfully added default categories for user {user_id}")
    return db.query(Category).filter(Category.user_id == user_id).all()

# Gets the trasnfer category id for a user  
def get_transfer_category(db: Session, user_id: UUID) -> UUID:
    transfer_category = db.query(Category).filter(
        Category.user_id == user_id,
        Category.category_name == "Transfer",
        Category.transaction_type == TransactionType.TRANSFER,
        Category.is_custom == False
    ).first()
    return transfer_category.category_id    
