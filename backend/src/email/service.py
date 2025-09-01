import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import logging

load_dotenv()

class EmailService:
    def __init__(self):
        # Try multiple environment variable names for flexibility
        self.smtp_server = os.getenv("SMTP_SERVER") or os.getenv("MAIL_SERVER", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT") or os.getenv("MAIL_PORT", "587"))
        self.smtp_username = os.getenv("SMTP_USERNAME") or os.getenv("MAIL_USERNAME")
        # Get password and remove any spaces (common in App Passwords)
        raw_password = os.getenv("SMTP_PASSWORD") or os.getenv("MAIL_PASSWORD")
        self.smtp_password = raw_password.replace(" ", "") if raw_password else None
        self.from_email = os.getenv("FROM_EMAIL") or os.getenv("MAIL_FROM", self.smtp_username)
        
        if not self.smtp_username or not self.smtp_password:
            logging.warning("SMTP credentials not configured. Email service will not work.")
    
    def send_password_reset_email(self, to_email: str, verification_code: str, user_name: str) -> bool:
        """Send password reset email to user"""
        try:
            if not self.smtp_username or not self.smtp_password:
                logging.error("SMTP credentials not configured")
                return False
            
            # Create message
            msg = MIMEMultipart()
            msg['From'] = self.from_email
            msg['To'] = to_email
            msg['Subject'] = "Password Reset Request - Finance App"
            
            # No URL needed - using verification code instead
            
            
            # Email body with verification code
            body = f"""
            Hello {user_name},
            
            You have requested to reset your password for your Finance App account.
            
            Please use the following verification code in the app to reset your password:
            
            Verification Code: {verification_code}
            
            This code will expire in 15 minutes for security reasons.
            
            If you did not request this password reset, please ignore this email.
            
            Best regards,
            Finance App Team
            """
            
            msg.attach(MIMEText(body, 'plain'))
            
            # Send email - try SSL first, fallback to TLS
            try:
                # Try SSL connection (port 465)
                with smtplib.SMTP_SSL(self.smtp_server, 465) as server:
                    server.login(self.smtp_username, self.smtp_password)
                    server.send_message(msg)
            except Exception as ssl_error:
                logging.warning(f"SSL connection failed: {ssl_error}, trying TLS...")
                # Fallback to TLS (port 587)
                with smtplib.SMTP(self.smtp_server, self.smtp_port) as server:
                    server.starttls()
                    server.login(self.smtp_username, self.smtp_password)
                    server.send_message(msg)
            
            logging.info(f"Password reset verification code sent to {to_email}")
            return True
            
        except Exception as e:
            logging.error(f"Failed to send password reset verification code to {to_email}: {str(e)}")
            return False

# Create global instance
email_service = EmailService()
