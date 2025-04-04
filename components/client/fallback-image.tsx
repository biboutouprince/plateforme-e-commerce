import ImageWithFallback from "./image-with-fallback"

interface FallbackImageProps {
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

export default function FallbackImage(props: FallbackImageProps) {
  return <ImageWithFallback {...props} />
}

