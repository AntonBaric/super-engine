import json
import os
from typing import List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


items_path = os.getcwd() + "/items.json"


@app.get("/")
def read_root():
    return {"Hello": "World"}


"""
@app.get("/items/{item_id}")
def read_item_by_id(item_id: int):
    with open("items.json", "r") as json_file:
        items = json.load(json_file)
        item = next((item for item in items if item["item_id"] == item_id), None)
        if item:
            return item
        else:
            return {"error": "Item not found"}
"""


@app.get("/items", response_model=List[dict])
def read_all_items():
    with open(items_path, "r", encoding="utf-8") as json_file:
        data = json.load(json_file)
        items = data.get("items", [])
        return items
