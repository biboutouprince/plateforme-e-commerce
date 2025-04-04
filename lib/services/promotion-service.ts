import type { Promotion } from "../types"

// Simulated database of promotions
const promotions: Promotion[] = [
  {
    id: "1",
    code: "SUMMER2023",
    type: "percentage",
    value: 15,
    minPurchase: 50,
    startDate: new Date("2023-06-01"),
    endDate: new Date("2023-08-31"),
    usageLimit: 1000,
    usageCount: 450,
    products: [],
    categories: ["smartphones", "tablettes"],
    active: true,
    createdAt: new Date("2023-05-15"),
    updatedAt: new Date("2023-05-15"),
  },
  {
    id: "2",
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minPurchase: 0,
    startDate: new Date("2023-01-01"),
    endDate: new Date("2023-12-31"),
    usageLimit: 1,
    usageCount: 320,
    products: [],
    categories: [],
    active: true,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  {
    id: "3",
    code: "BLACKFRIDAY",
    type: "percentage",
    value: 25,
    minPurchase: 100,
    startDate: new Date("2023-11-24"),
    endDate: new Date("2023-11-27"),
    usageLimit: 0,
    usageCount: 0,
    products: [],
    categories: [],
    active: true,
    createdAt: new Date("2023-11-01"),
    updatedAt: new Date("2023-11-01"),
  },
  {
    id: "4",
    code: "FREESHIPPING",
    type: "fixed",
    value: 5.99,
    minPurchase: 50,
    startDate: new Date("2023-10-01"),
    endDate: new Date("2023-12-31"),
    usageLimit: 0,
    usageCount: 125,
    products: [],
    categories: [],
    active: true,
    createdAt: new Date("2023-10-01"),
    updatedAt: new Date("2023-10-01"),
  },
  {
    id: "5",
    code: "FLASH20",
    type: "percentage",
    value: 20,
    minPurchase: 0,
    startDate: new Date("2023-11-15"),
    endDate: new Date("2023-11-16"),
    usageLimit: 100,
    usageCount: 100,
    products: ["1", "2", "3"],
    categories: [],
    active: false,
    createdAt: new Date("2023-11-10"),
    updatedAt: new Date("2023-11-16"),
  },
]

interface PromotionFilters {
  status?: string
  search?: string
}

export async function getPromotions(filters: PromotionFilters = {}): Promise<Promotion[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredPromotions = [...promotions]

  // Apply status filter
  if (filters.status) {
    if (filters.status === "active") {
      filteredPromotions = filteredPromotions.filter((promo) => promo.active)
    } else if (filters.status === "inactive") {
      filteredPromotions = filteredPromotions.filter((promo) => !promo.active)
    } else if (filters.status === "expired") {
      filteredPromotions = filteredPromotions.filter((promo) => new Date() > promo.endDate)
    } else if (filters.status === "upcoming") {
      filteredPromotions = filteredPromotions.filter((promo) => new Date() < promo.startDate)
    }
  }

  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filteredPromotions = filteredPromotions.filter((promo) => promo.code.toLowerCase().includes(searchLower))
  }

  // Sort by date (newest first)
  filteredPromotions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  return filteredPromotions
}

export async function getPromotionById(id: string): Promise<Promotion | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const promotion = promotions.find((p) => p.id === id)
  return promotion || null
}

export async function getPromotionByCode(code: string): Promise<Promotion | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const promotion = promotions.find((p) => p.code === code)
  return promotion || null
}

export async function createPromotion(
  promotionData: Omit<Promotion, "id" | "usageCount" | "createdAt" | "updatedAt">,
): Promise<Promotion> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newPromotion: Promotion = {
    id: (promotions.length + 1).toString(),
    ...promotionData,
    usageCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  promotions.push(newPromotion)
  return newPromotion
}

export async function updatePromotion(id: string, promotionData: Partial<Promotion>): Promise<Promotion | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = promotions.findIndex((p) => p.id === id)
  if (index === -1) return null

  const updatedPromotion = {
    ...promotions[index],
    ...promotionData,
    updatedAt: new Date(),
  }

  promotions[index] = updatedPromotion
  return updatedPromotion
}

export async function deletePromotion(id: string): Promise<boolean> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = promotions.findIndex((p) => p.id === id)
  if (index === -1) return false

  promotions.splice(index, 1)
  return true
}

export async function validatePromotion(
  code: string,
  cartTotal: number,
  productIds: string[],
  categoryIds: string[],
): Promise<{ valid: boolean; discount: number; message?: string }> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const promotion = await getPromotionByCode(code)

  if (!promotion) {
    return { valid: false, discount: 0, message: "Code promo invalide" }
  }

  const now = new Date()

  if (!promotion.active) {
    return { valid: false, discount: 0, message: "Ce code promo n'est plus actif" }
  }

  if (now < promotion.startDate) {
    return { valid: false, discount: 0, message: "Ce code promo n'est pas encore valide" }
  }

  if (now > promotion.endDate) {
    return { valid: false, discount: 0, message: "Ce code promo a expiré" }
  }

  if (promotion.usageLimit > 0 && promotion.usageCount >= promotion.usageLimit) {
    return { valid: false, discount: 0, message: "Ce code promo a atteint sa limite d'utilisation" }
  }

  if (cartTotal < promotion.minPurchase) {
    return { valid: false, discount: 0, message: `Le montant minimum d'achat est de ${promotion.minPurchase} €` }
  }

  // Check if promotion applies to specific products or categories
  if (promotion.products.length > 0 || promotion.categories.length > 0) {
    const productMatch = promotion.products.length === 0 || promotion.products.some((id) => productIds.includes(id))
    const categoryMatch =
      promotion.categories.length === 0 || promotion.categories.some((id) => categoryIds.includes(id))

    if (!productMatch && !categoryMatch) {
      return { valid: false, discount: 0, message: "Ce code promo ne s'applique pas aux produits de votre panier" }
    }
  }

  // Calculate discount
  let discount = 0
  if (promotion.type === "percentage") {
    discount = cartTotal * (promotion.value / 100)
  } else {
    discount = promotion.value
  }

  // Ensure discount doesn't exceed cart total
  discount = Math.min(discount, cartTotal)

  return { valid: true, discount }
}

