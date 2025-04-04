// components/client/product-card.tsx
import Link from "next/link"
import Image from "next/image"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { ShoppingCart } from 'lucide-react'
import AddToCartButton from "./add-to-cart-button"
import type { Product } from "../../lib/types"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.discount > 0 ? product.discount : 
    (product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0)

  return (
    <div className="group bg-card border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/client/produits/${product.id}`} className="block relative">
        <div className="aspect-square overflow-hidden bg-white">
          <Image
            src={product.image || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            width={300}
            height={300}
            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {discountPercentage > 0 && (
          <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
            -{discountPercentage}%
          </Badge>
        )}
        
        {!product.inStock && (
          <Badge variant="outline" className="absolute top-2 left-2 bg-background/80">
            Rupture de stock
          </Badge>
        )}
      </Link>
      
      <div className="p-4">
        <Link href={`/client/produits/${product.id}`} className="block">
          <h3 className="font-medium line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400 mr-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < Math.floor(product.rating) ? "★" : "☆"}</span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
          </div>
          
          <div className="flex items-center mb-3">
            <span className="font-bold text-lg">{product.price.toFixed(2)} €</span>
            {product.oldPrice && (
              <span className="text-muted-foreground line-through ml-2 text-sm">
                {product.oldPrice.toFixed(2)} €
              </span>
            )}
          </div>
        </Link>
        
        <AddToCartButton product={product} variant="outline" className="w-full" />
      </div>
    </div>
  )
}