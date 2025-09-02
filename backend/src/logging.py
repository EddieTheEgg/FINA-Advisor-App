import logging
import sys
from datetime import datetime
from enum import Enum


LOG_FORMAT_DEBUG = "%(asctime)s - %(levelname)s - %(name)s - %(message)s - %(pathname)s:%(funcName)s:%(lineno)d"
LOG_FORMAT_DETAILED = "%(asctime)s - %(levelname)s - %(name)s - %(message)s"

class LogLevels(Enum):
    info = "INFO"
    warn = "WARN"
    error = "ERROR"
    debug = "DEBUG"

def configure_logging(log_level: str = LogLevels.error.value):
    log_level = str(log_level).upper()
    log_levels = [level.value for level in LogLevels]

    if log_level not in log_levels:
        logging.basicConfig(level=LogLevels.error.value)    
        return
    
    # Create a more detailed formatter
    if log_level == LogLevels.debug.value:
        formatter = logging.Formatter(LOG_FORMAT_DEBUG)
    else:
        formatter = logging.Formatter(LOG_FORMAT_DETAILED)
    
    # Configure root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(log_level)
    
    # Remove existing handlers
    for handler in root_logger.handlers[:]:
        root_logger.removeHandler(handler)
    
    # Create console handler
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setFormatter(formatter)
    root_logger.addHandler(console_handler)
    
    # Create file handler for errors
    try:
        file_handler = logging.FileHandler('backend_error.log')
        file_handler.setLevel(logging.ERROR)
        file_handler.setFormatter(formatter)
        root_logger.addHandler(file_handler)
    except Exception as e:
        print(f"Could not create file handler: {e}")
    
    # Set specific loggers to appropriate levels
    logging.getLogger("uvicorn").setLevel(logging.INFO)
    logging.getLogger("uvicorn.access").setLevel(logging.INFO)
    logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)
    logging.getLogger("sqlalchemy.pool").setLevel(logging.WARNING)