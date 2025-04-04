import { getUsers } from "../../../lib/services/user-service"
import UsersTable from "../../../components/admin/users-table"
import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"

export const metadata = {
  title: "Gestion des utilisateurs - Admin ElectroShop",
  description: "Gérez les utilisateurs de votre boutique",
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined
  const role = typeof searchParams.role === "string" ? searchParams.role : undefined

  const users = await getUsers({ search, role })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input placeholder="Rechercher un utilisateur..." className="max-w-sm" defaultValue={search || ""} />
        </div>
        <Button variant="outline">Rechercher</Button>
      </div>

      <UsersTable users={users} />
    </div>
  )
}

