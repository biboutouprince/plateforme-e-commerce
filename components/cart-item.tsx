"use client"

import Image from "next/image"
import { Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CartItem as CartItemType } from "@/components/client/cart-provider"
import { formatPrice } from "@/lib/utils"

interface CartItemProps {
  data: CartItemType
  onRemove: () => void
}

export function CartItem({ data, onRemove }: CartItemProps) {
  const { id, name, price, image, quantity } = data

  return (
    <li className="flex py-6">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-32 sm:w-32">
        <Image fill src={image || "/placeholder.svg"} alt={name} className="object-cover object-center" />
      </div>

      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="relative flex justify-between">
          <div className="pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6">
            <div>
              <h3 className="text-base font-medium text-gray-900">{name}</h3>
              {data.color && <p className="mt-1 text-sm text-gray-500">Couleur: {data.color}</p>}
            </div>

            <div className="mt-1 flex text-sm sm:mt-0 sm:items-end">
              <p className="font-medium text-gray-900">{formatPrice(price)}</p>
            </div>
          </div>

          <div className="absolute right-0 top-0">
            <Button onClick={onRemove} variant="ghost" size="icon" className="text-gray-400 hover:text-gray-500">
              <X size={18} />
              <span className="sr-only">Supprimer</span>
            </Button>
          </div>
        </div>

        <div className="flex items-center mt-4">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => {
                // Ici, vous pourriez appeler updateQuantity(id, quantity - 1)
              }}
            >
              <Minus size={14} />
              <span className="sr-only">Diminuer la quantité</span>
            </Button>

            <span className="w-8 text-center">{quantity}</span>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-none"
              onClick={() => {
                // Ici, vous pourriez appeler updateQuantity(id, quantity + 1)
              }}
            >
              <Plus size={14} />
              <span className="sr-only">Augmenter la quantité</span>
            </Button>
          </div>

          <p className="ml-4 text-sm font-medium text-gray-900">{formatPrice(price * quantity)}</p>
        </div>
      </div>
    </li>
  )
}

