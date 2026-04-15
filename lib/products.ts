export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  description: string
  longDescription: string
  image: string
  category: string
  rating: number
  reviews: number
  inStock: boolean
  weight: string
  tags: string[]
}

export const categories = [
  "All",
  "Millets",
  "Oils",
  "Spices",
  "Sweeteners",
  "Honey",
] as const

export type Category = (typeof categories)[number]

export const products: Product[] = [
  {
    id: "ragi-millet",
    name: "Organic Ragi Millet",
    price: 149,
    originalPrice: 199,
    description: "Premium finger millet sourced directly from Karnataka farms. Rich in calcium and iron.",
    longDescription: "Our Organic Ragi Millet is carefully sourced from small-scale farmers in the hills of Karnataka who practice traditional organic farming methods. Ragi (finger millet) is one of the most nutritious cereals, rich in calcium, iron, and essential amino acids. It is naturally gluten-free and has a low glycemic index, making it an excellent choice for diabetics and health-conscious individuals. Use it to make ragi mudde, ragi dosa, ragi porridge, and many more traditional Karnataka recipes.",
    image: "/images/products/ragi-millet.jpg",
    category: "Millets",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    weight: "500g",
    tags: ["gluten-free", "high-calcium", "traditional"],
  },
  {
    id: "coconut-oil",
    name: "Cold-Pressed Coconut Oil",
    price: 349,
    originalPrice: 449,
    description: "Pure cold-pressed virgin coconut oil. Perfect for cooking and hair care.",
    longDescription: "Our Cold-Pressed Coconut Oil is extracted from fresh, mature coconuts using traditional wooden ghani (cold-press) methods that preserve all the natural nutrients and aroma. This virgin coconut oil retains its natural lauric acid content, medium-chain triglycerides (MCTs), and antioxidants. Ideal for cooking South Indian dishes, oil pulling, hair care, and skin moisturizing. Sourced from coconut groves in coastal Karnataka.",
    image: "/images/products/coconut-oil.jpg",
    category: "Oils",
    rating: 4.9,
    reviews: 89,
    inStock: true,
    weight: "500ml",
    tags: ["cold-pressed", "virgin", "multi-use"],
  },
  {
    id: "turmeric-powder",
    name: "Organic Turmeric Powder",
    price: 129,
    originalPrice: 169,
    description: "High-curcumin turmeric from Karnataka. Vibrant color and rich aroma.",
    longDescription: "Our Organic Turmeric Powder is made from premium turmeric roots grown in the fertile soils of Karnataka. With naturally high curcumin content (3-5%), this turmeric has a deep golden color and intense aroma. It is processed without any chemicals or artificial colors. Turmeric is known for its powerful anti-inflammatory and antioxidant properties. Use it in curries, golden milk, face masks, and traditional remedies.",
    image: "/images/products/turmeric.jpg",
    category: "Spices",
    rating: 4.7,
    reviews: 156,
    inStock: true,
    weight: "200g",
    tags: ["high-curcumin", "anti-inflammatory", "pure"],
  },
  {
    id: "foxtail-millet",
    name: "Organic Foxtail Millet",
    price: 169,
    originalPrice: 219,
    description: "Nutrient-rich foxtail millet. Great alternative to rice for health-conscious eaters.",
    longDescription: "Foxtail Millet, known as Navane in Kannada, is one of the oldest cultivated grains in India. Our organic foxtail millet is grown by traditional farmers in Karnataka without any pesticides or chemicals. It is rich in dietary fiber, protein, and minerals like iron and copper. With a low glycemic index, it helps manage blood sugar levels and promotes heart health. Perfect for making upma, khichdi, pulao, and sweet dishes.",
    image: "/images/products/foxtail-millet.jpg",
    category: "Millets",
    rating: 4.6,
    reviews: 78,
    inStock: true,
    weight: "500g",
    tags: ["low-gi", "fiber-rich", "traditional"],
  },
  {
    id: "raw-honey",
    name: "Wild Forest Honey",
    price: 449,
    originalPrice: 549,
    description: "Raw unprocessed honey from the Western Ghats. Rich in natural enzymes.",
    longDescription: "Our Wild Forest Honey is ethically harvested from the pristine forests of the Western Ghats in Karnataka. This raw, unprocessed honey retains all its natural enzymes, pollen, and beneficial compounds. Unlike commercial honey, it is never heated or filtered excessively, preserving its natural crystallization properties and health benefits. Rich in antioxidants and natural antibacterial properties, it is perfect as a natural sweetener, immunity booster, and wound healer.",
    image: "/images/products/honey.jpg",
    category: "Honey",
    rating: 4.9,
    reviews: 203,
    inStock: true,
    weight: "350g",
    tags: ["raw", "unprocessed", "wild-harvested"],
  },
  {
    id: "groundnut-oil",
    name: "Cold-Pressed Groundnut Oil",
    price: 299,
    originalPrice: 379,
    description: "Traditional wood-pressed groundnut oil. Rich nutty flavor for authentic cooking.",
    longDescription: "Our Cold-Pressed Groundnut Oil is extracted using traditional wooden ghani methods from organic groundnuts grown in North Karnataka. This oil retains its natural nutty flavor, aroma, and all essential nutrients including vitamin E, monounsaturated fats, and resveratrol. Free from any chemicals or preservatives, it is ideal for deep frying, tempering, and everyday cooking. The traditional extraction method ensures the oil stays pure and unrefined.",
    image: "/images/products/groundnut-oil.jpg",
    category: "Oils",
    rating: 4.7,
    reviews: 67,
    inStock: true,
    weight: "1L",
    tags: ["wood-pressed", "traditional", "pure"],
  },
  {
    id: "organic-jaggery",
    name: "Organic Sugarcane Jaggery",
    price: 119,
    originalPrice: 149,
    description: "Traditional unrefined jaggery. Natural sweetener packed with minerals.",
    longDescription: "Our Organic Sugarcane Jaggery is made from organically grown sugarcane in Karnataka using traditional methods. The sugarcane juice is boiled and solidified without any chemical processing, retaining all natural minerals like iron, magnesium, and potassium. This dark, rich jaggery has a complex flavor profile with notes of caramel and molasses. Use it as a healthier alternative to refined sugar in sweets, beverages, and traditional recipes like payasam and holige.",
    image: "/images/products/jaggery.jpg",
    category: "Sweeteners",
    rating: 4.5,
    reviews: 92,
    inStock: true,
    weight: "500g",
    tags: ["unrefined", "mineral-rich", "natural"],
  },
  {
    id: "barnyard-millet",
    name: "Organic Barnyard Millet",
    price: 159,
    originalPrice: 199,
    description: "Light and nutritious barnyard millet. Ideal for fasting and everyday meals.",
    longDescription: "Barnyard Millet, known as Oodalu in Kannada, is one of the fastest-growing millets and requires minimal water for cultivation. Our organic barnyard millet is sourced from dryland farmers in Karnataka who follow natural farming practices. It is exceptionally rich in fiber and iron, with the highest energy content among millets. Popular during fasting periods, it can be used to make rice substitutes, upma, payasam, and many other delicious recipes.",
    image: "/images/products/barnyard-millet.jpg",
    category: "Millets",
    rating: 4.4,
    reviews: 45,
    inStock: true,
    weight: "500g",
    tags: ["high-fiber", "fasting-friendly", "drought-resistant"],
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: Category): Product[] {
  if (category === "All") return products
  return products.filter((p) => p.category === category)
}
