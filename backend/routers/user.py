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
productCollect = "product"

# Create a new regular use and add it to the database
@apiRouter.post("/create/regular", response_description="Create a new regular user")
async def create_user(user: user.RegularUser):
  if (notExistant := config.db[regularCollect].find_one({"email":user.email})) is None and (notExistant := config.db[manufactCollect].find_one({"email":user.email})) is None and (notExistant := config.db[adminCollect].find_one({"email":user.email})) is None:
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
  if (notExistant := config.db[regularCollect].find_one({"email":user.email})) is None and (notExistant := config.db[manufactCollect].find_one({"email":user.email})) is None and (notExistant := config.db[adminCollect].find_one({"email":user.email})) is None:
      userPost = jsonable_encoder(user)
      new_user = config.db[adminCollect].insert_one(userPost)
      if (userCheck := config.db[adminCollect].find_one({"_id":new_user.inserted_id})) is not None:
        return JSONResponse(status_code=status.HTTP_201_CREATED, content = parse_json(userCheck))
      else:
        raise HTTPException(status_code=404, detail="New user was not added to the database.")
  else:
      raise HTTPException(status_code=400, detail="There already exists a user with that email.")

# Creates a manufacturer user account
@apiRouter.post("/create/manufacturer", response_description="Create a new manufacturer user")
async def create_user(user: user.Manufacturer):
  if (notExistant := config.db[regularCollect].find_one({"email":user.email})) is None and (notExistant := config.db[manufactCollect].find_one({"email":user.email})) is None and (notExistant := config.db[adminCollect].find_one({"email":user.email})) is None and (notExistant := config.db[manufactCollect].find_one({"name":user.name})) is None:
      userPost = jsonable_encoder(user)
      new_user = config.db[manufactCollect].insert_one(userPost)
      if (userCheck := config.db[manufactCollect].find_one({"_id":new_user.inserted_id})) is not None:
          return JSONResponse(status_code=status.HTTP_201_CREATED, content = parse_json(userCheck))
      else:
          raise HTTPException(status_code=404, detail="New manufacturer was not added to the database.")
  else:
      raise HTTPException(status_code=400, detail="There already exists a manufacturer with that email or name. ")

# Verifies a non-administrator (manufacturer or regular) user at login
@apiRouter.get("/verify/non_admin", response_model=user.UserBase)
async def get_user(email: str, password: str):
  if (userCheck := config.db[regularCollect].find_one({"email":email, "password":password})) is not None or (userCheck := config.db[manufactCollect].find_one({"email":email, "password":password})):
    return userCheck
  else:
    raise HTTPException(status_code=400, detail="A user with that email and password could not be found")

# Verifies an administrator (not manufacturer nor regular) user at login
@apiRouter.get("/verify/admin", response_model=AdminBase)
async def get_user(username: str, email: str, password: str, admin_id: str):
  if (userCheck := config.db[adminCollect].find_one({"admin_id": admin_id, "email":email, "password":password})):
    return userCheck
  else:
    raise HTTPException(status_code=400, detail="An administrator with that email, password, and adminID could not be found")


# Removes the user (any kind) from the database. An Admin_id number must be provided if the account to be deleted is an admin account.
# Otherwise, just the account's email and password is needed.
@apiRouter.delete("/remove")
async def delete_user(email: str, password: str, admin_id: Optional[str] = None):
  if (userCheck := config.db[regularCollect].find_one({"email":email, "password":password})) is not None: #i.e. the user was found in regular
      user_id = userCheck['_id']
      deletedb_return =  config.db[regularCollect].delete_one({"email":email})
      if deletedb_return.deleted_count == 1:
         return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)
  if (userCheck := config.db[manufactCollect].find_one({"email":email, "password":password})) is not None: #i.e. the user was found in manufacturer
       user_name = userCheck['name']
       deletedb_return =  config.db[manufactCollect].delete_one({"email":email})
       if deletedb_return.deleted_count == 1:
          config.db[productCollect].delete_many({"manufacturer_name": user_name})
          return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)
  if admin_id is not None:
    if (userCheck := config.db[adminCollect].find_one({"email":email, "password":password, "admin_id":admin_id})) is not None: #i.e. the user was found in administrator
        user_id = userCheck['_id']
        deletedb_return =  config.db[adminCollect].delete_one({"_id":user_id})
        if deletedb_return.deleted_count == 1:
           return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

  raise HTTPException(status_code=404, detail=f"User with email {email} could not be found to remove.")

@apiRouter.delete("/testing/remove_all")
async def delete_user(code_word: str):
  if code_word == "BANISH":
    config.db[manufactCollect].delete_many({})
    config.db[regularCollect].delete_many({})
    config.db[adminCollect].delete_many({})

@apiRouter.get("/manufacturer/searchByName", response_model=user.Manufacturer)
async def get_manufacturer(name: str):
    if (userCheck := config.db[manufactCollect].find_one({"name": name})) is not None:
      return parse_json(userCheck)
    else:
      raise HTTPException(status_code=400, detail="A manufacturer with that name could not be found")

@apiRouter.get("/get/allRegular", response_description="Get all regular users")
async def get_all_regular():
  if(userCheck := config.db[regularCollect].find({},{'password':0})) is not None:
    return parse_json(userCheck)
  else:
    raise HTTPException(status_code=400, detail="No regular users could be found.")

@apiRouter.get("/get/allManufacturer", response_description="Get all manufacturers")
async def get_all_regular():
  if(userCheck := config.db[manufactCollect].find({},{'password':0})) is not None:
    return parse_json(userCheck)
  else:
    raise HTTPException(status_code=400, detail="No manufacturers could be found.")

@apiRouter.get("/get/allAdministrator", response_description="Get all administrators")
async def get_all_regular():
  if(userCheck := config.db[adminCollect].find({},{'password':0})) is not None:
    return parse_json(userCheck)
  else:
    raise HTTPException(status_code=400, detail="No administrators could be found.")
