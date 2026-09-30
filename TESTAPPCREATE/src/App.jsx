import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Profile from './pages/Profile'
import Admin from './pages/Admin'
import Wishlist from './pages/Wishlist'
import { useApp } from './context/AppContext'

export default function App() {
  const { dark } = useApp()
  return (
    <div className={`min-h-screen ${dark ? 'bg-slate-900' : 'bg-gray-100'}`}>
      <Navbar />
      <main className="p-4 max-w-7xl mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/profile" element={<Profile />} />
          {/* BUG 15: admin route has no role guard - any user can open the dashboard */}
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </main>
    </div>
  )
}
