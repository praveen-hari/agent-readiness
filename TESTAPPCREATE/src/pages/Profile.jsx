import { useState } from 'react'
import { useApp } from '../context/AppContext'

export default function Profile() {
  const { user, setUser } = useApp()
  const [form, setForm] = useState(user)
  const [saved, setSaved] = useState(false)
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const save = (e) => { e.preventDefault(); setUser(form); setSaved(true) }
  return (
    <form onSubmit={save} className="bg-white rounded p-4 max-w-md mx-auto space-y-3">
      <h1 className="text-xl font-bold">My Profile</h1>
      {['name', 'email', 'phone'].map((f) => (
        <input key={f} name={f} value={form[f]} onChange={change} className="w-full border rounded p-2" />
      ))}
      <button className="bg-indigo-600 text-white px-4 py-2 rounded">Save</button>
      {saved && <p className="text-green-600">Profile updated</p>}
    </form>
  )
}
