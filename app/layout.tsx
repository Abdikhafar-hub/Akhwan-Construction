import type React from "react"
import "@/app/globals.css"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/lib/auth"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
