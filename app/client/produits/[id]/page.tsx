import { getProductById, getRelatedProducts } from "@/lib/services/product-service"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductReviews from "@/components/client/product-reviews"
import RelatedProducts from "@/components/client/related-products"
import AddToCartButton from "@/components/client/add-to-cart-button"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    return {
      title: "Produit non trouvé",
    }
  }

  return {
    title: `${product.name} - ElectroShop`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.id, product.category)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl p-4 flex items-center justify-center">
          <Image
            src={product.image || "/placeholder.svg?height=500&width=500"}
            alt={product.name}
            width={500}
            height={500}
            className="object-contain max-h-[500px]"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < Math.floor(product.rating) ? "★" : "☆"}</span>
              ))}
            </div>
            <span className="text-muted-foreground">({product.reviewCount} avis)</span>
          </div>

          <div className="text-3xl font-bold mb-6">{product.price} €</div>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          <div className="mb-6">
            <h3 className="font-medium mb-2">Disponibilité:</h3>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${product.inStock ? "bg-green-500" : "bg-red-500"}`}></div>
              <span>{product.inStock ? "En stock" : "Rupture de stock"}</span>
            </div>
          </div>

          <div className="flex space-x-4 mb-8">
            <AddToCartButton product={product} />
            <Button variant="outline">Ajouter aux favoris</Button>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center mb-2">
              <span className="font-medium mr-2">Catégorie:</span>
              <span>{product.category}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium mr-2">Référence:</span>
              <span>{product.id}</span>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mb-12">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Spécifications</TabsTrigger>
          <TabsTrigger value="reviews">Avis ({product.reviewCount})</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="p-4">
          <div dangerouslySetInnerHTML={{ __html: product.fullDescription || product.description }} />
        </TabsContent>
        <TabsContent value="specifications" className="p-4">
          <table className="w-full border-collapse">
            <tbody>
              {product.specifications?.map((spec, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-muted/50" : ""}>
                  <td className="py-2 px-4 font-medium">{spec.name}</td>
                  <td className="py-2 px-4">{spec.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TabsContent>
        <TabsContent value="reviews" className="p-4">
          <ProductReviews productId={product.id} />
        </TabsContent>
      </Tabs>

      <section>
        <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
        <RelatedProducts products={relatedProducts} />
      </section>
    </div>
  )
}

