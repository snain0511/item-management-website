import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import AddItems from './components/AddItems'
import ViewItems from './components/ViewItems'
import './App.css'

function Navigation() {
  const location = useLocation()
  
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">Item Management System</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/add-items">
              <Button 
                variant={location.pathname === '/add-items' ? 'default' : 'outline'}
                className="px-4 py-2"
              >
                Add Items
              </Button>
            </Link>
            <Link to="/view-items">
              <Button 
                variant={location.pathname === '/view-items' ? 'default' : 'outline'}
                className="px-4 py-2"
              >
                View Items
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const savedItems = localStorage.getItem('items')
    if (savedItems) {
      setItems(JSON.parse(savedItems))
    }
  }, [])

  const addItem = (newItem) => {
    const updatedItems = [...items, { ...newItem, id: Date.now() }]
    setItems(updatedItems)
    localStorage.setItem('items', JSON.stringify(updatedItems))
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<AddItems onAddItem={addItem} />} />
            <Route path="/add-items" element={<AddItems onAddItem={addItem} />} />
            <Route path="/view-items" element={<ViewItems items={items} />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

