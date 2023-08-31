from pydantic import BaseModel


class Item(BaseModel):
    name: str
    age: int
    hobby: str
    image: str
