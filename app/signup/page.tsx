"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignupWizard } from "@/components/signup/signup-wizard"
import { ArrowLeft } from "lucide-react"

export default function SignupPage() {
  const searchParams = useSearchParams()
  const role = searchParams.get("role")

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

          <Card className="border-none shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Create your Akhwan account</CardTitle>
              <CardDescription>
                {role === "customer"
                  ? "Join to find skilled builders for your projects"
                  : role === "builder" ||
                      role === "fundi" ||
                      role === "contractor" ||
                      role === "professional" ||
                      role === "hardware"
                    ? "Join as a builder and grow your business"
                    : "Join Kenya's leading construction marketplace"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignupWizard initialRole={role} />
            </CardContent>
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
