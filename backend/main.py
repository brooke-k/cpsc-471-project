from fastapi import FastAPI, HTTPException, status, Body, Form

from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from bson import json_util
from pydantic import BaseModel, Field
from pymongo import MongoClient
from dotenv import load_dotenv
import uvicorn, os, model, json

load_dotenv()

mongodb_url = os.getenv("MONGODB_URL")
port = int(os.getenv("MONGODB_PORT"))
mongodb_dbname = os.getenv("MONGODB_DATABASE_NAME")

print(mongodb_url)
print(port)

#sets up connection to MongoDB
client = MongoClient(mongodb_url, port)
db = client['testdb']

ThisApp = FastAPI()

# Set up CORS middleware to allow for connection betwetween front and backend
origins = ["http://localhost:8000"]
ThisApp.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods="*",
    allow_headers="*",
)

# Test, for seeing if python backend is up and running
@ThisApp.get("/")
async def index():
    return {"message": "Hello World"}


if __name__ == "__main__":
    uvicorn.run(ThisApp, host="0.0.0.0", port=int(os.getenv("MONGODB_PORT")))