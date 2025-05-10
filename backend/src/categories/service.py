import logging
from typing import List
from uuid import UUID
from backend.src.categories.model import CategoryResponse, CreateCategoryRequest, UpdateCategoryRequest
from sqlalchemy.orm import Session

from backend.src.entities.category import Category
from backend.src.exceptions import CategoryNotFoundError, InvalidUserForCategoryError

# This is when a user makes a new category besides the default ones, which is custom
def create_category(db: Session, create_category_request: CreateCategoryRequest, user_id: UUID) -> CategoryResponse:
    try:
        new_category = Category(
            category_name=create_category_request.category_name,
            icon=create_category_request.icon,
            color=create_category_request.color,
            is_income = create_category_request.is_income,
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
) -> List[CategoryResponse]:
    possibleCategories = db.query(Category)

    #Gets all default and user's possible categories to work with if true
    # else only gets the user self-created categories
    if include_system_default_categories:
        possibleCategories = possibleCategories.filter(
            (Category.user_id == user_id) | ((Category.is_custom == False) & (Category.user_id == user_id)))
    else:
        possibleCategories = possibleCategories.filter((Category.user_id == user_id) & (Category.is_custom == True))
    return possibleCategories.offset(skip).limit(limit).all()

# This gets a specific category that is associated with the current active user
# Helper method for update and delete category methods
def get_category_by_id(db: Session, category_id: UUID, user_id: UUID) -> CategoryResponse:
    category = db.query(Category).filter(Category.category_id == category_id).first()
    if not category:
        logging.warning(f"Category with id {category_id} not found")
        raise CategoryNotFoundError(category_id)
    logging.warning(f"category.user_id: {category.user_id} ({type(category.user_id)}), user_id: {user_id} ({type(user_id)})")
    if category.user_id != user_id:
        logging.warning(f"User {user_id} does not have access to category {category_id}")
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
    if update_category_request.is_income:
        category.is_income = update_category_request.is_income
        category.is_custom = True

    db.commit()
    db.refresh(category)
    logging.info(f"After update: {category.category_id=}, {category.user_id=}")
    return category

# This deletes a specific category that is associated with the current active user
def delete_category(db: Session, category_id: UUID, user_id: UUID) -> None:
    category = get_category_by_id(db, category_id, user_id)
    db.delete(category)
    db.commit()



