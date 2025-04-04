// components/client/cart-summary.tsx
"use client"

import { useState } from "react"
import { useCart } from "./cart-provider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { formatPrice } from "../../lib/utils"

export default function CartSummary() {
  const { cartItems } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState("")

  // Calculer le sous-total
  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)
  
  // Frais de livraison fixes
  const shipping = cartItems.length > 0 ? 5.99 : 0
  
  // Remise (simulée)
  const discount = promoApplied ? subtotal * 0.1 : 0
  
  // Total
  const total = subtotal + shipping - discount

  const handleApplyPromo = () => {
    if (!promoCode) {
      setPromoError("Veuillez entrer un code promo")
      return
    }

    // Simuler la vérification d'un code promo
    if (promoCode.toUpperCase() === "WELCOME10") {
      setPromoApplied(true)
      setPromoError("")
    } else {
      setPromoError("Code promo invalide")
      setPromoApplied(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Récapitulatif</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Sous-total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Livraison</span>
            <span>{shipping > 0 ? formatPrice(shipping) : "Gratuit"}</span>
          </div>
          {promoApplied && (
            <div className="flex justify-between text-green-600">
              <span>Remise (10%)</span>
              <span>-{formatPrice(discount)}</span>
            </div>
          )}
          <Separator />
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Code promo"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <Button onClick={handleApplyPromo} variant="outline">
              Appliquer
            </Button>
          </div>
          {promoError && <p className="text-sm text-destructive">{promoError}</p>}
          {promoApplied && (
            <p className="text-sm text-green-600">Code promo appliqué avec succès !</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <p className="text-xs text-muted-foreground">
          Les taxes sont calculées à la caisse. Les frais de livraison peuvent varier selon la destination.
        </p>
      </CardFooter>
    </Card>
  )
}