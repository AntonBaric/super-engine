import './App.css'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import ItemPage from './pages/ItemPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/item/:id" element={<ItemPage />} />
      </Routes>
    </>
  )
}

export default App
