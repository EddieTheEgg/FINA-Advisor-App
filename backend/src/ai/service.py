import os
import logging
from typing import Annotated, Dict, Optional, Tuple, Any, List, Union
import uuid
import re
from dotenv import load_dotenv
from fastapi import Depends
from uuid import UUID
from sqlalchemy.orm import Session
from datetime import datetime
from openai import OpenAI
from sqlalchemy.exc import SQLAlchemyError

from backend.src.exceptions import (
    OpenAICallError, 
    OpenAIResponseError,
    TransactionNotFoundError,
    CategoryNotFoundError,
    InvalidUserForTransactionError,
    CategoryApplicationError,
    InvalidCategoryDataError,
    TrainingDataError
)
from backend.src.entities.transaction import Transaction
from backend.src.entities.category import Category
from backend.src.ai.model import (
    CategorySuggestionResponse,
    ApplyCategoryResponse,
    SuggestCategoryRequest
)
from backend.src.database.core import DbSession

# If you decide to move this to entities folder later
from backend.src.entities.category_training import CategorizationTrainingData
from backend.src.transactions import service

load_dotenv()

# Get an OpenAI client
def get_openai_client() -> OpenAI:
    return OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Suggest a category based on transaction details
async def suggest_category_from_details(
    db: Session,
    user_id: UUID,
    request: SuggestCategoryRequest,
) -> CategorySuggestionResponse:
    try:
        # Get all categories for the user
        categories = db.query(Category).filter(Category.user_id == user_id).all()
        
        if not categories:
            logging.warning(f"No categories found for user {user_id}")
            return CategorySuggestionResponse(
                transaction_id=None,
                confidence=0.0,
                method="error"
            )
        
        categories_list = []
        for category in categories:
            categories_list.append(f"- {category.category_id}: {category.category_name}")
        categories_list = "\n".join(categories_list)
        
        prompt = f"""
        Categorize the following transaction into one of these categories by trying to match
        the transaction information provided to the most relevant category from the list below:
        List of categories:
        {categories_list}

        This is the transaction information:
        - Title: {request.title}
        - Transaction Date: {request.transaction_date.strftime('%Y-%m-%d')}
        - Amount: ${request.amount:.2f}
        - Expense or Income: { "Income" if request.is_income else "Expense" }
        - Notes: {request.notes or 'No notes provided'}
        - Location: {request.location or 'No location provided'}
        - Is Subscription?: { "Yes" if request.is_subscription else "No" }
        - Subscription Frequency: {request.subscription_frequency or 'No subscription frequency provided'}
        - Subscription Start Date: {request.subscription_start_date.strftime('%Y-%m-%d') if request.subscription_start_date else 'No subscription start date provided'}
        - Subscription End Date: {request.subscription_end_date.strftime('%Y-%m-%d') if request.subscription_end_date else 'No subscription end date provided'}
        - Merchant: {request.merchant or 'No merchant provided'}
        - Payment Method: {request.payment_type or 'No payment method provided'}
        - Payment Account: {request.payment_account or 'No payment account provided'}
        
        First, see if you can find a category name in the list that best matches the transaction information with a confidence score of 0.8 or higher.
        If you do, give me the category ID of that matching category name and confidence score in the EXACT format below.
        If you do not meet those conditions mentioned, PLEASE DO NOT GIVE ME A MADE UP ID, PROVIDE A NEW SUGGESTED CATEGORY NAME to replace <category_id>:
        
        Category ID of the best match: <category_id or new_suggested_category_name>
        Confidence: <confidence_score>
        """
        
        client = get_openai_client()
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{
                "role": "user", 
                "content": prompt
            }],
            max_tokens=500,
            temperature=0.3
        )
        
        content = response.choices[0].message.content.strip()
        
        # Parse the response using regex
        category_match = re.search(r'Category ID of the best match:\s*(.*?)(?:\n|$)', content, re.IGNORECASE)
        confidence_match = re.search(r'Confidence:\s*(\d*\.?\d+)', content, re.IGNORECASE)
        
        if category_match and confidence_match:
            category_id_str = category_match.group(1).strip()
            confidence_score = float(confidence_match.group(1))
            
            # Check if the category_id_str is a UUID
            uuid_valid = re.search(
                r'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}',
                category_id_str,
                re.IGNORECASE
            )
            
            if uuid_valid:
                try:
                    predicted_category_uuid = UUID(uuid_valid.group(0))
                    for category in categories:
                        if category.category_id == predicted_category_uuid:
                            return CategorySuggestionResponse(
                                transaction_id=None,
                                category_id=predicted_category_uuid,
                                suggested_category_name=None,
                                confidence=confidence_score,
                                method="openai"
                            )
                except ValueError:
                    logging.warning(f"Invalid UUID format in response: {category_id_str}")
                    raise OpenAIResponseError()
            
            # If category_id_str is not a UUID, it is a new suggested category name
            return CategorySuggestionResponse(
                transaction_id=None,
                category_id=None,
                suggested_category_name=category_id_str,
                confidence=confidence_score,
                method="openai"
            )
        
        logging.warning(f"Couldn't extract category ID and confidence from OpenAI response: {content}")
        raise OpenAIResponseError()
        
    except Exception as e:
        logging.error(f"Error calling OpenAI: {str(e)}")
        raise OpenAICallError()

# FastAPI dependency injection
def get_openai_service() -> OpenAI:
    return get_openai_client()

OpenAIServiceDep = Annotated[OpenAI, Depends(get_openai_service)]
