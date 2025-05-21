import { Users, Hammer, Briefcase, Building2, ShoppingBag, DollarSign, AlertTriangle } from "lucide-react"
import { StatsCard } from "@/components/dashboard/stats-card"
import { ActivityItem } from "@/components/dashboard/activity-item"
import { UserTypeChart } from "@/components/dashboard/user-type-chart"
import { JobTrendChart } from "@/components/dashboard/job-trend-chart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of Akhwan platform metrics and activity</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => { logout(); router.push('/login'); }}>
          Log Out
        </Button>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Activity</TabsTrigger>
          <TabsTrigger value="jobs">Jobs & Bids</TabsTrigger>
          <TabsTrigger value="payments">Payments & Escrow</TabsTrigger>
          <TabsTrigger value="disputes">Disputes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Users"
              value="2,856"
              description="Active users across all roles"
              icon={Users}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Fundis"
              value="845"
              description="Registered craftsmen"
              icon={Hammer}
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard
              title="Contractors"
              value="324"
              description="Project managers & teams"
              icon={Briefcase}
              trend={{ value: 5, isPositive: true }}
            />
            <StatsCard
              title="Professionals"
              value="187"
              description="Engineers & architects"
              icon={Building2}
              trend={{ value: 3, isPositive: true }}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
            <StatsCard
              title="Hardware Suppliers"
              value="98"
              description="Material vendors"
              icon={ShoppingBag}
              trend={{ value: 2, isPositive: true }}
            />
            <StatsCard
              title="Escrow Balance"
              value="KSh 1.2M"
              description="Total funds in escrow"
              icon={DollarSign}
              trend={{ value: 15, isPositive: true }}
            />
            <StatsCard
              title="Active Jobs"
              value="342"
              description="Currently in progress"
              icon={Briefcase}
              trend={{ value: 7, isPositive: true }}
            />
            <StatsCard
              title="Disputes"
              value="12"
              description="Requiring attention"
              icon={AlertTriangle}
              trend={{ value: 2, isPositive: false }}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3 mt-6">
            <UserTypeChart />
            <JobTrendChart />
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <ActivityItem
                    name="John Doe"
                    action="Posted a new job: 'Kitchen Renovation'"
                    timestamp="10 minutes ago"
                    status="success"
                  />
                  <ActivityItem
                    name="Jane Smith"
                    action="Submitted a bid for 'Bathroom Plumbing'"
                    timestamp="25 minutes ago"
                    status="info"
                  />
                  <ActivityItem
                    name="Michael Johnson"
                    action="Completed job: 'Electrical Wiring'"
                    timestamp="1 hour ago"
                    status="success"
                  />
                  <ActivityItem
                    name="Sarah Williams"
                    action="Raised a dispute for 'Roof Repair'"
                    timestamp="2 hours ago"
                    status="error"
                  />
                  <ActivityItem
                    name="David Brown"
                    action="Released payment for 'Wall Painting'"
                    timestamp="3 hours ago"
                    status="success"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <ActivityItem
                    name="Robert Wilson"
                    action="Awaiting verification: Fundi (Plumbing)"
                    timestamp="2 days ago"
                    status="warning"
                  />
                  <ActivityItem
                    name="Emily Davis"
                    action="Awaiting verification: Contractor (General)"
                    timestamp="2 days ago"
                    status="warning"
                  />
                  <ActivityItem
                    name="James Miller"
                    action="Awaiting verification: Professional (Architect)"
                    timestamp="3 days ago"
                    status="warning"
                  />
                  <ActivityItem
                    name="Linda Garcia"
                    action="Awaiting verification: Hardware Supplier"
                    timestamp="4 days ago"
                    status="warning"
                  />
                  <ActivityItem
                    name="Thomas Rodriguez"
                    action="Awaiting verification: Fundi (Electrical)"
                    timestamp="5 days ago"
                    status="warning"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Activity Feed</CardTitle>
                <CardDescription>Real-time activity from all user types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Customer Activities */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/diverse-group.png" alt="John Doe" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <div>
                            <span className="font-medium">John Doe</span>
                            <Badge className="ml-2">Customer</Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">10 minutes ago</span>
                        </div>
                        <p className="text-sm mb-2">Posted a new job: "Kitchen Renovation"</p>
                        <div className="text-xs text-muted-foreground mb-3">
                          Budget: KSh 45,000 - 60,000 • Location: Westlands, Nairobi
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          <Button variant="outline" size="sm">
                            Contact User
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fundi Activities */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/hardworking-construction-worker.png" alt="Bob Fundi" />
                        <AvatarFallback>BF</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <div>
                            <span className="font-medium">Bob Fundi</span>
                            <Badge className="ml-2" variant="secondary">
                              Fundi
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">25 minutes ago</span>
                        </div>
                        <p className="text-sm mb-2">Submitted a bid for "Bathroom Plumbing"</p>
                        <div className="text-xs text-muted-foreground mb-3">
                          Bid Amount: KSh 28,000 • Estimated Completion: 5 days
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            View Bid
                          </Button>
                          <Button variant="outline" size="sm">
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contractor Activities */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/thoughtful-man.png" alt="Contractor Team" />
                        <AvatarFallback>CT</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <div>
                            <span className="font-medium">Contractor Team</span>
                            <Badge className="ml-2" variant="secondary">
                              Contractor
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">1 hour ago</span>
                        </div>
                        <p className="text-sm mb-2">Updated progress on "Office Renovation"</p>
                        <div className="space-y-1 mb-3">
                          <div className="flex justify-between text-xs">
                            <span>Project Progress</span>
                            <span>75%</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            View Project
                          </Button>
                          <Button variant="outline" size="sm">
                            Contact Team
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Professional Activities */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/architect-studio.png" alt="James Miller" />
                        <AvatarFallback>JM</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <div>
                            <span className="font-medium">James Miller</span>
                            <Badge className="ml-2" variant="secondary">
                              Professional
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">2 hours ago</span>
                        </div>
                        <p className="text-sm mb-2">Uploaded new design documents for "Residential House Design"</p>
                        <div className="text-xs text-muted-foreground mb-3">
                          3 new files uploaded • Client: John Doe
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            View Documents
                          </Button>
                          <Button variant="outline" size="sm">
                            View Project
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hardware Supplier Activities */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/diverse-woman-portrait.png" alt="Linda Garcia" />
                        <AvatarFallback>LG</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <div>
                            <span className="font-medium">Linda Garcia</span>
                            <Badge className="ml-2" variant="secondary">
                              Hardware Supplier
                            </Badge>
                          </div>
                          <span className="text-xs text-muted-foreground">3 hours ago</span>
                        </div>
                        <p className="text-sm mb-2">Processed order #12348 for "Office Renovation"</p>
                        <div className="text-xs text-muted-foreground mb-3">
                          Order Amount: KSh 85,750 • 35 items • Status: Ready for Delivery
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            View Order
                          </Button>
                          <Button variant="outline" size="sm">
                            View Supplier
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>New User Registrations</CardTitle>
                  <CardDescription>Users awaiting verification</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Robert Wilson",
                        role: "Fundi",
                        specialization: "Plumbing",
                        date: "April 10, 2025",
                        documents: 3,
                        avatar: "/hardworking-construction-worker.png",
                      },
                      {
                        name: "Emily Davis",
                        role: "Contractor",
                        specialization: "General",
                        date: "April 10, 2025",
                        documents: 5,
                        avatar: "/diverse-woman-portrait.png",
                      },
                      {
                        name: "James Miller",
                        role: "Professional",
                        specialization: "Architect",
                        date: "April 9, 2025",
                        documents: 4,
                        avatar: "/architect-studio.png",
                      },
                      {
                        name: "Linda Garcia",
                        role: "Hardware Supplier",
                        specialization: "Building Materials",
                        date: "April 8, 2025",
                        documents: 6,
                        avatar: "/diverse-woman-portrait.png",
                      },
                    ].map((user, index) => (
                      <div key={index} className="flex items-start space-x-4 p-3 border rounded-md">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{user.name}</span>
                            <Badge variant="outline">{user.role}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mb-1">
                            Specialization: {user.specialization}
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            Registered: {user.date} • {user.documents} documents submitted
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              Review
                            </Button>
                            <Button size="sm">Verify</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Metrics</CardTitle>
                  <CardDescription>User growth and engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>New Users (This Month)</span>
                        <span className="font-medium">156</span>
                      </div>
                      <Progress value={78} className="h-2" />
                      <div className="text-xs text-muted-foreground text-right">78% of monthly target</div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Verification Rate</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Active Users (Last 7 Days)</span>
                        <span className="font-medium">1,245</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <div className="text-xs text-muted-foreground text-right">85% of total users</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="text-xs text-muted-foreground">Avg. Session Duration</div>
                        <div className="text-lg font-medium">12m 45s</div>
                      </div>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="text-xs text-muted-foreground">Retention Rate</div>
                        <div className="text-lg font-medium">78%</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="jobs">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Job Postings</CardTitle>
                <CardDescription>Latest jobs posted by customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm">
                    <div className="col-span-4">Job Title</div>
                    <div className="col-span-2">Customer</div>
                    <div className="col-span-2">Budget</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2 text-right">Actions</div>
                  </div>

                  {[
                    {
                      title: "Kitchen Renovation",
                      customer: "John Doe",
                      budget: "45,000 - 60,000",
                      status: "Open for Bids",
                      bids: 5,
                      posted: "10 minutes ago",
                    },
                    {
                      title: "Bathroom Plumbing",
                      customer: "Sarah Williams",
                      budget: "25,000 - 35,000",
                      status: "Open for Bids",
                      bids: 3,
                      posted: "2 hours ago",
                    },
                    {
                      title: "House Design",
                      customer: "Michael Johnson",
                      budget: "100,000 - 150,000",
                      status: "Assigned",
                      bids: 8,
                      posted: "1 day ago",
                    },
                    {
                      title: "Roof Repair",
                      customer: "Emily Davis",
                      budget: "70,000 - 90,000",
                      status: "In Progress",
                      bids: 6,
                      posted: "2 days ago",
                    },
                    {
                      title: "Wall Painting",
                      customer: "David Brown",
                      budget: "30,000 - 40,000",
                      status: "Completed",
                      bids: 4,
                      posted: "5 days ago",
                    },
                  ].map((job, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 p-4 border-t items-center text-sm">
                      <div className="col-span-4">
                        <div className="font-medium">{job.title}</div>
                        <div className="text-xs text-muted-foreground">Posted: {job.posted}</div>
                      </div>
                      <div className="col-span-2">{job.customer}</div>
                      <div className="col-span-2">KSh {job.budget}</div>
                      <div className="col-span-2">
                        <Badge
                          variant={
                            job.status === "Completed"
                              ? "default"
                              : job.status === "In Progress"
                                ? "secondary"
                                : job.status === "Assigned"
                                  ? "outline"
                                  : "secondary"
                          }
                        >
                          {job.status}
                        </Badge>
                        {job.status === "Open for Bids" && (
                          <div className="text-xs text-muted-foreground mt-1">{job.bids} bids received</div>
                        )}
                      </div>
                      <div className="col-span-2 flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {job.status === "Open for Bids" && (
                          <Button variant="outline" size="sm">
                            Promote
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bids</CardTitle>
                  <CardDescription>Latest bids from builders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        builder: "Bob Fundi",
                        role: "Fundi",
                        job: "Bathroom Plumbing",
                        customer: "Sarah Williams",
                        amount: "28,000",
                        status: "Pending Review",
                        submitted: "25 minutes ago",
                        avatar: "/hardworking-construction-worker.png",
                      },
                      {
                        builder: "Contractor Team",
                        role: "Contractor",
                        job: "Office Renovation",
                        customer: "Acme Corp",
                        amount: "1,250,000",
                        status: "Under Consideration",
                        submitted: "3 hours ago",
                        avatar: "/thoughtful-man.png",
                      },
                      {
                        builder: "James Miller",
                        role: "Professional",
                        job: "House Design",
                        customer: "Michael Johnson",
                        amount: "120,000",
                        status: "Accepted",
                        submitted: "1 day ago",
                        avatar: "/architect-studio.png",
                      },
                      {
                        builder: "Sarah Williams",
                        role: "Fundi",
                        job: "Electrical Wiring",
                        customer: "Emily Davis",
                        amount: "45,000",
                        status: "Rejected",
                        submitted: "2 days ago",
                        avatar: "/diverse-woman-portrait.png",
                      },
                    ].map((bid, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={bid.avatar || "/placeholder.svg"} alt={bid.builder} />
                            <AvatarFallback>{bid.builder.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <div>
                                <span className="font-medium">{bid.builder}</span>
                                <Badge className="ml-2" variant="outline">
                                  {bid.role}
                                </Badge>
                              </div>
                              <Badge
                                variant={
                                  bid.status === "Accepted"
                                    ? "default"
                                    : bid.status === "Rejected"
                                      ? "destructive"
                                      : "secondary"
                                }
                              >
                                {bid.status}
                              </Badge>
                            </div>
                            <div className="text-sm mb-1">
                              Bid for: <span className="font-medium">{bid.job}</span>
                            </div>
                            <div className="text-sm text-muted-foreground mb-1">Customer: {bid.customer}</div>
                            <div className="flex justify-between text-sm mb-3">
                              <span>Amount: KSh {bid.amount}</span>
                              <span className="text-muted-foreground">Submitted: {bid.submitted}</span>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              {(bid.status === "Pending Review" || bid.status === "Under Consideration") && (
                                <Button size="sm">Review</Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Job Metrics</CardTitle>
                  <CardDescription>Platform job performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-sm text-muted-foreground">Jobs Posted (This Month)</div>
                        <div className="text-2xl font-bold">124</div>
                        <div className="text-xs text-green-600 mt-1">↑ 15% from last month</div>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-sm text-muted-foreground">Avg. Bids Per Job</div>
                        <div className="text-2xl font-bold">5.3</div>
                        <div className="text-xs text-green-600 mt-1">↑ 8% from last month</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Job Completion Rate</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Avg. Time to First Bid</span>
                        <span className="font-medium">2.5 hours</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Customer Satisfaction</span>
                        <span className="font-medium">4.8/5</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Top Job Categories</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Plumbing</span>
                          <span>24%</span>
                        </div>
                        <Progress value={24} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span>Electrical</span>
                          <span>18%</span>
                        </div>
                        <Progress value={18} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span>Construction</span>
                          <span>16%</span>
                        </div>
                        <Progress value={16} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span>Design</span>
                          <span>14%</span>
                        </div>
                        <Progress value={14} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="payments">
          <div className="grid gap-6">
            <div className="grid gap-6 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">KSh 12.5M</div>
                  <div className="text-xs text-green-600 mt-1">↑ 18% from last month</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Escrow Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">KSh 1.2M</div>
                  <div className="text-xs text-green-600 mt-1">↑ 15% from last month</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">KSh 625K</div>
                  <div className="text-xs text-green-600 mt-1">↑ 12% from last month</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Avg. Transaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">KSh 45K</div>
                  <div className="text-xs text-green-600 mt-1">↑ 5% from last month</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest payment activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm">
                    <div className="col-span-3">Transaction</div>
                    <div className="col-span-2">From</div>
                    <div className="col-span-2">To</div>
                    <div className="col-span-2">Amount</div>
                    <div className="col-span-1">Method</div>
                    <div className="col-span-2 text-right">Actions</div>
                  </div>

                  {[
                    {
                      id: "TRX-12345",
                      description: "Escrow Deposit",
                      from: "John Doe",
                      fromRole: "Customer",
                      to: "Escrow",
                      toRole: "System",
                      amount: "45,000",
                      method: "M-Pesa",
                      status: "Completed",
                      date: "10 minutes ago",
                    },
                    {
                      id: "TRX-12344",
                      description: "Escrow Release",
                      from: "Escrow",
                      fromRole: "System",
                      to: "Bob Fundi",
                      toRole: "Fundi",
                      amount: "42,750",
                      method: "Wallet",
                      status: "Completed",
                      date: "1 hour ago",
                    },
                    {
                      id: "TRX-12343",
                      description: "Withdrawal",
                      from: "Contractor Team",
                      fromRole: "Contractor",
                      to: "Bank Account",
                      toRole: "External",
                      amount: "125,000",
                      method: "Bank Transfer",
                      status: "Processing",
                      date: "3 hours ago",
                    },
                    {
                      id: "TRX-12342",
                      description: "Platform Fee",
                      from: "Escrow",
                      fromRole: "System",
                      to: "Akhwan",
                      toRole: "Platform",
                      amount: "2,250",
                      method: "System",
                      status: "Completed",
                      date: "1 hour ago",
                    },
                    {
                      id: "TRX-12341",
                      description: "Escrow Deposit",
                      from: "Sarah Williams",
                      fromRole: "Customer",
                      to: "Escrow",
                      toRole: "System",
                      amount: "78,500",
                      method: "Card",
                      status: "Completed",
                      date: "5 hours ago",
                    },
                  ].map((transaction, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 p-4 border-t items-center text-sm">
                      <div className="col-span-3">
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-xs text-muted-foreground">
                          {transaction.id} • {transaction.date}
                        </div>
                      </div>
                      <div className="col-span-2">
                        <div>{transaction.from}</div>
                        <div className="text-xs text-muted-foreground">{transaction.fromRole}</div>
                      </div>
                      <div className="col-span-2">
                        <div>{transaction.to}</div>
                        <div className="text-xs text-muted-foreground">{transaction.toRole}</div>
                      </div>
                      <div className="col-span-2 font-medium">KSh {transaction.amount}</div>
                      <div className="col-span-1">
                        <Badge variant="outline">{transaction.method}</Badge>
                      </div>
                      <div className="col-span-2 flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {transaction.status === "Processing" && <Button size="sm">Approve</Button>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Escrow Management</CardTitle>
                  <CardDescription>Active escrow funds</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        job: "Kitchen Renovation",
                        customer: "John Doe",
                        builder: "Bob Fundi",
                        amount: "45,000",
                        status: "In Progress",
                        releaseDate: "April 20, 2025",
                        progress: 60,
                      },
                      {
                        job: "House Design",
                        customer: "Michael Johnson",
                        builder: "James Miller",
                        amount: "120,000",
                        status: "In Progress",
                        releaseDate: "February 15, 2025",
                        progress: 80,
                      },
                      {
                        job: "Bathroom Plumbing",
                        customer: "Sarah Williams",
                        builder: "Pending Assignment",
                        amount: "28,000",
                        status: "Awaiting Builder",
                        releaseDate: "TBD",
                        progress: 0,
                      },
                      {
                        job: "Roof Repair",
                        customer: "Emily Davis",
                        builder: "Contractor Team",
                        amount: "78,500",
                        status: "Disputed",
                        releaseDate: "On Hold",
                        progress: 75,
                      },
                    ].map((escrow, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between mb-2">
                          <h3 className="font-medium">{escrow.job}</h3>
                          <Badge
                            variant={
                              escrow.status === "In Progress"
                                ? "secondary"
                                : escrow.status === "Disputed"
                                  ? "destructive"
                                  : "outline"
                            }
                          >
                            {escrow.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                          <div>
                            <span className="text-muted-foreground">Customer:</span> {escrow.customer}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Builder:</span> {escrow.builder}
                          </div>
                        </div>
                        <div className="text-sm mb-2">
                          <span className="text-muted-foreground">Amount:</span> KSh {escrow.amount}
                        </div>
                        {escrow.status === "In Progress" && (
                          <div className="space-y-1 mb-2">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{escrow.progress}%</span>
                            </div>
                            <Progress value={escrow.progress} className="h-2" />
                          </div>
                        )}
                        <div className="text-sm mb-3">
                          <span className="text-muted-foreground">Release Date:</span> {escrow.releaseDate}
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {escrow.status === "Disputed" && <Button size="sm">Resolve Dispute</Button>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Analytics</CardTitle>
                  <CardDescription>Payment method distribution and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-3">Payment Methods</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>M-Pesa</span>
                          <span>65%</span>
                        </div>
                        <Progress value={65} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span>Card Payments</span>
                          <span>20%</span>
                        </div>
                        <Progress value={20} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span>Bank Transfers</span>
                          <span>10%</span>
                        </div>
                        <Progress value={10} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span>PayPal</span>
                          <span>5%</span>
                        </div>
                        <Progress value={5} className="h-2" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-sm text-muted-foreground">Avg. Payment Processing Time</div>
                        <div className="text-xl font-bold">1.2 minutes</div>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-sm text-muted-foreground">Payment Success Rate</div>
                        <div className="text-xl font-bold">98.5%</div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-3">Monthly Transaction Volume</h3>
                      <div className="h-40 bg-muted/50 rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">Transaction chart visualization</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="disputes">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Disputes</CardTitle>
                <CardDescription>Disputes requiring resolution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "DSP-1237",
                      job: "Roof Repair",
                      customer: {
                        name: "Emily Davis",
                        avatar: "/diverse-woman-portrait.png",
                      },
                      builder: {
                        name: "Contractor Team",
                        role: "Contractor",
                        avatar: "/thoughtful-man.png",
                      },
                      amount: "78,500",
                      reason: "Incomplete work and poor quality",
                      status: "Under Review",
                      date: "2 days ago",
                      priority: "High",
                    },
                    {
                      id: "DSP-1236",
                      job: "Electrical Wiring",
                      customer: {
                        name: "David Brown",
                        avatar: "/diverse-group.png",
                      },
                      builder: {
                        name: "Sarah Williams",
                        role: "Fundi",
                        avatar: "/diverse-woman-portrait.png",
                      },
                      amount: "35,000",
                      reason: "Delayed completion and additional charges",
                      status: "Evidence Collection",
                      date: "3 days ago",
                      priority: "Medium",
                    },
                    {
                      id: "DSP-1235",
                      job: "Kitchen Cabinets",
                      customer: {
                        name: "Michael Johnson",
                        avatar: "/thoughtful-man.png",
                      },
                      builder: {
                        name: "Linda Garcia",
                        role: "Hardware Supplier",
                        avatar: "/diverse-woman-portrait.png",
                      },
                      amount: "45,000",
                      reason: "Material quality issues",
                      status: "Mediation",
                      date: "5 days ago",
                      priority: "Medium",
                    },
                  ].map((dispute, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{dispute.job}</h3>
                          <div className="text-xs text-muted-foreground">
                            Case ID: {dispute.id} • Opened: {dispute.date}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              dispute.priority === "High"
                                ? "destructive"
                                : dispute.priority === "Medium"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {dispute.priority} Priority
                          </Badge>
                          <Badge variant="outline">{dispute.status}</Badge>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-3">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={dispute.customer.avatar || "/placeholder.svg"}
                              alt={dispute.customer.name}
                            />
                            <AvatarFallback>{dispute.customer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{dispute.customer.name}</div>
                            <div className="text-xs text-muted-foreground">Customer</div>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={dispute.builder.avatar || "/placeholder.svg"}
                              alt={dispute.builder.name}
                            />
                            <AvatarFallback>{dispute.builder.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{dispute.builder.name}</div>
                            <div className="text-xs text-muted-foreground">{dispute.builder.role}</div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="text-sm font-medium">Dispute Reason:</div>
                        <p className="text-sm">{dispute.reason}</p>
                      </div>

                      <div className="mb-3">
                        <div className="text-sm font-medium">Escrow Amount:</div>
                        <p className="text-sm">KSh {dispute.amount}</p>
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          View Evidence
                        </Button>
                        <Button variant="outline" size="sm">
                          Contact Parties
                        </Button>
                        <Button size="sm">Resolve</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Dispute Resolution History</CardTitle>
                  <CardDescription>Recently resolved cases</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm">
                      <div className="col-span-3">Case ID</div>
                      <div className="col-span-3">Job</div>
                      <div className="col-span-2">Amount</div>
                      <div className="col-span-2">Resolution</div>
                      <div className="col-span-2">Date</div>
                    </div>

                    {[
                      {
                        id: "DSP-1234",
                        job: "Bathroom Renovation",
                        amount: "65,000",
                        resolution: "Split 70/30",
                        date: "April 8, 2025",
                      },
                      {
                        id: "DSP-1233",
                        job: "Painting Services",
                        amount: "28,000",
                        resolution: "Full Refund",
                        date: "April 5, 2025",
                      },
                      {
                        id: "DSP-1232",
                        job: "Plumbing Repair",
                        amount: "12,500",
                        resolution: "Full Payment",
                        date: "April 3, 2025",
                      },
                      {
                        id: "DSP-1231",
                        job: "Flooring Installation",
                        amount: "85,000",
                        resolution: "Split 50/50",
                        date: "April 1, 2025",
                      },
                      {
                        id: "DSP-1230",
                        job: "Window Replacement",
                        amount: "45,000",
                        resolution: "Partial Refund",
                        date: "March 28, 2025",
                      },
                    ].map((case_, index) => (
                      <div key={index} className="grid grid-cols-12 gap-4 p-4 border-t items-center text-sm">
                        <div className="col-span-3">
                          <div className="date">Case ID: DSP-1234</div>
                        </div>
                        <div className="col-span-3">{case_.job}</div>
                        <div className="col-span-2">KSh {case_.amount}</div>
                        <div className="col-span-2">
                          <Badge variant="outline">{case_.resolution}</Badge>
                        </div>
                        <div className="col-span-2">
                          <div className="date">April 8, 2025</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dispute Analytics</CardTitle>
                  <CardDescription>Dispute trends and resolution metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-sm text-muted-foreground">Dispute Rate</div>
                        <div className="text-2xl font-bold">3.5%</div>
                        <div className="text-xs text-green-600 mt-1">↓ 0.8% from last month</div>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-sm text-muted-foreground">Avg. Resolution Time</div>
                        <div className="text-2xl font-bold">4.2 days</div>
                        <div className="text-xs text-green-600 mt-1">↓ 0.5 days from last month</div>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-3">Resolution Outcomes</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Full Payment to Builder</span>
                          <span>35%</span>
                        </div>
                        <Progress value={35} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span>Partial Refund to Customer</span>
                          <span>25%</span>
                        </div>
                        <Progress value={25} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span>Split 50/50</span>
                          <span>20%</span>
                        </div>
                        <Progress value={20} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span>Full Refund to Customer</span>
                          <span>15%</span>
                        </div>
                        <Progress value={15} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span>Other Arrangements</span>
                          <span>5%</span>
                        </div>
                        <Progress value={5} className="h-2" />
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-3">Common Dispute Reasons</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Quality Issues</span>
                          <span>40%</span>
                        </div>
                        <Progress value={40} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span>Delayed Completion</span>
                          <span>30%</span>
                        </div>
                        <Progress value={30} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span>Scope Changes</span>
                          <span>15%</span>
                        </div>
                        <Progress value={15} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span>Communication Issues</span>
                          <span>10%</span>
                        </div>
                        <Progress value={10} className="h-2" />

                        <div className="flex justify-between text-sm">
                          <span>Other</span>
                          <span>5%</span>
                        </div>
                        <Progress value={5} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
