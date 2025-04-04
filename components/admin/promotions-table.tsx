"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { toast } from "../ui/use-toast"
import { MoreHorizontal, Pencil, Trash2, Power, PowerOff } from "lucide-react"
import { formatDate } from "../../lib/utils"
import Link from "next/link"
import type { Promotion } from "../../lib/types"

interface PromotionsTableProps {
  promotions: Promotion[]
}

export default function PromotionsTable({ promotions }: PromotionsTableProps) {
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [promotionToDelete, setPromotionToDelete] = useState<Promotion | null>(null)

  const handleDelete = async () => {
    if (!promotionToDelete) return

    try {
      const response = await fetch(`/api/promotions/${promotionToDelete.id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la suppression de la promotion")
      }

      toast({
        title: "Promotion supprimée",
        description: "La promotion a été supprimée avec succès",
      })

      router.refresh()
    } catch (error) {
      console.error("Error deleting promotion:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de la promotion",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
      setPromotionToDelete(null)
    }
  }

  const togglePromotionStatus = async (promotionId: string, active: boolean) => {
    try {
      const response = await fetch(`/api/promotions/${promotionId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ active }),
      })

      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de la mise à jour du statut")
      }

      toast({
        title: "Statut mis à jour",
        description: `La promotion est maintenant ${active ? "active" : "inactive"}`,
      })

      router.refresh()
    } catch (error) {
      console.error("Error updating promotion status:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du statut",
        variant: "destructive",
      })
    }
  }

  const isExpired = (endDate: Date) => {
    return new Date() > new Date(endDate)
  }

  const isUpcoming = (startDate: Date) => {
    return new Date() < new Date(startDate)
  }

  const getStatusBadge = (promotion: Promotion) => {
    if (!promotion.active) {
      return <Badge variant="outline">Inactive</Badge>
    }
    if (isExpired(promotion.endDate)) {
      return <Badge variant="destructive">Expirée</Badge>
    }
    if (isUpcoming(promotion.startDate)) {
      return <Badge variant="secondary">À venir</Badge>
    }
    return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Valeur</TableHead>
              <TableHead>Période</TableHead>
              <TableHead>Utilisation</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promotions.length > 0 ? (
              promotions.map((promotion) => (
                <TableRow key={promotion.id}>
                  <TableCell className="font-medium">{promotion.code}</TableCell>
                  <TableCell>{promotion.type === "percentage" ? "Pourcentage" : "Montant fixe"}</TableCell>
                  <TableCell>
                    {promotion.type === "percentage" ? `${promotion.value}%` : `${promotion.value}€`}
                  </TableCell>
                  <TableCell>
                    <div className="text-xs">
                      <div>Début: {formatDate(promotion.startDate)}</div>
                      <div>Fin: {formatDate(promotion.endDate)}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {promotion.usageLimit > 0
                      ? `${promotion.usageCount} / ${promotion.usageLimit}`
                      : `${promotion.usageCount} / ∞`}
                  </TableCell>
                  <TableCell>{getStatusBadge(promotion)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/promotions/${promotion.id}`}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Modifier
                          </Link>
                        </DropdownMenuItem>
                        {promotion.active ? (
                          <DropdownMenuItem onClick={() => togglePromotionStatus(promotion.id, false)}>
                            <PowerOff className="h-4 w-4 mr-2" />
                            Désactiver
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem onClick={() => togglePromotionStatus(promotion.id, true)}>
                            <Power className="h-4 w-4 mr-2" />
                            Activer
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setPromotionToDelete(promotion)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Supprimer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  Aucune promotion trouvée
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cette promotion ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. La promotion sera définitivement supprimée de la base de données.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

