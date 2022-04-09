from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

mongodb_url = os.getenv("MONGODB_URL")
port = int(os.getenv("MONGODB_PORT"))
mongodb_dbname = os.getenv("MONGODB_DATBASE_NAME")

print(mongodb_url)
print(port)

#sets up connection to MongoDB
client = MongoClient(mongodb_url, port)
db = client[mongodb_dbname]
