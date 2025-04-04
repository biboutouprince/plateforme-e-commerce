"use client"

import { Button } from "@/components/ui/button"
import CartItems from "@/components/client/cart-items"
import CartSummary from "@/components/client/cart-summary"
import Link from "next/link"

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Votre Panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartItems />
        </div>

        <div className="lg:col-span-1">
          <CartSummary />

          <div className="mt-6 flex flex-col space-y-4">
            <Button size="lg" className="w-full" asChild>
              <Link href="/client/paiement">Procéder au paiement</Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full" asChild>
              <Link href="/client/produits">Continuer vos achats</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}