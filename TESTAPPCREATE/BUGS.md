# Intentionally Planted Bugs (15)

| # | Bug | Location |
|---|-----|----------|
| 1 | Cart count uses number of lines, not total quantity | context/AppContext.jsx |
| 2 | Wishlist allows duplicate entries | context/AppContext.jsx |
| 3 | Search is case sensitive | pages/ProductList.jsx |
| 4 | Broken pagination (off-by-one, floor page count) | pages/ProductList.jsx |
| 5 | Cart total ignores quantity | context/AppContext.jsx |
| 6 | Product details crashes on invalid ID | pages/ProductDetails.jsx |
| 7 | Memory leak: setInterval never cleared | pages/ProductDetails.jsx |
| 8 | Missing loading state during fetch | pages/ProductList.jsx |
| 9 | Responsive issues: fixed min-width navbar, fixed 4-col grid | components/Navbar.jsx, pages/Home.jsx |
| 10 | Dark mode toggle never applies `dark` class | context/AppContext.jsx |
| 11 | Incorrect sorting (string compare, high-to-low ascending, rating ascending) | pages/ProductList.jsx |
| 12 | State mutation of cart item in addToCart | context/AppContext.jsx |
| 13 | No form validation on checkout | pages/Checkout.jsx |
| 14 | Broken image URLs with no fallback | data/products.js, components/ProductCard.jsx |
| 15 | Admin route unguarded (no role check) | App.jsx |
