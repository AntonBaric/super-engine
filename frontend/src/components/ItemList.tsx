import { ChangeEvent, useState } from "react";
import { Item, emptyItem } from "../assets/types"
import { Link } from "react-router-dom"

function ItemList(props: { items: Item[], addItem: (newItem: Item) => void, deleteItem: (indexToDelete: number) => void; }) {
    const [addingMode, setAddingMode] = useState(false)
    const [newItem, setNewItem] = useState<Item>(emptyItem);

    const handleEdit = async (index: number) => {
        console.log("EDITING", index)
    }

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target;
        const selectedFile = fileInput?.files?.[0];

        if (!selectedFile) {
            return;
        }
        const reader = new FileReader();

        reader.onload = (event) => {
            // Convert the file to base64 and set it in newItem
            setNewItem({ ...newItem, image: event.target?.result as string });
        };

        if (selectedFile) {
            reader.readAsDataURL(selectedFile); // Read the file as a data URL (base64)
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const toggleAddingMode = () => {
        setAddingMode(!addingMode);
    };

    const saveItem = () => {
        props.addItem(newItem);
        setNewItem(emptyItem);
        if (addingMode) {
            setAddingMode(false);
        }
    };

    return (
        <>
            <button disabled={addingMode} onClick={toggleAddingMode}>Add New Item</button>
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
                                <button disabled={addingMode} className="delete-button" onClick={() => props.deleteItem(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    {addingMode ?
                        <tr>
                            <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e)} />
                            <td>
                                <input type="text" name="name" value={newItem.name} onChange={handleInputChange} />
                            </td>
                            <td>
                                <input type="number" name="age" value={newItem.age} onChange={handleInputChange} />
                            </td>
                            <td>
                                <input type="text" name="hobby" value={newItem.hobby} onChange={handleInputChange} />
                            </td>
                            <td>
                                <button onClick={saveItem}>Save</button>
                                <button onClick={() => setAddingMode(false)}>Cancel</button>
                            </td>
                        </tr>
                        : <></>}
                </tbody>
            </table>
        </>
    )
}

export default ItemList