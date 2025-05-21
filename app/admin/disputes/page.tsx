import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Eye, MessageSquare, CheckCircle, XCircle } from "lucide-react"

export default function DisputesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Disputes</h1>
        <p className="text-muted-foreground">Manage and resolve disputes between customers and builders</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Disputes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">Active disputes requiring attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Disputes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground mt-1">Disputes opened in the last 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully resolved disputes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Disputed Amount</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSh 78,500</div>
            <p className="text-xs text-muted-foreground mt-1">Total funds currently in dispute</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Disputes</CardTitle>
          <CardDescription>Review and resolve disputes between customers and builders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search disputes..." className="pl-8" />
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
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="pending">Pending Decision</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Dispute Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="quality">Quality Issues</SelectItem>
                    <SelectItem value="timeline">Timeline Delays</SelectItem>
                    <SelectItem value="payment">Payment Disputes</SelectItem>
                    <SelectItem value="scope">Scope of Work</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dispute ID</TableHead>
                  <TableHead>Job</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Builder</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {disputes.map((dispute) => (
                  <TableRow key={dispute.id}>
                    <TableCell className="font-medium">{dispute.id}</TableCell>
                    <TableCell>{dispute.job}</TableCell>
                    <TableCell>{dispute.customer}</TableCell>
                    <TableCell>{dispute.builder}</TableCell>
                    <TableCell>KSh {dispute.amount}</TableCell>
                    <TableCell>{dispute.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          dispute.status === "New"
                            ? "destructive"
                            : dispute.status === "Investigating"
                              ? "outline"
                              : "default"
                        }
                      >
                        {dispute.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{dispute.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-green-500">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              Showing <strong>1</strong> to <strong>5</strong> of <strong>12</strong> disputes
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
    </div>
  )
}

const disputes = [
  {
    id: "DSP-00123",
    job: "Roof Repair",
    customer: "David Brown",
    builder: "Thomas Rodriguez (Contractor)",
    amount: "78,500",
    type: "Quality Issues",
    status: "New",
    date: "May 8, 2023",
  },
  {
    id: "DSP-00124",
    job: "Bathroom Renovation",
    customer: "Sarah Williams",
    builder: "Michael Johnson (Contractor)",
    amount: "45,000",
    type: "Timeline Delays",
    status: "Investigating",
    date: "May 7, 2023",
  },
  {
    id: "DSP-00125",
    job: "Electrical Installation",
    customer: "Emily Davis",
    builder: "Jane Smith (Fundi)",
    amount: "12,500",
    type: "Scope of Work",
    status: "Pending Decision",
    date: "May 6, 2023",
  },
  {
    id: "DSP-00126",
    job: "Kitchen Cabinets",
    customer: "Robert Wilson",
    builder: "Linda Garcia (Hardware)",
    amount: "35,000",
    type: "Payment Disputes",
    status: "New",
    date: "May 5, 2023",
  },
  {
    id: "DSP-00127",
    job: "House Design",
    customer: "John Doe",
    builder: "James Miller (Professional)",
    amount: "95,000",
    type: "Scope of Work",
    status: "Investigating",
    date: "May 4, 2023",
  },
]
