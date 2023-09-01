import { useEffect, useState } from 'react'
import ItemList from '../components/ItemList'
import { Item } from '../assets/types'

function Home() {
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

    const addItem = async (newItem: Item) => {
        try {
            const response = await fetch("http://localhost:8000/add-item", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newItem),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setItems([...items, newItem]);
            } else {
                // Handle non-successful response, e.g., show an error message
                console.error("Failed to add item.");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const editItem = async (item: Item, index: number) => {
        try {
            const response = await fetch(`http://localhost:8000/update-item/${index}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                const updatedItems = [...items];
                updatedItems[index] = item;
                setItems(updatedItems);
            } else {
                // Handle non-successful response, e.g., show an error message
                console.error("Failed to add item.");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const deleteItem = async (indexToDelete: number) => {
        try {
            const response = await fetch(`http://localhost:8000/delete-item/${indexToDelete}`, {
                method: "DELETE"
            })

            if (response.ok) {
                const data = await response.json()
                console.log(data)
                const updatedItems = [...items];
                updatedItems.splice(indexToDelete, 1);
                setItems(updatedItems);
            }
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        getAllItems()
    }, [])

    return (
        <div>
            <ItemList items={items} addItem={addItem} editItem={editItem} deleteItem={deleteItem} />
        </div>
    )
}

export default Home