import { Button } from "../../../components/ui/button"
import { PlusCircle } from "lucide-react"
import { getPromotions } from "../../../lib/services/promotion-service"
import PromotionsTable from "../../../components/admin/promotions-table"
import Link from "next/link"
import { Input } from "../../../components/ui/input"

export const metadata = {
  title: "Gestion des promotions - Admin ElectroShop",
  description: "Gérez les promotions de votre boutique",
}

export default async function AdminPromotionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined
  const status = typeof searchParams.status === "string" ? searchParams.status : undefined

  const promotions = await getPromotions({ search, status })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des promotions</h1>
        <Button asChild>
          <Link href="/admin/promotions/nouvelle">
            <PlusCircle className="h-4 w-4 mr-2" />
            Ajouter une promotion
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input placeholder="Rechercher une promotion..." className="max-w-sm" defaultValue={search || ""} />
        </div>
        <Button variant="outline">Rechercher</Button>
      </div>

      <PromotionsTable promotions={promotions} />
    </div>
  )
}

