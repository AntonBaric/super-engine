import './App.css'
import Home from './pages/Home'
import { Link, Route, Routes } from 'react-router-dom'
import catsLogo from './assets/cats.svg'
import ItemPage from './pages/ItemPage'

function App() {

  return (
    <>
      <div style={{ position: 'absolute', top: '0', left: '0', padding: '10px' }}>
        <Link to={"/"}>
          <img src={catsLogo} className="logo react" alt="React logo" />
        </Link>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/item/:id" element={<ItemPage />} />
      </Routes>
    </>
  )
}

export default App
