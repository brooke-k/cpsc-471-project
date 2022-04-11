from pydantic import BaseModel, Field
from bson import ObjectId
from typing import List
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

class PyObjectId(ObjectId):
    @classmethod
    async def __get_validators__(cls):
        yield cls.validate

    @classmethod
    async def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    async def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class TestListModel(BaseModel):
  things: list
  class Config:
    allow_population_by_field_name = True
    arbitrary_types_allowed = True
    json_encoders = {ObjectId: str}

def parse_json(data):
    return json.loads(json_util.dumps(data))


apiRouter = APIRouter(prefix="/product", tags=["testing"])

@apiRouter.post("/post-list")
async def test_create(test: TestListModel):
  testPost = jsonable_encoder(test)
  new_test = config.db["testing"].insert_one(testPost)
  if (testCheck := config.db["testing"].find_one({"_id":new_test.inserted_id})) is not None:
    return JSONResponse(status_code=status.HTTP_201_CREATED, content = parse_json(testCheck))
  else:
    raise HTTPException(status_code=404, detail="Product manufacturer could not be found in the database.")
