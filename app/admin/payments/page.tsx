import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Download, Eye, CheckCircle, XCircle } from "lucide-react"

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payments & Escrow</h1>
        <p className="text-muted-foreground">Monitor and manage all payment transactions and escrow funds</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Escrow Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh 1,245,678</div>
            <p className="text-xs text-muted-foreground mt-1">Funds currently held in escrow</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Releases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh 345,920</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting job completion or approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Disputed Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh 78,500</div>
            <p className="text-xs text-muted-foreground mt-1">Funds frozen due to disputes</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="escrow">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="escrow">Escrow Transactions</TabsTrigger>
          <TabsTrigger value="payouts">Builder Payouts</TabsTrigger>
          <TabsTrigger value="customer">Customer Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="escrow">
          <Card>
            <CardHeader>
              <CardTitle>Escrow Transactions</CardTitle>
              <CardDescription>Monitor all funds currently held in escrow</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search transactions..." className="pl-8" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="released">Released</SelectItem>
                        <SelectItem value="disputed">Disputed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>Job</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Builder</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {escrowTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>{transaction.job}</TableCell>
                        <TableCell>{transaction.customer}</TableCell>
                        <TableCell>{transaction.builder}</TableCell>
                        <TableCell>KSh {transaction.amount}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.status === "Pending"
                                ? "outline"
                                : transaction.status === "Released"
                                  ? "default"
                                  : "destructive"
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {transaction.status === "Pending" && (
                              <>
                                <Button variant="ghost" size="icon" className="text-green-500">
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-red-500">
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                  Showing <strong>1</strong> to <strong>5</strong> of <strong>25</strong> transactions
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts">
          <Card>
            <CardHeader>
              <CardTitle>Builder Payouts</CardTitle>
              <CardDescription>Track all payments released to builders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search payouts..." className="pl-8" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Builder Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="fundi">Fundis</SelectItem>
                        <SelectItem value="contractor">Contractors</SelectItem>
                        <SelectItem value="professional">Professionals</SelectItem>
                        <SelectItem value="hardware">Hardware</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payout ID</TableHead>
                      <TableHead>Builder</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Job</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {builderPayouts.map((payout) => (
                      <TableRow key={payout.id}>
                        <TableCell className="font-medium">{payout.id}</TableCell>
                        <TableCell>{payout.builder}</TableCell>
                        <TableCell>{payout.type}</TableCell>
                        <TableCell>{payout.job}</TableCell>
                        <TableCell>KSh {payout.amount}</TableCell>
                        <TableCell>{payout.method}</TableCell>
                        <TableCell>{payout.date}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                  Showing <strong>1</strong> to <strong>5</strong> of <strong>30</strong> payouts
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customer">
          <Card>
            <CardHeader>
              <CardTitle>Customer Payments</CardTitle>
              <CardDescription>Track all payments made by customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search payments..." className="pl-8" />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Payment Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Methods</SelectItem>
                        <SelectItem value="mpesa">M-Pesa</SelectItem>
                        <SelectItem value="card">Card</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Job</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>{payment.customer}</TableCell>
                        <TableCell>{payment.job}</TableCell>
                        <TableCell>KSh {payment.amount}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              payment.status === "Completed"
                                ? "default"
                                : payment.status === "Processing"
                                  ? "outline"
                                  : "destructive"
                            }
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                  Showing <strong>1</strong> to <strong>5</strong> of <strong>40</strong> payments
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const escrowTransactions = [
  {
    id: "ESC-001234",
    job: "Kitchen Renovation",
    customer: "John Doe",
    builder: "Jane Smith (Fundi)",
    amount: "45,000",
    status: "Pending",
    date: "May 5, 2023",
  },
  {
    id: "ESC-001235",
    job: "Bathroom Plumbing",
    customer: "Emily Davis",
    builder: "Michael Johnson (Contractor)",
    amount: "28,500",
    status: "Released",
    date: "May 6, 2023",
  },
  {
    id: "ESC-001236",
    job: "Electrical Wiring",
    customer: "Robert Wilson",
    builder: "Sarah Williams (Fundi)",
    amount: "15,200",
    status: "Released",
    date: "May 7, 2023",
  },
  {
    id: "ESC-001237",
    job: "Roof Repair",
    customer: "David Brown",
    builder: "Thomas Rodriguez (Contractor)",
    amount: "78,500",
    status: "Disputed",
    date: "May 8, 2023",
  },
  {
    id: "ESC-001238",
    job: "Wall Painting",
    customer: "Linda Garcia",
    builder: "James Miller (Fundi)",
    amount: "32,000",
    status: "Pending",
    date: "May 9, 2023",
  },
]

const builderPayouts = [
  {
    id: "PAY-005678",
    builder: "Jane Smith",
    type: "Fundi",
    job: "Kitchen Renovation",
    amount: "42,750",
    method: "M-Pesa",
    date: "May 8, 2023",
  },
  {
    id: "PAY-005679",
    builder: "Michael Johnson",
    type: "Contractor",
    job: "Bathroom Plumbing",
    amount: "27,075",
    method: "Bank Transfer",
    date: "May 9, 2023",
  },
  {
    id: "PAY-005680",
    builder: "Sarah Williams",
    type: "Fundi",
    job: "Electrical Wiring",
    amount: "14,440",
    method: "M-Pesa",
    date: "May 10, 2023",
  },
  {
    id: "PAY-005681",
    builder: "James Miller",
    type: "Professional",
    job: "House Design",
    amount: "95,000",
    method: "PayPal",
    date: "May 11, 2023",
  },
  {
    id: "PAY-005682",
    builder: "David Brown",
    type: "Hardware",
    job: "Material Supply",
    amount: "124,500",
    method: "Bank Transfer",
    date: "May 12, 2023",
  },
]

const customerPayments = [
  {
    id: "PMT-009012",
    customer: "John Doe",
    job: "Kitchen Renovation",
    amount: "45,000",
    method: "M-Pesa",
    status: "Completed",
    date: "May 5, 2023",
  },
  {
    id: "PMT-009013",
    customer: "Emily Davis",
    job: "Bathroom Plumbing",
    amount: "28,500",
    method: "Card",
    status: "Completed",
    date: "May 6, 2023",
  },
  {
    id: "PMT-009014",
    customer: "Robert Wilson",
    job: "Electrical Wiring",
    amount: "15,200",
    method: "M-Pesa",
    status: "Completed",
    date: "May 7, 2023",
  },
  {
    id: "PMT-009015",
    customer: "David Brown",
    job: "Roof Repair",
    amount: "78,500",
    method: "PayPal",
    status: "Processing",
    date: "May 8, 2023",
  },
  {
    id: "PMT-009016",
    customer: "Linda Garcia",
    job: "Wall Painting",
    amount: "32,000",
    method: "Card",
    status: "Failed",
    date: "May 9, 2023",
  },
]
