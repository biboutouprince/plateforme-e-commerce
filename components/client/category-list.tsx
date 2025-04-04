"use client"

import { Card } from "../ui/card"
import { Laptop, Smartphone, Tablet, Headphones, Tv, Gamepad, Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const categories = [
  {
    id: "smartphones",
    name: "Smartphones",
    icon: Smartphone,
    image: "/images/categories/smartphones.png",
    productCount: 12,
  },
  {
    id: "ordinateurs",
    name: "Ordinateurs Portables",
    icon: Laptop,
    image: "/images/categories/computers.png",
    productCount: 8,
  },
  {
    id: "tablettes",
    name: "Tablettes",
    icon: Tablet,
    image: "/images/categories/tablets.png",
    productCount: 6,
  },
  {
    id: "accessoires",
    name: "Accessoires",
    icon: Headphones,
    image: "/images/categories/accessories.png",
    productCount: 24,
  },
  {
    id: "audio",
    name: "Audio",
    icon: Headphones,
    image: "/images/categories/audio.png",
    productCount: 15,
  },
  {
    id: "televiseurs",
    name: "Téléviseurs",
    icon: Tv,
    image: "/images/tvs.png",
    productCount: 10,
  },
  {
    id: "gaming",
    name: "Gaming",
    icon: Gamepad,
    image: "/images/categories/gaming.png",
    productCount: 18,
  },
  {
    id: "maison-connectee",
    name: "Maison Connectée",
    icon: Home,
    image: "/images/categories/home.png",
    productCount: 14,
  },
]

export default function CategoryList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link key={category.id} href={`/client/categories/${category.id}`}>
          <Card className="overflow-hidden transition-transform hover:scale-105 duration-300">
            <div className="relative h-40">
              <Image
                src={category.image || `/images/categories/${category.id}.jpg`}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                <div className="flex flex-col text-white">
                  <div className="flex items-center">
                    <category.icon className="h-5 w-5 mr-2" aria-hidden="true" />
                    <h3 className="font-medium">{category.name}</h3>
                  </div>
                  <span className="text-sm text-white/80">{category.productCount} produits</span>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

