import { Suspense } from "react"
import { CheckoutForm } from "../../../components/client/checkout-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Separator } from "../../../components/ui/separator"
import { formatPrice } from "../../../lib/utils"
import { PaymentMethods } from "../../../components/client/payment-methods"
import { getCartItems } from "@/lib/cart"

export const metadata = {
  title: "Paiement - ElectroShop",
  description: "Finaliser votre commande en toute sécurité",
}

export default async function PaymentPage() {
  // Récupérer les articles du panier depuis le serveur
  const cartItems = await getCartItems()

  // Calculer les totaux
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.2 // TVA à 20%
  const total = subtotal + shipping + tax

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finaliser votre commande</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informations de paiement</CardTitle>
              <CardDescription>Vos informations de paiement sont sécurisées et cryptées</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Chargement du formulaire de paiement...</div>}>
                <CheckoutForm />
              </Suspense>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Récapitulatif de la commande</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.length === 0 ? (
                  <p className="text-muted-foreground">Votre panier est vide.</p>
                ) : (
                  <>
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Quantité: {item.quantity}</p>
                        </div>
                        <p>{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <p>Sous-total</p>
                        <p>{formatPrice(subtotal)}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>Livraison</p>
                        <p>{shipping === 0 ? "Gratuite" : formatPrice(shipping)}</p>
                      </div>
                      <div className="flex justify-between">
                        <p>TVA (20%)</p>
                        <p>{formatPrice(tax)}</p>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold">
                        <p>Total</p>
                        <p>{formatPrice(total)}</p>
                      </div>
                    </div>

                    <PaymentMethods />
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
