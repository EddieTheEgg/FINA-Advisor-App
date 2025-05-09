import logging
from typing import List
from uuid import UUID
from backend.src.categories.model import CreateCategoryRequest
from sqlalchemy.orm import Session

from backend.src.entities.category import Category

# This is when a user makes a new category besides the default ones, which is custom
def create_category(db: Session, create_category_request: CreateCategoryRequest, user_id: UUID) -> Category:
    try:
        new_category = Category(
            category_name=create_category_request.category_name,
            icon=create_category_request.icon,
            color=create_category_request.color,
            is_income = create_category_request.income,
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
def get_user_categories(
        db: Session,
        user_id: UUID,
        skip: int = 0,
        limit: int = 100,
        include_system_default_categories: bool = True,
) -> List[Category]:
    possibleCategories = db.query(Category)

    #Gets all default and user's possible categories to work with if true
    # else only gets the user self-created categories
    if include_system_default_categories:
        possibleCategories = possibleCategories.filter(
            (Category.user_id == user_id) | ((Category.is_custom == False) & (Category.user_id == user_id)))
    else:
        possibleCategories = possibleCategories.filter((Category.user_id == user_id) & (Category.is_custom == True))
    return possibleCategories.offset(skip).limit(limit).all()
