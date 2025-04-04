"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  description?: string
}

interface MainNavProps {
  items?: NavItem[]
}

export default function MainNav({ items }: MainNavProps) {
  const pathname = usePathname()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const defaultItems: NavItem[] = [
    {
      title: "Accueil",
      href: "/client",
      description: "Retour à la page d'accueil",
    },
    {
      title: "Produits",
      href: "/client/produits",
      description: "Découvrez notre gamme de produits",
    },
    {
      title: "Catégories",
      href: "/client/categories",
      description: "Parcourir par catégories",
    },
    {
      title: "Promotions",
      href: "/client/promotions",
      description: "Nos offres spéciales",
    },
    {
      title: "Contact",
      href: "/client/contact",
      description: "Nous contacter",
    },
  ]

  const navItems = items?.length ? items : defaultItems

  return (
    <nav className="flex items-center space-x-6 relative">
      {navItems.map((item, index) => (
        <div
          key={item.href}
          className="relative"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Link
            href={item.href}
            className={cn(
              "transition-colors flex items-center text-sm font-medium py-2",
              pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary",
            )}
          >
            {item.title}
          </Link>
          {/* Barre noire animée */}
          <span
            className={cn(
              "absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-300 ease-out",
              hoveredIndex === index || pathname === item.href ? "w-full" : "w-0",
            )}
          />
        </div>
      ))}
    </nav>
  )
}

