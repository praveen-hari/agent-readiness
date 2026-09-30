import { createContext, useContext, useEffect, useState } from 'react'

const AppContext = createContext(null)
export const useApp = () => useContext(AppContext)

export function AppProvider({ children }) {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [dark, setDark] = useState(false)
  const [user, setUser] = useState({ name: 'Jane Doe', email: 'jane@example.com', phone: '9876543210', role: 'user' })

  const addToCart = (product) => {
    const existing = cart.find((i) => i.id === product.id)
    if (existing) {
      // BUG 12: state mutation - mutates the existing item object in place
      existing.qty += 1
      setCart([...cart])
    } else {
      setCart([...cart, { ...product, qty: 1 }])
    }
  }

  const removeFromCart = (id) => setCart(cart.filter((i) => i.id !== id))

  const updateQty = (id, qty) => setCart(cart.map((i) => (i.id === id ? { ...i, qty } : i)))

  // BUG 1: cart count counts distinct lines, not total quantity
  const cartCount = cart.length

  // BUG 5: total ignores quantity
  const cartTotal = cart.reduce((sum, i) => sum + i.price, 0)

  // BUG 2: no duplicate check - same product can be added to the wishlist repeatedly
  const addToWishlist = (product) => setWishlist([...wishlist, product])
  const removeFromWishlist = (id) => setWishlist(wishlist.filter((p) => p.id !== id))

  // BUG 10: dark mode state toggles, but the 'dark' class is never applied to <html>
  const toggleDark = () => setDark(!dark)

  useEffect(() => {
    // intentionally missing document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <AppContext.Provider
      value={{ cart, cartCount, cartTotal, addToCart, removeFromCart, updateQty, setCart,
        wishlist, addToWishlist, removeFromWishlist, dark, toggleDark, user, setUser }}
    >
      {children}
    </AppContext.Provider>
  )
}
