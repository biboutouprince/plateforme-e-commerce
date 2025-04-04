import { getOrderById } from "../../../../lib/services/order-service"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Button } from "../../../../components/ui/button"
import { Separator } from "../../../../components/ui/separator"
import { Badge } from "../../../../components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../../components/ui/select"
import OrderItemsTable from "../../../../components/admin/order-items-table"

export const metadata = {
  title: "Détail de commande - Admin ElectroShop",
  description: "Détails d'une commande",
}

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = await getOrderById(params.id)

  if (!order) {
    notFound()
  }

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Commande #{order.id}</h1>
        <div className="flex items-center gap-4">
          <Select defaultValue={order.status}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="processing">En traitement</SelectItem>
              <SelectItem value="shipped">Expédiée</SelectItem>
              <SelectItem value="delivered">Livrée</SelectItem>
              <SelectItem value="cancelled">Annulée</SelectItem>
            </SelectContent>
          </Select>
          <Button>Mettre à jour</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Nom:</span> {order.shippingAddress.name}
              </div>
              <div>
                <span className="font-medium">Email:</span> {order.user.email}
              </div>
              <div>
                <span className="font-medium">Téléphone:</span> {order.user.phone || "Non renseigné"}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Détails de la commande</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Statut:</span> {getStatusBadge(order.status)}
              </div>
              <div>
                <span className="font-medium">Paiement:</span> {order.paymentStatus === "paid" ? "Payé" : "En attente"}
              </div>
              <div>
                <span className="font-medium">Total:</span> {order.total.toFixed(2)} €
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Adresse de livraison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p>{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.postalCode} {order.shippingAddress.city}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Articles commandés</CardTitle>
        </CardHeader>
        <CardContent>
          <OrderItemsTable items={order.items} />

          <Separator className="my-4" />

          <div className="flex justify-end">
            <div className="w-[200px] space-y-2">
              <div className="flex justify-between">
                <span>Sous-total:</span>
                <span>{(order.total - 5.99).toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison:</span>
                <span>5.99 €</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>{order.total.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

