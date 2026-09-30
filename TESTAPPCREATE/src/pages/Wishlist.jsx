import { useApp } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useApp()
  if (!wishlist.length) return <p className="dark:text-white">Wishlist is empty.</p>
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {wishlist.map((p, idx) => (
        <div key={idx}>
          <ProductCard product={p} />
          <button onClick={() => removeFromWishlist(p.id)} className="text-red-600 text-sm">Remove</button>
        </div>
      ))}
    </div>
  )
}
