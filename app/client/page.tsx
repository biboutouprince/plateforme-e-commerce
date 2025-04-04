import { Button } from "../../components/ui/button"
import HeroCarousel from "../../components/client/hero-carousel"
import ProductSlider from "../../components/client/product-slider"
import CategorySlider from "../../components/client/category-slider"
import { getProducts } from "../../lib/services/product-service"
import { getCategories } from "../../lib/services/category-service"
import Image from "next/image"
import Link from "next/link"

export default async function HomePage() {
  const featuredProducts = await getProducts({ featured: true, limit: 8 })
  const newProducts = await getProducts({ sort: "newest", limit: 8 })
  const discountedProducts = await getProducts({ discount: true, limit: 8 })
  const categories = await getCategories()

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <HeroCarousel />
      </section>

      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Parcourir par catégorie</h2>
          <Button variant="outline" asChild>
            <Link href="/client/categories">Voir toutes les catégories</Link>
          </Button>
        </div>
        <CategorySlider title="" categories={categories} />
      </section>

      <section className="mb-16">
        <ProductSlider title="Produits en vedette" products={featuredProducts} />
      </section>

      <section className="mb-16">
        <ProductSlider title="Nouveautés" products={newProducts} />
      </section>

      <section className="mb-16">
        <ProductSlider title="Promotions" products={discountedProducts} />
      </section>

      <section className="mb-12">
        <div className="bg-primary/5 rounded-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold mb-4">Inscrivez-vous à notre newsletter</h2>
              <p className="text-muted-foreground mb-4">Recevez nos offres exclusives et les dernières nouveautés</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="px-4 py-2 border rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="rounded-l-none">S'inscrire</Button>
              </div>
            </div>
            <div className="relative w-full max-w-[300px] h-[200px]">
              <Image
                src="/images/new.png?height=200&width=300"
                alt="Newsletter"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

