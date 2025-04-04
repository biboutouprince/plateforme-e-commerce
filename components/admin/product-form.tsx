"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Checkbox } from "../ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Trash2 } from "lucide-react"
import type { Product, Category } from "@/lib/types"

const productSchema = z.object({
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  fullDescription: z.string().optional(),
  price: z.coerce.number().positive("Le prix doit être positif"),
  oldPrice: z.coerce.number().positive("L'ancien prix doit être positif").optional(),
  discount: z.coerce.number().min(0).max(100, "La remise doit être entre 0 et 100").default(0),
  image: z.string().url("L'URL de l'image n'est pas valide"),
  category: z.string().min(1, "Veuillez sélectionner une catégorie"),
  inStock: z.boolean().default(true),
  specifications: z
    .array(
      z.object({
        name: z.string().min(1, "Le nom de la spécification est requis"),
        value: z.string().min(1, "La valeur de la spécification est requise"),
      }),
    )
    .optional(),
})

type ProductFormValues = z.infer<typeof productSchema>

interface ProductFormProps {
  product?: Product
  categories: Category[]
}

export default function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          ...product,
          specifications: product.specifications || [],
        }
      : {
          name: "",
          description: "",
          fullDescription: "",
          price: 0,
          oldPrice: undefined,
          discount: 0,
          image: "",
          category: "",
          inStock: true,
          specifications: [],
        },
  })

  const [specifications, setSpecifications] = useState<{ name: string; value: string }[]>(product?.specifications || [])

  const addSpecification = () => {
    setSpecifications([...specifications, { name: "", value: "" }])
  }

  const removeSpecification = (index: number) => {
    const newSpecs = [...specifications]
    newSpecs.splice(index, 1)
    setSpecifications(newSpecs)
    form.setValue("specifications", newSpecs)
  }

  const updateSpecification = (index: number, field: "name" | "value", value: string) => {
    const newSpecs = [...specifications]
    newSpecs[index][field] = value
    setSpecifications(newSpecs)
    form.setValue("specifications", newSpecs)
  }

  const onSubmit = async (data: ProductFormValues) => {
    setIsSubmitting(true)

    try {
      const url = product ? `/api/products/${product.id}` : "/api/products"

      const method = product ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          specifications,
        }),
      })

      if (!response.ok) {
        throw new Error("Une erreur est survenue lors de l'enregistrement du produit")
      }

      toast({
        title: product ? "Produit mis à jour" : "Produit créé",
        description: product ? "Le produit a été mis à jour avec succès" : "Le produit a été créé avec succès",
      })

      router.push("/admin/produits")
      router.refresh()
    } catch (error) {
      console.error("Error saving product:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement du produit",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Nom du produit</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom du produit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description courte</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Description courte du produit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fullDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description complète</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Description complète du produit"
                          className="min-h-[200px]"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prix (€)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="oldPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ancien prix (€)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" min="0" {...field} value={field.value || ""} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Remise (%)</FormLabel>
                      <FormControl>
                        <Input type="number" min="0" max="100" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>URL de l'image</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Catégorie</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="inStock"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>En stock</FormLabel>
                        <FormDescription>Ce produit est disponible à la vente</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Spécifications</h3>
                <Button type="button" variant="outline" onClick={addSpecification}>
                  Ajouter une spécification
                </Button>
              </div>

              {specifications.length > 0 ? (
                <div className="space-y-4">
                  {specifications.map((spec, index) => (
                    <div key={index} className="flex gap-4 items-end">
                      <div className="flex-1">
                        <FormLabel>Nom</FormLabel>
                        <Input
                          value={spec.name}
                          onChange={(e) => updateSpecification(index, "name", e.target.value)}
                          placeholder="Ex: Processeur"
                        />
                      </div>
                      <div className="flex-1">
                        <FormLabel>Valeur</FormLabel>
                        <Input
                          value={spec.value}
                          onChange={(e) => updateSpecification(index, "value", e.target.value)}
                          placeholder="Ex: Intel Core i7"
                        />
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeSpecification(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">Aucune spécification ajoutée</div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/produits")}>
            Annuler
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Enregistrement..." : product ? "Mettre à jour" : "Créer"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

