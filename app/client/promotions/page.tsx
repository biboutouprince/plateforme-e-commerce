import { getPromotions } from "../../../lib/services/promotion-service"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { formatDate } from "../../../lib/utils"
import { Tag, Clock, Check } from "lucide-react"
import { Badge } from "../../../components/ui/badge"
import Link from "next/link"

export const metadata = {
  title: "Promotions - ElectroShop",
  description: "Découvrez nos offres spéciales et codes promotionnels",
}

export default async function PromotionsPage() {
  const promotions = await getPromotions({ status: "active" })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Nos Promotions</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Découvrez nos offres spéciales et codes promotionnels pour économiser sur vos achats d'électronique. N'oubliez
          pas de copier le code promo avant de passer à la caisse !
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.length > 0 ? (
          promotions.map((promo) => (
            <Card key={promo.id} className="overflow-hidden">
              <CardHeader className="bg-primary/5 border-b">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">
                    {promo.type === "percentage" ? `${promo.value}% OFF` : `${promo.value}€ OFF`}
                  </CardTitle>
                  <Badge variant="outline" className="bg-primary/10">
                    {promo.type === "percentage" ? "Pourcentage" : "Montant fixe"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 font-mono bg-muted p-2 rounded-md justify-center">
                    <Tag className="h-4 w-4" />
                    <span className="text-lg font-bold">{promo.code}</span>
                  </div>

                  <div className="space-y-2 text-sm">
                    {promo.minPurchase > 0 && (
                      <div className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>Achat minimum: {promo.minPurchase}€</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Valable jusqu'au {formatDate(promo.endDate)}</span>
                    </div>
                  </div>

                  {(promo.categories.length > 0 || promo.products.length > 0) && (
                    <div className="text-sm text-muted-foreground">
                      {promo.categories.length > 0 && <p>Applicable aux catégories: {promo.categories.join(", ")}</p>}
                      {promo.products.length > 0 && <p>Applicable à {promo.products.length} produits spécifiques</p>}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 border-t">
                <Button asChild className="w-full">
                  <Link href="/client/produits">Découvrir les produits</Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-medium mb-2">Aucune promotion en cours</h3>
            <p className="text-muted-foreground">Revenez bientôt pour découvrir nos nouvelles offres !</p>
          </div>
        )}
      </div>

      <div className="mt-12 bg-primary/5 rounded-xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-3xl font-bold mb-4">Inscrivez-vous à notre newsletter</h2>
            <p className="text-muted-foreground mb-4">Recevez en avant-première nos offres exclusives et codes promo</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="px-4 py-2 border rounded-l-md w-full focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="rounded-l-none">S'inscrire</Button>
            </div>
          </div>
          <img
            src="/images/new.png?height=200&width=300"
            alt="Newsletter"
            className="w-full max-w-[300px] h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}

