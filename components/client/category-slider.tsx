"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import type { Category } from "@/lib/types"

interface CategorySliderProps {
  title: string
  categories: Category[]
  className?: string
}

export default function CategorySlider({ title, categories, className }: CategorySliderProps) {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [maxScroll, setMaxScroll] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const updateMaxScroll = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        const scrollWidth = containerRef.current.scrollWidth
        setMaxScroll(scrollWidth - containerWidth)
      }
    }

    // Initial update
    updateMaxScroll()

    // Update on resize
    window.addEventListener("resize", updateMaxScroll)
    return () => window.removeEventListener("resize", updateMaxScroll)
  }, [categories])

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current && !isAnimating) {
      setIsAnimating(true)

      const cardWidth = 220 // Approximate width of a card + gap
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth

      const newPosition = Math.max(0, Math.min(scrollPosition + scrollAmount, maxScroll))
      setScrollPosition(newPosition)

      containerRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      })

      // Reset animation flag after animation completes
      setTimeout(() => setIsAnimating(false), 500)
    }
  }

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollLeft)
    }
  }

  return (
    <div className={cn("relative", className)}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => scroll("left")}
            disabled={scrollPosition <= 0}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Précédent</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => scroll("right")}
            disabled={scrollPosition >= maxScroll}
          >
            <ChevronRight className="h-5 w-5" />
            <span className="sr-only">Suivant</span>
          </Button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        onScroll={handleScroll}
      >
        {categories.map((category) => (
          <div
            key={category.id}
            className="min-w-[220px] w-[220px] snap-start p-2 transition-transform duration-300 ease-out"
          >
            <Link href={`/client/categories/${category.id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border h-full">
                <div className="relative h-32 bg-muted">
                  <Image
                    src={category.image || `/images/categories/${category.id}.jpg`}
                    alt={category.name}
                    fill
                    sizes="220px"
                    className="object-cover transition-transform hover:scale-105 duration-300"
                    onError={(e) => {
                      // Fallback vers un placeholder si l'image n'est pas trouvée
                      e.currentTarget.src = `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(category.name)}`
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <h3 className="text-white font-medium">{category.name}</h3>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm text-muted-foreground">{category.productCount} produits</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Gradient overlays to indicate more content */}
      {scrollPosition < maxScroll && (
        <div className="absolute right-0 top-[60px] bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      )}
      {scrollPosition > 0 && (
        <div className="absolute left-0 top-[60px] bottom-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      )}
    </div>
  )
}

