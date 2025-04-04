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
import { toast } from "../ui/use-toast"
import { MoreHorizontal, CheckCircle, XCircle, Eye } from "lucide-react"
import { formatDate } from "../../lib/utils"
import Link from "next/link"
import type { Review } from "../../lib/types"

interface ReviewsTableProps {
  reviews: Review[]
}

export default function ReviewsTable({ reviews }: ReviewsTableProps) {
  const router = useRouter()
  const [isUpdating, setIsUpdating] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">En attente</Badge>
      case "approved":
        return <Badge className="bg-green-500 hover:bg-green-600">Approuvé</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejeté</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const updateReviewStatus = async (reviewId: string, status: "approved" | "rejected") => {
    setIsUpdating(true)
    try {
      const response = await fetch(`/api/reviews/${reviewId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du statut")
      }

      toast({
        title: "Statut mis à jour",
        description: `L'avis a été ${status === "approved" ? "approuvé" : "rejeté"} avec succès`,
      })

      router.refresh()
    } catch (error) {
      console.error("Erreur:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du statut",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produit</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Commentaire</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <TableRow key={review.id}>
                <TableCell className="font-medium">
                  <Link href={`/client/produits/${review.productId}`} className="hover:underline">
                    {review.product?.name || review.productId}
                  </Link>
                </TableCell>
                <TableCell>{review.userName}</TableCell>
                <TableCell>
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">{review.comment}</TableCell>
                <TableCell>{formatDate(review.createdAt)}</TableCell>
                <TableCell>{getStatusBadge(review.status)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" disabled={isUpdating}>
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/client/produits/${review.productId}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          Voir le produit
                        </Link>
                      </DropdownMenuItem>
                      {review.status === "pending" && (
                        <>
                          <DropdownMenuItem onClick={() => updateReviewStatus(review.id, "approved")}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approuver
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateReviewStatus(review.id, "rejected")}>
                            <XCircle className="h-4 w-4 mr-2" />
                            Rejeter
                          </DropdownMenuItem>
                        </>
                      )}
                      {review.status === "approved" && (
                        <DropdownMenuItem onClick={() => updateReviewStatus(review.id, "rejected")}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Rejeter
                        </DropdownMenuItem>
                      )}
                      {review.status === "rejected" && (
                        <DropdownMenuItem onClick={() => updateReviewStatus(review.id, "approved")}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approuver
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Aucun avis trouvé
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

