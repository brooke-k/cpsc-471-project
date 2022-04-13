from pydantic import BaseModel, Field
from bson import ObjectId
from typing import List
import re

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

class ProductBase(BaseModel):
  _id: Field(default_factory=PyObjectId, alias="_id")
  name: str
  manufacturer_name: str
  ingredients: list
  allergens: list
  class Config:
    allow_population_by_field_name = True
    arbitrary_types_allowed = True
    json_encoders = {ObjectId: str}


class Product(BaseModel):
  _id: Field(default_factory=PyObjectId, alias="_id")
  name: str
  id_number: str
  manufacturer_name: str
  ingredients: list
  allergens: list
  class Config:
    allow_population_by_field_name = True
    arbitrary_types_allowed = True
    json_encoders = {ObjectId: str}

# class Ingredient(BaseModel):
#   _id: Field(default_factory=PyObjectId, alias="_id")
#   ingredient_name: str
#   product_name: str
#   product_id: str
#   class Config:
#     allow_population_by_field_name = True
#     arbitrary_types_allowed = True
#     json_encoders = {ObjectId: str}

class NotableAllergen(BaseModel):
  _id: Field(default_factory=PyObjectId, alias="_id")
  allergen: str
  product_name: str
  product_id: str
  class Config:
    allow_population_by_field_name = True
    arbitrary_types_allowed = True
    json_encoders = {ObjectId: str}

class Alert(BaseModel):
  _id: Field(default_factory=PyObjectId, alias="_id")
  alert_message: str
  manufacturer_name: str
  manufacturer_id: str
  product_name: str
  product_id: str
  class Config:
    allow_population_by_field_name = True
    arbitrary_types_allowed = True
    json_encoders = {ObjectId: str}

# class IngredientsList(BaseModel):
#   _id: Field(default_factory=PyObjectId, alias="_id")
#   ingredients: List[Ingredient]
#   class Config:
#     allow_population_by_field_name = True
#     arbitrary_types_allowed = True
#     json_encoders = {ObjectId: str}
