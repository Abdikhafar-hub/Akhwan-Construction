"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Wallet,
  CreditCard,
  Phone,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowUpRight,
  Shield,
  RefreshCw,
  Building,
  Star,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { WalletNav } from "@/components/wallet/wallet-nav"
import type { UserRole } from "@/lib/types"

export default function WalletPage() {
  // This would come from auth context in a real app
  const [userRole, setUserRole] = useState<UserRole>("customer")
  const [paymentMethod, setPaymentMethod] = useState("mpesa")
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [releaseDialogOpen, setReleaseDialogOpen] = useState(false)
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [autoReleaseEnabled, setAutoReleaseEnabled] = useState(true)

  const handlePayment = () => {
    // Simulate payment processing
    setPaymentSuccess(true)
    setTimeout(() => {
      setPaymentDialogOpen(false)
      setPaymentSuccess(false)
      setPaymentAmount("")
    }, 2000)
  }

  const handleReleasePayment = () => {
    // Simulate payment release
    setTimeout(() => {
      setReleaseDialogOpen(false)
    }, 1000)
  }

  const openReleaseDialog = (job: any) => {
    setSelectedJob(job)
    setReleaseDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <WalletNav userRole={userRole} onRoleChange={setUserRole} />

      <div className="container mx-auto py-8 px-4">
        {/* User Profile Summary */}
        <div className="mb-8 bg-background p-6 rounded-lg border">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/diverse-group.png" alt="User" />
              <AvatarFallback>{userRole === "customer" ? "JD" : userRole === "fundi" ? "BF" : "CT"}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">
                {userRole === "customer" ? "John Doe" : userRole === "fundi" ? "Bob Fundi" : "Contractor Team"}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="capitalize">
                  {userRole}
                </Badge>
                {userRole !== "customer" && (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm font-medium">4.8</span>
                    <span className="text-sm text-muted-foreground ml-1">(24 reviews)</span>
                  </div>
                )}
              </div>
              <p className="text-muted-foreground mt-1">
                {userRole === "customer"
                  ? "Member since January 2023"
                  : userRole === "fundi"
                    ? "Plumbing Specialist • Verified • 18 jobs completed"
                    : "General Contractor • Verified • 32 jobs completed"}
              </p>
            </div>
            {userRole !== "customer" && (
              <div className="md:text-right">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  <Shield className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">Trusted Builder</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Eligible for instant payouts</p>
              </div>
            )}
          </div>
        </div>

        {/* Wallet Summary Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          {userRole === "customer" ? (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                    <CardDescription>Your current wallet balance</CardDescription>
                  </div>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">KSh 15,000</div>
                  <p className="text-xs text-muted-foreground mt-1">Last updated: Today, 10:30 AM</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">Escrow Balance</CardTitle>
                    <CardDescription>Funds held in escrow</CardDescription>
                  </div>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">KSh 45,000</div>
                  <p className="text-xs text-muted-foreground mt-1">For 2 active jobs</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                    <CardDescription>Lifetime spending on Akhwan</CardDescription>
                  </div>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">KSh 128,500</div>
                  <p className="text-xs text-muted-foreground mt-1">Across 5 completed jobs</p>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
                    <CardDescription>Ready for withdrawal</CardDescription>
                  </div>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">KSh 32,500</div>
                  <p className="text-xs text-muted-foreground mt-1">Last payout: May 15, 2023</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
                    <CardDescription>Awaiting release</CardDescription>
                  </div>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">KSh 28,500</div>
                  <p className="text-xs text-muted-foreground mt-1">From 2 completed jobs</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                    <CardDescription>Lifetime earnings on Akhwan</CardDescription>
                  </div>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">KSh 245,000</div>
                  <p className="text-xs text-muted-foreground mt-1">Across 18 completed jobs</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {userRole === "customer" ? (
            <>
              <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <DollarSign className="h-4 w-4" />
                    Add Funds
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Funds to Wallet</DialogTitle>
                    <DialogDescription>Choose your payment method and enter the amount.</DialogDescription>
                  </DialogHeader>
                  {paymentSuccess ? (
                    <div className="flex flex-col items-center justify-center py-6">
                      <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-medium">Payment Successful!</h3>
                      <p className="text-muted-foreground text-center mt-2">
                        Your funds have been added to your wallet.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="amount">Amount (KSh)</Label>
                          <Input
                            id="amount"
                            placeholder="Enter amount"
                            value={paymentAmount}
                            onChange={(e) => setPaymentAmount(e.target.value)}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="payment-method">Payment Method</Label>
                          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                            <SelectTrigger id="payment-method">
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mpesa">M-Pesa</SelectItem>
                              <SelectItem value="card">Credit/Debit Card</SelectItem>
                              <SelectItem value="paypal">PayPal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {paymentMethod === "mpesa" && (
                          <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" placeholder="Enter M-Pesa number" />
                          </div>
                        )}

                        {paymentMethod === "card" && (
                          <>
                            <div className="grid gap-2">
                              <Label htmlFor="card-number">Card Number</Label>
                              <Input id="card-number" placeholder="1234 5678 9012 3456" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input id="expiry" placeholder="MM/YY" />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="cvc">CVC</Label>
                                <Input id="cvc" placeholder="123" />
                              </div>
                            </div>
                          </>
                        )}

                        {paymentMethod === "paypal" && (
                          <div className="flex items-center justify-center p-4 border rounded-md">
                            <p className="text-muted-foreground">
                              You will be redirected to PayPal to complete the payment.
                            </p>
                          </div>
                        )}
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setPaymentDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handlePayment}>
                          {paymentMethod === "mpesa"
                            ? "Send M-Pesa Request"
                            : paymentMethod === "card"
                              ? "Pay with Card"
                              : "Continue to PayPal"}
                        </Button>
                      </DialogFooter>
                    </>
                  )}
                </DialogContent>
              </Dialog>
              <Button variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Transaction History
              </Button>
            </>
          ) : (
            <>
              <Button className="gap-2">
                <DollarSign className="h-4 w-4" />
                Withdraw Funds
              </Button>
              <Button variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Payout History
              </Button>
            </>
          )}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue={userRole === "customer" ? "escrow" : "pending"}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            {userRole === "customer" ? (
              <>
                <TabsTrigger value="escrow">Escrow Jobs</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
              </>
            ) : (
              <>
                <TabsTrigger value="pending">Pending Payouts</TabsTrigger>
                <TabsTrigger value="active">Active Jobs</TabsTrigger>
                <TabsTrigger value="payout-methods">Payout Methods</TabsTrigger>
              </>
            )}
          </TabsList>

          {userRole === "customer" ? (
            <>
              <TabsContent value="escrow">
                <Card>
                  <CardHeader>
                    <CardTitle>Escrow Jobs</CardTitle>
                    <CardDescription>Jobs with funds currently in escrow</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Job</TableHead>
                            <TableHead>Builder</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Release Date</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {customerEscrowJobs.map((job) => (
                            <TableRow key={job.id}>
                              <TableCell className="font-medium">{job.title}</TableCell>
                              <TableCell>{job.builder}</TableCell>
                              <TableCell>KSh {job.amount}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    job.status === "In Progress"
                                      ? "outline"
                                      : job.status === "Completed"
                                        ? "default"
                                        : "destructive"
                                  }
                                >
                                  {job.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{job.releaseDate}</TableCell>
                              <TableCell>
                                {job.status === "Completed" && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 gap-1"
                                    onClick={() => openReleaseDialog(job)}
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                    Release
                                  </Button>
                                )}
                                {job.status === "In Progress" && (
                                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                                    <ArrowUpRight className="h-4 w-4" />
                                    View
                                  </Button>
                                )}
                                {job.status === "Disputed" && (
                                  <Button variant="ghost" size="sm" className="h-8 gap-1 text-red-600">
                                    <AlertCircle className="h-4 w-4" />
                                    Dispute
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="mt-6 space-y-4">
                      <h3 className="text-lg font-medium">Escrow Settings</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Auto-Release Payments</h4>
                          <p className="text-sm text-muted-foreground">
                            Automatically release payments 3 days after job completion if no dispute is raised
                          </p>
                        </div>
                        <Switch checked={autoReleaseEnabled} onCheckedChange={setAutoReleaseEnabled} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="transactions">
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>View all your past transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Transaction</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Details</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {customerTransactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell className="font-medium">{transaction.description}</TableCell>
                              <TableCell className={transaction.type === "credit" ? "text-green-600" : "text-red-600"}>
                                {transaction.type === "credit" ? "+" : "-"}KSh {transaction.amount}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    transaction.status === "Completed"
                                      ? "default"
                                      : transaction.status === "Pending"
                                        ? "outline"
                                        : "destructive"
                                  }
                                >
                                  {transaction.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{transaction.date}</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" className="h-8 gap-1">
                                  <ArrowUpRight className="h-4 w-4" />
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="payment-methods">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>Manage your payment methods</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <Phone className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">M-Pesa</h3>
                            <p className="text-sm text-muted-foreground">+254 712 345 678</p>
                          </div>
                        </div>
                        <Badge>Default</Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Visa Card</h3>
                            <p className="text-sm text-muted-foreground">**** **** **** 4567</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Set Default
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <DollarSign className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">PayPal</h3>
                            <p className="text-sm text-muted-foreground">user@example.com</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Set Default
                        </Button>
                      </div>

                      <Button variant="outline" className="w-full mt-4">
                        Add New Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          ) : (
            <>
              <TabsContent value="pending">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Payouts</CardTitle>
                    <CardDescription>Jobs completed and awaiting payment release</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Job</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Expected Release</TableHead>
                            <TableHead>Details</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {builderPendingPayouts.map((job) => (
                            <TableRow key={job.id}>
                              <TableCell className="font-medium">{job.title}</TableCell>
                              <TableCell>{job.customer}</TableCell>
                              <TableCell>KSh {job.amount}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    job.status === "Awaiting Release"
                                      ? "outline"
                                      : job.status === "Auto-Release Scheduled"
                                        ? "default"
                                        : "destructive"
                                  }
                                >
                                  {job.status}
                                </Badge>
                              </TableCell>
                              <TableCell>{job.releaseDate}</TableCell>
                              <TableCell>
                                <Button variant="ghost" size="sm" className="h-8 gap-1">
                                  <ArrowUpRight className="h-4 w-4" />
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="active">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Jobs</CardTitle>
                    <CardDescription>Jobs currently in progress with escrow funds</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Job</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Progress</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {builderActiveJobs.map((job) => (
                            <TableRow key={job.id}>
                              <TableCell className="font-medium">{job.title}</TableCell>
                              <TableCell>{job.customer}</TableCell>
                              <TableCell>KSh {job.amount}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Progress value={job.progress} className="h-2 w-[100px]" />
                                  <span className="text-sm">{job.progress}%</span>
                                </div>
                              </TableCell>
                              <TableCell>{job.startDate}</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm" className="h-8 gap-1">
                                  <CheckCircle className="h-4 w-4" />
                                  Update
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payout-methods">
                <Card>
                  <CardHeader>
                    <CardTitle>Payout Methods</CardTitle>
                    <CardDescription>Manage how you receive your payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <Phone className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">M-Pesa</h3>
                            <p className="text-sm text-muted-foreground">+254 712 345 678</p>
                          </div>
                        </div>
                        <Badge>Default</Badge>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Building className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Bank Account</h3>
                            <p className="text-sm text-muted-foreground">Equity Bank ****5678</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Set Default
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <DollarSign className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">PayPal</h3>
                            <p className="text-sm text-muted-foreground">builder@example.com</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          Set Default
                        </Button>
                      </div>

                      <Button variant="outline" className="w-full mt-4">
                        Add New Payout Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>

        {/* Release Payment Dialog */}
        <Dialog open={releaseDialogOpen} onOpenChange={setReleaseDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Release Payment</DialogTitle>
              <DialogDescription>You are about to release payment for the completed job.</DialogDescription>
            </DialogHeader>
            {selectedJob && (
              <div className="py-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Job</h4>
                      <p className="font-medium">{selectedJob.title}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Builder</h4>
                      <p className="font-medium">{selectedJob.builder}</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Amount</h4>
                      <p className="font-medium">KSh {selectedJob.amount}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Completion Date</h4>
                      <p className="font-medium">{selectedJob.completionDate || "Today"}</p>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Confirmation</h4>
                    <p className="text-sm">
                      By releasing this payment, you confirm that the job has been completed to your satisfaction. This
                      action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setReleaseDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleReleasePayment}>Release Payment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

// Sample data for customer escrow jobs
const customerEscrowJobs = [
  {
    id: 1,
    title: "Kitchen Renovation",
    builder: "Jane Smith (Fundi)",
    amount: "45,000",
    status: "In Progress",
    releaseDate: "Expected May 15, 2023",
    completionDate: null,
  },
  {
    id: 2,
    title: "Bathroom Plumbing",
    builder: "Michael Johnson (Contractor)",
    amount: "28,500",
    status: "Completed",
    releaseDate: "Ready for release",
    completionDate: "May 10, 2023",
  },
  {
    id: 3,
    title: "Roof Repair",
    builder: "Thomas Rodriguez (Contractor)",
    amount: "78,500",
    status: "Disputed",
    releaseDate: "On hold",
    completionDate: "May 5, 2023",
  },
]

// Sample data for customer transactions
const customerTransactions = [
  {
    id: 1,
    description: "Payment for Kitchen Renovation",
    amount: "45,000",
    type: "debit",
    status: "Completed",
    date: "May 5, 2023",
  },
  {
    id: 2,
    description: "Wallet Top-up",
    amount: "20,000",
    type: "credit",
    status: "Completed",
    date: "May 3, 2023",
  },
  {
    id: 3,
    description: "Payment for Electrical Wiring",
    amount: "15,200",
    type: "debit",
    status: "Completed",
    date: "Apr 28, 2023",
  },
  {
    id: 4,
    description: "Refund for Cancelled Job",
    amount: "12,500",
    type: "credit",
    status: "Completed",
    date: "Apr 25, 2023",
  },
  {
    id: 5,
    description: "Wallet Top-up",
    amount: "30,000",
    type: "credit",
    status: "Pending",
    date: "Apr 22, 2023",
  },
]

// Sample data for builder pending payouts
const builderPendingPayouts = [
  {
    id: 1,
    title: "Bathroom Plumbing",
    customer: "John Doe",
    amount: "28,500",
    status: "Awaiting Release",
    releaseDate: "Customer approval pending",
  },
  {
    id: 2,
    title: "Electrical Wiring",
    customer: "Emily Davis",
    amount: "15,200",
    status: "Auto-Release Scheduled",
    releaseDate: "May 13, 2023 (2 days left)",
  },
]

// Sample data for builder active jobs
const builderActiveJobs = [
  {
    id: 1,
    title: "Kitchen Renovation",
    customer: "John Doe",
    amount: "45,000",
    progress: 60,
    startDate: "Apr 25, 2023",
  },
  {
    id: 2,
    title: "Office Painting",
    customer: "Sarah Williams",
    amount: "32,000",
    progress: 25,
    startDate: "May 5, 2023",
  },
]
