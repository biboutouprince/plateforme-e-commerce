import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PromoBanner() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-primary text-primary-foreground rounded-xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 z-0"></div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Offres spéciales</h2>
            <p className="text-primary-foreground/90 text-lg mb-8">
              Profitez de nos promotions exclusives sur une large gamme de produits électroniques. Jusqu'à 30% de
              réduction sur les smartphones, ordinateurs portables et accessoires.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link href="/client/promotions">Voir les promotions</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

