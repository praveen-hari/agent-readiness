import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import products from '../data/products'
import { useApp } from '../context/AppContext'

export default function ProductDetails() {
  const { id } = useParams()
  const { addToCart } = useApp()
  const [viewers, setViewers] = useState(0)

  // BUG 7: memory leak - interval is never cleared on unmount
  useEffect(() => {
    setInterval(() => setViewers((v) => v + Math.floor(Math.random() * 3)), 1000)
  }, [])

  const product = products.find((p) => p.id === Number(id))

  // BUG 6: crashes on invalid product id (product is undefined)
  return (
    <div className="bg-white dark:bg-slate-800 dark:text-white rounded p-6 grid md:grid-cols-2 gap-6">
      <img src={product.image} className="w-full rounded" />
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-500">{product.category} · ★ {product.rating}</p>
        <p className="text-3xl font-bold my-3">₹{product.price}</p>
        <p>{product.description}</p>
        <p className="text-sm mt-2">{viewers} people viewing now</p>
        <p className="text-sm">{product.stock} in stock</p>
        <button onClick={() => addToCart(product)} className="mt-4 bg-yellow-400 px-4 py-2 rounded">Add to Cart</button>
      </div>
    </div>
  )
}
