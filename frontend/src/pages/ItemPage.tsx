import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Item, emptyItem } from "../assets/types";

function ItemPage() {
    const { id } = useParams<{ id: string }>();
    const [item, setItem] = useState<Item>(emptyItem)

    const getItemByIndex = async () => {
        try {
            await fetch(`http://localhost:8000/items/${id}`)
                .then(res => res.json())
                .then(data => setItem(data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getItemByIndex()
    }, [])

    return (
        <div className="ItemPage">
            <h1>Item Details</h1>
            <div className="item-info">
                <div className="item-image">
                    <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                    <p>Name: {item.name}</p>
                    <p>Age: {item.age}</p>
                    <p>Hobby: {item.hobby}</p>
                    {/* Render more item details */}
                </div>
            </div>
        </div>
    );
}

export default ItemPage