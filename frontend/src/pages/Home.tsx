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

    useEffect(() => {
        getAllItems()
    }, [])

    return (
        <div>
            <AddItem />
            <ItemList items={items} />
        </div>
    )
}

export default Home