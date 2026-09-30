import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const { cartCount, wishlist, dark, toggleDark } = useApp()
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    navigate(`/products?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="bg-slate-900 text-white">
      {/* BUG 9: fixed min-width on the navbar causes horizontal scroll on mobile */}
      <div className="min-w-[900px] flex items-center gap-4 px-6 py-3">
        <Link to="/" className="text-2xl font-bold text-yellow-400">ShopEasy</Link>
        <form onSubmit={submit} className="flex-1 flex">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products"
            className="flex-1 px-3 py-2 rounded-l text-black" />
          <button className="bg-yellow-400 text-black px-4 rounded-r">Search</button>
        </form>
        <Link to="/products">Products</Link>
        <Link to="/wishlist">Wishlist ({wishlist.length})</Link>
        <Link to="/cart">Cart ({cartCount})</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/admin">Admin</Link>
        <button onClick={toggleDark} className="border px-2 py-1 rounded">{dark ? 'Light' : 'Dark'}</button>
      </div>
    </header>
  )
}
