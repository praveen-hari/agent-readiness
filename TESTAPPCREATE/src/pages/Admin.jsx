import products from '../data/products'

export default function Admin() {
  const revenue = products.reduce((s, p) => s + p.price, 0)
  const lowStock = products.filter((p) => p.stock < 5)
  return (
    <div className="space-y-4 dark:text-white">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white text-black rounded p-4">Products: {products.length}</div>
        <div className="bg-white text-black rounded p-4">Inventory value: ₹{revenue}</div>
        <div className="bg-white text-black rounded p-4">Low stock: {lowStock.length}</div>
      </div>
      <table className="w-full bg-white text-black rounded">
        <thead><tr><th className="text-left p-2">Name</th><th>Category</th><th>Price</th><th>Stock</th></tr></thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t"><td className="p-2">{p.name}</td><td>{p.category}</td><td>₹{p.price}</td><td>{p.stock}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
