"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useStripe, useElements, Elements, CardElement } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { toast } from "../ui/use-toast"
import { Loader2, Check } from "lucide-react"

// Chargement de Stripe (dans une application réelle, utilisez votre clé publique Stripe)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_51R9MYvPvUjTJ39ClWzVzqcR2F4jei5jnZqxIrbruASy2TE1RUbwrs7jt0eAiCSdG8Ad4dSv4Ib9OLa3fwXUCLbgo00f0ti8dSk")

const checkoutSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  address: z.string().min(5, "Veuillez entrer une adresse valide"),
  city: z.string().min(2, "Veuillez entrer une ville valide"),
  postalCode: z.string().min(5, "Veuillez entrer un code postal valide"),
  country: z.string().min(2, "Veuillez entrer un pays valide"),
})

type CheckoutFormValues = z.infer<typeof checkoutSchema>

export function StripeCheckoutForm() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const router = useRouter()
  const stripe = useStripe()
  const elements = useElements()

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
  })

  const onSubmit = async (data: CheckoutFormValues) => {
    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    try {
      // Créer une intention de paiement côté serveur
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 1079.99,
          currency: "eur",
          customer_email: data.email,
          metadata: {
            address: `${data.address}, ${data.city}, ${data.postalCode}, ${data.country}`,
            customer_name: data.name,
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la création de l'intention de paiement")
      }

      const { clientSecret } = await response.json()

      // Confirmer le paiement avec Stripe
      const cardElement = elements.getElement(CardElement)

      if (!cardElement) {
        throw new Error("Élément de carte non trouvé")
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: data.name,
            email: data.email,
            address: {
              line1: data.address,
              city: data.city,
              postal_code: data.postalCode,
              country: data.country,
            },
          },
        },
      })

      if (error) {
        throw new Error(error.message)
      }

      if (paymentIntent.status === "succeeded") {
        setPaymentSuccess(true)

        toast({
          title: "Paiement réussi",
          description: "Votre commande a été traitée avec succès.",
        })

        // Rediriger vers une page de confirmation après un court délai
        setTimeout(() => {
          router.push("/client/commande/confirmation")
        }, 2000)
      }
    } catch (error) {
      console.error("Erreur de paiement:", error)
      toast({
        title: "Erreur de paiement",
        description:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors du traitement de votre paiement. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom complet</FormLabel>
                <FormControl>
                  <Input placeholder="ange gabriel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="angegabriel@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input placeholder="alibandeng" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville</FormLabel>
                  <FormControl>
                    <Input placeholder="libreville" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code postal</FormLabel>
                  <FormControl>
                    <Input placeholder="75001" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pays</FormLabel>
                <FormControl>
                  <Input placeholder="GABON" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <div>
            <FormLabel htmlFor="card-element">Informations de carte</FormLabel>
            <div className="mt-1 p-3 border rounded-md">
              <CardElement id="card-element" options={cardElementOptions} />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isProcessing || paymentSuccess || !stripe}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Traitement en cours...
              </>
            ) : paymentSuccess ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Paiement réussi
              </>
            ) : (
              "Payer maintenant"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export function CheckoutForm() {
  return (
    <Elements stripe={stripePromise}>
      <StripeCheckoutForm />
    </Elements>
  )
}

