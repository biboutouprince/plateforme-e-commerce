import { getCategoryById, getCategories } from "../../../../lib/services/category-service"
import { getProducts } from "../../../../lib/services/product-service"
import { notFound } from "next/navigation"
import ProductCard from "../../../../components/client/product-card"
import { Button } from "../../../../components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import FallbackImage from "../../../../components/client/fallback-image"

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    id: category.id,
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  // Await the params object to ensure id is available
  const resolvedParams = await params
  const id = resolvedParams.id
  const category = await getCategoryById(id)

  if (!category) {
    return {
      title: "Catégorie non trouvée",
      description: "La catégorie que vous recherchez n'existe pas",
    }
  }

  return {
    title: `${category.name} - ElectroShop`,
    description: category.description,
  }
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
  // Await the params object to ensure id is available
  const resolvedParams = await params
  const category = await getCategoryById(resolvedParams.id)

  if (!category) {
    notFound()
  }

  const products = await getProducts({ category: category.id })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/client/categories" className="flex items-center text-muted-foreground hover:text-primary mb-4">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Toutes les catégories
        </Link>

        <div className="relative h-[300px] w-full rounded-xl overflow-hidden mb-6">
          <FallbackImage
            src={category.image || `/images/categories/${category.id}.jpg`}
            alt={category.name}
            fill
            className="object-cover"
            priority
            fallbackSrc={`/placeholder.svg?height=600&width=1200&text=${encodeURIComponent(category.name)}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-8">
              <h1 className="text-4xl font-bold text-white mb-2">{category.name}</h1>
              <p className="text-white/80 max-w-2xl">{category.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Produits dans cette catégorie</h2>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Aucun produit trouvé</h3>
            <p className="text-muted-foreground mb-4">Il n'y a actuellement aucun produit dans cette catégorie.</p>
            <Button asChild>
              <Link href="/client/produits">Voir tous les produits</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

