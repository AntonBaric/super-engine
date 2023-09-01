import { useEffect, useState } from 'react'
import AddItem from '../components/AddItem'
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



    const deleteItem = async (indexToDelete: number) => {
        try {
            await fetch(`http://localhost:8000/delete-item/${indexToDelete}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => console.log(data))
        } catch (error) {
            console.log(error)
        }
        const updatedItems = [...items];
        updatedItems.splice(indexToDelete, 1);
        setItems(updatedItems);
    };

    useEffect(() => {
        getAllItems()
    }, [])

    return (
        <div>
            <AddItem />
            <ItemList items={items} deleteItem={deleteItem} />
        </div>
    )
}

export default Home