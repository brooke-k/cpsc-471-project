from fastapi import FastAPI, HTTPException, status, Body
import config, uvicorn, os, model
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import json
from bson import json_util


testApp = FastAPI()

def parse_json(data):
    return json.loads(json_util.dumps(data))


@testApp.get("/")
def index():
    return {"message": "Hewwo World"}


@testApp.get("/power/", response_description="GAIN POWER", response_model=model.testModel)
async def get_power (powerSource: str):
    if (power := config.db["testcollect"].find_one({"powerSource": powerSource})) is not None:
        return power
    else:
        raise HTTPException(status_code=404, detail="Power source not found")


@testApp.post("/powermail/", response_description="SEND THE POWER", response_model=model.testModel)
async def send_power (powerSource: model.testModel = Body(...)):
    powerSource = jsonable_encoder(powerSource)
    print(powerSource)
    new_powerSource = config.db["testcollect"].insert_one(powerSource)
    if (power := config.db["testcollect"].find_one({"_id": new_powerSource.inserted_id})) is not None:
        return JSONResponse(status_code=status.HTTP_201_CREATED, content = parse_json(power))
    else:
        raise HTTPException(status_code=404, detail="Power source not added")


if __name__ == "__main__":
    uvicorn.run(testApp, host="0.0.0.0", port=int(os.getenv("MONGODB_PORT")))