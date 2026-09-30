import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Checkout() {
  const { cartTotal, cart, setCart } = useApp()
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', card: '' })
  const [done, setDone] = useState(false)
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = (e) => {
    e.preventDefault()
    // BUG 13: no validation at all - empty/invalid email, phone and card are accepted
    setCart([])
    setDone(true)
  }

  if (done) return <p className="text-green-600 text-xl">Order placed successfully!</p>
  return (
    <form onSubmit={submit} className="bg-white rounded p-4 max-w-lg mx-auto space-y-3">
      <h1 className="text-xl font-bold">Checkout ({cart.length} items)</h1>
      {['name', 'email', 'phone', 'address', 'card'].map((f) => (
        <input key={f} name={f} value={form[f]} onChange={change} placeholder={f} className="w-full border rounded p-2" />
      ))}
      <p className="font-bold">Payable: ₹{cartTotal}</p>
      <button className="bg-yellow-400 px-4 py-2 rounded w-full">Place Order</button>
    </form>
  )
}
