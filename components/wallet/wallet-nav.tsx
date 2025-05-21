"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wallet, User, Hammer, Building2, LogOut } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import type { UserRole } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WalletNavProps {
  userRole: UserRole
  onRoleChange: (role: UserRole) => void
}

export function WalletNav({ userRole, onRoleChange }: WalletNavProps) {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              J
            </div>
            <span className="font-bold text-xl">Akhwan</span>
          </Link>
          <span className="hidden md:inline-block text-muted-foreground">|</span>
          <div className="hidden md:flex items-center space-x-1">
            <Wallet className="h-4 w-4 text-primary" />
            <span className="font-medium">GedoPay</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Demo mode role switcher - would be removed in production */}
          <div className="hidden md:block">
            <Select value={userRole} onValueChange={(value) => onRoleChange(value as UserRole)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Switch Role (Demo)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">Customer View</SelectItem>
                <SelectItem value="fundi">Fundi View</SelectItem>
                <SelectItem value="contractor">Contractor View</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/jobs" className="text-sm font-medium hover:text-primary">
              Jobs
            </Link>
            <Link href="/wallet" className="text-sm font-medium text-primary">
              Wallet
            </Link>
            <Link href="/profile" className="text-sm font-medium hover:text-primary">
              Profile
            </Link>
          </nav>

          <ThemeToggle />

          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="rounded-full">
              {userRole === "customer" ? (
                <User className="h-5 w-5" />
              ) : userRole === "fundi" ? (
                <Hammer className="h-5 w-5" />
              ) : (
                <Building2 className="h-5 w-5" />
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
