import { getProducts } from "../../../lib/services/product-service"
import ProductCard from "../../../components/client/product-card"
import { Suspense } from "react"
import ProductsLoading from "../../../components/client/products-loading"
import ProductFilters from "../../../components/client/product-filters"
import SearchBar from "../../../components/client/search-bar"

export const metadata = {
  title: "Produits - ElectroShop",
  description: "Parcourez notre sélection de produits électroniques",
}

// Assurez-vous que la fonction est asynchrone
async function ProductsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // Attendre searchParams
  const params = await searchParams;

  const category = typeof params.category === "string" ? params.category : undefined;
  const sort = typeof params.sort === "string" ? params.sort : undefined;
  const search = typeof params.search === "string" ? params.search : undefined;

  const products = await getProducts({ category, sort, search });

  // Rendre vos produits ici
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Nos Produits</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <ProductFilters />
        </div>

        <div className="w-full md:w-3/4">
          <div className="mb-6">
            <SearchBar defaultValue={search} />
          </div>

          <Suspense fallback={<ProductsLoading />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length > 0 ? (
                products.map((product) => <ProductCard key={product.id} product={product} />)
              ) : (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-medium mb-2">Aucun produit trouvé</h3>
                  <p className="text-muted-foreground">Essayez de modifier vos filtres ou votre recherche</p>
                </div>
              )}
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage;
