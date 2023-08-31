import base64
import json
import os
from typing import List

from fastapi import Body, FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from app.schemas import Item

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


items_path = os.getcwd() + "/items.json"

def load_items():
    with open(items_path, "r", encoding="utf-8") as json_file:
        data = json.load(json_file)
        items = data.get("items", [])
        return items

def save_item(item):
    data = {"items": item}
    with open(items_path, "w", encoding="utf-8") as json_file:
        json.dump(data, json_file, indent=2)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items", response_model=List[dict])
def read_all_items():
    items = load_items()
    return items


@app.get("/items/{item_index}", response_model=dict)
def read_item_by_index(item_index: int):
    with open(items_path, "r", encoding="utf-8") as json_file:
        data = json.load(json_file)
        items = data.get("items", [])
        if 0 <= item_index < len(items):
            return items[item_index]
        else:
            raise HTTPException(status_code=404, detail="Item not found")


@app.post("/add-item", response_model=Item)
def add_item(item: Item):
    items = load_items()
    items.append(item.dict())
    save_item(items)

    return item

@app.delete("/delete-item/{item_index}")
def delete_item_by_index(item_index: int):
    items = load_items()

    if item_index < 0 or item_index >= len(items):
        raise HTTPException(status_code=400, detail="Invalid item index")
    
    deleted_item = items.pop(item_index)
    save_item(items)
    
    return {"message": "Item deleted", "deleted_item": deleted_item}