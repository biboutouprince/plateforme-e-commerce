import { getOrders } from "../../../lib/services/order-service"
import OrdersTable from "../../../components/admin/orders-table"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"

export const metadata = {
  title: "Gestion des commandes - Admin ElectroShop",
  description: "Gérez les commandes de votre boutique",
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined
  const status = typeof searchParams.status === "string" ? searchParams.status : undefined

  const orders = await getOrders({ search, status })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des commandes</h1>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="Rechercher une commande..." className="max-w-sm" defaultValue={search || ""} />
        </div>
        <Select defaultValue={status || "all"}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="processing">En traitement</SelectItem>
            <SelectItem value="shipped">Expédiée</SelectItem>
            <SelectItem value="delivered">Livrée</SelectItem>
            <SelectItem value="cancelled">Annulée</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">Filtrer</Button>
      </div>

      <OrdersTable orders={orders} />
    </div>
  )
}

