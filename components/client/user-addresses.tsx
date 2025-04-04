"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { PlusCircle, Pencil, Trash2, Home, Building, MapPin } from "lucide-react"
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
import type { Address } from "../../lib/types"

interface UserAddressesProps {
  userId: string
}

export default function UserAddresses({ userId }: UserAddressesProps) {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [addressToDelete, setAddressToDelete] = useState<Address | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        // Simuler un délai de chargement
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Dans une application réelle, vous feriez un appel API ici
        // const response = await fetch(`/api/users/${userId}/addresses`)
        // const data = await response.json()

        // Pour l'exemple, nous utilisons des données simulées
        const mockAddresses: Address[] = [
          {
            id: "addr-1",
            userId: userId,
            name: "Jean Dupont",
            street: "123 Rue du Commerce",
            city: "Paris",
            postalCode: "75001",
            country: "France",
            isDefault: true,
          },
          {
            id: "addr-2",
            userId: userId,
            name: "Jean Dupont",
            street: "45 Avenue des Fleurs",
            city: "Lyon",
            postalCode: "69000",
            country: "France",
            isDefault: false,
          },
        ]

        setAddresses(mockAddresses)
        setIsLoading(false)
      } catch (error) {
        console.error("Erreur lors du chargement des adresses:", error)
        setIsLoading(false)
      }
    }

    fetchAddresses()
  }, [userId])

  const handleSetDefault = async (addressId: string) => {
    try {
      // Dans une application réelle, vous feriez un appel API ici
      // await fetch(`/api/addresses/${addressId}/default`, { method: 'PUT' })

      // Pour l'exemple, nous mettons à jour l'état local
      setAddresses(
        addresses.map((address) => ({
          ...address,
          isDefault: address.id === addressId,
        })),
      )

      toast({
        title: "Adresse par défaut mise à jour",
        description: "Votre adresse par défaut a été mise à jour avec succès.",
      })
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'adresse par défaut:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de l'adresse par défaut.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    if (!addressToDelete) return

    try {
      // Dans une application réelle, vous feriez un appel API ici
      // await fetch(`/api/addresses/${addressToDelete.id}`, { method: 'DELETE' })

      // Pour l'exemple, nous mettons à jour l'état local
      setAddresses(addresses.filter((address) => address.id !== addressToDelete.id))

      toast({
        title: "Adresse supprimée",
        description: "L'adresse a été supprimée avec succès.",
      })
    } catch (error) {
      console.error("Erreur lors de la suppression de l'adresse:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la suppression de l'adresse.",
        variant: "destructive",
      })
    } finally {
      setIsDeleteDialogOpen(false)
      setAddressToDelete(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-pulse space-y-4 w-full max-w-md">
          <div className="h-12 bg-muted rounded-md w-1/3"></div>
          <div className="h-40 bg-muted rounded-md w-full"></div>
          <div className="h-40 bg-muted rounded-md w-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Mes adresses</h2>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Ajouter une adresse
        </Button>
      </div>

      {addresses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <Card key={address.id} className={address.isDefault ? "border-primary" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg flex items-center">
                    {address.name}
                    {address.isDefault && (
                      <Badge variant="outline" className="ml-2">
                        Par défaut
                      </Badge>
                    )}
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setAddressToDelete(address)
                        setIsDeleteDialogOpen(true)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  {address.street.includes("Rue") ? (
                    <Home className="h-3 w-3 inline mr-1" />
                  ) : (
                    <Building className="h-3 w-3 inline mr-1" />
                  )}
                  Adresse {address.street.includes("Rue") ? "personnelle" : "professionnelle"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm">
                  <p>{address.street}</p>
                  <p>
                    {address.postalCode} {address.city}
                  </p>
                  <p>{address.country}</p>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                {!address.isDefault && (
                  <Button variant="outline" className="w-full" onClick={() => handleSetDefault(address.id)}>
                    <MapPin className="h-4 w-4 mr-2" />
                    Définir comme adresse par défaut
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Aucune adresse enregistrée</h3>
          <p className="text-muted-foreground mb-4">Ajoutez une adresse pour faciliter vos prochaines commandes.</p>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Ajouter une adresse
          </Button>
        </div>
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cette adresse ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. L'adresse sera définitivement supprimée de votre compte.
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
    </div>
  )
}

