import { Item } from "../assets/types"
import { Link } from "react-router-dom"

function ItemList(props: { items: Item[] }) {


    const handleEdit = async (index: number) => {
        console.log("EDITING", index)
    }

    const deleteItem = async (index: number) => {
        console.log(index, "DELETED")
    }


    return (
        <table className="item-list-table">
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Hobby</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {props.items.map((item, index) => (
                    <tr key={index}>
                        <td>
                            <Link to={`/item/${index}`}><img src={item.image} className="avatar" /></Link>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.hobby}</td>
                        <td>
                            <button disabled className="edit-button" onClick={() => handleEdit(index)}>Edit</button>
                            <button disabled className="delete-button" onClick={() => deleteItem(index)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default ItemList