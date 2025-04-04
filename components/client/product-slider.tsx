"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"
import type { Product } from "@/lib/types"

interface ProductSliderProps {
  title: string
  products: Product[]
  className?: string
}

export default function ProductSlider({ title, products, className }: ProductSliderProps) {
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
  }, [products])

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current && !isAnimating) {
      setIsAnimating(true)

      const cardWidth = 280 // Approximate width of a card + gap
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
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[280px] w-[280px] snap-start p-2 transition-transform duration-300 ease-out"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col border border-border">
              <div className="relative h-48 bg-muted">
                <Link href={`/client/produits/${product.id}`}>
                  <Image
                    src={product.image || "/placeholder.svg?height=300&width=300"}
                    alt={product.name}
                    fill
                    sizes="280px"
                    className="object-cover transition-transform hover:scale-105 duration-300"
                  />
                </Link>
                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.discount}%
                  </div>
                )}
              </div>
              <div className="p-4 flex-grow flex flex-col">
                <Link href={`/client/produits/${product.id}`} className="hover:underline">
                  <h3 className="font-medium line-clamp-1">{product.name}</h3>
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1 mb-2 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center">
                    <span className="font-bold">{formatPrice(product.price)}</span>
                    {product.oldPrice && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                  </div>
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < Math.floor(product.rating) ? "★" : "☆"}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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

