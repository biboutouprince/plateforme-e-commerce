"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { formatDate, formatPrice } from "../../lib/utils"
import { MoreHorizontal, Eye, Truck, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import type { Order } from "../../lib/types"

interface OrdersTableProps {
  orders: Order[]
}

export default function OrdersTable({ orders }: OrdersTableProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

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

  const updateOrderStatus = async (orderId: string, status: string) => {
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du statut")
      }

      router.refresh()
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Commande</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Paiement</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  <Link href={`/admin/commandes/${order.id}`} className="hover:underline">
                    {order.id}
                  </Link>
                </TableCell>
                <TableCell>{order.user.name}</TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell>
                  <Badge variant={order.paymentStatus === "paid" ? "outline" : "secondary"}>
                    {order.paymentStatus === "paid" ? "Payé" : "En attente"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{formatPrice(order.total)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" disabled={isUpdating}>
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/commandes/${order.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Voir les détails
                        </Link>
                      </DropdownMenuItem>
                      {order.status === "pending" && (
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "processing")}>
                          <Truck className="h-4 w-4 mr-2" />
                          Marquer en traitement
                        </DropdownMenuItem>
                      )}
                      {order.status === "processing" && (
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "shipped")}>
                          <Truck className="h-4 w-4 mr-2" />
                          Marquer comme expédiée
                        </DropdownMenuItem>
                      )}
                      {order.status === "shipped" && (
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "delivered")}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Marquer comme livrée
                        </DropdownMenuItem>
                      )}
                      {(order.status === "pending" || order.status === "processing") && (
                        <DropdownMenuItem onClick={() => updateOrderStatus(order.id, "cancelled")}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Annuler la commande
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Aucune commande trouvée
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

