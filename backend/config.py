from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

mongodb_url = os.getenv("MONGODB_URL")
port = int(os.getenv("MONGODB_PORT"))

print(mongodb_url)
print(port)

#sets up connection to MongoDB
client = MongoClient(mongodb_url, port)
db = client['testdb']
