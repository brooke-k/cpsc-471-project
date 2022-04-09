from pydantic import BaseModel, Field
from bson import ObjectId

# from enum import Enum // BROOKE NOTE Can be used to have arguments that are DROP DOWN ONLY (in docs, essentially just limits the possibilites of accepted arguments)

# class OrderByTypeModel(str, Enum):
#     popularity = "popularity"
#     price = "price"
#     review_score = "review_score"

#Converts ObjectId to a String
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


# model used to test data within database
class testModel(BaseModel):
    _id: Field(default_factory=PyObjectId, alias="_id")
    powerSource: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
          "testData": {
            "powerSource":"beans"
          }
        }
