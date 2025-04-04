import { getReviews } from "../../../lib/services/review-service"
import ReviewsTable from "../../../components/admin/reviews-table"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"

export const metadata = {
  title: "Modération des avis - Admin ElectroShop",
  description: "Gérez les avis clients de votre boutique",
}

export default async function AdminReviewsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined
  const status = typeof searchParams.status === "string" ? searchParams.status : undefined

  const reviews = await getReviews({ search, status })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Modération des avis</h1>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="Rechercher un avis..." className="max-w-sm" defaultValue={search || ""} />
        </div>
        <Select defaultValue={status || "all"}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="approved">Approuvé</SelectItem>
            <SelectItem value="rejected">Rejeté</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">Filtrer</Button>
      </div>

      <ReviewsTable reviews={reviews} />
    </div>
  )
}

