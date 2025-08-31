from mangum import Mangum
from src.main import app

# AWS Lambda handler
handler = Mangum(app)
