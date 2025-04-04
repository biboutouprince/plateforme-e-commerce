import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getOrderStats } from "@/lib/services/order-service"
import { getUserStats } from "@/lib/services/user-service"
import { getProductStats } from "@/lib/services/product-service"
import { getReviewStats } from "@/lib/services/review-service"
import { formatPrice } from "@/lib/utils"
import {
  SalesBarChart,
  CategoryPieChart,
  SalesAnalysisChart,
  ProductCategoryPieChart,
} from "@/components/admin/statistics-charts"

export const metadata = {
  title: "Statistiques - Admin ElectroShop",
  description: "Statistiques et analyses de votre boutique",
}

export default async function StatisticsPage() {
  const orderStats = await getOrderStats()
  const userStats = await getUserStats()
  const productStats = await getProductStats()
  const reviewStats = await getReviewStats()

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Statistiques</h1>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="sales">Ventes</TabsTrigger>
          <TabsTrigger value="products">Produits</TabsTrigger>
          <TabsTrigger value="customers">Clients</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Ventes totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPrice(orderStats.totalSales)}</div>
                <p className="text-xs text-muted-foreground">+{orderStats.salesIncrease}% depuis le mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Commandes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{orderStats.totalOrders}</div>
                <p className="text-xs text-muted-foreground">{orderStats.pendingOrders} en attente</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">{userStats.newUsers} nouveaux ce mois</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avis clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reviewStats.totalReviews}</div>
                <p className="text-xs text-muted-foreground">{reviewStats.pendingReviews} en attente de modération</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SalesBarChart />
            <CategoryPieChart />
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <SalesAnalysisChart />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Panier moyen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatPrice(orderStats.totalSales / orderStats.totalOrders)}</div>
                <p className="text-xs text-muted-foreground">+5.2% depuis le mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Taux de conversion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">+0.5% depuis le mois dernier</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Taux d'abandon de panier</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">-2.3% depuis le mois dernier</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total des produits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{productStats.totalProducts}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Produits en rupture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{productStats.outOfStock}</div>
                <p className="text-xs text-muted-foreground">
                  {((productStats.outOfStock / productStats.totalProducts) * 100).toFixed(1)}% du catalogue
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Produits en stock faible</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{productStats.lowStock}</div>
                <p className="text-xs text-muted-foreground">Nécessitant un réapprovisionnement</p>
              </CardContent>
            </Card>
          </div>

          <ProductCategoryPieChart />
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total des clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.totalUsers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Nouveaux clients</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.newUsers}</div>
                <p className="text-xs text-muted-foreground">Ce mois-ci</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Clients actifs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.activeUsers}</div>
                <p className="text-xs text-muted-foreground">
                  {((userStats.activeUsers / userStats.totalUsers) * 100).toFixed(1)}% du total
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Satisfaction client</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Note moyenne des avis</p>
                  <div className="flex items-center">
                    <div className="flex text-yellow-400 mr-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>{i < Math.floor(reviewStats.averageRating) ? "★" : "☆"}</span>
                      ))}
                    </div>
                    <span className="text-xl font-bold">{reviewStats.averageRating.toFixed(1)}/5</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Total des avis</p>
                  <p className="text-xl font-bold">{reviewStats.totalReviews}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Taux de fidélisation</p>
                  <p className="text-xl font-bold">76%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

