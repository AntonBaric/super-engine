import { useEffect, useState } from "react"
import { Item } from "../assets/types"

function ItemList() {
    const [items, setItems] = useState<Item[]>([])

    const getAllItems = async () => {
        try {
            await fetch("http://localhost:8000/items")
                .then(res => res.json())
                .then(data => setItems(data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllItems()
    }, [])
    return (
        <table className="item-list-table">
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Hobby</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <tr key={index}>
                        <td>
                            <img src={item.image} className="avatar" />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.hobby}</td>
                    </tr>
                ))}
            </tbody>
        </table>)
}

export default ItemList