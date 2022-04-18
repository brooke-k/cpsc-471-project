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

@apiRouter.put("/update", response_description="Update product information")
async def update_product(product_id: str, name: Optional[str] = None, manufactName: Optional[str] = None, ingredients: Optional[List[str]] = Query([]), allergens: Optional[List[str]] = Query([])):
  if(productCheck := config.db[productCollect].find_one({"id_number": product_id})) is not None:
    if name is not None:
      update_result = config.db[productCollect].update_one({"id_number": product_id}, {"$set":{"name": name}})

    if  manufactName is not None:
      update_result = config.db[productCollect].update_one({"id_number": product_id}, {"$set":{"manufacturer_name": manufactName}})

    if ingredients != []:
      update_result = config.db[productCollect].update_one({"id_number": product_id}, {"$set":{"ingredients": ingredients}})

    if allergens != []:
      update_result = config.db[productCollect].update_one({"id_number": product_id}, {"$set":{"allergens": allergens}})

    productCheck = config.db[productCollect].find_one({"id_number": product_id})
    return JSONResponse(status_code=status.HTTP_200_OK, content = parse_json(productCheck))
  else:
    raise HTTPException(status_code=400, detail="Product could not be updated.")

@apiRouter.delete("/remove", response_description="Remove a product from the database")
async def remove_product(product_id: str):
  if(productCheck := config.db[productCollect].find_one({"id_number": product_id})) is not None:
    deleted_result = config.db[productCollect].delete_one({"id_number":product_id})
    if deleted_result.deleted_count == 1:
      return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)
    else:
      raise HTTPException(status_code=400, detail="Product could not be deleted.")




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
@apiRouter.get("/search/productName")
async def get_productByName(name:Optional[Pattern] = r"^.*$"):
  if(productInfo := list(config.db[productCollect].find({"name":name}))) is not None:
    return parse_json(productInfo)
  else:
    raise HTTPException(status_code=400, detail="A product with that name could not be found")

@apiRouter.get("/search/bymanufacturer")
async def get_product_namemanufacturer(name: Optional[str] = None, manufacturer: Optional[str] = None):
  if name is not None and manufacturer is not None:
    if (productInfo := list(config.db[productCollect].find({"$and":[{"name":name}, {"manufacturer_name":manufacturer}]}))) is not None:
      return parse_json(productInfo)
    else:
      raise HTTPException(status_code=400, detail="A product with that manufacturer could not be found")
  elif manufacturer is not None:
    if (productInfo := list(config.db[productCollect].find({"manufacturer_name":manufacturer}))) is not None:
      return parse_json(productInfo)
    else:
      raise HTTPException(status_code=400, detail="A product with that name and manufacturer could not be found")
  elif name is not None:
    if (productInfo := list(config.db[productCollect].find({"name":name}))) is not None:
      return parse_json(productInfo)
    else:
      raise HTTPException(status_code=400, detail="A product with that name could not be found")
  else:
    if (productInfo := list(config.db[productCollect].find({}))) is not None:
      return parse_json(productInfo)
    else:
      raise HTTPException(status_code=402, detail="No products could be found.")

@apiRouter.get("/search")
async def get_product_namemanufacturer(name: Optional[Pattern] = r"^.*$", manufacturer: Optional[Pattern] = r"^.*$", allergenContains: Optional[List[Pattern]] = Query([r"^.*$"]), ingredientContains: Optional[List[Pattern]] = Query([r"^.*$"]), allergenNotContains: Optional[List[Pattern]] = Query([r"^$"]), ingredientNotContains: Optional[List[Pattern]] = Query([r"^$"]), product_id: Optional[Pattern] = r"^.*$"):

  if (productInfo := list(config.db[productCollect].find({"$and":[{"name":name}, {"manufacturer_name":manufacturer}, {"ingredients":{"$in":ingredientContains}}, {"ingredients":{"$nin":ingredientNotContains}}, {"allergens":{"$in":allergenContains}}, {"allergens":{"$nin":allergenNotContains}}, {"id_number":product_id}]}))) is not None:
    return parse_json(productInfo)
  else:
    raise HTTPException(status_code=400, detail="A product with that manufacturer could not be found")


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
async def get_productByIngredients(allergenList: Optional[List[Pattern]] = Query([r"^.*$"]), ingredientList: Optional[List[Pattern]] = Query([r"^.*$"])):
  if(productInfo := list(config.db[productCollect].find({"$and":[{"ingredients":{"$in":ingredientList}}, {"allergens":{"$in":allergenList}}]}))) is not None:
    return parse_json(productInfo)
  else:
    raise HTTPException(status_code=400, detail="A product with those ingredients and allergens could not be found")



@apiRouter.get("/search/byManufacturerName", response_description="Get products by manufacturer name")
async def get_productByName(name:str):
  if(productInfo := list(config.db[productCollect].find({"manufacturer_name":name}))) is not None:
    return parse_json(productInfo)
  else:
    raise HTTPException(status_code=400, detail="A product made by that manufacturer could not be found")