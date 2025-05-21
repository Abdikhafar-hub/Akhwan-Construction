"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertCircle,
  BarChart3,
  Box,
  Calendar,
  Check,
  Clock,
  DollarSign,
  Download,
  Edit,
  Eye,
  Filter,
  Package,
  Plus,
  RefreshCw,
  Search,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react"
import { MetricsCard } from "@/components/dashboard/builder/metrics-card"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { HardwareNav } from "@/components/dashboard/builder/hardware-nav"

// Mock data for hardware supplier dashboard
const mockInventoryItems = [
  {
    id: "inv1",
    name: "Portland Cement",
    category: "Building Materials",
    stock: 250,
    unit: "bags",
    price: 750,
    status: "In Stock",
    image: "/cement-bag.png",
  },
  {
    id: "inv2",
    name: "Steel Reinforcement Bars",
    category: "Structural Materials",
    stock: 500,
    unit: "pieces",
    price: 1200,
    status: "In Stock",
    image: "/steel-bars.png",
  },
  {
    id: "inv3",
    name: "Ceramic Floor Tiles",
    category: "Finishing Materials",
    stock: 1000,
    unit: "sq. meters",
    price: 850,
    status: "Low Stock",
    image: "/ceramic-tiles-collection.png",
  },
  {
    id: "inv4",
    name: "PVC Pipes (2 inch)",
    category: "Plumbing",
    stock: 150,
    unit: "pieces",
    price: 350,
    status: "In Stock",
    image: "/pvc-pipes.png",
  },
  {
    id: "inv5",
    name: "Electrical Wiring",
    category: "Electrical",
    stock: 1000,
    unit: "meters",
    price: 75,
    status: "In Stock",
    image: "/electrical-wire.png",
  },
]

const mockOrders = [
  {
    id: "ord1",
    customer: {
      name: "John Kamau",
      avatar: "/intertwined-letters.png",
    },
    items: 5,
    total: 12500,
    status: "Delivered",
    date: "2025-01-10",
  },
  {
    id: "ord2",
    customer: {
      name: "Sarah Omondi",
      avatar: "/SO-graffiti.png",
    },
    items: 3,
    total: 8750,
    status: "Processing",
    date: "2025-02-12",
  },
  {
    id: "ord3",
    customer: {
      name: "David Mwangi",
      avatar: "/direct-message-interface.png",
    },
    items: 10,
    total: 25000,
    status: "Pending",
    date: "2025-03-13",
  },
  {
    id: "ord4",
    customer: {
      name: "Lucy Wanjiru",
      avatar: "/abstract-lw.png",
    },
    items: 2,
    total: 5000,
    status: "Delivered",
    date: "2025-04-08",
  },
]

const mockMetrics = [
  {
    title: "Total Sales",
    value: "KSh 1.2M",
    change: "+12%",
    icon: <DollarSign className="h-4 w-4" />,
  },
  {
    title: "Active Orders",
    value: "24",
    change: "+5%",
    icon: <ShoppingCart className="h-4 w-4" />,
  },
  {
    title: "Inventory Items",
    value: "156",
    change: "+3%",
    icon: <Box className="h-4 w-4" />,
  },
  {
    title: "Customers",
    value: "85",
    change: "+15%",
    icon: <Users className="h-4 w-4" />,
  },
]

const mockSuppliers = [
  {
    id: "sup1",
    name: "Bamburi Cement",
    category: "Building Materials",
    contact: "John Doe",
    phone: "+254 712 345 678",
    email: "john@bamburi.co.ke",
    status: "Active",
  },
  {
    id: "sup2",
    name: "Steel Masters Ltd",
    category: "Structural Materials",
    contact: "Jane Smith",
    phone: "+254 723 456 789",
    email: "jane@steelmasters.co.ke",
    status: "Active",
  },
  {
    id: "sup3",
    name: "Tile World Kenya",
    category: "Finishing Materials",
    contact: "Peter Kamau",
    phone: "+254 734 567 890",
    email: "peter@tileworld.co.ke",
    status: "Inactive",
  },
  {
    id: "sup4",
    name: "Plumb Solutions",
    category: "Plumbing",
    contact: "Mary Wanjiku",
    phone: "+254 745 678 901",
    email: "mary@plumbsolutions.co.ke",
    status: "Active",
  },
]

const mockDeliveries = [
  {
    id: "del1",
    orderId: "ORD-2025-456",
    customer: "Sarah Omondi",
    location: "Westlands, Nairobi",
    status: "In Transit",
    driver: "James Mwangi",
    vehicle: "KBZ 123A",
    estimatedDelivery: "2025-01-14",
  },
  {
    id: "del2",
    orderId: "ORD-2025-789",
    customer: "David Mwangi",
    location: "Kileleshwa, Nairobi",
    status: "Scheduled",
    driver: "Samuel Ochieng",
    vehicle: "KCB 456B",
    estimatedDelivery: "2025-02-15",
  },
  {
    id: "del3",
    orderId: "ORD-2025-101",
    customer: "Elizabeth Njeri",
    location: "Kilimani, Nairobi",
    status: "Delivered",
    driver: "Joseph Kimani",
    vehicle: "KDD 789C",
    estimatedDelivery: "2025-03-10",
  },
]

const mockPromotions = [
  {
    id: "promo1",
    title: "End of Month Sale",
    discount: "15% off",
    category: "All Products",
    startDate: "2025-01-25",
    endDate: "2025-01-31",
    status: "Upcoming",
  },
  {
    id: "promo2",
    title: "Cement Special",
    discount: "KSh 100 off per bag",
    category: "Building Materials",
    startDate: "2025-02-15",
    endDate: "2025-02-20",
    status: "Active",
  },
  {
    id: "promo3",
    title: "Bulk Purchase Discount",
    discount: "10% off orders above KSh 50,000",
    category: "All Products",
    startDate: "2025-03-01",
    endDate: "2025-03-31",
    status: "Active",
  },
]

export function HardwareSupplierDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()

  // Dialog states
  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false)
  const [updateInventoryDialogOpen, setUpdateInventoryDialogOpen] = useState(false)
  const [processOrderDialogOpen, setProcessOrderDialogOpen] = useState(false)
  const [updateShipmentDialogOpen, setUpdateShipmentDialogOpen] = useState(false)
  const [addPromotionDialogOpen, setAddPromotionDialogOpen] = useState(false)
  const [addSupplierDialogOpen, setAddSupplierDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null)

  // Handle add product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    setAddProductDialogOpen(false)
    toast({
      title: "Product Added",
      description: "New product has been added to inventory",
      duration: 3000,
    })
  }

  // Handle update inventory
  const handleUpdateInventory = (e: React.FormEvent) => {
    e.preventDefault()
    setUpdateInventoryDialogOpen(false)
    toast({
      title: "Inventory Updated",
      description: `${selectedItem?.name} stock has been updated`,
      duration: 3000,
    })
  }

  // Handle process order
  const handleProcessOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setProcessOrderDialogOpen(false)
    toast({
      title: "Order Processed",
      description: `Order #${selectedOrder?.id} has been processed`,
      duration: 3000,
    })
  }

  // Handle update shipment
  const handleUpdateShipment = (e: React.FormEvent) => {
    e.preventDefault()
    setUpdateShipmentDialogOpen(false)
    toast({
      title: "Shipment Updated",
      description: `Delivery for order #${selectedDelivery?.orderId} has been updated`,
      duration: 3000,
    })
  }

  // Handle add promotion
  const handleAddPromotion = (e: React.FormEvent) => {
    e.preventDefault()
    setAddPromotionDialogOpen(false)
    toast({
      title: "Promotion Added",
      description: "New promotion has been created",
      duration: 3000,
    })
  }

  // Handle add supplier
  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault()
    setAddSupplierDialogOpen(false)
    toast({
      title: "Supplier Added",
      description: "New supplier has been added to your network",
      duration: 3000,
    })
  }

  // Handle view details
  const handleViewDetails = (item: any) => {
    toast({
      title: "Viewing Details",
      description: `Viewing details for ${item.name || item.id}`,
      duration: 3000,
    })
  }

  // Handle download report
  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "Your report has been downloaded successfully",
      duration: 3000,
    })
  }

  // Handle export data
  const handleExportData = () => {
    toast({
      title: "Data Exported",
      description: "Your data has been exported successfully",
      duration: 3000,
    })
  }

  return (
    <>
      <HardwareNav />
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Hardware Supplier Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Dialog open={addProductDialogOpen} onOpenChange={setAddProductDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Package className="mr-2 h-4 w-4" />
                  Add New Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>Enter the details of the new product to add to your inventory.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddProduct}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="product-name" className="text-right">
                        Name
                      </Label>
                      <Input id="product-name" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="product-category" className="text-right">
                        Category
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="building">Building Materials</SelectItem>
                          <SelectItem value="structural">Structural Materials</SelectItem>
                          <SelectItem value="finishing">Finishing Materials</SelectItem>
                          <SelectItem value="plumbing">Plumbing</SelectItem>
                          <SelectItem value="electrical">Electrical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="product-price" className="text-right">
                        Price (KSh)
                      </Label>
                      <Input id="product-price" type="number" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="product-stock" className="text-right">
                        Initial Stock
                      </Label>
                      <Input id="product-stock" type="number" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="product-unit" className="text-right">
                        Unit
                      </Label>
                      <Input id="product-unit" placeholder="e.g., bags, pieces" className="col-span-3" required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="product-description" className="text-right">
                        Description
                      </Label>
                      <Textarea id="product-description" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Add Product</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-6 md:w-[700px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="deliveries">Deliveries</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="promotions">Promotions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {mockMetrics.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  icon={metric.icon}
                />
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Sales Overview</CardTitle>
                  <CardDescription>Your sales performance over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                    <BarChart3 className="h-16 w-16 text-muted-foreground/50" />
                    <span className="ml-2 text-muted-foreground">Sales chart visualization</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Refreshing Data",
                        description: "Sales data is being refreshed",
                        duration: 3000,
                      })
                    }}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Data
                  </Button>
                </CardFooter>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Your latest activities and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <ShoppingCart className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">New order received</p>
                        <p className="text-xs text-muted-foreground">Order #ORD-2025-789 from David Mwangi</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>2 hours ago</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Truck className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Order shipped</p>
                        <p className="text-xs text-muted-foreground">Order #ORD-2025-456 to Sarah Omondi</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>5 hours ago</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Box className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Inventory updated</p>
                        <p className="text-xs text-muted-foreground">Added 50 bags of Portland Cement to inventory</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>Yesterday</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Supplier meeting scheduled</p>
                        <p className="text-xs text-muted-foreground">
                          Meeting with Bamburi Cement scheduled for next week
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>2 days ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "View All Activities",
                        description: "Navigating to activity log",
                        duration: 3000,
                      })
                    }}
                  >
                    View All Activities
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Low Stock Items</CardTitle>
                  <CardDescription>Items that need to be restocked soon</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockInventoryItems
                      .filter((item) => item.status === "Low Stock")
                      .map((item) => (
                        <div key={item.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-8 w-8 object-contain"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.stock} {item.unit} remaining
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedItem(item)
                              setUpdateInventoryDialogOpen(true)
                            }}
                          >
                            Restock
                          </Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("inventory")}>
                    View All Inventory
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Orders</CardTitle>
                  <CardDescription>Orders waiting to be processed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockOrders
                      .filter((order) => order.status === "Pending")
                      .map((order) => (
                        <div key={order.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={order.customer.avatar || "/placeholder.svg"}
                                alt={order.customer.name}
                              />
                              <AvatarFallback>
                                {order.customer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{order.customer.name}</p>
                              <p className="text-xs text-muted-foreground">KSh {order.total.toLocaleString()}</p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedOrder(order)
                              setProcessOrderDialogOpen(true)
                            }}
                          >
                            Process
                          </Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("orders")}>
                    View All Orders
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Promotions</CardTitle>
                  <CardDescription>Current promotional offers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockPromotions
                      .filter((promo) => promo.status === "Active")
                      .map((promo) => (
                        <div key={promo.id} className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{promo.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {promo.discount} on {promo.category}
                            </p>
                            <p className="text-xs text-muted-foreground">Ends: {promo.endDate}</p>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => handleViewDetails(promo)}>
                            View
                          </Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab("promotions")}>
                    View All Promotions
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Inventory Management</CardTitle>
                  <CardDescription>Manage your product inventory</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Dialog open={addProductDialogOpen} onOpenChange={setAddProductDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Package className="mr-2 h-4 w-4" />
                        Add New Product
                      </Button>
                    </DialogTrigger>
                    {/* Dialog content is defined above */}
                  </Dialog>
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 w-full max-w-sm">
                    <Input placeholder="Search products..." />
                    <Button variant="outline" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
                <div className="space-y-4">
                  {mockInventoryItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="h-10 w-10 object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant={item.status === "In Stock" ? "default" : "destructive"}>
                              {item.status}
                            </Badge>
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
                        <Dialog
                          open={updateInventoryDialogOpen && selectedItem?.id === item.id}
                          onOpenChange={(open) => {
                            if (open) {
                              setSelectedItem(item)
                            }
                            setUpdateInventoryDialogOpen(open)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <RefreshCw className="mr-2 h-4 w-4" />
                              Update Stock
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Update Inventory</DialogTitle>
                              <DialogDescription>Update the stock level for {selectedItem?.name}.</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleUpdateInventory}>
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="current-stock" className="text-right">
                                    Current Stock
                                  </Label>
                                  <Input
                                    id="current-stock"
                                    value={selectedItem?.stock}
                                    className="col-span-3"
                                    disabled
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="stock-change" className="text-right">
                                    Add/Remove
                                  </Label>
                                  <Input id="stock-change" type="number" className="col-span-3" required />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="reason" className="text-right">
                                    Reason
                                  </Label>
                                  <Select>
                                    <SelectTrigger className="col-span-3">
                                      <SelectValue placeholder="Select reason" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="restock">Restock</SelectItem>
                                      <SelectItem value="adjustment">Inventory Adjustment</SelectItem>
                                      <SelectItem value="damaged">Damaged Goods</SelectItem>
                                      <SelectItem value="returned">Customer Return</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="notes" className="text-right">
                                    Notes
                                  </Label>
                                  <Textarea id="notes" className="col-span-3" />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="submit">Update Inventory</Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Button size="sm" onClick={() => handleViewDetails(item)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Order Management</CardTitle>
                  <CardDescription>Track and manage customer orders</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Dialog open={processOrderDialogOpen} onOpenChange={setProcessOrderDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Process Orders
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Process Order</DialogTitle>
                        <DialogDescription>Update the status of this order.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleProcessOrder}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="order-id" className="text-right">
                              Order ID
                            </Label>
                            <Input id="order-id" value={selectedOrder?.id || ""} className="col-span-3" disabled />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="customer" className="text-right">
                              Customer
                            </Label>
                            <Input
                              id="customer"
                              value={selectedOrder?.customer?.name || ""}
                              className="col-span-3"
                              disabled
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                              Status
                            </Label>
                            <Select>
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">Processing</SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="notes" className="text-right">
                              Notes
                            </Label>
                            <Textarea id="notes" className="col-span-3" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Update Order</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={updateShipmentDialogOpen} onOpenChange={setUpdateShipmentDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Truck className="mr-2 h-4 w-4" />
                        Update Shipment
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Update Shipment</DialogTitle>
                        <DialogDescription>Update the delivery status for this order.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleUpdateShipment}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="delivery-id" className="text-right">
                              Delivery ID
                            </Label>
                            <Input
                              id="delivery-id"
                              value={selectedDelivery?.id || ""}
                              className="col-span-3"
                              disabled
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="order-id" className="text-right">
                              Order ID
                            </Label>
                            <Input
                              id="order-id"
                              value={selectedDelivery?.orderId || ""}
                              className="col-span-3"
                              disabled
                            />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                              Status
                            </Label>
                            <Select>
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="scheduled">Scheduled</SelectItem>
                                <SelectItem value="in-transit">In Transit</SelectItem>
                                <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="failed">Failed Delivery</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="notes" className="text-right">
                              Notes
                            </Label>
                            <Textarea id="notes" className="col-span-3" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Update Shipment</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 w-full max-w-sm">
                    <Input placeholder="Search orders..." />
                    <Button variant="outline" size="icon">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </div>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
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
                                order.status === "Delivered"
                                  ? "default"
                                  : order.status === "Processing"
                                    ? "secondary"
                                    : "outline"
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedOrder(order)
                            setProcessOrderDialogOpen(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Update Status
                        </Button>
                        <Button size="sm" onClick={() => handleViewDetails(order)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deliveries" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Delivery Management</CardTitle>
                  <CardDescription>Track and manage your deliveries</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button
                    onClick={() => {
                      toast({
                        title: "Schedule Delivery",
                        description: "Navigating to delivery scheduling",
                        duration: 3000,
                      })
                    }}
                  >
                    <Truck className="mr-2 h-4 w-4" />
                    Schedule Delivery
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDeliveries.map((delivery) => (
                    <div key={delivery.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Order #{delivery.orderId}</p>
                        <p className="text-sm text-muted-foreground">Customer: {delivery.customer}</p>
                        <p className="text-sm text-muted-foreground">Location: {delivery.location}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge
                            variant={
                              delivery.status === "Delivered"
                                ? "default"
                                : delivery.status === "In Transit"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {delivery.status}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Driver: {delivery.driver}</p>
                        <p className="text-sm text-muted-foreground">Vehicle: {delivery.vehicle}</p>
                        <p className="text-sm text-muted-foreground">Est. Delivery: {delivery.estimatedDelivery}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedDelivery(delivery)
                            setUpdateShipmentDialogOpen(true)
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Update Status
                        </Button>
                        <Button size="sm" onClick={() => handleViewDetails(delivery)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Supplier Management</CardTitle>
                  <CardDescription>Manage your supplier network</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Dialog open={addSupplierDialogOpen} onOpenChange={setAddSupplierDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Supplier
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Supplier</DialogTitle>
                        <DialogDescription>
                          Enter the details of the new supplier to add to your network.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddSupplier}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="supplier-name" className="text-right">
                              Company Name
                            </Label>
                            <Input id="supplier-name" className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="supplier-category" className="text-right">
                              Category
                            </Label>
                            <Select>
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="building">Building Materials</SelectItem>
                                <SelectItem value="structural">Structural Materials</SelectItem>
                                <SelectItem value="finishing">Finishing Materials</SelectItem>
                                <SelectItem value="plumbing">Plumbing</SelectItem>
                                <SelectItem value="electrical">Electrical</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="contact-person" className="text-right">
                              Contact Person
                            </Label>
                            <Input id="contact-person" className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">
                              Phone
                            </Label>
                            <Input id="phone" className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                              Email
                            </Label>
                            <Input id="email" type="email" className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="address" className="text-right">
                              Address
                            </Label>
                            <Textarea id="address" className="col-span-3" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Add Supplier</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSuppliers.map((supplier) => (
                    <div key={supplier.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{supplier.name}</p>
                        <p className="text-sm text-muted-foreground">Category: {supplier.category}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={supplier.status === "Active" ? "default" : "secondary"}>
                            {supplier.status}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Contact: {supplier.contact}</p>
                        <p className="text-sm text-muted-foreground">Phone: {supplier.phone}</p>
                        <p className="text-sm text-muted-foreground">Email: {supplier.email}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Place Order",
                              description: `Placing order with ${supplier.name}`,
                              duration: 3000,
                            })
                          }}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Place Order
                        </Button>
                        <Button size="sm" onClick={() => handleViewDetails(supplier)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="promotions" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Promotions & Discounts</CardTitle>
                  <CardDescription>Manage your promotional offers</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Dialog open={addPromotionDialogOpen} onOpenChange={setAddPromotionDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Promotion
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create New Promotion</DialogTitle>
                        <DialogDescription>Set up a new promotional offer for your products.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddPromotion}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="promo-title" className="text-right">
                              Title
                            </Label>
                            <Input id="promo-title" className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="discount-type" className="text-right">
                              Discount Type
                            </Label>
                            <Select>
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="percentage">Percentage</SelectItem>
                                <SelectItem value="fixed">Fixed Amount</SelectItem>
                                <SelectItem value="bogo">Buy One Get One</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="discount-value" className="text-right">
                              Discount Value
                            </Label>
                            <Input id="discount-value" type="number" className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">
                              Category
                            </Label>
                            <Select>
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Products</SelectItem>
                                <SelectItem value="building">Building Materials</SelectItem>
                                <SelectItem value="structural">Structural Materials</SelectItem>
                                <SelectItem value="finishing">Finishing Materials</SelectItem>
                                <SelectItem value="plumbing">Plumbing</SelectItem>
                                <SelectItem value="electrical">Electrical</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="start-date" className="text-right">
                              Start Date
                            </Label>
                            <Input id="start-date" type="date" className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="end-date" className="text-right">
                              End Date
                            </Label>
                            <Input id="end-date" type="date" className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                              Description
                            </Label>
                            <Textarea id="description" className="col-span-3" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Create Promotion</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPromotions.map((promo) => (
                    <div key={promo.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{promo.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {promo.discount} on {promo.category}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge
                            variant={
                              promo.status === "Active"
                                ? "default"
                                : promo.status === "Upcoming"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {promo.status}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Period</p>
                        <p className="text-sm text-muted-foreground">Start: {promo.startDate}</p>
                        <p className="text-sm text-muted-foreground">End: {promo.endDate}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Edit Promotion",
                              description: `Editing ${promo.title}`,
                              duration: 3000,
                            })
                          }}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            toast({
                              title: promo.status === "Active" ? "Deactivate Promotion" : "Activate Promotion",
                              description: `${promo.status === "Active" ? "Deactivated" : "Activated"} ${promo.title}`,
                              duration: 3000,
                            })
                          }}
                        >
                          {promo.status === "Active" ? (
                            <>
                              <AlertCircle className="mr-2 h-4 w-4" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Activate
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
