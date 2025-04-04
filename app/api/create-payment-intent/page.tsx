import { NextResponse } from "next/server"
import Stripe from "stripe"

// Initialiser Stripe avec votre clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16", // Utilisez la version la plus récente de l'API
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { amount, currency, customer_email, metadata } = body

    // Convertir le montant en centimes pour Stripe (ex: 10.99€ -> 1099)
    const amountInCents = Math.round(amount * 100)

    // Créer l'intention de paiement
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: currency || "eur",
      receipt_email: customer_email,
      metadata: metadata || {},
      automatic_payment_methods: {
        enabled: true,
      },
    })

    // Renvoyer le client secret au client
    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error("Erreur lors de la création de l'intention de paiement:", error)
    return NextResponse.json({ error: "Erreur lors de la création de l'intention de paiement" }, { status: 500 })
  }
}

