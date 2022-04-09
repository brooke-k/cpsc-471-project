from fastapi import FastAPI, HTTPException, status, Body, Form
from typing import Optional
import config, uvicorn, os, model
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import json
from bson import json_util
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from routers import user

ThisApp = FastAPI()
ThisApp.include_router(user.apiRouter)

def parse_json(data):
    return json.loads(json_util.dumps(data))

origins = ["http://localhost:8000"]
ThisApp.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods="*",
    allow_headers="*",
)


@ThisApp.get("/")
async def index():
    return {"message": "Hewwo World"}


@ThisApp.get("/power/obtain", response_description="GAIN POWER", response_model=model.testModel)
async def get_power (powerSource: str):
    if (power := config.db["testcollect"].find_one({"powerSource": powerSource})) is not None:
        return power
    else:
        raise HTTPException(status_code=404, detail="Power source not found")


@ThisApp.post("/power/mail")
async def send_power (testMod: model.testModel):

    powerSourcePost = jsonable_encoder(testMod)
    new_powerSource = config.db["testcollect"].insert_one(powerSourcePost)
    if (power := config.db["testcollect"].find_one({"_id": new_powerSource.inserted_id})) is not None:
        return JSONResponse(status_code=status.HTTP_201_CREATED, content = parse_json(power))
    else:
        raise HTTPException(status_code=404, detail="Power source not added")



@ThisApp.delete("/power/banish", response_description="BEGONE THOT")
async def banish_power (powerSource: str, deleteOption: Optional[str] = None):

    if deleteOption == 'one' or not deleteOption:
        delete_result = config.db["testcollect"].delete_one({"powerSource":powerSource})
        if delete_result.deleted_count == 1:
             return JSONResponse(status_code=status.HTTP_200_OK)
        else:
            raise HTTPException(status_code=404, detail="Power source not banished")
    elif deleteOption == 'many':
        delete_result = config.db["testcollect"].delete_many({"powerSource":powerSource})
        if delete_result.deleted_count >= 1:
             return JSONResponse(status_code=status.HTTP_200_OK)
        else:
            raise HTTPException(status_code=404, detail="Power sources not banished")
    elif deleteOption == 'BEGONE, EVERY LAST ONE OF YE\'S':
        delete_result = config.db["testcollect"].delete_many({})
        if delete_result.deleted_count >= 1:
             return JSONResponse(status_code=status.HTTP_200_OK)
        else:
            raise HTTPException(status_code=404, detail="Power sources not banished")
    else:
        raise HTTPException(status_code=400, detail="Incorrect delete option. Should be be 'one', 'many', or empty.")


@ThisApp.put("/power/newerpower", response_description="Update the POWER", response_model=model.testModel)
async def update_thy_power (powerSourceString: str, updatedPowerString: str, updateOption: Optional[str] = None):
    if updateOption == 'one' or not updateOption:
        if (power := config.db["testcollect"].find_one({"powerSource": powerSourceString})) is not None:
            update_result = config.db['testcollect'].update_one({"powerSource":powerSourceString}, {"$set": {"powerSource": updatedPowerString}})
            if update_result.modified_count == 1:
                return JSONResponse(status_code=status.HTTP_200_OK)
        else:
            raise HTTPException(status_code=404, detail="Power source not found")
    elif updateOption == 'many':
        if (power := config.db["testcollect"].find_one({"powerSource": powerSourceString})) is not None:
            update_result = config.db['testcollect'].update_many({"powerSource":powerSourceString}, {"$set": {"powerSource": updatedPowerString}})
        if update_result.modified_count >= 1:
            return JSONResponse(status_code=status.HTTP_200_OK)
        else:
            raise HTTPException(status_code=404, detail="Power source not found")
    elif updateOption == 'all':
        update_result = config.db['testcollect'].update_many({}, {"$set": {"powerSource": updatedPowerString}})
        if update_result.modified_count >= 1:
           return JSONResponse(status_code=status.HTTP_200_OK)
        else:
            raise HTTPException(status_code=404, detail="Power source not found")
    else:
        raise HTTPException(status_code=400, detail="Incorrect update option. Should be be 'one', 'many', 'all', or empty.")





if __name__ == "__main__":
    uvicorn.run(ThisApp, host="0.0.0.0", port=int(os.getenv("MONGODB_PORT")))