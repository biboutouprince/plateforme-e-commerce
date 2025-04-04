// components/client/cart-items.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { Trash2, Plus, Minus } from 'lucide-react'
import { Button } from "../ui/button"
import { useCart } from "./cart-provider"
import { formatPrice } from "../../lib/utils"
import { Separator } from "../ui/separator"

export default function CartItems() {
  const { cartItems, updateQuantity, removeFromCart } = useCart()

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 rounded-full bg-muted p-6">
          <Trash2 className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="mb-2 text-xl font-medium">Votre panier est vide</h3>
        <p className="mb-6 text-muted-foreground">
          Vous n'avez pas encore ajouté de produits à votre panier.
        </p>
        <Button asChild>
          <a href="/client/produits">Parcourir les produits</a>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {cartItems.map((item) => (
        <div key={item.product.id} className="rounded-lg border p-4">
          <div className="flex items-start gap-4">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
              <Image
                src={item.product.image || "/placeholder.svg?height=96&width=96"}
                alt={item.product.name}
                width={96}
                height={96}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="flex flex-1 flex-col">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-base font-medium">
                    <a href={`/client/produits/${item.product.id}`}>{item.product.name}</a>
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.product.category}</p>
                </div>
                <p className="text-base font-medium">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-none rounded-l-md"
                    onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                    <span className="sr-only">Diminuer</span>
                  </Button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-none rounded-r-md"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    <Plus className="h-3 w-3" />
                    <span className="sr-only">Augmenter</span>
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => removeFromCart(item.product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Supprimer</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between pt-4">
        <Button variant="outline" asChild>
          <a href="/client/produits">Continuer vos achats</a>
        </Button>
        <Button variant="ghost" className="text-muted-foreground" onClick={() => window.location.reload()}>
          Actualiser le panier
        </Button>
      </div>
    </div>
  )
}