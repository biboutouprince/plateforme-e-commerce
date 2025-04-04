"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/components/client/cart-provider"
import { toast } from "@/components/ui/use-toast"
import type { Product } from "@/lib/types"

interface RelatedProductsProps {
  products: Product[]
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const { addToCart } = useCart()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simuler un délai de chargement
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1)
    toast({
      title: "Produit ajouté au panier",
      description: `${product.name} a été ajouté à votre panier.`,
    })
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-muted rounded-t-md"></div>
            <CardContent className="pt-4">
              <div className="h-6 bg-muted rounded-md w-3/4 mb-2"></div>
              <div className="h-4 bg-muted rounded-md w-1/2 mb-4"></div>
              <div className="h-6 bg-muted rounded-md w-1/4"></div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="h-9 bg-muted rounded-md w-full"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Aucun produit similaire trouvé.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden h-full flex flex-col">
          <div className="relative h-48 bg-muted">
            <Link href={`/client/produits/${product.id}`}>
              <Image
                src={product.image || "/placeholder.svg?height=300&width=300"}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform hover:scale-105 duration-300"
              />
            </Link>
            {product.discount > 0 && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{product.discount}%
              </div>
            )}
          </div>
          <CardContent className="flex-grow pt-4">
            <Link href={`/client/produits/${product.id}`} className="hover:underline">
              <h3 className="font-medium line-clamp-1">{product.name}</h3>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1 mb-2">{product.description}</p>
            <div className="flex items-center">
              <span className="font-bold">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through ml-2">{formatPrice(product.oldPrice)}</span>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button onClick={() => handleAddToCart(product)} className="w-full">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Ajouter au panier
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

