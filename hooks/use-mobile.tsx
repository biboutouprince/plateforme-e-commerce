"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Vérifier au chargement initial
    checkIfMobile()

    // Ajouter un écouteur d'événement pour les changements de taille de fenêtre
    window.addEventListener("resize", checkIfMobile)

    // Nettoyer l'écouteur d'événement
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  return isMobile
}

