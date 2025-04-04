import type React from "react"
import AdminHeader from "../../components/admin/admin-header"
import AdminSidebar from "../../components/admin/admin-sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Créer un utilisateur admin par défaut sans authentification
  const user = {
    id: "admin-id",
    name: "Admin Test",
    email: "admin@example.com",
    image: null,
    role: "admin",
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader user={user} />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  )
}

