import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Hammer,
  MessageSquare,
  Star,
  TrendingUp,
  User,
  Briefcase,
  AlertCircle,
  CheckCircle2,
  Clock4,
} from "lucide-react"

export function FundiDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Fundi Dashboard</h1>

      {/* At-a-Glance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Open Bids</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
                <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Jobs In Progress</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full dark:bg-green-900">
                <Hammer className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today's Schedule</p>
                <p className="text-2xl font-bold">2 Jobs</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full dark:bg-purple-900">
                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Response Time</p>
                <p className="text-2xl font-bold">1.2 hrs</p>
              </div>
              <div className="p-2 bg-amber-100 rounded-full dark:bg-amber-900">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bidding" className="w-full">
        <TabsList className="grid grid-cols-5 w-full max-w-4xl">
          <TabsTrigger value="bidding">Bidding Board</TabsTrigger>
          <TabsTrigger value="projects">Active Projects</TabsTrigger>
          <TabsTrigger value="wallet">Wallet & Payouts</TabsTrigger>
          <TabsTrigger value="profile">Profile & Credentials</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>

        {/* Bidding Board Tab */}
        <TabsContent value="bidding" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>New Job Feed</CardTitle>
                  <CardDescription>Jobs matching your skills and location</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "Bathroom Renovation",
                      location: "Westlands, Nairobi",
                      budget: "KSh 45,000",
                      posted: "2 hours ago",
                      urgency: "High",
                      skills: ["Plumbing", "Tiling"],
                    },
                    {
                      title: "Kitchen Cabinet Installation",
                      location: "Kilimani, Nairobi",
                      budget: "KSh 30,000",
                      posted: "5 hours ago",
                      urgency: "Medium",
                      skills: ["Carpentry", "Installation"],
                    },
                    {
                      title: "House Painting",
                      location: "Karen, Nairobi",
                      budget: "KSh 25,000",
                      posted: "1 day ago",
                      urgency: "Low",
                      skills: ["Painting", "Finishing"],
                    },
                  ].map((job, index) => (
                    <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{job.title}</h3>
                          <p className="text-sm text-muted-foreground">{job.location}</p>
                        </div>
                        <Badge
                          variant={
                            job.urgency === "High" ? "destructive" : job.urgency === "Medium" ? "default" : "outline"
                          }
                        >
                          {job.urgency}
                        </Badge>
                      </div>
                      <div className="flex items-center mt-2 text-sm">
                        <DollarSign className="h-4 w-4 mr-1" />
                        <span>{job.budget}</span>
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{job.posted}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {job.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Button size="sm">Place Bid</Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Bid Form</CardTitle>
                  <CardDescription>Create a competitive bid</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Your Bid Amount (KSh)</label>
                      <div className="relative mt-1">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input type="text" className="w-full pl-9 py-2 border rounded-md" placeholder="Enter amount" />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Estimated Completion Time</label>
                      <div className="flex gap-2 mt-1">
                        <input type="number" className="w-full py-2 px-3 border rounded-md" placeholder="Number" />
                        <select className="border rounded-md px-3">
                          <option>Days</option>
                          <option>Weeks</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Proposal</label>
                      <textarea
                        className="w-full mt-1 p-3 border rounded-md h-32"
                        placeholder="Describe how you'll approach this job..."
                      ></textarea>
                    </div>

                    <Button className="w-full">Submit Bid</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Active Projects Tab */}
        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Kitchen Renovation",
                customer: "John Kamau",
                progress: 75,
                deadline: "Oct 15, 2023",
                payment: "KSh 60,000",
                status: "In Progress",
              },
              {
                title: "Bathroom Plumbing",
                customer: "Mary Wanjiku",
                progress: 30,
                deadline: "Oct 22, 2023",
                payment: "KSh 25,000",
                status: "In Progress",
              },
              {
                title: "Electrical Wiring",
                customer: "David Omondi",
                progress: 90,
                deadline: "Oct 10, 2023",
                payment: "KSh 35,000",
                status: "Final Review",
              },
            ].map((project, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge>{project.status}</Badge>
                  </div>
                  <CardDescription>
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {project.customer}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Deadline</p>
                      <p className="font-medium">{project.deadline}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Payment</p>
                      <p className="font-medium">{project.payment}</p>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Button>
                    <Button size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Wallet & Payouts Tab */}
        <TabsContent value="wallet" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Balance Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">Available Balance</p>
                    <h2 className="text-4xl font-bold mt-1">KSh 85,400</h2>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Pending Payments</span>
                      <span className="font-medium">KSh 32,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Escrow Held</span>
                      <span className="font-medium">KSh 15,000</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between">
                      <span>Total Earnings</span>
                      <span className="font-medium">KSh 132,400</span>
                    </div>
                  </div>

                  <Button className="w-full">Request Withdrawal</Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        type: "Payment Received",
                        amount: "KSh 25,000",
                        date: "Oct 5, 2023",
                        from: "Mary Wanjiku",
                        project: "Bathroom Plumbing",
                        status: "Completed",
                      },
                      {
                        type: "Withdrawal",
                        amount: "KSh 40,000",
                        date: "Sep 28, 2023",
                        to: "M-Pesa",
                        status: "Processed",
                      },
                      {
                        type: "Payment Received",
                        amount: "KSh 35,000",
                        date: "Sep 20, 2023",
                        from: "David Omondi",
                        project: "Electrical Wiring",
                        status: "Completed",
                      },
                      {
                        type: "Escrow Release",
                        amount: "KSh 15,000",
                        date: "Sep 15, 2023",
                        from: "John Kamau",
                        project: "Kitchen Renovation",
                        status: "Released",
                      },
                    ].map((transaction, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-3">
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-full ${
                              transaction.type === "Payment Received" || transaction.type === "Escrow Release"
                                ? "bg-green-100 dark:bg-green-900"
                                : "bg-blue-100 dark:bg-blue-900"
                            }`}
                          >
                            {transaction.type === "Payment Received" || transaction.type === "Escrow Release" ? (
                              <DollarSign className="h-4 w-4 text-green-600 dark:text-green-300" />
                            ) : (
                              <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.type}</p>
                            <p className="text-sm text-muted-foreground">{transaction.date}</p>
                            {transaction.from && <p className="text-sm">From: {transaction.from}</p>}
                            {transaction.to && <p className="text-sm">To: {transaction.to}</p>}
                            {transaction.project && <p className="text-sm">Project: {transaction.project}</p>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-medium ${
                              transaction.type === "Withdrawal"
                                ? "text-red-600 dark:text-red-400"
                                : "text-green-600 dark:text-green-400"
                            }`}
                          >
                            {transaction.type === "Withdrawal" ? "-" : "+"}
                            {transaction.amount}
                          </p>
                          <Badge variant="outline" className="mt-1">
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Profile & Credentials Tab */}
        <TabsContent value="profile" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Public Profile</CardTitle>
                  <CardDescription>How clients see you</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/hardworking-construction-worker.png" alt="Profile" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <h3 className="mt-4 text-xl font-bold">James Mwangi</h3>
                    <p className="text-muted-foreground">Master Plumber & Tiler</p>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="ml-2 text-sm">(4.2)</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {["Plumbing", "Tiling", "Bathroom Renovation", "Pipe Fitting", "Fixture Installation"].map(
                        (skill, i) => (
                          <Badge key={i} variant="secondary">
                            {skill}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Location</h4>
                    <p className="text-sm">Nairobi, Kenya (Willing to travel 25km)</p>
                  </div>

                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Verification Status</CardTitle>
                  <CardDescription>Increase trust with verified credentials</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                          <h4 className="font-medium">ID Verification</h4>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Verified
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Your identity has been verified through national ID
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
                          <h4 className="font-medium">Phone Verification</h4>
                        </div>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Verified
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">Your phone number has been verified</p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <AlertCircle className="h-5 w-5 text-amber-600 mr-2" />
                          <h4 className="font-medium">Skills Certification</h4>
                        </div>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Pending
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Upload your plumbing certification to verify skills
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Upload Certificate
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <Clock4 className="h-5 w-5 text-amber-600 mr-2" />
                          <h4 className="font-medium">Background Check</h4>
                        </div>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Not Started
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Complete a background check to build client trust
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Start Process
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Verification Progress</h4>
                    <div className="flex items-center">
                      <Progress value={50} className="flex-1" />
                      <span className="ml-2 text-sm font-medium">50%</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Complete all verifications to increase your visibility to clients by up to 300%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Messages & Notifications</CardTitle>
              <CardDescription>Stay in touch with your clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    sender: "John Kamau",
                    avatar: "/diverse-group.png",
                    message: "Can you come by tomorrow to check the kitchen sink installation?",
                    time: "2 hours ago",
                    unread: true,
                    project: "Kitchen Renovation",
                  },
                  {
                    sender: "Mary Wanjiku",
                    avatar: "/diverse-woman-portrait.png",
                    message: "Thanks for the quote. When can you start the bathroom work?",
                    time: "Yesterday",
                    unread: false,
                    project: "Bathroom Plumbing",
                  },
                  {
                    sender: "System Notification",
                    avatar: null,
                    message: "Your bid for 'House Painting' was accepted! Please confirm to proceed.",
                    time: "2 days ago",
                    unread: false,
                    project: null,
                    isSystem: true,
                  },
                  {
                    sender: "David Omondi",
                    avatar: "/thoughtful-man.png",
                    message: "The electrical work looks great. I've released the final payment.",
                    time: "3 days ago",
                    unread: false,
                    project: "Electrical Wiring",
                  },
                ].map((message, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 ${message.unread ? "bg-blue-50 dark:bg-blue-900/20" : ""}`}
                  >
                    <div className="flex items-start gap-3">
                      {message.isSystem ? (
                        <div className="p-2 bg-blue-100 rounded-full dark:bg-blue-900">
                          <Bell className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                        </div>
                      ) : (
                        <Avatar>
                          <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                          <AvatarFallback>{message.sender.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{message.sender}</h4>
                            {message.project && <p className="text-xs text-muted-foreground">Re: {message.project}</p>}
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-muted-foreground">{message.time}</span>
                            {message.unread && <div className="ml-2 h-2 w-2 rounded-full bg-blue-600"></div>}
                          </div>
                        </div>
                        <p className="text-sm mt-1">{message.message}</p>
                        <div className="mt-2 flex justify-end">
                          <Button size="sm" variant={message.unread ? "default" : "outline"}>
                            {message.isSystem ? "View Details" : "Reply"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Missing Bell icon import
import { Bell } from "lucide-react"
