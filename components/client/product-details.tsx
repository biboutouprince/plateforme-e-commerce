"use client"

import { useState } from "react"
import { useCart } from "@/components/client/cart-provider"
import type { Product } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { ShoppingCart, Check, Star } from "lucide-react"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.value || "")
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { addItem } = useCart()

  function handleAddToCart() {
    setIsAddingToCart(true)

    // Simuler un délai pour l'ajout au panier
    setTimeout(() => {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1,
        color: product.colors?.find((c) => c.value === selectedColor)?.name,
      })
      setIsAddingToCart(false)
    }, 500)
  }

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

      <div className="mt-3">
        <h2 className="sr-only">Informations produit</h2>
        <p className="text-3xl tracking-tight text-gray-900">{formatPrice(product.price)}</p>
      </div>

      {/* Évaluations */}
      {product.rating && (
        <div className="mt-3">
          <div className="flex items-center">
            <div className="flex items-center">
              {[0, 1, 2, 3, 4].map((rating) => (
                <Star
                  key={rating}
                  className={`h-5 w-5 ${product.rating! > rating ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                />
              ))}
            </div>
            <p className="ml-3 text-sm text-gray-500">{product.reviews} avis</p>
          </div>
        </div>
      )}

      {/* Description */}
      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <p className="text-base text-gray-700">{product.description}</p>
      </div>

      {/* Caractéristiques */}
      {product.features && product.features.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-900">Points forts</h3>
          <ul className="mt-2 list-disc pl-5 space-y-2">
            {product.features.map((feature) => (
              <li key={feature} className="text-sm text-gray-500">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Couleurs */}
      {product.colors && product.colors.length > 0 && (
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-900">Couleur</h3>
          <div className="mt-3 flex space-x-2">
            {product.colors.map((color) => (
              <button
                key={color.name}
                className={`relative h-10 w-10 rounded-full border ${
                  selectedColor === color.value ? "ring-2 ring-offset-2 ring-gray-900" : "border-gray-300"
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => setSelectedColor(color.value)}
              >
                <span className="sr-only">{color.name}</span>
                {selectedColor === color.value && (
                  <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                    <Check
                      className={`h-4 w-4 ${
                        color.value === "#ffffff" || color.value === "#c0c0c0" ? "text-gray-900" : "text-white"
                      }`}
                    />
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stock */}
      <div className="mt-6">
        <p className="text-sm text-gray-500">
          {product.stock > 0 ? `En stock (${product.stock} disponibles)` : "Rupture de stock"}
        </p>
      </div>

      {/* Bouton d'ajout au panier */}
      <div className="mt-8">
        <Button onClick={handleAddToCart} disabled={isAddingToCart || product.stock <= 0} className="w-full" size="lg">
          {isAddingToCart ? (
            "Ajout en cours..."
          ) : (
            <>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Ajouter au panier
            </>
          )}
        </Button>
      </div>

      {/* Spécifications */}
      {product.specs && Object.keys(product.specs).length > 0 && (
        <div className="mt-10 border-t border-gray-200 pt-8">
          <h3 className="text-sm font-medium text-gray-900">Spécifications</h3>
          <div className="mt-4 space-y-3">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <p className="text-sm text-gray-500">{key}</p>
                <p className="text-sm font-medium text-gray-900">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

