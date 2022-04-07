from pydantic import BaseModel, Field
from bson import ObjectId

# from enum import Enum // BROOKE NOTE Can be used to have arguments that are DROP DOWN ONLY (in docs, essentially just limits the possibilites of accepted arguments)

# class OrderByTypeModel(str, Enum):
#     popularity = "popularity"
#     price = "price"
#     review_score = "review_score"

#Converts ObjectId to a String

class powerModel:
  powerSource: str

  def __init__(self, powerSource):
    self.powerSource = powerSource




class PyObjectId(ObjectId):

    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


# Used for getting
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

class updateTestModel(BaseModel):
    powerSource: str

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {

          "testData": {
            "powerSource":"beans"
          }
        }