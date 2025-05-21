"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface InventoryItem {
  id: string
  name: string
  category: string
  stock: number
  unit: string
  price: number
  status: string
  image?: string
}

interface InventoryCardProps {
  item: InventoryItem
}

export function InventoryCard({ item }: InventoryCardProps) {
  const { toast } = useToast()

  const handleUpdateStock = () => {
    toast({
      title: "Update Stock",
      description: `Updating stock for ${item.name}`,
      duration: 3000,
    })
  }

  const handleViewDetails = () => {
    toast({
      title: "View Details",
      description: `Viewing details for ${item.name}`,
      duration: 3000,
    })
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
            {item.image ? (
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="h-10 w-10 object-contain" />
            ) : (
              <div className="h-10 w-10 bg-muted rounded-md" />
            )}
          </div>
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.category}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant={item.status === "In Stock" ? "default" : "destructive"}>{item.status}</Badge>
              <span className="text-sm">
                {item.stock} {item.unit}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="font-medium">KSh {item.price.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">per {item.unit.replace(/s$/, "")}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleUpdateStock}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Update Stock
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
