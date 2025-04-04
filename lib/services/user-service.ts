import type { User } from "../types"

// Simulated database of users
const users: User[] = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean.dupont@example.com",
    image: "/placeholder.svg?height=40&width=40",
    role: "user",
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    name: "Marie Martin",
    email: "marie.martin@example.com",
    image: "/placeholder.svg?height=40&width=40",
    role: "user",
    createdAt: new Date("2023-02-20"),
  },
  {
    id: "3",
    name: "Pierre Durand",
    email: "pierre.durand@example.com",
    image: "/placeholder.svg?height=40&width=40",
    role: "user",
    createdAt: new Date("2023-03-10"),
  },
  {
    id: "4",
    name: "Sophie Lefebvre",
    email: "sophie.lefebvre@example.com",
    image: "/placeholder.svg?height=40&width=40",
    role: "admin",
    createdAt: new Date("2023-01-01"),
  },
  {
    id: "5",
    name: "Thomas Bernard",
    email: "thomas.bernard@example.com",
    image: "/placeholder.svg?height=40&width=40",
    role: "user",
    createdAt: new Date("2023-04-05"),
  },
]

interface UserFilters {
  role?: string
  search?: string
}

export async function getUsers(filters: UserFilters = {}): Promise<User[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  let filteredUsers = [...users]

  // Apply role filter
  if (filters.role && filters.role !== "all") {
    filteredUsers = filteredUsers.filter((user) => user.role === filters.role)
  }

  // Apply search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    filteredUsers = filteredUsers.filter(
      (user) => user.name.toLowerCase().includes(searchLower) || user.email.toLowerCase().includes(searchLower),
    )
  }

  // Sort by date (newest first)
  filteredUsers.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  return filteredUsers
}

export async function getUserById(id: string): Promise<User | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const user = users.find((u) => u.id === id)
  return user || null
}

export async function getUserByEmail(email: string): Promise<User | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const user = users.find((u) => u.email === email)
  return user || null
}

export async function createUser(userData: Omit<User, "id" | "createdAt">): Promise<User> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const newUser: User = {
    id: (users.length + 1).toString(),
    ...userData,
    createdAt: new Date(),
  }

  users.push(newUser)
  return newUser
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = users.findIndex((u) => u.id === id)
  if (index === -1) return null

  const updatedUser = {
    ...users[index],
    ...userData,
  }

  users[index] = updatedUser
  return updatedUser
}

export async function deleteUser(id: string): Promise<boolean> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const index = users.findIndex((u) => u.id === id)
  if (index === -1) return false

  users.splice(index, 1)
  return true
}

export async function getUserStats(): Promise<{
  totalUsers: number
  newUsers: number
  activeUsers: number
}> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  const totalUsers = users.length
  const newUsers = users.filter((u) => u.createdAt > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length
  const activeUsers = Math.floor(totalUsers * 0.7) // Simulated active users (70%)

  return {
    totalUsers,
    newUsers,
    activeUsers,
  }
}

