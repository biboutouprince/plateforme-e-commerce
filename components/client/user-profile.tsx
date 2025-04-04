"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { toast } from "../ui/use-toast"
import { Loader2 } from "lucide-react"

const profileSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  phone: z.string().optional(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

interface UserProfileProps {
  user: {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export default function UserProfile({ user }: UserProfileProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      phone: "",
    },
  })

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true)

    try {
      // Simuler un délai d'envoi
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Ici, vous implémenteriez l'envoi réel du formulaire à votre API
      console.log("Données du profil:", data)

      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès.",
      })
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour de votre profil.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
          <CardDescription>Mettez à jour vos informations personnelles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.image || ""} alt={user.name || "Utilisateur"} />
              <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <Button variant="outline" size="sm" className="mt-2">
                Changer l'avatar
              </Button>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet</FormLabel>
                    <FormControl>
                      <Input placeholder="Votre nom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="votre.email@exemple.com" {...field} />
                    </FormControl>
                    <FormDescription>Cet email sera utilisé pour vous connecter à votre compte.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone</FormLabel>
                    <FormControl>
                      <Input placeholder="06 12 34 56 78" {...field} value={field.value || ""} />
                    </FormControl>
                    <FormDescription>Utilisé uniquement pour les livraisons et en cas de problème.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Mise à jour...
                  </>
                ) : (
                  "Mettre à jour le profil"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sécurité du compte</CardTitle>
          <CardDescription>Gérez la sécurité de votre compte</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-1">Préférences</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Gérez vos préférences de notification et de confidentialité
            </p>
            <Button variant="outline">Modifier les préférences</Button>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button variant="destructive">Supprimer mon compte</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

