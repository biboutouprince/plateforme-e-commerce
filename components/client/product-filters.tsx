// components/client/product-filters.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Slider } from "../ui/slider"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [category, setCategory] = useState<string>(searchParams.get("category") || "")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [availability, setAvailability] = useState<string[]>([])
  const [sort, setSort] = useState<string>(searchParams.get("sort") || "")

  // Mettre à jour les filtres lorsque les paramètres d'URL changent
  useEffect(() => {
    setCategory(searchParams.get("category") || "")
    setSort(searchParams.get("sort") || "")
  }, [searchParams])

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    
    // Mettre à jour les paramètres
    if (category) {
      params.set("category", category)
    } else {
      params.delete("category")
    }
    
    if (sort) {
      params.set("sort", sort)
    } else {
      params.delete("sort")
    }
    
    // Ajouter d'autres paramètres si nécessaire
    // params.set("minPrice", priceRange[0].toString())
    // params.set("maxPrice", priceRange[1].toString())
    
    // Naviguer vers la nouvelle URL avec les filtres
    router.push(`/client/produits?${params.toString()}`)
  }

  const handleResetFilters = () => {
    setCategory("")
    setPriceRange([0, 2000])
    setAvailability([])
    setSort("")
    router.push("/client/produits")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtres</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Catégories</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox 
                id="cat-smartphones" 
                checked={category === "smartphones"}
                onCheckedChange={() => setCategory(category === "smartphones" ? "" : "smartphones")}
              />
              <Label htmlFor="cat-smartphones" className="ml-2">Smartphones</Label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="cat-ordinateurs" 
                checked={category === "ordinateurs"}
                onCheckedChange={() => setCategory(category === "ordinateurs" ? "" : "ordinateurs")}
              />
              <Label htmlFor="cat-ordinateurs" className="ml-2">Ordinateurs</Label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="cat-tablettes" 
                checked={category === "tablettes"}
                onCheckedChange={() => setCategory(category === "tablettes" ? "" : "tablettes")}
              />
              <Label htmlFor="cat-tablettes" className="ml-2">Tablettes</Label>
            </div>
            <div className="flex items-center">
              <Checkbox 
                id="cat-accessoires" 
                checked={category === "accessoires"}
                onCheckedChange={() => setCategory(category === "accessoires" ? "" : "accessoires")}
              />
              <Label htmlFor="cat-accessoires" className="ml-2">Accessoires</Label>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-3">Prix</h3>
          <div className="px-2">
            <Slider
              defaultValue={[0, 2000]}
              max={2000}
              step={10}
              value={priceRange}
              onValueChange={(value) => setPriceRange(value as [number, number])}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{priceRange[0]} €</span>
              <span>{priceRange[1]} €</span>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-3">Disponibilité</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <Checkbox 
                id="availability-instock" 
                checked={availability.includes("instock")}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setAvailability([...availability, "instock"])
                  } else {
                    setAvailability(availability.filter(item => item !== "instock"))
                  }
                }}
              />
              <Label htmlFor="availability-instock" className="ml-2">En stock</Label>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-3">Trier par</h3>
          <RadioGroup value={sort} onValueChange={setSort}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="newest" id="sort-newest" />
              <Label htmlFor="sort-newest">Nouveautés</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price-asc" id="sort-price-asc" />
              <Label htmlFor="sort-price-asc">Prix croissant</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price-desc" id="sort-price-desc" />
              <Label htmlFor="sort-price-desc">Prix décroissant</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rating" id="sort-rating" />
              <Label htmlFor="sort-rating">Meilleures notes</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex flex-col space-y-2 pt-4">
          <Button onClick={handleApplyFilters}>Appliquer les filtres</Button>
          <Button variant="outline" onClick={handleResetFilters}>Réinitialiser</Button>
        </div>
      </CardContent>
    </Card>
  )
}