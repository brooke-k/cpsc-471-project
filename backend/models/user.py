from pydantic import BaseModel, Field
from bson import ObjectId

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

class Address:
  street: str
  city: str
  province: str
  zip_code: str

class RegularUser(BaseModel):
    _id: Field(default_factory=PyObjectId, alias="_id")
    email: str
    password: str
    retail_region: str
    username: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class Administrator(BaseModel):
    _id: Field(default_factory=PyObjectId, alias="_id")
    username: str
    email: str
    password: str
    admin_id: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class Manufacturer(BaseModel):
    _id: Field(default_factory=PyObjectId, alias="_id")
    username: str
    email: str
    password: str
    phone_no: str
    hq_addr: Address


    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}