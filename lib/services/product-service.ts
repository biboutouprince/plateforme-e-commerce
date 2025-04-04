import type { Product } from "../types"

// Simulated database of products
const products: Product[] = [
  {
    id: "1",
    name: "Smartphone XYZ Pro",
    description: "Le dernier smartphone avec un appareil photo exceptionnel et une batterie longue durée.",
    fullDescription:
      "<p>Le Smartphone XYZ Pro est équipé d'un écran AMOLED de 6,7 pouces avec une résolution de 2400 x 1080 pixels. Il dispose d'un processeur octa-core, de 8 Go de RAM et de 128 Go de stockage interne.</p><p>L'appareil photo principal est de 108 MP, accompagné d'un ultra grand-angle de 12 MP et d'un téléobjectif de 10 MP. La caméra frontale est de 32 MP pour des selfies de qualité.</p><p>La batterie de 5000 mAh offre une autonomie d'une journée complète, même en utilisation intensive. La charge rapide de 45W permet de recharger l'appareil en moins d'une heure.</p>",
    price: 899.99,
    oldPrice: 999.99,
    discount: 10,
    image: "/images/products/tel.png",
    category: "smartphones",
    inStock: true,
    rating: 4.7,
    reviewCount: 124,
    specifications: [
      { name: "Écran", value: "6,7 pouces AMOLED" },
      { name: "Processeur", value: "Octa-core 2.8 GHz" },
      { name: "RAM", value: "8 Go" },
      { name: "Stockage", value: "128 Go" },
      { name: "Batterie", value: "5000 mAh" },
      { name: "Appareil photo", value: "108 MP + 12 MP + 10 MP" },
      { name: "Système d'exploitation", value: "Android 13" },
    ],
  },
  {
    id: "2",
    name: "Ordinateur Portable UltraBook",
    description: "Ordinateur portable léger et puissant pour les professionnels en déplacement.",
    price: 1299.99,
    oldPrice: 1499.99,
    discount: 13,
    image: "/images/products/pc.png",
    category: "ordinateurs",
    inStock: true,
    rating: 4.5,
    reviewCount: 89,
    specifications: [
      { name: "Processeur", value: "Intel Core i7-1165G7" },
      { name: "RAM", value: "16 Go DDR4" },
      { name: "Stockage", value: "512 Go SSD" },
      { name: "Écran", value: "14 pouces Full HD" },
      { name: "Carte graphique", value: "Intel Iris Xe" },
      { name: "Batterie", value: "Jusqu'à 12 heures" },
      { name: "Poids", value: "1,2 kg" },
    ],
  },
  {
    id: "3",
    name: "Tablette MediaPad",
    description: "Tablette parfaite pour le divertissement et la productivité avec un écran haute résolution.",
    price: 349.99,
    oldPrice: 399.99,
    discount: 12,
    image: "/images/products/tab.png",
    category: "tablettes",
    inStock: true,
    rating: 4.3,
    reviewCount: 56,
    specifications: [
      { name: "Écran", value: "10,8 pouces 2K" },
      { name: "Processeur", value: "Octa-core 2.0 GHz" },
      { name: "RAM", value: "4 Go" },
      { name: "Stockage", value: "64 Go" },
      { name: "Batterie", value: "7500 mAh" },
      { name: "Caméras", value: "13 MP arrière, 8 MP avant" },
      { name: "Système d'exploitation", value: "Android 12" },
    ],
  },
  {
    id: "4",
    name: "Écouteurs Sans Fil Pro",
    description: "Écouteurs sans fil avec réduction de bruit active et qualité sonore exceptionnelle.",
    price: 149.99,
    image: "/images/products/ecout.png",
    category: "accessoires",
    inStock: true,
    rating: 4.8,
    reviewCount: 203,
    discount: 0,
    specifications: [
      { name: "Type", value: "Intra-auriculaires" },
      { name: "Connectivité", value: "Bluetooth 5.2" },
      { name: "Autonomie", value: "8h (30h avec boîtier)" },
      { name: "Réduction de bruit", value: "Active" },
      { name: "Résistance", value: "IPX4 (résistant à l'eau)" },
      { name: "Microphones", value: "4 microphones" },
      { name: "Contrôles", value: "Tactiles" },
    ],
  },
  {
    id: "5",
    name: "Montre Connectée SportWatch",
    description: "Montre connectée avec suivi d'activité, GPS et mesure de la fréquence cardiaque.",
    price: 199.99,
    oldPrice: 249.99,
    discount: 20,
    image: "/images/products/montre.png",
    category: "accessoires",
    inStock: false,
    rating: 4.4,
    reviewCount: 78,
    specifications: [
      { name: "Écran", value: "1,4 pouces AMOLED" },
      { name: "Batterie", value: "Jusqu'à 14 jours" },
      { name: "Étanchéité", value: "5 ATM" },
      { name: "Capteurs", value: "Fréquence cardiaque, SpO2, accéléromètre" },
      { name: "GPS", value: "Intégré" },
      { name: "Connectivité", value: "Bluetooth 5.0" },
      { name: "Compatibilité", value: "Android 6.0+, iOS 10.0+" },
    ],
  },
  {
    id: "6",
    name: "Smartphone Budget Plus",
    description: "Smartphone abordable avec d'excellentes performances et une bonne autonomie.",
    price: 299.99,
    image: "/images/products/phone.png",
    category: "smartphones",
    inStock: true,
    rating: 4.2,
    reviewCount: 145,
    discount: 0,
    specifications: [
      { name: "Écran", value: "6,5 pouces LCD" },
      { name: "Processeur", value: "Octa-core 2.0 GHz" },
      { name: "RAM", value: "4 Go" },
      { name: "Stockage", value: "64 Go" },
      { name: "Batterie", value: "4500 mAh" },
      { name: "Appareil photo", value: "48 MP + 8 MP + 2 MP" },
      { name: "Système d'exploitation", value: "Android 12" },
    ],
  },
  {
    id: "7",
    name: "Ordinateur de Bureau GamerX",
    description: "Ordinateur de bureau puissant pour les jeux et la création de contenu.",
    price: 1899.99,
    oldPrice: 2099.99,
    discount: 9,
    image: "/images/products/gamers.png",
    category: "ordinateurs",
    inStock: true,
    rating: 4.9,
    reviewCount: 67,
    specifications: [
      { name: "Processeur", value: "AMD Ryzen 9 5900X" },
      { name: "RAM", value: "32 Go DDR4" },
      { name: "Stockage", value: "1 To SSD + 2 To HDD" },
      { name: "Carte graphique", value: "NVIDIA RTX 3080" },
      { name: "Alimentation", value: "850W Gold" },
      { name: "Refroidissement", value: "Watercooling" },
      { name: "Système d'exploitation", value: "Windows 11" },
    ],
  },
  {
    id: "8",
    name: "Tablette Kids",
    description: "Tablette conçue pour les enfants avec contrôle parental et contenu éducatif.",
    price: 149.99,
    image: "/images/products/tablette.png",
    category: "tablettes",
    inStock: true,
    rating: 4.1,
    reviewCount: 92,
    discount: 0,
    specifications: [
      { name: "Écran", value: "8 pouces HD" },
      { name: "Processeur", value: "Quad-core 1.5 GHz" },
      { name: "RAM", value: "2 Go" },
      { name: "Stockage", value: "32 Go" },
      { name: "Batterie", value: "4500 mAh" },
      { name: "Caméras", value: "5 MP arrière, 2 MP avant" },
      { name: "Système d'exploitation", value: "Android 11 (mode enfant)" },
    ],
  },
]

interface ProductFilters {
  category?: string
  sort?: string
  search?: string
  featured?: boolean
  limit?: number
}

// Fetch products with filters applied
export async function getProducts(filters: ProductFilters = {}): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredProducts = [...products]

  if (filters.category) {
    filteredProducts = filteredProducts.filter((product) => product.category === filters.category)
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower),
    )
  }

  if (filters.featured) {
    filteredProducts = filteredProducts.filter((product) => product.discount > 0 || product.rating >= 4.5)
  }

  if (filters.sort) {
    switch (filters.sort) {
      case "price-asc":
        filteredProducts.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filteredProducts.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filteredProducts.sort((a, b) => Number.parseInt(b.id) - Number.parseInt(a.id))
        break
      default:
        break
    }
  }

  if (filters.limit && filteredProducts.length > filters.limit) {
    filteredProducts = filteredProducts.slice(0, filters.limit)
  }

  return filteredProducts
}

// Fetch product by ID
export async function getProductById(id: string): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const product = products.find((p) => p.id === id)
  return product || null
}

// Fetch related products based on category
export async function getRelatedProducts(productId: string, category: string): Promise<Product[]> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  return products.filter((p) => p.id !== productId && p.category === category).slice(0, 4)
}

// Create a new product
export async function createProduct(productData: Omit<Product, "id" | "rating" | "reviewCount">): Promise<Product> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newProduct: Product = {
    id: (products.length + 1).toString(),
    ...productData,
    rating: 0,
    reviewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  products.push(newProduct)
  return newProduct
}

// Update an existing product
export async function updateProduct(id: string, productData: Partial<Product>): Promise<Product | null> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return null

  const updatedProduct = {
    ...products[index],
    ...productData,
    updatedAt: new Date(),
  }

  products[index] = updatedProduct
  return updatedProduct
}

// Delete a product
export async function deleteProduct(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return false

  products.splice(index, 1)
  return true
}

// Get product statistics
export async function getProductStats(): Promise<{
  totalProducts: number
  outOfStock: number
  lowStock: number
  totalValue: number
}> {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const totalProducts = products.length
  const outOfStock = products.filter((p) => !p.inStock).length
  const lowStock = products.filter((p) => p.inStock && Math.random() < 0.3).length // Simulated low stock
  const totalValue = products.reduce((sum, product) => sum + product.price, 0)

  return {
    totalProducts,
    outOfStock,
    lowStock,
    totalValue,
  }
}
