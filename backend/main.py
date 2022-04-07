from fastapi import FastAPI, HTTPException
import config, uvicorn, os, model


testApp = FastAPI()

@testApp.get("/")
def index():
    return {"message": "Hewwo World"}


@testApp.get("/power/", response_description="GAIN POWER", response_model=model.testModel)
async def get_power (powerSource: str):
    if (power := config.db["testcollect"].find_one({"powerSource": powerSource})) is not None:
        return power
    else:
        raise HTTPException(status_code=404, detail="Power source not found")




if __name__ == "__main__":
    uvicorn.run(testApp, host="0.0.0.0", port=int(os.getenv("MONGODB_PORT")))