"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
  image: string
  title: string
  description: string
  buttonText: string
  buttonLink: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
}

const slides: Slide[] = [
  {
    image: "/images/b.png?height=600&width=1200",
    title: "Découvrez les dernières innovations technologiques",
    description: "Smartphones, ordinateurs, accessoires et bien plus encore à des prix compétitifs",
    buttonText: "Voir les produits",
    buttonLink: "/client/produits",
    secondaryButtonText: "Promotions",
    secondaryButtonLink: "/client/promotions",
  },
  {
    image: "/images/bb2.png?height=600&width=1200",
    title: "Nouveaux smartphones à prix réduits",
    description: "Profitez de nos offres exclusives sur les derniers modèles de smartphones",
    buttonText: "Découvrir",
    buttonLink: "/client/produits?category=smartphones",
  },
  {
    image: "/images/bb3.png?height=600&width=1200",
    title: "Accessoires high-tech",
    description: "Complétez votre équipement avec notre sélection d'accessoires de qualité",
    buttonText: "Voir les accessoires",
    buttonLink: "/client/produits?category=accessoires",
  },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Fonction pour passer à la diapositive suivante
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  // Fonction pour passer à la diapositive précédente
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  // Défilement automatique
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000) // Change de diapositive toutes les 5 secondes

    return () => clearInterval(interval)
  }, [])

  const slide = slides[currentSlide]

  return (
    <div className="relative h-[500px] rounded-xl overflow-hidden">
      {/* Fond d'image avec transition */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${slide.image})`,
          opacity: 1,
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />

      {/* Contenu */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 transition-all duration-500">
          {slide.title}
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-xl transition-all duration-500">{slide.description}</p>
        <div className="flex flex-wrap gap-4">
          <Button size="lg" asChild>
            <Link href={slide.buttonLink}>{slide.buttonText}</Link>
          </Button>
          {slide.secondaryButtonText && (
            <Button size="lg" variant="outline" className="text-blue border-blue hover:bg-white/10" asChild>
              <Link href={slide.secondaryButtonLink || "#"}>{slide.secondaryButtonText}</Link>
            </Button>
          )}
        </div>
      </div>

      {/* Contrôles de navigation */}
      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? "bg-white scale-110" : "bg-white/50"
            }`}
            aria-label={`Aller à la diapositive ${index + 1}`}
          />
        ))}
      </div>

      {/* Boutons précédent/suivant */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
        aria-label="Diapositive précédente"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
        aria-label="Diapositive suivante"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}

