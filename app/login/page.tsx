"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("demo@akhwan.com")
  const [password, setPassword] = useState("password")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loginType, setLoginType] = useState("user")
  const [selectedRole, setSelectedRole] = useState("customer")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    setIsLoading(true)

    // Simulate login API call
    setTimeout(() => {
      setIsLoading(false)

      // For demo purposes, redirect based on login type and selected role
      if (loginType === "admin") {
        router.push("/admin/dashboard")
      } else {
        // Redirect based on selected role
        switch (selectedRole) {
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
            router.push("/customer/dashboard")
        }
      }
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Header */}
      <header className="border-b bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <span className="font-bold">J</span>
            </div>
            <span className="font-bold text-xl">Akhwan</span>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <Card className="border-none shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome to Akhwan Demo</CardTitle>
              <CardDescription>Select a role to explore the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="user" onValueChange={(value) => setLoginType(value)} className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="user">User Login</TabsTrigger>
                  <TabsTrigger value="admin">Admin Login</TabsTrigger>
                </TabsList>
              </Tabs>

              <form onSubmit={handleLogin} className="space-y-4">
                {loginType === "user" && (
                  <div className="space-y-2">
                    <Label htmlFor="role">Select Role</Label>
                    <Select defaultValue={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="fundi">Fundi (Individual Artisan)</SelectItem>
                        <SelectItem value="contractor">Contractor (Team Lead)</SelectItem>
                        <SelectItem value="professional">Professional (Architect/Engineer)</SelectItem>
                        <SelectItem value="hardware">Hardware Supplier</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="demo@akhwan.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    disabled={isLoading}
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>

                {error && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">{error}</div>}

                <div className="bg-amber-50 text-amber-700 p-3 rounded-md text-sm">
                  <p className="font-medium">Demo Mode</p>
                  <p className="text-xs mt-1">
                    This is a demo version with no authentication. Simply select a role and click login to explore that
                    dashboard.
                  </p>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : loginType === "admin" ? (
                    "Log in as Admin"
                  ) : (
                    `Log in as ${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)}`
                  )}
                </Button>
              </form>
            </CardContent>
            {loginType === "user" && (
              <CardFooter className="flex flex-col space-y-4">
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    Apple
                  </Button>
                </div>
              </CardFooter>
            )}
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Akhwan. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground">
                Help
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
