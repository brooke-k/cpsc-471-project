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
regularCollect = "user-regular"
manufactCollect = "user-manufacturer"
adminCollect = "user-administrator"

# Create a new regular use and add it to the database
@apiRouter.post("/create/regular", response_description="Create a new regular user")
async def create_user(user: user.RegularUser):
  if (notExistant := config.db[regularCollect].find_one({"username":user.username, "email":user.email})) is None:
      userPost = jsonable_encoder(user)
      new_user = config.db[regularCollect].insert_one(userPost)
      if (userCheck := config.db[regularCollect].find_one({"_id":new_user.inserted_id})) is not None:
        JSONResponse(status_code=status.HTTP_201_CREATED, content = parse_json(userCheck))
      else:
          raise HTTPException(status_code=404, detail="New user was not added to the database.")
  else:
      raise HTTPException(status_code=400, detail="There already exists a user with that email and password.")

@apiRouter.get("/verify/regular", response_model=user.RegularUser)
async def get_user(username: str, email: str, password: str):
  if (userCheck := config.db[regularCollect].find_one({"username":username, "email":email, "password":password})) is not None:
    return userCheck
  else:
    raise HTTPException(status_code=400, detail="A user with that email and password could not be found")

@apiRouter.post("/create/manufacturer", response_description="Create a new manufacturer user")
async def create_user(user: user.Manufacturer):
  if (notExistant := config.db[manufactCollect].find_one({"username":user.username, "email":user.email, "name":user.name})) is None and (notExistant := config.db[manufactCollect].find_one({"name":user.name})) is None:
      userPost = jsonable_encoder(user)
      new_user = config.db[manufactCollect].insert_one(userPost)
      if (userCheck := config.db[manufactCollect].find_one({"_id":new_user.inserted_id})) is not None:
        JSONResponse(status_code=status.HTTP_201_CREATED, content = parse_json(userCheck))
      else:
          raise HTTPException(status_code=404, detail="New manufacturer was not added to the database.")
  else:
      raise HTTPException(status_code=400, detail="There already exists a manufacturer with that email, username, or name. ")
