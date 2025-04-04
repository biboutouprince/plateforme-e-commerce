// components/client/add-to-cart-button.tsx
"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { ShoppingCart, Check } from 'lucide-react'
import { useCart } from "./cart-provider"
import type { Product } from "../../lib/types"

interface AddToCartButtonProps {
  product: Product
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function AddToCartButton({
  product,
  variant = "default",
  size = "default",
  className = "",
}: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  const handleAddToCart = () => {
    if (!product.inStock) return
    
    setIsAdding(true)
    addToCart(product, 1)
    
    // Réinitialiser l'état après un court délai
    setTimeout(() => {
      setIsAdding(false)
    }, 1500)
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleAddToCart}
      disabled={!product.inStock || isAdding}
    >
      {isAdding ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Ajouté
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4 mr-2" />
          {!product.inStock ? "Indisponible" : "Ajouter au panier"}
        </>
      )}
    </Button>
  )
}