"use client"

import Image from "next/image"
import { useState } from "react"

interface ImageWithFallbackProps {
  src: string
  alt: string
  fallbackSrc?: string
  fill?: boolean
  width?: number
  height?: number
  sizes?: string
  className?: string
  priority?: boolean
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  fill = false,
  width,
  height,
  sizes,
  className,
  priority = false,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <Image
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => {
        // If fallbackSrc is provided, use it
        // Otherwise create a placeholder with the alt text
        if (fallbackSrc) {
          setImgSrc(fallbackSrc)
        } else {
          setImgSrc(`/placeholder.svg?height=300&width=300&text=${encodeURIComponent(alt)}`)
        }
      }}
    />
  )
}

