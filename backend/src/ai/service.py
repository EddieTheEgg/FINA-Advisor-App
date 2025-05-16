import hashlib
import os
from typing import Dict, Optional, Tuple, Any, List
import uuid
import logging
from dotenv import load_dotenv
from pydantic import UUID4
from sqlalchemy.orm import Session
from datetime import datetime, time
from openai import OpenAI
import re

from backend.src.exceptions import OpenAICallError, OpenAIResponseError
from backend.src.transactions.model import Transaction
from backend.src.categories.model import Category

load_dotenv()

class OpenAICategorizationService:
    def __init__(self):
        self.client = OpenAI(api_key= os.getenv("OPENAI_API_KEY"))
    
    # Suggest a category for a transaction, and return the category ID and confidence score
    async def suggest_category(self, db: Session, user_id: UUID4, transaction: Transaction) -> Tuple[Optional[UUID4], float]:
        try:
            # Get all categories for the user
            categories = db.query(Category).filter(Category.user_id == user_id).all()
            
            if not categories:
                logging.warning(f"No categories found for user {user_id}")
                return None, 0.0
            
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
            - Title: {transaction.title}
            - Transaction Date: {transaction.transaction_date.strftime('%Y-%m-%d')}
            - Amount: ${transaction.amount:.2f}
            - Expense or Income: { "Income" if transaction.is_income else "Expense" }
            - Notes: {transaction.notes or 'No notes provided'}
            - Location: {transaction.location or 'No location provided'}
            - Is Subscription?: { "Yes" if transaction.is_subscription else "No" }
            - Subscription Start Date: {transaction.subscription_start_date.strftime('%Y-%m-%d') if transaction.subscription_start_date else 'No subscription start date provided'}
            - Subscription End Date: {transaction.subscription_end_date.strftime('%Y-%m-%d') if transaction.subscription_end_date else 'No subscription end date provided'}
            - Merchant: {transaction.merchant or 'No merchant provided'}
            - Payment Method: {transaction.payment_type or'No payment method provided'}
            - Payment Account: {transaction.payment_account or 'No payment account provided'}

            
            First, see if you can find a category name in the list that best matches the transaction information with a confidence score of 0.8 or higher.
            If you do, give me the category ID of that matching category name and confidence score in the EXACT format below.
            If you do not meet those conditions mentioned, PLEASE DO NOT GIVE ME A MADE UP ID, PROVIDE A NEW SUGGESTED CATEGORY NAME to replace <category_id>:
            
            Category ID of the best match: <category_id or new_suggested_category_name>
            Confidence: <confidence_score>
            """
            
            # Call OpenAI API
            response = self.client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{
                    "role": "user", 
                    "content": prompt
                    }],
                max_tokens = 500,  # Increased to handle detailed responses
                temperature=0.3  
            )
            
            # Extract category ID and confidence from response
            content = response.choices[0].message.content.strip()
            
            # Parse the response using regex to extract both category ID and confidence
            # group(1) = (.*?) a capturing group that captures any characters after Category ID of the best match:
            category_match = re.search(r'Category ID of the best match:\s*(.*?)(?:\n|$)', content, re.IGNORECASE)
            confidence_match = re.search(r'Confidence:\s*(\d*\.?\d+)', content, re.IGNORECASE)
            
            if category_match and confidence_match:
                category_id_str = category_match.group(1).strip()
                confidence_score = float(confidence_match.group(1))
                
                # Check if the category_id_str is a UUID
                uuid_valid = re.search( 
                    r'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', 
                    category_id_str, 
                    re.IGNORECASE)
                
                if uuid_valid:
                    try:
                        predicted_category_uuid = uuid.UUID(uuid_valid.group(0))
                        for category in categories:
                            if category.category_id == predicted_category_uuid:
                                return predicted_category_uuid, confidence_score
                    except ValueError:
                        logging.warning(f"Invalid UUID format in response: {category_id_str}")
                        raise OpenAIResponseError()
                
                # If category_id_str is not a UUID, it is a new suggested category name
                return category_id_str, confidence_score
            
            logging.warning(f"Couldn't extract category ID and confidence from OpenAI response: {content}")
            raise OpenAIResponseError()            
            
        except Exception as e:
            logging.error(f"Error calling OpenAI: {str(e)}")
            raise OpenAICallError()
    
    async def log_categorization(
        self, 
        db: Session,
        transaction: Transaction, 
        category_id: UUID4, 
        source: str = "openai"
    ) -> None:
        """
        Store the categorization result for training data collection
        This is a placeholder - we'll implement actual storage in the next file
        
        Args:
            db: Database session
            transaction: The transaction being categorized
            category_id: The assigned category ID
            source: Where the categorization came from ('openai', 'user', etc.)
        """
        try:
            # Here you would log the categorization to a table for future training data
            # This will be implemented in the next file
            logging.info(
                f"Logged categorization: Transaction {transaction.id} → Category {category_id} (Source: {source})"
            )
        except Exception as e:
            logging.error(f"Failed to log categorization: {str(e)}")