import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, Eye, UserCheck, UserX } from "lucide-react"

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage and monitor all users on the Akhwan platform</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>View, filter, and manage all registered users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search users..." className="pl-8" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="User Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="customer">Customers</SelectItem>
                    <SelectItem value="fundi">Fundis</SelectItem>
                    <SelectItem value="contractor">Contractors</SelectItem>
                    <SelectItem value="professional">Professionals</SelectItem>
                    <SelectItem value="hardware">Hardware Suppliers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending Verification</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
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
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>User Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          user.type === "Customer"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : user.type === "Fundi"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : user.type === "Contractor"
                                ? "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                                : user.type === "Professional"
                                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                                  : "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300"
                        }
                      >
                        {user.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "Active" ? "default" : user.status === "Pending" ? "outline" : "destructive"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.joined}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {user.status === "Pending" && (
                          <>
                            <Button variant="ghost" size="icon" className="text-green-500">
                              <UserCheck className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500">
                              <UserX className="h-4 w-4" />
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
              Showing <strong>1</strong> to <strong>10</strong> of <strong>100</strong> results
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

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    type: "Customer",
    status: "Active",
    joined: "Jan 15, 2023",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    type: "Fundi",
    status: "Active",
    joined: "Feb 3, 2023",
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.j@example.com",
    type: "Contractor",
    status: "Active",
    joined: "Mar 12, 2023",
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    type: "Professional",
    status: "Pending",
    joined: "Apr 5, 2023",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.b@example.com",
    type: "Hardware",
    status: "Active",
    joined: "May 20, 2023",
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily.d@example.com",
    type: "Customer",
    status: "Active",
    joined: "Jun 8, 2023",
  },
  {
    id: 7,
    name: "Robert Wilson",
    email: "robert.w@example.com",
    type: "Fundi",
    status: "Pending",
    joined: "Jul 17, 2023",
  },
  {
    id: 8,
    name: "Linda Garcia",
    email: "linda.g@example.com",
    type: "Hardware",
    status: "Suspended",
    joined: "Aug 22, 2023",
  },
  {
    id: 9,
    name: "James Miller",
    email: "james.m@example.com",
    type: "Professional",
    status: "Pending",
    joined: "Sep 11, 2023",
  },
  {
    id: 10,
    name: "Thomas Rodriguez",
    email: "thomas.r@example.com",
    type: "Contractor",
    status: "Active",
    joined: "Oct 30, 2023",
  },
]
