import Link from "next/link"
import { getCategories } from "../../../lib/services/category-service"
import { Card, CardContent } from "../../../components/ui/card"
import FallbackImage from "../../../components/client/fallback-image"

export const metadata = {
  title: "Catégories - ElectroShop",
  description: "Parcourez nos catégories de produits électroniques",
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Catégories</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Parcourez nos différentes catégories de produits électroniques pour trouver exactement ce que vous cherchez.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/client/categories/${category.id}`}>
            <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-48 bg-muted">
                <FallbackImage
                  src={category.image || `/images/categories/${category.id}.jpg`}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover"
                  fallbackSrc={`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(category.name)}`}
                />
              </div>
              <CardContent className="p-4 text-center">
                <h2 className="text-xl font-semibold">{category.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">{category.productCount} produits</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-16 bg-muted rounded-lg p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Besoin d'aide pour choisir ?</h2>
            <p className="text-muted-foreground mb-4">
              Notre équipe d'experts est disponible pour vous guider dans votre choix de produits électroniques.
            </p>
            <Link
              href="/client/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Contactez-nous
            </Link>
          </div>
          <FallbackImage
            src="/images/ass.png?height=200&width=300&text=Assistance"
            alt="Assistance"
            width={300}
            height={200}
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  )
}

