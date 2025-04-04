"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../../lib/utils"
import { LayoutDashboard, Package, Tag, ShoppingCart, Users, MessageSquare, Settings, BarChart } from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Produits",
    href: "/admin/produits",
    icon: Package,
  },
  {
    title: "Promotions",
    href: "/admin/promotions",
    icon: Tag,
  },
  {
    title: "Commandes",
    href: "/admin/commandes",
    icon: ShoppingCart,
  },
  {
    title: "Utilisateurs",
    href: "/admin/utilisateurs",
    icon: Users,
  },
  {
    title: "Avis",
    href: "/admin/avis",
    icon: MessageSquare,
  },
  {
    title: "Statistiques",
    href: "/admin/statistiques",
    icon: BarChart,
  },
  {
    title: "Paramètres",
    href: "/admin/parametres",
    icon: Settings,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 md:block md:w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/admin" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span>ElectroShop Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                  pathname === item.href ? "bg-muted text-primary" : "text-muted-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

