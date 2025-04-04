import type { Category } from "../types"

// Assurons-nous que les images sont correctement définies dans le service de catégories

// Données simulées pour les catégories
const categories: Category[] = [
  {
    id: "smartphones",
    name: "Smartphones",
    description: "Téléphones intelligents de dernière génération",
    image: "/images/categories/smartphones.png",
    productCount: 12,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "ordinateurs",
    name: "Ordinateurs Portables",
    description: "Ordinateurs portables pour tous les besoins",
    image: "/images/categories/computers.png",
    productCount: 8,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "tablettes",
    name: "Tablettes",
    description: "Tablettes tactiles pour le travail et les loisirs",
    image: "/images/categories/tablets.png",
    productCount: 6,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "accessoires",
    name: "Accessoires",
    description: "Accessoires pour vos appareils électroniques",
    image: "/images/categories/accessories.png",
    productCount: 24,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "audio",
    name: "Audio",
    description: "Écouteurs, casques et enceintes",
    image: "/images/categories/audio.png",
    productCount: 15,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "televiseurs",
    name: "Téléviseurs",
    description: "Téléviseurs LED, OLED et Smart TV",
    image: "/images/categories/tvs.png",
    productCount: 10,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "gaming",
    name: "Gaming",
    description: "Consoles et accessoires de jeu",
    image: "/images/categories/gaming.png",
    productCount: 18,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "maison-connectee",
    name: "Maison Connectée",
    description: "Appareils pour la maison intelligente",
    image: "/images/categories/home.png",
    productCount: 14,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
]

export async function getCategories(): Promise<Category[]> {
  // Simuler un délai d'API
  await new Promise((resolve) => setTimeout(resolve, 500))
  return categories
}

export async function getCategoryById(id: string): Promise<Category | null> {
  // Simuler un délai d'API
  await new Promise((resolve) => setTimeout(resolve, 300))
  const category = categories.find((c) => c.id === id)
  return category || null
}

export async function getProductCountByCategory(categoryId: string): Promise<number> {
  // Simuler un délai d'API
  await new Promise((resolve) => setTimeout(resolve, 200))
  const category = await getCategoryById(categoryId)
  return category ? category.productCount : 0
}

