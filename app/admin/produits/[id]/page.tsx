import ProductForm from "../../../../components/admin/product-form"
import { getProductById } from "../../../../lib/services/product-service"
import { getCategories } from "../../../../lib/services/category-service"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Modifier un produit - Admin ElectroShop",
  description: "Modifier un produit existant",
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const [product, categories] = await Promise.all([getProductById(params.id), getCategories()])

  if (!product) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Modifier un produit</h1>
      <ProductForm product={product} categories={categories} />
    </div>
  )
}

