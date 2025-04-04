import PromotionForm from "../../../../components/admin/promotion-form"
import { getCategories } from "../../../../lib/services/category-service"
import { getProducts } from "../../../../lib/services/product-service"

export const metadata = {
  title: "Ajouter une promotion - Admin ElectroShop",
  description: "Ajouter une nouvelle promotion à votre boutique",
}

export default async function NewPromotionPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts({ limit: 100 })])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Ajouter une promotion</h1>
      <PromotionForm categories={categories} products={products} />
    </div>
  )
}

