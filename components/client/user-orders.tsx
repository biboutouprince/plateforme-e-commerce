"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { formatDate, formatPrice } from "../../lib/utils"
import Link from "next/link"
import { Loader2 } from "lucide-react"
import type { Order } from "../../lib/types"

interface UserOrdersProps {
  userId: string
}

export default function UserOrders({ userId }: UserOrdersProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Simuler un délai de chargement
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Dans une application réelle, vous feriez un appel API ici
        // const response = await fetch(`/api/users/${userId}/orders`)
        // const data = await response.json()

        // Pour l'exemple, nous utilisons des données simulées
        const mockOrders: Order[] = [
          {
            id: "ORD-001",
            userId: userId,
            user: {
              id: userId,
              name: "Utilisateur",
              email: "user@example.com",
              role: "user",
              createdAt: new Date(),
            },
            items: [
              {
                productId: "1",
                name: "Smartphone XYZ Pro",
                price: 899.99,
                quantity: 1,
              },
            ],
            total: 899.99,
            status: "delivered",
            paymentStatus: "paid",
            shippingAddress: {
              id: "addr-1",
              userId: userId,
              name: "Utilisateur",
              street: "123 Rue du Commerce",
              city: "Paris",
              postalCode: "75001",
              country: "France",
              isDefault: true,
            },
            createdAt: new Date("2023-11-15"),
            updatedAt: new Date("2023-11-17"),
          },
          {
            id: "ORD-002",
            userId: userId,
            user: {
              id: userId,
              name: "Utilisateur",
              email: "user@example.com",
              role: "user",
              createdAt: new Date(),
            },
            items: [
              {
                productId: "3",
                name: "Tablette MediaPad",
                price: 349.99,
                quantity: 1,
              },
              {
                productId: "4",
                name: "Écouteurs Sans Fil Pro",
                price: 149.99,
                quantity: 1,
              },
            ],
            total: 499.98,
            status: "shipped",
            paymentStatus: "paid",
            shippingAddress: {
              id: "addr-1",
              userId: userId,
              name: "Utilisateur",
              street: "123 Rue du Commerce",
              city: "Paris",
              postalCode: "75001",
              country: "France",
              isDefault: true,
            },
            trackingNumber: "TRK12345678",
            createdAt: new Date("2023-11-25"),
            updatedAt: new Date("2023-11-26"),
          },
          {
            id: "ORD-003",
            userId: userId,
            user: {
              id: userId,
              name: "Utilisateur",
              email: "user@example.com",
              role: "user",
              createdAt: new Date(),
            },
            items: [
              {
                productId: "2",
                name: "Ordinateur Portable UltraBook",
                price: 1299.99,
                quantity: 1,
              },
            ],
            total: 1299.99,
            status: "processing",
            paymentStatus: "paid",
            shippingAddress: {
              id: "addr-1",
              userId: userId,
              name: "Utilisateur",
              street: "123 Rue du Commerce",
              city: "Paris",
              postalCode: "75001",
              country: "France",
              isDefault: true,
            },
            createdAt: new Date("2023-12-01"),
            updatedAt: new Date("2023-12-01"),
          },
        ]

        setOrders(mockOrders)
        setIsLoading(false)
      } catch (error) {
        console.error("Erreur lors du chargement des commandes:", error)
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [userId])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">En attente</Badge>
      case "processing":
        return <Badge variant="secondary">En traitement</Badge>
      case "shipped":
        return <Badge variant="default">Expédiée</Badge>
      case "delivered":
        return <Badge className="bg-green-500 hover:bg-green-600">Livrée</Badge>
      case "cancelled":
        return <Badge variant="destructive">Annulée</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true
    return order.status === activeTab
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="processing">En traitement</TabsTrigger>
          <TabsTrigger value="shipped">Expédiées</TabsTrigger>
          <TabsTrigger value="delivered">Livrées</TabsTrigger>
          <TabsTrigger value="cancelled">Annulées</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Commande #{order.id}</CardTitle>
                        <CardDescription>Passée le {formatDate(order.createdAt)}</CardDescription>
                      </div>
                      <div className="flex flex-col items-end">
                        {getStatusBadge(order.status)}
                        <span className="text-sm mt-1">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Articles</h4>
                        <ul className="space-y-2">
                          {order.items.map((item) => (
                            <li key={item.productId} className="flex justify-between">
                              <div>
                                <span className="font-medium">{item.name}</span>
                                <span className="text-muted-foreground ml-2">x{item.quantity}</span>
                              </div>
                              <span>{formatPrice(item.price * item.quantity)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {order.status === "shipped" && order.trackingNumber && (
                        <div className="border-t pt-4">
                          <h4 className="font-medium mb-2">Suivi</h4>
                          <p className="text-sm">
                            Numéro de suivi: <span className="font-mono">{order.trackingNumber}</span>
                          </p>
                        </div>
                      )}

                      <div className="flex justify-between border-t pt-4">
                        <Button variant="outline" asChild>
                          <Link href={`/client/commandes/${order.id}`}>Voir les détails</Link>
                        </Button>
                        {order.status === "delivered" && <Button variant="outline">Retourner un article</Button>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Aucune commande trouvée</h3>
              <p className="text-muted-foreground mb-4">
                {activeTab === "all"
                  ? "Vous n'avez pas encore passé de commande."
                  : `Vous n'avez pas de commande avec le statut "${activeTab}".`}
              </p>
              <Button asChild>
                <Link href="/client/produits">Découvrir nos produits</Link>
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

