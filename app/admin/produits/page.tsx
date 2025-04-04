import { Button } from "../../../components/ui/button"
import { PlusCircle } from "lucide-react"
import { getProducts } from "../../../lib/services/product-service"
import ProductsTable from "../../../components/admin/products-table"
import Link from "next/link"
import { Input } from "../../../components/ui/input"

export const metadata = {
  title: "Gestion des produits - Admin ElectroShop",
  description: "Gérez les produits de votre boutique",
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined
  const category = typeof searchParams.category === "string" ? searchParams.category : undefined

  const products = await getProducts({ search, category })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des produits</h1>
        <Button asChild>
          <Link href="/admin/produits/nouveau">
            <PlusCircle className="h-4 w-4 mr-2" />
            Ajouter un produit
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input placeholder="Rechercher un produit..." className="max-w-sm" defaultValue={search || ""} />
        </div>
        <Button variant="outline">Rechercher</Button>
      </div>

      <ProductsTable products={products} />
    </div>
  )
}

