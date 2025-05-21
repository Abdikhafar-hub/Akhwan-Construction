"use client"

import Link from "next/link"
import { useState } from "react"
import { Bell, LogOut, Menu, MessageSquare, Settings, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

export function HardwareNav() {
  const { toast } = useToast()
  const [notificationCount] = useState(3)

  const handleLogout = () => {
    toast({
      title: "Logging out",
      description: "You have been logged out successfully",
      duration: 3000,
    })
  }

  const handleViewProfile = () => {
    toast({
      title: "View Profile",
      description: "Navigating to your profile",
      duration: 3000,
    })
  }

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Navigating to settings",
      duration: 3000,
    })
  }

  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "Viewing your notifications",
      duration: 3000,
    })
  }

  const handleMessages = () => {
    toast({
      title: "Messages",
      description: "Viewing your messages",
      duration: 3000,
    })
  }

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 py-4">
                <Link href="/builder/hardware/dashboard" className="flex items-center gap-2 text-lg font-semibold">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    J
                  </div>
                  <span>Akhwan</span>
                </Link>
                <Link href="/builder/hardware/dashboard" className="text-sm font-medium hover:underline">
                  Dashboard
                </Link>
                <Link href="/builder/hardware/inventory" className="text-sm font-medium hover:underline">
                  Inventory
                </Link>
                <Link href="/builder/hardware/orders" className="text-sm font-medium hover:underline">
                  Orders
                </Link>
                <Link href="/builder/hardware/deliveries" className="text-sm font-medium hover:underline">
                  Deliveries
                </Link>
                <Link href="/builder/hardware/suppliers" className="text-sm font-medium hover:underline">
                  Suppliers
                </Link>
                <Link href="/builder/hardware/promotions" className="text-sm font-medium hover:underline">
                  Promotions
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              J
            </div>
            <span className="hidden md:inline-block">Akhwan</span>
          </Link>
        </div>
        <div className="ml-2 font-medium md:ml-4">Hardware Dashboard</div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative" onClick={handleNotifications}>
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
              >
                {notificationCount}
              </Badge>
            )}
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={handleMessages}>
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/hardware-supplier.png" alt="@user" />
                  <AvatarFallback>HS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">John Kamau</p>
                  <p className="text-xs leading-none text-muted-foreground">Hardware Supplier</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleViewProfile}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSettings}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
