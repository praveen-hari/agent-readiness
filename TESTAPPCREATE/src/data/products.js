const seed = [
  ['Mobiles', 'Galaxy S24', 74999], ['Mobiles', 'iPhone 15', 79900], ['Mobiles', 'Pixel 8', 65999],
  ['Mobiles', 'OnePlus 12', 64999], ['Mobiles', 'Redmi Note 13', 17999],
  ['Laptops', 'MacBook Air M2', 114900], ['Laptops', 'Dell XPS 13', 129990], ['Laptops', 'HP Pavilion 15', 62990],
  ['Laptops', 'Lenovo ThinkPad E14', 58990], ['Laptops', 'ASUS ROG Strix', 139990],
  ['Audio', 'Sony WH-1000XM5', 29990], ['Audio', 'AirPods Pro 2', 24900], ['Audio', 'boAt Rockerz 450', 1499],
  ['Audio', 'JBL Flip 6', 9999], ['Audio', 'Bose SoundLink', 14999],
  ['Wearables', 'Apple Watch SE', 29900], ['Wearables', 'Fitbit Charge 6', 13999], ['Wearables', 'Noise ColorFit Pro', 2999],
  ['Wearables', 'Galaxy Watch 6', 27999], ['Wearables', 'Mi Band 8', 3499],
  ['Fashion', 'Levis 511 Jeans', 3299], ['Fashion', 'Nike Air Max', 8995], ['Fashion', 'Allen Solly Shirt', 1799],
  ['Fashion', 'Puma Hoodie', 2999], ['Fashion', 'Ray-Ban Aviator', 7490],
  ['Home Appliances', 'LG 260L Refrigerator', 27990], ['Home Appliances', 'Dyson V11 Vacuum', 44900],
  ['Home Appliances', 'Philips Air Fryer', 8995], ['Home Appliances', 'Samsung Microwave', 11490], ['Home Appliances', 'IFB Washing Machine', 32990],
  ['Wishlist', 'Kindle Paperwhite', 13999], ['Wishlist', 'PlayStation 5', 49990], ['Wishlist', 'GoPro Hero 12', 39990],
  ['Books', 'Atomic Habits', 499], ['Books', 'The Psychology of Money', 399], ['Books', 'Clean Code', 3200],
  ['Sports', 'Yonex Badminton Racket', 2199], ['Sports', 'Cosco Football', 899], ['Sports', 'Boldfit Yoga Mat', 599],
  ['Sports', 'Adjustable Dumbbell Set', 4999],
]

export const categories = ['Mobiles', 'Laptops', 'Audio', 'Wearables', 'Fashion', 'Home Appliances', 'Wishlist', 'Books', 'Sports']

const products = seed.map(([category, name, price], i) => ({
  id: i + 1,
  name,
  category,
  price,
  rating: Number((3.5 + ((i * 7) % 15) / 10).toFixed(1)),
  stock: (i * 13) % 30,
  description: `${name} - a popular pick in ${category}. Great quality, fast delivery and easy returns.`,
  // BUG 14: some products point to an invalid image URL and there is no fallback handler
  image: i % 6 === 5 ? `https://images.invalid-cdn.test/p${i + 1}.jpg` : `https://picsum.photos/seed/shop${i + 1}/400/400`,
}))

export default products
