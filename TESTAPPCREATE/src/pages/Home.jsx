import { Link } from 'react-router-dom'
import products, { categories } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded p-10 mb-6">
        <h1 className="text-4xl font-bold">Big Sale is Live</h1>
        <p className="mt-2">Up to 60% off on top brands</p>
        <Link to="/products" className="inline-block mt-4 bg-yellow-400 text-black px-4 py-2 rounded">Shop now</Link>
      </section>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((c) => (
          <Link key={c} to={`/products?category=${encodeURIComponent(c)}`} className="bg-white px-3 py-1 rounded shadow">{c}</Link>
        ))}
      </div>
      <h2 className="text-xl font-semibold mb-3 dark:text-white">Featured</h2>
      {/* BUG 9 (cont.): fixed 4 columns regardless of screen width */}
      <div className="grid grid-cols-4 gap-4">
        {products.slice(0, 8).map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
