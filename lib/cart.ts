import { cookies } from "next/headers"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  category?: string
  color?: string
}

// Fonction pour récupérer les articles du panier côté serveur
export async function getCartItems(): Promise<CartItem[]> {
  try {
    // Récupérer les données du panier depuis les cookies
    const cookieStore = await cookies()
    const cartCookie = cookieStore.get("cart-storage")

    if (!cartCookie?.value) {
      return []
    }

    // Décoder et parser les données du cookie
    const decodedValue = decodeURIComponent(cartCookie.value)
    const parsedData = JSON.parse(decodedValue)

    // Extraire les articles du panier
    if (parsedData?.state?.items && Array.isArray(parsedData.state.items)) {
      return parsedData.state.items
    }

    return []
  } catch (error) {
    console.error("Erreur lors de la récupération des articles du panier:", error)
    return []
  }
}

