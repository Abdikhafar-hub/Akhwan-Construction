"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface OrderCustomer {
  name: string
  avatar: string
}

interface Order {
  id: string
  customer: OrderCustomer
  items: number
  total: number
  status: string
  date: string
}

interface OrderCardProps {
  order: Order
}

export function OrderCard({ order }: OrderCardProps) {
  const { toast } = useToast()

  const handleUpdateStatus = () => {
    toast({
      title: "Update Status",
      description: `Updating status for order #${order.id}`,
      duration: 3000,
    })
  }

  const handleViewDetails = () => {
    toast({
      title: "View Details",
      description: `Viewing details for order #${order.id}`,
      duration: 3000,
    })
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={order.customer.avatar || "/placeholder.svg"} alt={order.customer.name} />
            <AvatarFallback>
              {order.customer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{order.customer.name}</p>
            <p className="text-sm text-muted-foreground">Order #{order.id}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge
                variant={
                  order.status === "Delivered" ? "default" : order.status === "Processing" ? "secondary" : "outline"
                }
              >
                {order.status}
              </Badge>
              <span className="text-sm">{order.date}</span>
            </div>
          </div>
        </div>
        <div>
          <p className="font-medium">KSh {order.total.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">{order.items} items</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleUpdateStatus}>
            <Edit className="mr-2 h-4 w-4" />
            Update Status
          </Button>
          <Button size="sm" onClick={handleViewDetails}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </div>
      </div>
    </Card>
  )
}
