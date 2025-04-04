import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { getOrderStats, getRecentOrders } from "../../lib/services/order-service"
import { getUserStats } from "../../lib/services/user-service"
import { getProductStats } from "../../lib/services/product-service"
import { DollarSign, Users, Package, ShoppingCart } from "lucide-react"
import RecentOrdersTable from "../../components/admin/recent-orders-table"

export const metadata = {
  title: "Dashboard - Admin ElectroShop",
  description: "Tableau de bord administrateur",
}

export default async function AdminDashboardPage() {
  const orderStats = await getOrderStats()
  const userStats = await getUserStats()
  const productStats = await getProductStats()
  const recentOrders = await getRecentOrders(5)

  const salesData = [
    { name: "Jan", total: 1500 },
    { name: "Fév", total: 2300 },
    { name: "Mar", total: 3200 },
    { name: "Avr", total: 2800 },
    { name: "Mai", total: 3600 },
    { name: "Juin", total: 4100 },
    { name: "Juil", total: 3800 },
  ]

  // Calculer la valeur maximale pour l'échelle
  const maxValue = Math.max(...salesData.map((item) => item.total))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Ventes totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.totalSales.toFixed(2)} €</div>
            <p className="text-xs text-muted-foreground">+{orderStats.salesIncrease}% depuis le mois dernier</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">{orderStats.pendingOrders} en attente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+{userStats.newUsers} nouveaux ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Produits</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{productStats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">{productStats.outOfStock} en rupture de stock</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Ventes mensuelles</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {/* Graphique simplifié sans recharts */}
            <div className="flex h-64 items-end space-x-2">
              {salesData.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className="w-12 bg-blue-500 rounded-t-md"
                    style={{
                      height: `${(item.total / maxValue) * 100}%`,
                      minHeight: "8px",
                    }}
                  ></div>
                  <span className="text-xs mt-2">{item.name}</span>
                  <span className="text-xs text-muted-foreground">{item.total}€</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Commandes récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentOrdersTable orders={recentOrders} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

