import type { Review } from "../types"

// Simulated database of reviews
const reviews: Review[] = [
  {
    id: "1",
    productId: "1",
    userId: "1",
    userName: "Jean Dupont",
    rating: 5,
    comment:
      "Excellent produit, je suis très satisfait de mon achat. La qualité est au rendez-vous et la livraison a été rapide.",
    status: "approved",
    createdAt: new Date("2023-10-15"),
  },
  {
    id: "2",
    productId: "1",
    userId: "2",
    userName: "Marie Martin",
    rating: 4,
    comment:
      "Bon rapport qualité-prix. Le produit correspond à la description. Seul bémol, l'emballage était un peu abîmé à la livraison.",
    status: "approved",
    createdAt: new Date("2023-09-28"),
  },
  {
    id: "3",
    productId: "1",
    userId: "3",
    userName: "Pierre Durand",
    rating: 5,
    comment: "Parfait ! Rien à redire, je recommande vivement ce produit.",
    status: "approved",
    createdAt: new Date("2023-09-10"),
  },
  {
    id: "4",
    productId: "2",
    userId: "1",
    userName: "Jean Dupont",
    rating: 5,
    comment: "Cet ordinateur est incroyable. Rapide, silencieux et avec une excellente autonomie.",
    status: "approved",
    createdAt: new Date("2023-11-05"),
  },
  {
    id: "5",
    productId: "3",
    userId: "2",
    userName: "Marie Martin",
    rating: 3,
    comment: "Tablette correcte mais un peu lente pour certaines applications.",
    status: "approved",
    createdAt: new Date("2023-10-20"),
  },
  {
    id: "6",
    productId: "4",
    userId: "3",
    userName: "Pierre Durand",
    rating: 5,
    comment: "La qualité sonore est exceptionnelle et la réduction de bruit fonctionne très bien.",
    status: "approved",
    createdAt: new Date("2023-11-15"),
  },
  {
    id: "7",
    productId: "5",
    userId: "5",
    userName: "Thomas Bernard",
    rating: 2,
    comment: "Déçu par la qualité de fabrication. Le bracelet s'est cassé après seulement deux semaines d'utilisation.",
    status: "pending",
    createdAt: new Date("2023-11-22"),
  },
  {
    id: "8",
    productId: "6",
    userId: "2",
    userName: "Marie Martin",
    rating: 4,
    comment: "Bon smartphone pour le prix. L'appareil photo est correct mais pas exceptionnel.",
    status: "pending",
    createdAt: new Date("2023-11-25"),
  },
]

interface ReviewFilters {
  productId?: string
  userId?: string
  status?: string
  search?: string
}

export async function getReviews(filters: ReviewFilters = {}): Promise<Review[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredReviews = [...reviews]

  // Apply product filter
  if (filters.productId) {
    filteredReviews = filteredReviews.filter((review) => review.productId === filters.productId)
  }

  // Apply user filter
  if (filters.userId) {
    filteredReviews = filteredReviews.filter((review) => review.userId === filters.userId)
  }

  // Apply status filter
  if (filters.status && filters.status !== "all") {
    filteredReviews = filteredReviews.filter((review) => review.status === filters.status)
  }

  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filteredReviews = filteredReviews.filter(
      (review) =>
        review.userName.toLowerCase().includes(searchLower) || review.comment.toLowerCase().includes(searchLower),
    )
  }

  // Sort by date (newest first)
  filteredReviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  return filteredReviews
}

export async function getReviewById(id: string): Promise<Review | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const review = reviews.find((r) => r.id === id)
  return review || null
}

export async function getReviewsByProductId(productId: string): Promise<Review[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return reviews
    .filter((r) => r.productId === productId && r.status === "approved")
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export async function getReviewsByUserId(userId: string): Promise<Review[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return reviews.filter((r) => r.userId === userId).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export async function createReview(reviewData: Omit<Review, "id" | "status" | "createdAt">): Promise<Review> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newReview: Review = {
    id: (reviews.length + 1).toString(),
    ...reviewData,
    status: "pending",
    createdAt: new Date(),
  }

  reviews.push(newReview)
  return newReview
}

export async function updateReviewStatus(
  id: string,
  status: "pending" | "approved" | "rejected",
): Promise<Review | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = reviews.findIndex((r) => r.id === id)
  if (index === -1) return null

  const updatedReview = {
    ...reviews[index],
    status,
  }

  reviews[index] = updatedReview
  return updatedReview
}

export async function deleteReview(id: string): Promise<boolean> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = reviews.findIndex((r) => r.id === id)
  if (index === -1) return false

  reviews.splice(index, 1)
  return true
}

export async function getReviewStats(): Promise<{
  totalReviews: number
  pendingReviews: number
  averageRating: number
}> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const totalReviews = reviews.length
  const pendingReviews = reviews.filter((r) => r.status === "pending").length
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  const averageRating = totalRating / totalReviews

  return {
    totalReviews,
    pendingReviews,
    averageRating,
  }
}

