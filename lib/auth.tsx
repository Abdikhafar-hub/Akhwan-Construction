"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"

// Define the types for our auth context
type UserRole = "customer" | "fundi" | "contractor" | "professional" | "hardware" | "admin" | null
type User = {
  id: string
  email: string
  role: UserRole
  name: string
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string, role?: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check if user is authenticated on mount
  useEffect(() => {
    // In a real app, this would check for a valid session
    // For demo purposes, we'll just simulate a check
    const checkAuth = () => {
      const storedUser = localStorage.getItem("akhwan_user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  // Access control for protected routes
  useEffect(() => {
    if (isLoading) return

    // Skip access control for public routes
    if (
      pathname === "/" ||
      pathname === "/login" ||
      pathname === "/signup" ||
      pathname.startsWith("/signup/") ||
      pathname === "/forgot-password"
    ) {
      return
    }

    // For demo purposes, we'll allow access to all routes
    // In a real app, you would implement proper access control
    return

    // If no user is logged in, redirect to login
    if (!user) {
      router.push("/login")
      return
    }

    // Role-based access control
    if (pathname.startsWith("/admin") && (!user || user.role !== "admin")) {
      router.push("/login")
      return
    }

    if (pathname.startsWith("/customer") && (!user || user.role !== "customer")) {
      router.push("/login")
      return
    }

    if (pathname.startsWith("/builder/fundi") && (!user || user.role !== "fundi")) {
      router.push("/login")
      return
    }

    if (pathname.startsWith("/builder/contractor") && (!user || user.role !== "contractor")) {
      router.push("/login")
      return
    }

    if (pathname.startsWith("/builder/professional") && (!user || user.role !== "professional")) {
      router.push("/login")
      return
    }

    if (pathname.startsWith("/builder/hardware") && (!user || user.role !== "hardware")) {
      router.push("/login")
      return
    }
  }, [user, isLoading, pathname, router])

  // Login function
  const login = async (email: string, password: string, role?: string) => {
    setIsLoading(true)

    try {
      // For demo purposes, we'll simulate a successful login with the selected role
      const userRole: UserRole = (role as UserRole) || "customer"

      const user = {
        id: "user_" + Date.now(),
        email,
        role: userRole,
        name: email.split("@")[0],
      }

      // Store user in localStorage for persistence
      localStorage.setItem("akhwan_user", JSON.stringify(user))
      setUser(user)

      // Redirect based on role
      switch (userRole) {
        case "admin":
          router.push("/admin/dashboard")
          break
        case "customer":
          router.push("/customer/dashboard")
          break
        case "fundi":
          router.push("/builder/fundi/dashboard")
          break
        case "contractor":
          router.push("/builder/contractor/dashboard")
          break
        case "professional":
          router.push("/builder/professional/dashboard")
          break
        case "hardware":
          router.push("/builder/hardware/dashboard")
          break
        default:
          router.push("/wallet")
      }
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("akhwan_user")
    setUser(null)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

// Wrap your app with AuthProvider in layout.tsx
export function AuthGuard({ children }: { children: ReactNode }) {
  const { isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
}
