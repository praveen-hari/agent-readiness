import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import products, { categories } from '../data/products'
import ProductCard from '../components/ProductCard'

const PER_PAGE = 8

export default function ProductList() {
  const [params] = useSearchParams()
  const q = params.get('q') || ''
  const [category, setCategory] = useState(params.get('category') || '')
  const [sort, setSort] = useState('')
  const [page, setPage] = useState(1)
  const [list, setList] = useState([])

  useEffect(() => {
    // simulate fetch; BUG 8: no loading state shown while data loads
    const t = setTimeout(() => setList(products), 800)
    return () => clearTimeout(t)
  }, [])

  // BUG 3: case-sensitive search
  let filtered = list.filter((p) => p.name.includes(q))
  if (category) filtered = filtered.filter((p) => p.category === category)

  // BUG 11: wrong sorting - price compared as strings, "high to low" is ascending, rating ascending
  if (sort === 'low') filtered = filtered.sort((a, b) => String(a.price).localeCompare(String(b.price)))
  if (sort === 'high') filtered = filtered.sort((a, b) => String(a.price).localeCompare(String(b.price)))
  if (sort === 'rating') filtered = filtered.sort((a, b) => a.rating - b.rating)

  // BUG 4: pagination - slice is off by one and page count uses floor (last partial page unreachable)
  const totalPages = Math.floor(filtered.length / PER_PAGE)
  const visible = filtered.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-4">
        <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1) }} className="p-2 rounded">
          <option value="">All categories</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="p-2 rounded">
          <option value="">Sort</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="rating">Rating</option>
        </select>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {visible.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
      {visible.length === 0 && <p className="dark:text-white">No products found.</p>}
      <div className="flex gap-2 mt-6 justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-indigo-600 text-white' : 'bg-white'}`}>{i + 1}</button>
        ))}
      </div>
    </div>
  )
}
