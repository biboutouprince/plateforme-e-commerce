import ProductForm from "../../../../components/admin/product-form"
import { getCategories } from "../../../../lib/services/category-service"

export const metadata = {
  title: "Ajouter un produit - Admin ElectroShop",
  description: "Ajouter un nouveau produit à votre boutique",
}

export default async function NewProductPage() {
  const categories = await getCategories()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Ajouter un produit</h1>
      <ProductForm categories={categories} />
    </div>
  )
}

