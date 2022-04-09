from fastapi import FastAPI, HTTPException, status, Body, Form, APIRouter
from typing import Optional
import config, uvicorn, os, model
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import json
from bson import json_util
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from models import user

def parse_json(data):
    return json.loads(json_util.dumps(data))

apiRouter = APIRouter(prefix="/user", tags=["user"])

# Create a new regular use and add it to the database
@apiRouter.post("/create/regular", response_description="Create a new regular user")
async def create_user(user: user.RegularUser):
    userPost = jsonable_encoder(user)
    new_user = config.db["user-regular"].insert_one(userPost)
    if (userCheck := config.db["user-regular"].find_one({"_id":new_user.inserted_id})) is not None:
        JSONResponse(status_code=status.HTTP_201_CREATED, content = parse_json(userCheck))
    else:
        raise HTTPException(status_code=404, detail="New user was not added to the database.")