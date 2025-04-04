"use client"

import { CardElement } from "@stripe/react-stripe-js"
import { FormLabel } from "../ui/form"

interface PaymentCardProps {
  onChange?: (event: any) => void
  error?: string
}

export function PaymentCard({ onChange, error }: PaymentCardProps) {
  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
    hidePostalCode: true,
  }

  return (
    <div className="space-y-2">
      <FormLabel>Informations de carte</FormLabel>
      <div className="p-3 border rounded-md bg-white">
        <CardElement id="card-element" options={cardElementOptions} onChange={onChange} />
      </div>
      {error && <p className="text-sm font-medium text-destructive">{error}</p>}
      <div className="text-xs text-muted-foreground mt-2">
        Paiement sécurisé via Stripe. Nous ne stockons pas vos informations de carte.
      </div>
    </div>
  )
}

