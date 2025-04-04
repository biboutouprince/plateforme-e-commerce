import type { Order, User, Address } from "../types"

// Simulated database of orders
const orders: Order[] = [
  {
    id: "ORD-001",
    userId: "1",
    user: {
      id: "1",
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      role: "user",
      createdAt: new Date("2023-01-15"),
    },
    items: [
      {
        productId: "1",
        name: "Smartphone XYZ Pro",
        price: 899.99,
        quantity: 1,
      },
      {
        productId: "4",
        name: "Écouteurs Sans Fil Pro",
        price: 149.99,
        quantity: 1,
      },
    ],
    total: 1049.98,
    status: "delivered",
    paymentStatus: "paid",
    shippingAddress: {
      id: "addr-1",
      userId: "1",
      name: "Jean Dupont",
      street: "123 Rue du Commerce",
      city: "Paris",
      postalCode: "75001",
      country: "France",
      isDefault: true,
    },
    createdAt: new Date("2023-10-05"),
    updatedAt: new Date("2023-10-07"),
  },
  {
    id: "ORD-002",
    userId: "1",
    user: {
      id: "1",
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      role: "user",
      createdAt: new Date("2023-01-15"),
    },
    items: [
      {
        productId: "2",
        name: "Ordinateur Portable UltraBook",
        price: 1299.99,
        quantity: 1,
      },
    ],
    total: 1299.99,
    status: "shipped",
    paymentStatus: "paid",
    shippingAddress: {
      id: "addr-1",
      userId: "1",
      name: "Jean Dupont",
      street: "123 Rue du Commerce",
      city: "Paris",
      postalCode: "75001",
      country: "France",
      isDefault: true,
    },
    trackingNumber: "TRK12345678",
    createdAt: new Date("2023-11-10"),
    updatedAt: new Date("2023-11-12"),
  },
  {
    id: "ORD-003",
    userId: "1",
    user: {
      id: "1",
      name: "Jean Dupont",
      email: "jean.dupont@example.com",
      role: "user",
      createdAt: new Date("2023-01-15"),
    },
    items: [
      {
        productId: "5",
        name: "Montre Connectée SportWatch",
        price: 199.99,
        quantity: 1,
      },
    ],
    total: 199.99,
    status: "processing",
    paymentStatus: "paid",
    shippingAddress: {
      id: "addr-1",
      userId: "1",
      name: "Jean Dupont",
      street: "123 Rue du Commerce",
      city: "Paris",
      postalCode: "75001",
      country: "France",
      isDefault: true,
    },
    createdAt: new Date("2023-11-20"),
    updatedAt: new Date("2023-11-20"),
  },
  {
    id: "ORD-004",
    userId: "2",
    user: {
      id: "2",
      name: "Marie Martin",
      email: "marie.martin@example.com",
      role: "user",
      createdAt: new Date("2023-02-20"),
    },
    items: [
      {
        productId: "3",
        name: "Tablette MediaPad",
        price: 349.99,
        quantity: 1,
      },
      {
        productId: "8",
        name: "Tablette Kids",
        price: 149.99,
        quantity: 1,
      },
    ],
    total: 499.98,
    status: "pending",
    paymentStatus: "pending",
    shippingAddress: {
      id: "addr-2",
      userId: "2",
      name: "Marie Martin",
      street: "45 Avenue des Fleurs",
      city: "Lyon",
      postalCode: "69000",
      country: "France",
      isDefault: true,
    },
    createdAt: new Date("2023-11-25"),
    updatedAt: new Date("2023-11-25"),
  },
  {
    id: "ORD-005",
    userId: "3",
    user: {
      id: "3",
      name: "Pierre Durand",
      email: "pierre.durand@example.com",
      role: "user",
      createdAt: new Date("2023-03-10"),
    },
    items: [
      {
        productId: "7",
        name: "Ordinateur de Bureau GamerX",
        price: 1899.99,
        quantity: 1,
      },
    ],
    total: 1899.99,
    status: "cancelled",
    paymentStatus: "refunded",
    shippingAddress: {
      id: "addr-3",
      userId: "3",
      name: "Pierre Durand",
      street: "8 Rue de la Paix",
      city: "Marseille",
      postalCode: "13000",
      country: "France",
      isDefault: true,
    },
    createdAt: new Date("2023-11-15"),
    updatedAt: new Date("2023-11-18"),
  },
]

interface OrderFilters {
  userId?: string
  status?: string
  search?: string
  startDate?: Date
  endDate?: Date
}

export async function getOrders(filters: OrderFilters = {}): Promise<Order[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredOrders = [...orders]

  // Apply user filter
  if (filters.userId) {
    filteredOrders = filteredOrders.filter((order) => order.userId === filters.userId)
  }

  // Apply status filter
  if (filters.status && filters.status !== "all") {
    filteredOrders = filteredOrders.filter((order) => order.status === filters.status)
  }

  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filteredOrders = filteredOrders.filter(
      (order) =>
        order.id.toLowerCase().includes(searchLower) ||
        order.user.name.toLowerCase().includes(searchLower) ||
        order.user.email.toLowerCase().includes(searchLower),
    )
  }

  // Apply date range filter
  if (filters.startDate) {
    filteredOrders = filteredOrders.filter((order) => order.createdAt >= filters.startDate!)
  }

  if (filters.endDate) {
    filteredOrders = filteredOrders.filter((order) => order.createdAt <= filters.endDate!)
  }

  // Sort by date (newest first)
  filteredOrders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  return filteredOrders
}

export async function getOrderById(id: string): Promise<Order | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const order = orders.find((o) => o.id === id)
  return order || null
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return orders.filter((o) => o.userId === userId)
}

export async function createOrder(
  userId: string,
  items: Array<{ productId: string; name: string; price: number; quantity: number }>,
  shippingAddress: Address,
): Promise<Order> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Calculate total
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  // Get user
  const user: User = {
    id: userId,
    name: shippingAddress.name,
    email: `user${userId}@example.com`,
    role: "user",
    createdAt: new Date(),
  }

  const newOrder: Order = {
    id: `ORD-${(orders.length + 1).toString().padStart(3, "0")}`,
    userId,
    user,
    items,
    total,
    status: "pending",
    paymentStatus: "pending",
    shippingAddress,
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  orders.push(newOrder)
  return newOrder
}

export async function updateOrderStatus(
  id: string,
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled",
): Promise<Order | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = orders.findIndex((o) => o.id === id)
  if (index === -1) return null

  const updatedOrder = {
    ...orders[index],
    status,
    updatedAt: new Date(),
  }

  orders[index] = updatedOrder
  return updatedOrder
}

export async function updatePaymentStatus(
  id: string,
  paymentStatus: "pending" | "paid" | "failed" | "refunded",
): Promise<Order | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = orders.findIndex((o) => o.id === id)
  if (index === -1) return null

  const updatedOrder = {
    ...orders[index],
    paymentStatus,
    updatedAt: new Date(),
  }

  orders[index] = updatedOrder
  return updatedOrder
}

export async function getRecentOrders(limit = 5): Promise<Order[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return [...orders].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, limit)
}

export async function getOrderStats(): Promise<{
  totalOrders: number
  totalSales: number
  pendingOrders: number
  salesIncrease: number
}> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const totalOrders = orders.length
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = orders.filter((o) => o.status === "pending").length
  const salesIncrease = 12.5 // Simulated increase percentage

  return {
    totalOrders,
    totalSales,
    pendingOrders,
    salesIncrease,
  }
}

