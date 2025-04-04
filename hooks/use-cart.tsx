"use client"

import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { toast } from "@/components/ui/use-toast"
import Cookies from "js-cookie"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  category?: string
  color?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (data: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  itemCount: number
}

// Créer un storage personnalisé qui utilise les cookies
const cookieStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return Cookies.get(name) || null
  },
  setItem: async (name: string, value: string): Promise<void> => {
    Cookies.set(name, value, { expires: 7, path: "/" }) // Expire après 7 jours
  },
  removeItem: async (name: string): Promise<void> => {
    Cookies.remove(name, { path: "/" })
  },
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      itemCount: 0,
      cartTotal: 0,

      addItem: (data: CartItem) => {
        const currentItems = get().items
        const existingItem = currentItems.find((item) => item.id === data.id)

        if (existingItem) {
          // Si l'article existe déjà, augmenter la quantité
          return set((state) => {
            const updatedItems = state.items.map((item) => {
              if (item.id === data.id) {
                return { ...item, quantity: item.quantity + 1 }
              }
              return item
            })

            toast({
              title: "Quantité mise à jour",
              description: `${data.name} (${existingItem.quantity + 1})`,
            })

            return {
              items: updatedItems,
              itemCount: updatedItems.reduce((total, item) => total + item.quantity, 0),
              cartTotal: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
            }
          })
        }

        // Si l'article n'existe pas, l'ajouter au panier
        set((state) => {
          const newItem = { ...data, quantity: 1 }
          const updatedItems = [...state.items, newItem]

          toast({
            title: "Article ajouté au panier",
            description: data.name,
          })

          return {
            items: updatedItems,
            itemCount: updatedItems.reduce((total, item) => total + item.quantity, 0),
            cartTotal: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
          }
        })
      },

      removeItem: (id: string) => {
        set((state) => {
          const itemToRemove = state.items.find((item) => item.id === id)
          const updatedItems = state.items.filter((item) => item.id !== id)

          if (itemToRemove) {
            toast({
              title: "Article retiré du panier",
              description: itemToRemove.name,
              variant: "destructive",
            })
          }

          return {
            items: updatedItems,
            itemCount: updatedItems.reduce((total, item) => total + item.quantity, 0),
            cartTotal: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
          }
        })
      },

      updateQuantity: (id: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            // Si la quantité est 0 ou moins, supprimer l'article
            return {
              ...state,
              items: state.items.filter((item) => item.id !== id),
              itemCount: state.items.filter((item) => item.id !== id).reduce((total, item) => total + item.quantity, 0),
              cartTotal: state.items
                .filter((item) => item.id !== id)
                .reduce((total, item) => total + item.price * item.quantity, 0),
            }
          }

          // Sinon, mettre à jour la quantité
          const updatedItems = state.items.map((item) => {
            if (item.id === id) {
              return { ...item, quantity }
            }
            return item
          })

          return {
            items: updatedItems,
            itemCount: updatedItems.reduce((total, item) => total + item.quantity, 0),
            cartTotal: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
          }
        })
      },

      clearCart: () => {
        set({
          items: [],
          itemCount: 0,
          cartTotal: 0,
        })

        toast({
          title: "Panier vidé",
          description: "Tous les articles ont été retirés du panier",
        })
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
)

