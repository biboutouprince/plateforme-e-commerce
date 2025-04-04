"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { StarIcon } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  createdAt: Date
}

interface ProductReviewsProps {
  productId: string
}

export default function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [userRating, setUserRating] = useState(0)
  const [userComment, setUserComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Simuler un délai de chargement
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Dans une application réelle, vous feriez un appel API ici
        // const response = await fetch(`/api/products/${productId}/reviews`)
        // const data = await response.json()

        // Pour l'exemple, nous utilisons des données simulées
        const mockReviews: Review[] = [
          {
            id: "1",
            userId: "user1",
            userName: "Jean ",
            userAvatar: "",
            rating: 5,
            comment:
              "Excellent produit, je suis très satisfait de mon achat. La qualité est au rendez-vous et la livraison a été rapide.",
            createdAt: new Date("2023-11-10"),
          },
          {
            id: "2",
            userId: "user2",
            userName: "Marie ",
            userAvatar: "",
            rating: 4,
            comment:
              "Bon rapport qualité-prix. Le produit correspond à la description. Seul bémol, l'emballage était un peu abîmé à la livraison.",
            createdAt: new Date("2023-10-25"),
          },
          {
            id: "3",
            userId: "user3",
            userName: "Bernard",
            userAvatar: "",
            rating: 5,
            comment: "Parfait ! Je recommande vivement ce produit. Il fonctionne très bien et est facile à utiliser.",
            createdAt: new Date("2023-10-15"),
          },
        ]

        setReviews(mockReviews)
        setIsLoading(false)

        // Vérifier si l'utilisateur est connecté (simulé)
        setIsLoggedIn(Math.random() > 0.5) // 50% de chance d'être connecté pour la démo
      } catch (error) {
        console.error("Erreur lors du chargement des avis:", error)
        setIsLoading(false)
      }
    }

    fetchReviews()
  }, [productId])

  const handleRatingChange = (rating: number) => {
    setUserRating(rating)
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()

    if (userRating === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une note",
        variant: "destructive",
      })
      return
    }

    if (userComment.trim().length < 10) {
      toast({
        title: "Erreur",
        description: "Votre commentaire doit contenir au moins 10 caractères",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simuler un délai d'envoi
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Dans une application réelle, vous feriez un appel API ici
      // await fetch(`/api/products/${productId}/reviews`, {
      //   method: 'POST',
      //   body: JSON.stringify({ rating: userRating, comment: userComment }),
      // })

      // Pour l'exemple, nous ajoutons l'avis à l'état local
      const newReview: Review = {
        id: `temp-${Date.now()}`,
        userId: "current-user",
        userName: "Vous",
        rating: userRating,
        comment: userComment,
        createdAt: new Date(),
      }

      setReviews([newReview, ...reviews])
      setUserRating(0)
      setUserComment("")

      toast({
        title: "Avis publié",
        description: "Merci pour votre avis !",
      })
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'avis:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre avis",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <StarIcon key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
    ))
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-muted"></div>
                <div className="space-y-2">
                  <div className="h-4 w-24 bg-muted rounded"></div>
                  <div className="h-3 w-16 bg-muted rounded"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded"></div>
                <div className="h-4 w-full bg-muted rounded"></div>
                <div className="h-4 w-2/3 bg-muted rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {isLoggedIn ? (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-4">Donnez votre avis</h3>
            <form onSubmit={handleSubmitReview}>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="mr-2">Votre note:</span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleRatingChange(i + 1)}
                        className="focus:outline-none"
                      >
                        <StarIcon
                          className={`h-6 w-6 ${i < userRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <Textarea
                  placeholder="Partagez votre expérience avec ce produit..."
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Envoi en cours..." : "Publier mon avis"}
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="mb-4">Connectez-vous pour laisser un avis sur ce produit</p>
            <Button>Se connecter</Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar>
                    <AvatarImage src={review.userAvatar} />
                    <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{review.userName}</div>
                    <div className="text-sm text-muted-foreground">{formatDate(review.createdAt)}</div>
                  </div>
                </div>
                <div className="flex mb-2">{renderStars(review.rating)}</div>
                <p className="text-sm">{review.comment}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Aucun avis pour ce produit. Soyez le premier à donner votre avis !</p>
          </div>
        )}
      </div>
    </div>
  )
}

