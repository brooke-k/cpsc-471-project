from fastapi import FastAPI, HTTPException, status, Body, Form, APIRouter, Query
from typing import Optional
import config, uvicorn, os, model
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import json
from bson import json_util
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from models import product
from models.product import ProductBase, Product, ProductReturn
import uuid
from typing import List, Pattern
import pandas as pd
import re


def parse_json(data):
    return json.loads(json_util.dumps(data))

## TO BE SEARCHED BY
# Product Name
# Contains ingredient
# Does not contain ingredient
# Contains Allergen
# Does not contain allergen

apiRouter = APIRouter(prefix="/product", tags=["product"])

productCollect = "product"
alertCollect= "product-alert"
manufactCollect = "user-manufacturer"


@apiRouter.post("/create", response_description="Add a new product to the database")
async def create_product(prod: product.ProductBase):
  if (notExistant := config.db[manufactCollect].find_one({"name":prod.manufacturer_name})) is not None:
    fullProduct = Product(name=prod.name, manufacturer_name=prod.manufacturer_name, allergens=prod.allergens, ingredients=prod.ingredients, id_number=str(uuid.uuid4()))
    productPost = jsonable_encoder(fullProduct)
    new_product = config.db[productCollect].insert_one(productPost)
    if (productCheck := config.db[productCollect].find_one({"_id":new_product.inserted_id})) is not None:
      return JSONResponse(status_code=status.HTTP_201_CREATED, content = parse_json(productCheck))
    else:
      raise HTTPException(status_code=404, detail="New product was not added to the database.")
  else:
    raise HTTPException(status_code=404, detail="Product manufacturer could not be found in the database.")


# @apiRouter.post("/create/ingredient", response_description="Add a new ingredient to the database")
# async def create_ingredient(ingred: product.Ingredient):
#   if(notExistant := config.db[productCollect].find_one({"name": ingred.product_name, "id_number": ingred.product_id})) is not None:
#     ingredient = jsonable_encoder(ingred)
#     new_ingredient = config.db[ingredientCollect].insert_one(ingredient)
#     if(ingredientCheck := config.db[ingredientCollect].find_one({"_id":new_ingredient.inserted_id})) is not None:
#       return JSONResponse(status_code=status.HTTP_201_CREATED, content = parse_json(ingredientCheck))
#     else:
#       raise HTTPException(status_code=404, detail="New ingredient was not added to the database.")
#   else:
#     raise HTTPException(status_code=404, detail="Product could not be found in the database.")

# @apiRouter.get("/get/ingredients/by_product")
# async def get_ingredients(product_id:str):
#   if( productCheck := config.db[productCollect].find_many({"product_id":product_id})) is not None:
#     return productCheck.ingredient
#   else:
#     raise HTTPException(status_code=400, detail="A product with that id number could not be found")


#search by name
@apiRouter.get("/search/productName", response_model=List[product.Product])
async def get_productByName(name:str):
  if(productInfo := list(config.db[productCollect].find({"name":name}))) is not None:
    return productInfo
  else:
    raise HTTPException(status_code=400, detail="A product with that name could not be found")

#search by contains ingredient
@apiRouter.get("/search/ingredients/contains", response_model=List[product.Product])
async def get_productByIngredients(ingredientList: Optional[List[str]] = Query(None)):
  if(productInfo := list(config.db[productCollect].find({"ingredients":{"$in":ingredientList}}))) is not None:
    return productInfo
  else:
    raise HTTPException(status_code=400, detail="A product with those ingredients could not be found")

#search by does not contains ingredient
@apiRouter.get("/search/ingredients/notContains", response_model=List[product.Product])
async def get_productByIngredients(ingredientList: Optional[List[str]] = Query(None)):
  if(productInfo := list(config.db[productCollect].find({"ingredients":{"$nin":ingredientList}}))) is not None:
    return productInfo
  else:
    raise HTTPException(status_code=400, detail="A product without those ingredients could not be found")

#search by contains allergens
@apiRouter.get("/search/allergens/contains", response_model=List[Product])
async def get_productByIngredients(allergenList: Optional[List[str]] = Query(None)):
  if(productInfo := list(config.db[productCollect].find({"allergens":{"$in":allergenList}}))) is not None:
    return productInfo
  else:
    raise HTTPException(status_code=400, detail="A product with those allergens could not be found")

#search by does not contains allergens
@apiRouter.get("/search/allergens/notContains",response_model=List[Product])
async def get_productByIngredients(allergenList: Optional[List[str]] = Query(None)):
  if(productInfo := list(config.db[productCollect].find({"allergens":{"$nin":allergenList}}))) is not None:
    return productInfo
  else:
    raise HTTPException(status_code=400, detail="A product without those allergens could not be found")

@apiRouter.get("/search/allergens_ingredients/notContains")
async def get_productByIngredients(allergenList: Optional[List[Pattern]] = Query(r"^[.]$"), ingredientList: Optional[List[Pattern]] = Query(r"^[.]$")):
  if(productInfo := config.db[productCollect].find({"ingredients":{"$nin":ingredientList}, "allergens":{"$nin":allergenList}})) is not None:
    return parse_json(productInfo)
  else:
    raise HTTPException(status_code=400, detail="A product without those ingredients and allergens could not be found")


@apiRouter.get("/search/allergens_ingredients/contains")
async def get_productByIngredients(allergenList: Optional[List[Pattern]] = Query(r"^.*$"), ingredientList: Optional[List[Pattern]] = Query(r"^.*$")):
  if(productInfo := list(config.db[productCollect].find({"ingredients":{"$in":ingredientList}, "allergens":{"$in":allergenList}}))) is not None:
    return parse_json(productInfo)
  else:
    raise HTTPException(status_code=400, detail="A product with those ingredients and allergens could not be found")



@apiRouter.get("/search/productManufacturer", response_model=List[product.Product])
async def get_productByName(name:str):
  if(productInfo := list(config.db[productCollect].find({"manufacturer_name":name}))) is not None:
    return productInfo
  else:
    raise HTTPException(status_code=400, detail="A product made by that manufacturer could not be found")