import type { Metadata } from "next"
import UserWishlist from "@/components/client/user-wishlist"

export const metadata: Metadata = {
  title: "Ma liste de souhaits - ElectroShop",
  description: "Gérez votre liste de souhaits et retrouvez vos produits favoris",
}

export default function WishlistPage() {
  // Dans une application réelle, vous récupéreriez l'ID de l'utilisateur depuis la session
  const userId = "user-1"

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Ma liste de souhaits</h1>
      <UserWishlist userId={userId} />
    </div>
  )
}

