from pydantic import BaseModel, Field
from bson import ObjectId

#Converts ObjectId to a String
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