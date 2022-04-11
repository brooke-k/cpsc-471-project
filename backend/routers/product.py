from fastapi import FastAPI, HTTPException, status, Body, Form, APIRouter
from typing import Optional
import config, uvicorn, os, model
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import json
from bson import json_util
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from models import product
from models.product import ProductBase, Product, IngredientsList
import uuid

def parse_json(data):
    return json.loads(json_util.dumps(data))


apiRouter = APIRouter(prefix="/product", tags=["product"])

productCollect = "product"
alertCollect= "product-alert"
allergenCollect = "product-allergen"
manuProdCollect = "product-manufacturer"
manufactCollect = "user-manufacturer"
ingredientCollect = "product-ingredient"


@apiRouter.post("/create", response_description="Add a new product to the database")
async def create_product(prod: product.ProductBase):
  if (notExistant := config.db[manufactCollect].find_one({"name":prod.manufacturer_name})) is not None:
    fullProduct = Product(name=prod.name, manufacturer_name=prod.manufacturer_name, id_number=str(uuid.uuid4()))
    productPost = jsonable_encoder(fullProduct)
    new_product = config.db[productCollect].insert_one(productPost)
    if (productCheck := config.db[productCollect].find_one({"_id":new_product.inserted_id})) is not None:
      return JSONResponse(status_code=status.HTTP_201_CREATED, content = parse_json(productCheck))
    else:
      raise HTTPException(status_code=404, detail="New product was not added to the database.")
  else:
    raise HTTPException(status_code=404, detail="Product manufacturer could not be found in the database.")


@apiRouter.post("/create/ingredient", response_description="Add a new ingredient to the database")
async def create_ingredient(ingred: product.Ingredient):
  if(notExistant := config.db[productCollect].find_one({"name": ingred.product_name, "id_number": ingred.product_id})) is not None:
    ingredient = jsonable_encoder(ingred)
    new_ingredient = config.db[ingredientCollect].insert_one(ingredient)
    if(ingredientCheck := config.db[ingredientCollect].find_one({"_id":new_ingredient.inserted_id})) is not None:
      return JSONResponse(status_code=status.HTTP_201_CREATED, content = parse_json(ingredientCheck))
    else:
      raise HTTPException(status_code=404, detail="New ingredient was not added to the database.")
  else:
    raise HTTPException(status_code=404, detail="Product could not be found in the database.")

@apiRouter.get("/get/ingredients/by_product", response_model=IngredientsList)
async def get_ingredients(product_id:str):
  if( productCheck := config.db[productCollect].find_many({"product_id":product_id})) is not None:
    return productCheck
  else:
    raise HTTPException(status_code=400, detail="A product with that id number could not be found")
