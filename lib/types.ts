export interface Product {
  id: string
  name: string
  description: string
  fullDescription?: string
  price: number
  oldPrice?: number
  discount: number
  image: string
  category: string
  inStock: boolean
  rating: number
  reviewCount: number
  specifications?: Array<{
    name: string
    value: string
  }>
  createdAt?: Date
  updatedAt?: Date
}

export interface Category {
  id: string
  name: string
  description: string
  image?: string
  productCount: number
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment: string
  status: "pending" | "approved" | "rejected"
  createdAt: Date
  product?: Product
  user?: User
}

export interface User {
  id: string
  name: string
  email: string
  image?: string
  role: "user" | "admin"
  createdAt: Date
  addresses?: Address[]
  orders?: Order[]
}

export interface Order {
  id: string
  userId: string
  user: User
  items: Array<{
    productId: string
    name: string
    price: number
    quantity: number
  }>
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed"
  shippingAddress: Address
  trackingNumber?: string
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  id: string
  userId: string
  name: string
  street: string
  city: string
  postalCode: string
  country: string
  isDefault: boolean
}

export interface Promotion {
  id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  minPurchase: number
  startDate: Date
  endDate: Date
  usageLimit: number
  usageCount: number
  products: string[]
  categories: string[]
  active: boolean
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  product: Product
  quantity: number
}

