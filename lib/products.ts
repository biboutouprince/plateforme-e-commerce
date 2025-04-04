// Types pour les produits
export interface Product {
    id: string
    name: string
    description: string
    price: number
    images: string[]
    category: string
    features?: string[]
    specs?: Record<string, string>
    stock: number
    rating?: number
    reviews?: number
    colors?: { name: string; value: string }[]
  }
  
  // Base de données simulée de produits
  const products: Product[] = [
    {
      id: "1",
      name: "Smartphone XYZ Pro",
      description: "Le dernier smartphone avec des fonctionnalités avancées et un appareil photo exceptionnel.",
      price: 899.99,
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      category: "Smartphones",
      features: ["Écran AMOLED 6,7 pouces", "Processeur ultra-rapide", "Triple caméra 108MP", "Batterie 5000mAh"],
      specs: {
        Processeur: "Octa-core 2.8GHz",
        RAM: "8GB",
        Stockage: "256GB",
        Système: "Android 13",
        Batterie: "5000mAh",
      },
      stock: 15,
      rating: 4.8,
      reviews: 124,
      colors: [
        { name: "Noir Cosmos", value: "#000000" },
        { name: "Bleu Océan", value: "#0077be" },
        { name: "Vert Émeraude", value: "#50c878" },
      ],
    },
    {
      id: "2",
      name: "Ordinateur Portable UltraBook",
      description: "Un ordinateur portable léger et puissant pour les professionnels en déplacement.",
      price: 1299.99,
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
      category: "Ordinateurs",
      features: ["Écran 14 pouces Full HD", "Processeur Intel Core i7", "16GB RAM", "SSD 512GB"],
      specs: {
        Processeur: "Intel Core i7 11th Gen",
        RAM: "16GB DDR4",
        Stockage: "512GB NVMe SSD",
        Système: "Windows 11 Pro",
        Batterie: "12 heures",
      },
      stock: 8,
      rating: 4.6,
      reviews: 89,
      colors: [
        { name: "Argent", value: "#c0c0c0" },
        { name: "Gris Sidéral", value: "#555555" },
      ],
    },
    {
      id: "3",
      name: "Écouteurs Sans Fil Pro",
      description: "Des écouteurs sans fil avec réduction de bruit active pour une expérience audio immersive.",
      price: 199.99,
      images: ["/placeholder.svg?height=600&width=600"],
      category: "Audio",
      features: ["Réduction de bruit active", "30 heures d'autonomie", "Résistant à l'eau IPX4", "Commandes tactiles"],
      specs: {
        Type: "Intra-auriculaires",
        Connectivité: "Bluetooth 5.2",
        Autonomie: "8h (écouteurs) + 22h (boîtier)",
        Résistance: "IPX4",
      },
      stock: 25,
      rating: 4.7,
      reviews: 203,
      colors: [
        { name: "Blanc", value: "#ffffff" },
        { name: "Noir", value: "#000000" },
      ],
    },
  ]
  
  // Fonction pour récupérer tous les produits
  export async function getProducts(): Promise<Product[]> {
    // Simuler un délai de chargement
    await new Promise((resolve) => setTimeout(resolve, 500))
    return products
  }
  
  // Fonction pour récupérer un produit par son ID
  export async function getProductById(id: string): Promise<Product | undefined> {
    // Simuler un délai de chargement
    await new Promise((resolve) => setTimeout(resolve, 300))
    return products.find((product) => product.id === id)
  }
  
  // Fonction pour récupérer des produits recommandés
  export async function getRecommendedProducts(currentProductId: string): Promise<Product[]> {
    // Simuler un délai de chargement
    await new Promise((resolve) => setTimeout(resolve, 800))
    // Exclure le produit actuel et retourner jusqu'à 4 produits
    return products.filter((product) => product.id !== currentProductId).slice(0, 4)
  }
  
  