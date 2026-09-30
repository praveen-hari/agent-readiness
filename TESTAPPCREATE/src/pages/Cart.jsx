import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Cart() {
  const { cart, cartTotal, removeFromCart, updateQty } = useApp()
  if (cart.length === 0) return <p className="dark:text-white">Your cart is empty. <Link to="/products" className="underline">Shop</Link></p>
  return (
    <div className="bg-white dark:bg-slate-800 dark:text-white rounded p-4">
      <h1 className="text-xl font-bold mb-3">Shopping Cart</h1>
      {cart.map((i) => (
        <div key={i.id} className="flex items-center gap-4 border-b py-2">
          <img src={i.image} className="w-16 h-16 object-cover rounded" />
          <div className="flex-1">{i.name}<div className="text-sm">₹{i.price}</div></div>
          <input type="number" value={i.qty} onChange={(e) => updateQty(i.id, Number(e.target.value))}
            className="w-16 border rounded p-1 text-black" />
          <button onClick={() => removeFromCart(i.id)} className="text-red-600">Remove</button>
        </div>
      ))}
      <p className="text-right text-xl font-bold mt-4">Total: ₹{cartTotal}</p>
      <div className="text-right mt-3"><Link to="/checkout" className="bg-yellow-400 px-4 py-2 rounded text-black">Checkout</Link></div>
    </div>
  )
}
