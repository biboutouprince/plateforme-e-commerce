"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Category } from "@/lib/types"

export default function CategoryShowcase() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Simuler un délai de chargement
        await new Promise((resolve) => setTimeout(resolve, 600))

        // Dans une application réelle, vous feriez un appel API ici
        // const response = await fetch('/api/categories/featured')
        // const data = await response.json()

        // Pour l'exemple, nous utilisons des données simulées
        const mockCategories: Category[] = [
          {
            id: "smartphones",
            name: "Smartphones",
            description: "Téléphones intelligents de dernière génération",
            image: "/images/categories/smartphones.png?height=300&width=300&text=Smartphones",
            productCount: 12,
            createdAt: new Date("2023-01-01"),
            updatedAt: new Date("2023-01-01"),
          },
          {
            id: "laptops",
            name: "Ordinateurs Portables",
            description: "Ordinateurs portables pour tous les besoins",
            image: "/images/categories/computers.png?height=300&width=300&text=Laptops",
            productCount: 8,
            createdAt: new Date("2023-01-01"),
            updatedAt: new Date("2023-01-01"),
          },
          {
            id: "accessories",
            name: "Accessoires",
            description: "Accessoires pour vos appareils électroniques",
            image: "/images/categories/acces.png?height=300&width=300&text=Accessoires",
            productCount: 24,
            createdAt: new Date("2023-01-01"),
            updatedAt: new Date("2023-01-01"),
          },
        ]

        setCategories(mockCategories)
        setIsLoading(false)
      } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error)
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Parcourez nos catégories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez notre large gamme de produits électroniques organisés par catégories pour faciliter votre
            recherche.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted h-48 rounded-md"></div>
                <div className="mt-4 space-y-3">
                  <div className="h-6 bg-muted rounded-md w-1/2 mx-auto"></div>
                  <div className="h-4 bg-muted rounded-md w-1/4 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link key={category.id} href={`/client/produits?category=${category.id}`}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-48 bg-muted">
                    <Image
                      src={category.image || `/placeholder.svg?height=300&width=300&text=${category.name}`}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{category.productCount} produits</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Button asChild>
            <Link href="/client/categories">Voir toutes les catégories</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

