"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import ProductCard from "./product-card"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simuler un délai de chargement
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Dans une application réelle, vous feriez un appel API ici
        // const response = await fetch('/api/products/featured')
        // const data = await response.json()

        // Pour l'exemple, nous utilisons des données simulées
        const mockProducts: Product[] = [
          {
            id: "1",
            name: "Smartphone XYZ Pro",
            description: "Le dernier smartphone avec un appareil photo exceptionnel et une batterie longue durée.",
            price: 899.99,
            oldPrice: 999.99,
            discount: 10,
            image: "/images/products/tel.png?height=300&width=300",
            category: "smartphones",
            inStock: true,
            rating: 4.7,
            reviewCount: 124,
          },
          {
            id: "2",
            name: "Ordinateur Portable UltraBook",
            description: "Ordinateur portable fin et léger avec une puissance exceptionnelle pour les professionnels.",
            price: 1299.99,
            discount: 0,
            image: "/images/products/pc.png?height=300&width=300",
            category: "laptops",
            inStock: true,
            rating: 4.9,
            reviewCount: 86,
          },
          {
            id: "3",
            name: "Tablette MediaPad",
            description: "Tablette polyvalente avec un écran haute résolution et une grande autonomie.",
            price: 349.99,
            oldPrice: 399.99,
            discount: 12,
            image: "/images/products/tab.png?height=300&width=300",
            category: "tablets",
            inStock: true,
            rating: 4.5,
            reviewCount: 93,
          },
          {
            id: "4",
            name: "Écouteurs Sans Fil Pro",
            description: "Écouteurs sans fil avec réduction de bruit active et qualité sonore exceptionnelle.",
            price: 149.99,
            discount: 0,
            image: "/images/products/ecout.png?height=300&width=300",
            category: "accessories",
            inStock: true,
            rating: 4.8,
            reviewCount: 203,
          },
        ]

        setProducts(mockProducts)
        setIsLoading(false)
      } catch (error) {
        console.error("Erreur lors du chargement des produits:", error)
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Produits populaires</h2>
          <Button asChild variant="outline">
            <Link href="/client/produits">Voir tous les produits</Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted h-48 rounded-t-md"></div>
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-muted rounded-md w-3/4"></div>
                  <div className="h-4 bg-muted rounded-md w-full"></div>
                  <div className="h-4 bg-muted rounded-md w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

