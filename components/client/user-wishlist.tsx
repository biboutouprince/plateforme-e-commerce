"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import { Trash2, ShoppingCart } from "lucide-react"
import { formatPrice } from "../../lib/utils"
import Link from "next/link"
import Image from "next/image"
import { toast } from "../ui/use-toast"
import type { Product } from "../../lib/types"

interface UserWishlistProps {
  userId: string
}

export default function UserWishlist({ userId }: UserWishlistProps) {
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        // Simuler un délai de chargement
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Dans une application réelle, vous feriez un appel API ici
        // const response = await fetch(`/api/users/${userId}/wishlist`)
        // const data = await response.json()

        // Pour l'exemple, nous utilisons des données simulées
        const mockWishlist: Product[] = [
          {
            id: "1",
            name: "Smartphone XYZ Pro",
            description: "Le dernier smartphone avec un appareil photo exceptionnel et une batterie longue durée.",
            price: 899.99,
            oldPrice: 999.99,
            discount: 10,
            image: "/placeholder.svg?height=300&width=300",
            category: "smartphones",
            inStock: true,
            rating: 4.7,
            reviewCount: 124,
          },
          {
            id: "4",
            name: "Écouteurs Sans Fil Pro",
            description: "Écouteurs sans fil avec réduction de bruit active et qualité sonore exceptionnelle.",
            price: 149.99,
            image: "/placeholder.svg?height=300&width=300",
            category: "accessoires",
            inStock: true,
            rating: 4.8,
            reviewCount: 203,
            discount: 0,
          },
          {
            id: "7",
            name: "Ordinateur de Bureau GamerX",
            description: "Ordinateur de bureau puissant pour les jeux et la création de contenu.",
            price: 1899.99,
            oldPrice: 2099.99,
            discount: 9,
            image: "/placeholder.svg?height=300&width=300",
            category: "ordinateurs",
            inStock: true,
            rating: 4.9,
            reviewCount: 67,
          },
        ]

        setWishlist(mockWishlist)
        setIsLoading(false)
      } catch (error) {
        console.error("Erreur lors du chargement de la liste de souhaits:", error)
        setIsLoading(false)
      }
    }

    fetchWishlist()
  }, [userId])

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      // Dans une application réelle, vous feriez un appel API ici
      // await fetch(`/api/users/${userId}/wishlist/${productId}`, { method: 'DELETE' })

      // Pour l'exemple, nous mettons à jour l'état local
      setWishlist(wishlist.filter((product) => product.id !== productId))

      toast({
        title: "Produit retiré",
        description: "Le produit a été retiré de votre liste de souhaits.",
      })
    } catch (error) {
      console.error("Erreur lors de la suppression du produit de la liste de souhaits:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression du produit de votre liste de souhaits.",
        variant: "destructive",
      })
    }
  }

  const handleAddToCart = async (product: Product) => {
    try {
      // Dans une application réelle, vous feriez un appel API ici
      // await fetch(`/api/cart`, { method: 'POST', body: JSON.stringify({ productId: product.id, quantity: 1 }) })

      toast({
        title: "Produit ajouté au panier",
        description: `${product.name} a été ajouté à votre panier.`,
      })
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit au panier:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout du produit à votre panier.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-muted rounded-t-md"></div>
            <CardContent className="pt-4">
              <div className="h-6 bg-muted rounded-md w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded-md w-1/2 mb-4"></div>
              <div className="h-6 bg-muted rounded-md w-1/4"></div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="h-9 bg-muted rounded-md w-24"></div>
              <div className="h-9 bg-muted rounded-md w-24"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Ma liste de souhaits</h2>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative h-48 bg-muted">
                <Link href={`/client/produits/${product.id}`}>
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </Link>
                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.discount}%
                  </div>
                )}
              </div>
              <CardContent className="pt-4">
                <Link href={`/client/produits/${product.id}`} className="hover:underline">
                  <h3 className="font-medium line-clamp-1">{product.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1 mb-2">{product.description}</p>
                <div className="flex items-center">
                  <span className="font-bold">{formatPrice(product.price)}</span>
                  {product.oldPrice && (
                    <span className="text-sm text-muted-foreground line-through ml-2">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" size="sm" onClick={() => handleRemoveFromWishlist(product.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Retirer
                </Button>
                <Button size="sm" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Ajouter
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Votre liste de souhaits est vide</h3>
          <p className="text-muted-foreground mb-4">
            Parcourez notre catalogue et ajoutez des produits à votre liste de souhaits.
          </p>
          <Button asChild>
            <Link href="/client/produits">Découvrir nos produits</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

