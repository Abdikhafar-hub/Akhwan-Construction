"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Hammer, Building2, HardHat, ShoppingBag } from "lucide-react"

export default function SelectBuilderRolePage() {
  const builderRoles = [
    {
      id: "fundi",
      title: "Fundi",
      description: "Skilled labor services like plumbing, electrical, carpentry, etc.",
      icon: Hammer,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "contractor",
      title: "Contractor",
      description: "Manage construction projects and teams",
      icon: Building2,
      color: "bg-orange-100 text-orange-600",
    },
    {
      id: "professional",
      title: "Professional",
      description: "Specialized services like architecture, engineering, etc.",
      icon: HardHat,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "hardware",
      title: "Hardware Supplier",
      description: "Construction materials and supplies",
      icon: ShoppingBag,
      color: "bg-pink-100 text-pink-600",
    },
  ]

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
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold tracking-tight mb-3">Choose your builder type</h1>
            <p className="text-lg text-muted-foreground">
              Select the option that best describes your services to get started
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {builderRoles.map((role) => (
              <Link key={role.id} href={`/signup?role=${role.id}`}>
                <Card className="p-6 h-full cursor-pointer transition-all hover:border-primary hover:shadow-md">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`h-12 w-12 rounded-full ${role.color} flex items-center justify-center`}>
                        <role.icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-xl font-semibold">{role.title}</h2>
                    </div>
                    <p className="text-muted-foreground">{role.description}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
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
