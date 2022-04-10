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
from models.user import Administrator, AdminBase
import uuid

def parse_json(data):
    return json.loads(json_util.dumps(data))

apiRouter = APIRouter(prefix="/user", tags=["user"])
regularCollect = "user-regular"
manufactCollect = "user-manufacturer"
adminCollect = "user-administrator"

# Create a new regular use and add it to the database
@apiRouter.post("/create/regular", response_description="Create a new regular user")
async def create_user(user: user.RegularUser):
  if (notExistant := config.db[regularCollect].find_one({"username":user.username, "email":user.email})) is None and (notExistant := config.db[manufactCollect].find_one({"username":user.username, "email":user.email})) is None and (notExistant := config.db[adminCollect].find_one({"username":user.username, "email":user.email})) is None:
      userPost = jsonable_encoder(user)
      new_user = config.db[regularCollect].insert_one(userPost)
      if (userCheck := config.db[regularCollect].find_one({"_id":new_user.inserted_id})) is not None:
        JSONResponse(status_code=status.HTTP_201_CREATED, content = parse_json(userCheck))
      else:
          raise HTTPException(status_code=404, detail="New user was not added to the database.")
  else:
      raise HTTPException(status_code=400, detail="There already exists a user with that email and password.")

# Create a new Administrator and add it to the database
@apiRouter.post("/create/administrator", response_description="Create a new administrator user")
async def create_user(base_user: user.RegularUser):
  user = Administrator(username=base_user.username, email=base_user.email, password=base_user.password, admin_id=str(uuid.uuid4()))


  if (notExistant := config.db[regularCollect].find_one({"username":user.username, "email":user.email})) is None and (notExistant := config.db[manufactCollect].find_one({"username":user.username, "email":user.email})) is None and (notExistant := config.db[adminCollect].find_one({"username":user.username, "email":user.email})) is None:
      userPost = jsonable_encoder(user)
      new_user = config.db[adminCollect].insert_one(userPost)
      if (userCheck := config.db[adminCollect].find_one({"_id":new_user.inserted_id})) is not None:
        JSONResponse(status_code=status.HTTP_201_CREATED, content = parse_json(userCheck))
      else:
          raise HTTPException(status_code=404, detail="New user was not added to the database.")
  else:
      raise HTTPException(status_code=400, detail="There already exists a user with that email and password.")

@apiRouter.get("/verify/non-admin", response_model=user.UserBase)
async def get_user(username: str, email: str, password: str):
  if (userCheck := config.db[regularCollect].find_one({"username":username, "email":email, "password":password})) is not None or (userCheck := config.db[manufactCollect].find_one({"username":username, "email":email, "password":password})):
    return userCheck
  else:
    raise HTTPException(status_code=400, detail="A user with that email and password could not be found")

@apiRouter.get("/verify/admin", response_model=AdminBase)
async def get_user(username: str, email: str, password: str, admin_id: str):
  if (userCheck := config.db[adminCollect].find_one({"username":username, "email":email, "password":password})):
    return userCheck
  else:
    raise HTTPException(status_code=400, detail="An administrator with that email, password, and adminID could not be found")

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


@apiRouter.delete("/remove")
async def delete_user(username: str, email: str, password: str):
  if (userCheck := config.db[regularCollect].find_one({"username":username, "email":email, "password":password})) is not None: #i.e. the user was found in regular
      user_id = userCheck['_id']
      deletedb_return =  config.db[regularCollect].delete_one({"username":username, "email":email})
      if deletedb_return.deleted_count == 1:
         return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)
  if (userCheck := config.db[manufactCollect].find_one({"username":username, "email":email, "password":password})) is not None: #i.e. the user was found in regular
       user_id = userCheck['_id']
       deletedb_return =  config.db[manufactCollect].delete_one({"username":username, "email":email})
       if deletedb_return.deleted_count == 1:
          return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)
  if (userCheck := config.db[adminCollect].find_one({"username":username, "email":email})) is not None: #i.e. the user was found in regular
      user_id = userCheck['_id']
      deletedb_return =  config.db[adminCollect].delete_one({"_id":user_id})
      if deletedb_return.deleted_count == 1:
         return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

  raise HTTPException(status_code=404, detail=f"User with username {username} and email {email} could not be found to remove.")