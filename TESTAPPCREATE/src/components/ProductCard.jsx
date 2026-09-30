import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function ProductCard({ product }) {
  const { addToCart, addToWishlist } = useApp()
  return (
    <div className="bg-white dark:bg-slate-800 dark:text-white rounded shadow p-3 flex flex-col">
      <Link to={`/products/${product.id}`}>
        {/* BUG 14: no onError fallback / alt text / lazy loading; broken URLs show empty boxes */}
        <img src={product.image} className="w-full h-48 object-cover rounded" />
        <h3 className="mt-2 font-semibold">{product.name}</h3>
      </Link>
      <p className="text-sm text-gray-500">{product.category} · ★ {product.rating}</p>
      <p className="font-bold">₹{product.price}</p>
      <div className="mt-auto flex gap-2 pt-2">
        <button onClick={() => addToCart(product)} className="flex-1 bg-yellow-400 rounded py-1">Add to Cart</button>
        <button onClick={() => addToWishlist(product)} className="border rounded px-2">♡</button>
      </div>
    </div>
  )
}
