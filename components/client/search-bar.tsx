// components/client/search-bar.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from 'lucide-react'
import { Input } from "../ui/input"
import { Button } from "../ui/button"

interface SearchBarProps {
  defaultValue?: string
}

export default function SearchBar({ defaultValue = "" }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(defaultValue)

  useEffect(() => {
    // Mettre à jour le terme de recherche si le paramètre d'URL change
    const search = searchParams.get("search")
    if (search) {
      setSearchTerm(search)
    }
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (searchTerm.trim()) {
      // Construire l'URL avec les paramètres existants plus le terme de recherche
      const params = new URLSearchParams(searchParams.toString())
      params.set("search", searchTerm)
      
      router.push(`/client/produits?${params.toString()}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative flex w-full max-w-sm items-center">
      <Input
        type="search"
        placeholder="Rechercher des produits..."
        className="pr-10"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button 
        type="submit" 
        variant="ghost" 
        size="icon" 
        className="absolute right-0 top-0 h-full"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Rechercher</span>
      </Button>
    </form>
  )
}