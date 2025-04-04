"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer votre adresse email",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simuler un délai d'envoi
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Dans une application réelle, vous feriez un appel API ici
      // await fetch('/api/newsletter', {
      //   method: 'POST',
      //   body: JSON.stringify({ email }),
      // })

      toast({
        title: "Inscription réussie",
        description: "Merci de vous être inscrit à notre newsletter !",
      })

      setEmail("")
    } catch (error) {
      console.error("Erreur lors de l'inscription à la newsletter:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription à la newsletter",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-muted rounded-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
            <p className="text-muted-foreground mb-8">
              Inscrivez-vous à notre newsletter pour recevoir les dernières actualités, offres spéciales et conseils sur
              les produits électroniques.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Inscription..." : "S'inscrire"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

