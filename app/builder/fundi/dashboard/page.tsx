"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Hammer,
  Clock,
  Star,
  CheckCircle,
  Calendar,
  MessageSquare,
  Bell,
  FileCheck,
  ChevronRight,
  Filter,
  MapPin,
  Plus,
  X,
  Upload,
  Camera,
  AlertTriangle,
  DollarSign,
  FileText,
  Eye,
} from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

type Job = {
  title: string;
  location: string;
  budget: string;
  posted: string;
  deadline: string;
  description: string;
  skills: string[];
};

type Project = {
  title: string;
  customer: string;
  location: string;
  amount: string;
  progress: number;
  dueDate: string;
  milestones: { name: string; completed: boolean }[];
};

export default function FundiDashboardPage() {
  const { logout } = useAuth();
  const router = useRouter();
  // State for modals
  const [bidFormOpen, setBidFormOpen] = useState(false)
  const [jobDetailsOpen, setJobDetailsOpen] = useState(false)
  const [customBidOpen, setCustomBidOpen] = useState(false)
  const [messageClientOpen, setMessageClientOpen] = useState(false)
  const [updateProgressOpen, setUpdateProgressOpen] = useState(false)
  const [withdrawalOpen, setWithdrawalOpen] = useState(false)
  const [instantPayoutOpen, setInstantPayoutOpen] = useState(false)
  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [addCertificationOpen, setAddCertificationOpen] = useState(false)
  const [addLicenseOpen, setAddLicenseOpen] = useState(false)
  const [viewAllReviewsOpen, setViewAllReviewsOpen] = useState(false)
  
  // State for selected items
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null)
  const [selectedClient, setSelectedClient] = useState<string | null>(null)
  
  // Toast hook
  const { toast } = useToast()

  // Handle bid submission
  const handleBidSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: "Bid Submitted",
      description: "Your bid has been submitted successfully.",
    })
    setBidFormOpen(false)
  }

  // Handle custom bid creation
  const handleCustomBidSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: "Custom Bid Created",
      description: "Your custom bid has been created successfully.",
    })
    setCustomBidOpen(false)
  }

  // Handle message sending
  const handleMessageSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the client.",
    })
    setMessageClientOpen(false)
  }

  // Handle progress update
  const handleProgressUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: "Progress Updated",
      description: "Project progress has been updated successfully.",
    })
    setUpdateProgressOpen(false)
  }

  // Handle milestone completion
  const handleMilestoneComplete = (milestone: string) => {
    toast({
      title: "Milestone Completed",
      description: `${milestone} has been marked as complete.`,
    })
  }

  // Handle withdrawal request
  const handleWithdrawalRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: "Withdrawal Requested",
      description: "Your withdrawal request has been submitted.",
    })
    setWithdrawalOpen(false)
  }

  // Handle instant payout enabling
  const handleEnableInstantPayout = () => {
    toast({
      title: "Instant Payout Enabled",
      description: "You can now receive instant payouts with a 2% fee.",
    })
    setInstantPayoutOpen(false)
  }

  // Handle profile update
  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    })
    setEditProfileOpen(false)
  }

  // Handle certification upload
  const handleCertificationUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: "Certification Added",
      description: "Your certification has been uploaded for verification.",
    })
    setAddCertificationOpen(false)
  }

  // Handle license upload
  const handleLicenseUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    toast({
      title: "License Added",
      description: "Your license has been uploaded for verification.",
    })
    setAddLicenseOpen(false)
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <span className="font-bold">J</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Akhwan</h1>
              <p className="text-sm text-muted-foreground">Fundi Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Hammer className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Bob Fundi</p>
                <p className="text-xs text-muted-foreground">Plumbing Specialist</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => { logout(); router.push('/login'); }}>
              Log Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome, Bob!</h2>
            <p className="text-muted-foreground">Manage your jobs, bids, and payments from your dashboard</p>
          </div>
          <Button className="mt-4 md:mt-0" onClick={() => setJobDetailsOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Find New Jobs
          </Button>
        </div>

        {/* 2.1 At-a-Glance Metrics */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Open Bids</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                <span>5 Awaiting Response</span>
                <span>3 Under Review</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Jobs In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <div className="flex items-center text-xs text-muted-foreground mt-2">
                <Button variant="link" className="h-auto p-0 text-xs" onClick={() => setUpdateProgressOpen(true)}>
                  Update milestones <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground mt-2">Jobs scheduled for today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.5h</div>
              <p className="text-xs text-muted-foreground mt-2">To accept/decline new requests</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bidding" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="bidding">Bidding Board</TabsTrigger>
            <TabsTrigger value="projects">Active Projects</TabsTrigger>
            <TabsTrigger value="wallet">Wallet & Payouts</TabsTrigger>
            <TabsTrigger value="profile">Profile & Credentials</TabsTrigger>
          </TabsList>

          {/* 2.2 Bidding Board */}
          <TabsContent value="bidding">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>New Job Feed</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" /> Filter
                        </Button>
                      </div>
                    </div>
                    <CardDescription>Jobs matching your skills and service area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Kitchen Sink Repair",
                          location: "Westlands, Nairobi",
                          budget: "8,000 - 12,000",
                          posted: "2 hours ago",
                          deadline: "Needs service within 48 hours",
                          description: "Leaking kitchen sink needs urgent repair. Pipes may need replacement.",
                          skills: ["Plumbing", "Pipe Fitting"],
                        },
                        {
                          title: "Bathroom Renovation",
                          location: "Kilimani, Nairobi",
                          budget: "45,000 - 60,000",
                          posted: "Yesterday",
                          deadline: "Project starts in 2 weeks",
                          description:
                            "Complete bathroom renovation including new fixtures, tiling, and plumbing work.",
                          skills: ["Plumbing", "Tiling", "Fixture Installation"],
                        },
                        {
                          title: "Office Plumbing Maintenance",
                          location: "CBD, Nairobi",
                          budget: "15,000 - 20,000",
                          posted: "2 days ago",
                          deadline: "Scheduled maintenance next week",
                          description:
                            "Regular maintenance of office building plumbing system. Multiple sinks and toilets.",
                          skills: ["Plumbing", "Commercial", "Maintenance"],
                        },
                      ].map((job, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between mb-2">
                            <h3 className="font-medium">{job.title}</h3>
                            <span className="text-sm font-medium">KSh {job.budget}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{job.deadline}</span>
                          </div>
                          <p className="text-sm mb-3">{job.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {job.skills.map((skill: string, i: number) => (
                              <Badge key={i} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                            <span>Posted: {job.posted}</span>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => {
                                setSelectedJob(job)
                                setJobDetailsOpen(true)
                              }}
                            >
                              View Details
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => {
                                setSelectedJob(job)
                                setBidFormOpen(true)
                              }}
                            >
                              Place Bid
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Bid Form Launcher</CardTitle>
                    <CardDescription>Quickly place or edit bids</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg bg-muted/50">
                        <h3 className="font-medium mb-2">Create New Bid</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Select a job from the feed to place a bid or create a custom bid.
                        </p>
                        <Button className="w-full" onClick={() => setCustomBidOpen(true)}>
                          <Plus className="mr-2 h-4 w-4" /> Create Custom Bid
                        </Button>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">Recent Bids</h3>
                        <div className="space-y-3">
                          {[
                            {
                              job: "Restaurant Plumbing",
                              amount: "35,000",
                              status: "Under Review",
                              date: "April 7, 2025",
                            },
                            {
                              job: "Residential Bathroom",
                              amount: "28,000",
                              status: "Awaiting Response",
                              date: "April 5, 2025",
                            },
                          ].map((bid, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                              <div>
                                <div className="font-medium text-sm">{bid.job}</div>
                                <div className="text-xs text-muted-foreground">KSh {bid.amount}</div>
                              </div>
                              <Badge variant={bid.status === "Under Review" ? "secondary" : "outline"}>
                                {bid.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Bid Success Rate</CardTitle>
                    <CardDescription>Your performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Win Rate</span>
                        <span className="text-sm">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Response Rate</span>
                        <span className="text-sm">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />

                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Completion Rate</span>
                        <span className="text-sm">98%</span>
                      </div>
                      <Progress value={98} className="h-2" />

                      <div className="p-3 bg-muted/50 rounded-lg text-sm">
                        <p>
                          <span className="font-medium">Tip:</span> Bids with detailed work plans have a 40% higher
                          acceptance rate.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* 2.3 Active Projects */}
          <TabsContent value="projects">
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "Kitchen Plumbing Repair",
                  customer: "John Doe",
                  location: "Westlands, Nairobi",
                  amount: "45,000",
                  progress: 60,
                  dueDate: "April 15, 2025",
                  milestones: [
                    { name: "Initial Assessment", completed: true },
                    { name: "Parts Procurement", completed: true },
                    { name: "Pipe Replacement", completed: false },
                    { name: "Final Testing", completed: false },
                  ],
                },
                {
                  title: "Bathroom Renovation",
                  customer: "Sarah Williams",
                  location: "Kilimani, Nairobi",
                  amount: "78,500",
                  progress: 25,
                  dueDate: "April 30, 2025",
                  milestones: [
                    { name: "Demolition", completed: true },
                    { name: "Rough Plumbing", completed: false },
                    { name: "Fixture Installation", completed: false },
                    { name: "Finishing Work", completed: false },
                  ],
                },
                {
                  title: "Office Sink Installation",
                  customer: "Acme Corp",
                  location: "CBD, Nairobi",
                  amount: "32,000",
                  progress: 10,
                  dueDate: "May 5, 2025",
                  milestones: [
                    { name: "Site Preparation", completed: true },
                    { name: "Plumbing Connections", completed: false },
                    { name: "Sink Installation", completed: false },
                    { name: "Quality Check", completed: false },
                  ],
                },
              ].map((project, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>Customer: {project.customer}</CardDescription>
                      </div>
                      <Badge variant="secondary">In Progress</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{project.location}</span>
                        </div>
                        <span className="font-medium">KSh {project.amount}</span>
                      </div>

                      <div className="flex items-center text-sm text-muted-foreground mb-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Due: {project.dueDate}</span>
                      </div>

                      <div className="space-y-1 mb-3">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Milestones</h4>
                        {project.milestones.map((milestone: { name: string; completed: boolean }, index: number) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                              {milestone.completed ? (
                                <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                              ) : (
                                <div className="h-4 w-4 mr-2 rounded-full border border-muted-foreground" />
                              )}
                              <span className={milestone.completed ? "line-through text-muted-foreground" : ""}>
                                {milestone.name}
                              </span>
                            </div>
                            {!milestone.completed && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 px-2"
                                onClick={() => handleMilestoneComplete(milestone.name)}
                              >
                                Mark Complete
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between pt-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedClient(project.customer)
                            setMessageClientOpen(true)
                          }}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" /> Message Client
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => {
                            setSelectedProject(project)
                            setUpdateProgressOpen(true)
                          }}
                        >
                          Update Progress
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Today's Schedule</CardTitle>
                <CardDescription>Jobs and appointments for today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      time: "9:00 AM - 11:00 AM",
                      title: "Kitchen Plumbing Repair",
                      customer: "John Doe",
                      location: "Westlands, Nairobi",
                      type: "Job Visit",
                    },
                    {
                      time: "1:00 PM - 2:00 PM",
                      title: "Materials Pickup",
                      location: "Hardware Supplier, Industrial Area",
                      type: "Errand",
                    },
                    {
                      time: "3:00 PM - 5:00 PM",
                      title: "Bathroom Renovation",
                      customer: "Sarah Williams",
                      location: "Kilimani, Nairobi",
                      type: "Job Visit",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 border rounded-lg">
                      <div className="bg-primary/10 p-2 rounded-md text-primary">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{item.time}</span>
                          <Badge variant="outline">{item.type}</Badge>
                        </div>
                        <h3 className="font-medium">{item.title}</h3>
                        {item.customer && <p className="text-sm">Customer: {item.customer}</p>}
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 2.4 Wallet & Payouts */}
          <TabsContent value="wallet">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Balance Summary</CardTitle>
                    <CardDescription>Overview of your earnings and payouts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6 md:grid-cols-2 mb-6">
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Available Balance</div>
                        <div className="text-3xl font-bold mb-1">KSh 32,500</div>
                        <div className="text-sm">Ready for withdrawal</div>
                      </div>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="text-sm text-muted-foreground mb-1">Pending Earnings</div>
                        <div className="text-3xl font-bold mb-1">KSh 28,500</div>
                        <div className="text-sm">From 2 active jobs</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Recent Transactions</h3>
                        <Button variant="ghost" size="sm">
                          View All
                        </Button>
                      </div>

                      <div className="rounded-md border">
                        <div className="grid grid-cols-12 gap-4 p-3 bg-muted/50 font-medium text-sm">
                          <div className="col-span-5">Description</div>
                          <div className="col-span-3">Date</div>
                          <div className="col-span-2">Status</div>
                          <div className="col-span-2 text-right">Amount</div>
                        </div>

                        {[
                          {
                            description: "Office Plumbing Payment",
                            date: "April 8, 2025",
                            status: "Completed",
                            amount: "+42,750",
                            type: "credit",
                          },
                          {
                            description: "Withdrawal to M-Pesa",
                            date: "April 5, 2025",
                            status: "Completed",
                            amount: "-35,000",
                            type: "debit",
                          },
                          {
                            description: "Residential Bathroom Payment",
                            date: "April 1, 2025",
                            status: "Completed",
                            amount: "+27,075",
                            type: "credit",
                          },
                          {
                            description: "Restaurant Kitchen Payment",
                            date: "March 22, 2025",
                            status: "Completed",
                            amount: "+64,440",
                            type: "credit",
                          },
                        ].map((transaction, index) => (
                          <div key={index} className="grid grid-cols-12 gap-4 p-3 border-t items-center text-sm">
                            <div className="col-span-5">{transaction.description}</div>
                            <div className="col-span-3">{transaction.date}</div>
                            <div className="col-span-2">
                              <Badge variant="outline">{transaction.status}</Badge>
                            </div>
                            <div
                              className={`col-span-2 text-right font-medium ${
                                transaction.type === "credit" ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              KSh {transaction.amount}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Request Withdrawal</CardTitle>
                    <CardDescription>Transfer funds to your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                              <span className="font-bold text-green-600">M</span>
                            </div>
                            <div>
                              <div className="font-medium">M-Pesa</div>
                              <div className="text-sm text-muted-foreground">+254 712 345 678</div>
                            </div>
                          </div>
                          <Badge>Default</Badge>
                        </div>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <label className="text-sm font-medium">Amount (KSh)</label>
                            <input
                              type="text"
                              className="w-full p-2 border rounded-md"
                              placeholder="Enter amount"
                              defaultValue="25,000"
                            />
                          </div>
                          <Button 
                            className="w-full"
                            onClick={() => setWithdrawalOpen(true)}
                          >
                            Request Withdrawal
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg">
                        <h3 className="font-medium mb-2">Instant Payout</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          You're eligible for instant payouts with a 2% fee.
                        </p>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => setInstantPayoutOpen(true)}
                        >
                          Enable Instant Payout
                        </Button>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-2">Withdrawal History</h3>
                        <div className="space-y-3">
                          {[
                            {
                              amount: "35,000",
                              date: "April 5, 2025",
                              status: "Completed",
                              method: "M-Pesa",
                            },
                            {
                              amount: "50,000",
                              date: "March 20, 2025",
                              status: "Completed",
                              method: "M-Pesa",
                            },
                          ].map((withdrawal, index) => (
                            <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                              <div>
                                <div className="font-medium text-sm">KSh {withdrawal.amount}</div>
                                <div className="text-xs text-muted-foreground">{withdrawal.date}</div>
                              </div>
                              <Badge variant="outline">{withdrawal.status}</Badge>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* 2.5 Profile & Credentials */}
          <TabsContent value="profile">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Public Profile Preview</CardTitle>
                  <CardDescription>How clients see your profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center mb-4">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="/hardworking-construction-worker.png" alt="Bob Fundi" />
                      <AvatarFallback>BF</AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold">Bob Fundi</h3>
                    <p className="text-muted-foreground">Plumbing Specialist</p>
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-2 text-sm font-medium">4.8/5</span>
                      <span className="ml-1 text-xs text-muted-foreground">(24 reviews)</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">About Me</h4>
                      <p className="text-sm">
                        Professional plumber with over 8 years of experience in residential and commercial plumbing
                        services. Specializing in repairs, installations, and maintenance of plumbing systems.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Plumbing",
                          "Pipe Fitting",
                          "Fixture Installation",
                          "Leak Detection",
                          "Water Heaters",
                          "Drainage",
                        ].map((skill: string, i: number) => (
                          <Badge key={i} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Service Area</h4>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>Nairobi (Westlands, Kilimani, CBD, Lavington)</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Portfolio</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                          <div key={item} className="aspect-square bg-muted rounded-md overflow-hidden">
                            <img
                              src={`/plumbing-work.png?key=gnnbv&height=100&width=100&query=plumbing work ${item}`}
                              alt={`Portfolio item ${item}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full"
                      onClick={() => setEditProfileOpen(true)}
                    >
                      Edit Public Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Verification Status</CardTitle>
                    <CardDescription>ID documents and certifications</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-medium">ID Verification</h3>
                            <Badge variant="default">Verified</Badge>
                          </div>
                          <div className="flex items-center text-sm">
                            <FileCheck className="h-4 w-4 mr-2 text-green-500" />
                            <span>National ID verified on March 15, 2025</span>
                          </div>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-medium">Phone Verification</h3>
                            <Badge variant="default">Verified</Badge>
                          </div>
                          <div className="flex items-center text-sm">
                            <FileCheck className="h-4 w-4 mr-2 text-green-500" />
                            <span>Phone number verified on March 15, 2025</span>
                          </div>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-medium">Plumbing Certification</h3>
                            <Badge variant="default">Verified</Badge>
                          </div>
                          <div className="flex items-center text-sm">
                            <FileCheck className="h-4 w-4 mr-2 text-green-500" />
                            <span>Certificate verified on March 18, 2025</span>
                          </div>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-medium">Background Check</h3>
                            <Badge variant="secondary">In Progress</Badge>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-amber-500" />
                            <span>Submitted on April 5, 2025 (Est. 3 days)</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-3">Upload Additional Credentials</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Add more certifications to enhance your profile and increase job opportunities.
                        </p>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline"
                            onClick={() => setAddCertificationOpen(true)}
                          >
                            <Plus className="h-4 w-4 mr-2" /> Add Certification
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => setAddLicenseOpen(true)}
                          >
                            <Plus className="h-4 w-4 mr-2" /> Add License
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center mb-3">
                          <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-2" />
                          <h3 className="font-medium">Verification Benefits</h3>
                        </div>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                            <span>Verified profiles receive 3x more job opportunities</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                            <span>Higher ranking in search results</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                            <span>Access to premium jobs with higher budgets</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                            <span>Eligible for instant payouts</span>
                          </li>
                        </ul>
                      </div>
                    </div> {/* <-- Add this closing tag before the end of CardContent */}
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Client Reviews</CardTitle>
                    <CardDescription>What your clients are saying about you</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: "John Doe",
                          job: "Kitchen Plumbing Repair",
                          rating: 5,
                          comment:
                            "Bob did an excellent job fixing our kitchen sink. He was punctual, professional, and completed the work faster than expected. Highly recommended!",
                          date: "April 2, 2025",
                          avatar: "/diverse-group.png",
                        },
                        {
                          name: "Sarah Williams",
                          job: "Bathroom Renovation",
                          rating: 4,
                          comment:
                            "Good work on our bathroom renovation. Bob was knowledgeable and skilled. The only reason for 4 stars is that there was a slight delay in completing the project.",
                          date: "March 25, 2025",
                          avatar: "/diverse-woman-portrait.png",
                        },
                        {
                          name: "Acme Corp",
                          job: "Office Plumbing Maintenance",
                          rating: 5,
                          comment:
                            "Bob provided excellent service for our office plumbing maintenance. He was thorough, efficient, and professional. We will definitely hire him again for future needs.",
                          date: "March 18, 2025",
                          avatar: "/thoughtful-man.png",
                        },
                      ].map((review, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-start space-x-4">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                              <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <span className="font-medium">{review.name}</span>
                                <div className="flex">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                  ))}
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">
                                {review.job} • {review.date}
                              </p>
                              <p className="text-sm">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setViewAllReviewsOpen(true)}
                      >
                        View All Reviews
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div> {/* <-- Add this closing tag here */}
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      {/* Bid Form Modal */}
      <Dialog open={bidFormOpen} onOpenChange={setBidFormOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Place a Bid</DialogTitle>
            <DialogDescription>
              {selectedJob ? `Submit your bid for ${selectedJob.title}` : 'Submit your bid for this job'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleBidSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="bid-amount">Your Bid Amount (KSh)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="bid-amount" className="pl-9" placeholder="Enter amount" defaultValue={selectedJob ? selectedJob.budget.split(' - ')[0] : ''} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="completion-time">Estimated Completion Time</Label>
                  <Input id="completion-time" type="number" placeholder="Number" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time-unit">Time Unit</Label>
                  <Select defaultValue="days">
                    <SelectTrigger id="time-unit">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="weeks">Weeks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="proposal">Your Proposal</Label>
                <Textarea
                  id="proposal"
                  placeholder="Describe how you'll approach this job..."
                  className="min-h-[120px]"
                />
              </div>
              <div className="grid gap-2">
                <Label>Include in your bid:</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="materials" />
                  <label htmlFor="materials" className="text-sm">Materials cost</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="transport" />
                  <label htmlFor="transport" className="text-sm">Transportation</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="warranty" />
                  <label htmlFor="warranty" className="text-sm">30-day warranty</label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setBidFormOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Bid</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Job Details Modal */}
      <Dialog open={jobDetailsOpen} onOpenChange={setJobDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedJob ? selectedJob.title : 'Job Details'}</DialogTitle>
            <DialogDescription>
              {selectedJob ? `Posted ${selectedJob.posted}` : 'Job information'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedJob ? (
              <>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{selectedJob.title}</h3>
                    <span className="font-medium">KSh {selectedJob.budget}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{selectedJob.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{selectedJob.deadline}</span>
                  </div>
                  <div className="mb-3">
                    <h4 className="text-sm font-medium mb-1">Description</h4>
                    <p className="text-sm">{selectedJob.description}</p>
                  </div>
                  <div className="mb-3">
                    <h4 className="text-sm font-medium mb-1">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.skills.map((skill: string, i: number) => (
                        <Badge key={i} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setJobDetailsOpen(false)
                        setBidFormOpen(true)
                      }}
                    >
                      Place Bid
                    </Button>
                    <Button onClick={() => setJobDetailsOpen(false)}>
                      Close
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-2">Find New Jobs</h3>
                <p className="text-sm mb-3">
                  Browse available jobs that match your skills and location.
                </p>
                <div className="space-y-3 mb-4">
                  <div className="grid gap-2">
                    <Label htmlFor="job-search">Search Jobs</Label>
                    <Input id="job-search" placeholder="Enter keywords..." />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="job-location">Location</Label>
                    <Select defaultValue="nairobi">
                      <SelectTrigger id="job-location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nairobi">Nairobi</SelectItem>
                        <SelectItem value="mombasa">Mombasa</SelectItem>
                        <SelectItem value="kisumu">Kisumu</SelectItem>
                        <SelectItem value="nakuru">Nakuru</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="job-category">Category</Label>
                    <Select defaultValue="plumbing">
                      <SelectTrigger id="job-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="carpentry">Carpentry</SelectItem>
                        <SelectItem value="painting">Painting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full">
                  Search Jobs
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Custom Bid Modal */}
      <Dialog open={customBidOpen} onOpenChange={setCustomBidOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Custom Bid</DialogTitle>
            <DialogDescription>
              Create a bid for a job not listed in the job feed
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCustomBidSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="client-name">Client Name</Label>
                <Input id="client-name" placeholder="Enter client name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" placeholder="Enter job title" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="job-description">Job Description</Label>
                <Textarea
                  id="job-description"
                  placeholder="Describe the job..."
                  className="min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="custom-bid-amount">Your Bid Amount (KSh)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="custom-bid-amount" className="pl-9" placeholder="Enter amount" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="custom-completion-time">Estimated Completion</Label>
                  <div className="flex gap-2">
                    <Input id="custom-completion-time" type="number" placeholder="Time" />
                    <Select defaultValue="days">
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="days">Days</SelectItem>
                        <SelectItem value="weeks">Weeks</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCustomBidOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Bid</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Message Client Modal */}
      <Dialog open={messageClientOpen} onOpenChange={setMessageClientOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Message Client</DialogTitle>
            <DialogDescription>
              {selectedClient ? `Send a message to ${selectedClient}` : 'Send a message to the client'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleMessageSend}>
            <div className="grid gap-4 py-4">
              <div className="border rounded-lg p-3 bg-muted/30 max-h-[200px] overflow-y-auto">
                <div className="space-y-3">
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground p-2 rounded-lg max-w-[80%]">
                      <p className="text-sm">Hello! I'm working on your project and wanted to give you an update.</p>
                      <p className="text-xs text-right mt-1 opacity-70">10:30 AM</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="bg-muted p-2 rounded-lg max-w-[80%]">
                      <p className="text-sm">Great! How is the progress going?</p>
                      <p className="text-xs mt-1 opacity-70">10:32 AM</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground p-2 rounded-lg max-w-[80%]">
                      <p className="text-sm">I've completed the initial assessment and ordered the parts. They should arrive tomorrow.</p>
                      <p className="text-xs text-right mt-1 opacity-70">10:35 AM</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  className="min-h-[100px]"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button type="button" variant="outline" size="sm" className="h-8">
                  <Camera className="h-4 w-4 mr-2" />
                  Add Photo
                </Button>
                <Button type="button" variant="outline" size="sm" className="h-8">
                  <FileText className="h-4 w-4 mr-2" />
                  Attach File
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setMessageClientOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Send Message</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Update Progress Modal */}
      <Dialog open={updateProgressOpen} onOpenChange={setUpdateProgressOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedProject ? `Update Progress: ${selectedProject.title}` : 'Update Project Progress'}
            </DialogTitle>
            <DialogDescription>
              Update the progress and milestones for your project
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleProgressUpdate}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="progress-percentage">Overall Progress (%)</Label>
                <Input 
                  id="progress-percentage" 
                  type="number" 
                  min="0" 
                  max="100" 
                  defaultValue={selectedProject ? selectedProject.progress : "0"} 
                />
                <Progress value={selectedProject ? selectedProject.progress : 0} className="h-2 mt-1" />
              </div>
              
              <div className="grid gap-2">
                <Label>Milestones</Label>
                <div className="space-y-2 border rounded-lg p-3">
                  {selectedProject ? (
                    selectedProject.milestones.map((milestone: { name: string; completed: boolean }, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Checkbox id={`milestone-${index}`} checked={milestone.completed} />
                          <label htmlFor={`milestone-${index}`} className="ml-2 text-sm">
                            {milestone.name}
                          </label>
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 px-2"
                          onClick={() => handleMilestoneComplete(milestone.name)}
                        >
                          {milestone.completed ? "Completed" : "Mark Complete"}
                        </Button>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Checkbox id="milestone-1" />
                          <label htmlFor="milestone-1" className="ml-2 text-sm">Initial Assessment</label>
                        </div>
                        <Button type="button" variant="ghost" size="sm" className="h-6 px-2">
                          Mark Complete
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Checkbox id="milestone-2" />
                          <label htmlFor="milestone-2" className="ml-2 text-sm">Materials Procurement</label>
                        </div>
                        <Button type="button" variant="ghost" size="sm" className="h-6 px-2">
                          Mark Complete
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Checkbox id="milestone-3" />
                          <label htmlFor="milestone-3" className="ml-2 text-sm">Installation</label>
                        </div>
                        <Button type="button" variant="ghost" size="sm" className="h-6 px-2">
                          Mark Complete
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Checkbox id="milestone-4" />
                          <label htmlFor="milestone-4" className="ml-2 text-sm">Final Testing</label>
                        </div>
                        <Button type="button" variant="ghost" size="sm" className="h-6 px-2">
                          Mark Complete
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="progress-notes">Progress Notes</Label>
                <Textarea
                  id="progress-notes"
                  placeholder="Add notes about current progress..."
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="grid gap-2">
                <Label>Attach Progress Photos</Label>
                <div className="border rounded-lg p-3 border-dashed flex items-center justify-center h-24">
                  <div className="text-center">
                    <Upload className="h-6 w-6 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-1">Click to upload or drag and drop</p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setUpdateProgressOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Progress</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Withdrawal Request Modal */}
      <Dialog open={withdrawalOpen} onOpenChange={setWithdrawalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Request Withdrawal</DialogTitle>
            <DialogDescription>
              Transfer funds to your M-Pesa account
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleWithdrawalRequest}>
            <div className="grid gap-4 py-4">
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Available Balance</p>
                    <p className="text-xl font-bold">KSh 32,500</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="withdrawal-amount">Withdrawal Amount (KSh)</Label>
                <Input id="withdrawal-amount" defaultValue="25,000" />
                <p className="text-xs text-muted-foreground">Minimum withdrawal: KSh 1,000</p>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="withdrawal-method">Withdrawal Method</Label>
                <Select defaultValue="mpesa">
                  <SelectTrigger id="withdrawal-method">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mpesa">M-Pesa (+254 712 345 678)</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  <p className="text-sm">
                    Standard withdrawals are processed within 24-48 hours. For instant withdrawals, enable Instant Payout.
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setWithdrawalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Confirm Withdrawal</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Instant Payout Modal */}
      <Dialog open={instantPayoutOpen} onOpenChange={setInstantPayoutOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enable Instant Payout</DialogTitle>
            <DialogDescription>
              Receive your funds instantly with a small fee
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Instant Payout Benefits</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Receive funds within minutes instead of 1-2 business days</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Available 24/7, including weekends and holidays</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Works with all supported withdrawal methods</span>
                </li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Fee Structure</h3>
              <p className="text-sm mb-3">
                Instant payouts incur a 2% fee on the withdrawal amount.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Example withdrawal:</span>
                  <span>KSh 25,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Instant payout fee (2%):</span>
                  <span>KSh 500</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Amount you'll receive:</span>
                  <span>KSh 24,500</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox id="accept-terms" />
              <label htmlFor="accept-terms" className="text-sm">
                I understand and agree to the instant payout fee
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInstantPayoutOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEnableInstantPayout}>
              Enable Instant Payout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Profile Modal */}
      <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Public Profile</DialogTitle>
            <DialogDescription>
              Update your profile information visible to clients
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleProfileUpdate}>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/hardworking-construction-worker.png" alt="Profile" />
                    <AvatarFallback>BF</AvatarFallback>
                  </Avatar>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-background"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="link" size="sm" className="mt-2">
                  Change Profile Photo
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="profile-name">Full Name</Label>
                  <Input id="profile-name" defaultValue="Bob Fundi" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="profile-title">Professional Title</Label>
                  <Input id="profile-title" defaultValue="Plumbing Specialist" />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="profile-about">About Me</Label>
                <Textarea
                  id="profile-about"
                  className="min-h-[100px]"
                  defaultValue="Professional plumber with over 8 years of experience in residential and commercial plumbing services. Specializing in repairs, installations, and maintenance of plumbing systems."
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="profile-skills">Skills</Label>
                <div className="border rounded-lg p-3">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {["Plumbing", "Pipe Fitting", "Fixture Installation", "Leak Detection", "Water Heaters", "Drainage"].map((skill: string, i: number) => (
                      <Badge key={i} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1">
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Add a skill..." className="flex-1" />
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="profile-location">Service Area</Label>
                <Input 
                  id="profile-location" 
                  defaultValue="Nairobi (Westlands, Kilimani, CBD, Lavington)" 
                />
              </div>
              
              <div className="grid gap-2">
                <Label>Portfolio Images</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="aspect-square bg-muted rounded-md overflow-hidden relative group">
                      <img
                        src={`/plumbing-work.png?key=473s2&height=100&width=100&query=plumbing work ${item}`}
                        alt={`Portfolio item ${item}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-background/80">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full bg-background/80">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="mt-2">
                  <Upload className="h-4 w-4 mr-2" /> Add Portfolio Images
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditProfileOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add Certification Modal */}
      <Dialog open={addCertificationOpen} onOpenChange={setAddCertificationOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Certification</DialogTitle>
            <DialogDescription>
              Upload your professional certifications to enhance your profile
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCertificationUpload}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="cert-name">Certification Name</Label>
                <Input id="cert-name" placeholder="e.g., Advanced Plumbing Certification" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="cert-issuer">Issuing Organization</Label>
                <Input id="cert-issuer" placeholder="e.g., Kenya Plumbers Association" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cert-issue-date">Issue Date</Label>
                  <Input id="cert-issue-date" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cert-expiry-date">Expiry Date (if any)</Label>
                  <Input id="cert-expiry-date" type="date" />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="cert-id">Certification ID/Number</Label>
                <Input id="cert-id" placeholder="e.g., KPA-2023-12345" />
              </div>
              
              <div className="grid gap-2">
                <Label>Upload Certificate</Label>
                <div className="border rounded-lg p-4 border-dashed flex flex-col items-center justify-center h-32">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, JPG, or PNG (max 5MB)</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddCertificationOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Upload Certification</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add License Modal */}
      <Dialog open={addLicenseOpen} onOpenChange={setAddLicenseOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Professional License</DialogTitle>
            <DialogDescription>
              Upload your professional licenses to enhance your profile
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleLicenseUpload}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="license-type">License Type</Label>
                <Select>
                  <SelectTrigger id="license-type">
                    <SelectValue placeholder="Select license type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="plumbing">Plumbing License</SelectItem>
                    <SelectItem value="electrical">Electrical License</SelectItem>
                    <SelectItem value="contractor">General Contractor License</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="license-number">License Number</Label>
                <Input id="license-number" placeholder="e.g., PL-2023-5678" />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="license-authority">Issuing Authority</Label>
                <Input id="license-authority" placeholder="e.g., Kenya Contractors Board" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="license-issue-date">Issue Date</Label>
                  <Input id="license-issue-date" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="license-expiry-date">Expiry Date</Label>
                  <Input id="license-expiry-date" type="date" />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label>Upload License Document</Label>
                <div className="border rounded-lg p-4 border-dashed flex flex-col items-center justify-center h-32">
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, JPG, or PNG (max 5MB)</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddLicenseOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Upload License</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View All Reviews Modal */}
      <Dialog open={viewAllReviewsOpen} onOpenChange={setViewAllReviewsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>All Client Reviews</DialogTitle>
            <DialogDescription>
              Reviews and ratings from your clients
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold">4.8/5</h3>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-sm text-muted-foreground">Based on 24 reviews</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs w-8">5 ★</span>
                  <Progress value={80} className="h-2 w-32" />
                  <span className="text-xs">80%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs w-8">4 ★</span>
                  <Progress value={15} className="h-2 w-32" />
                  <span className="text-xs">15%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs w-8">3 ★</span>
                  <Progress value={5} className="h-2 w-32" />
                  <span className="text-xs">5%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs w-8">2 ★</span>
                  <Progress value={0} className="h-2 w-32" />
                  <span className="text-xs">0%</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs w-8">1 ★</span>
                  <Progress value={0} className="h-2 w-32" />
                  <span className="text-xs">0%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {[
                {
                  name: "John Doe",
                  job: "Kitchen Plumbing Repair",
                  rating: 5,
                  comment:
                    "Bob did an excellent job fixing our kitchen sink. He was punctual, professional, and completed the work faster than expected. Highly recommended!",
                  date: "April 2, 2025",
                  avatar: "/diverse-group.png",
                },
                {
                  name: "Sarah Williams",
                  job: "Bathroom Renovation",
                  rating: 4,
                  comment:
                    "Good work on our bathroom renovation. Bob was knowledgeable and skilled. The only reason for 4 stars is that there was a slight delay in completing the project.",
                  date: "March 25, 2025",
                  avatar: "/diverse-woman-portrait.png",
                },
                {
                  name: "Acme Corp",
                  job: "Office Plumbing Maintenance",
                  rating: 5,
                  comment:
                    "Bob provided excellent service for our office plumbing maintenance. He was thorough, efficient, and professional. We will definitely hire him again for future needs.",
                  date: "March 18, 2025",
                  avatar: "/thoughtful-man.png",
                },
                {
                  name: "Michael Johnson",
                  job: "Water Heater Installation",
                  rating: 5,
                  comment:
                    "Excellent service! Bob installed our new water heater quickly and efficiently. He explained everything clearly and even helped us understand how to maintain it properly.",
                  date: "Apr 10, 2023",
                  avatar: "/diverse-group.png",
                },
                {
                  name: "Emily Chen",
                  job: "Leaky Faucet Repair",
                  rating: 5,
                  comment:
                    "Bob fixed our leaky faucet that had been bothering us for weeks. He was prompt, courteous, and very knowledgeable. The price was fair and the work was excellent.",
                  date: "Mar 28, 2023",
                  avatar: "/diverse-woman-portrait.png",
                },
                {
                  name: "David Omondi",
                  job: "Drainage System Repair",
                  rating: 4,
                  comment:
                    "Bob did a good job fixing our drainage issues. He was thorough in his diagnosis and explained the problem clearly. The only issue was that it took a bit longer than expected.",
                  date: "Mar 15, 2023",
                  avatar: "/thoughtful-man.png",
                },
              ].map((review, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{review.name}</span>
                        <div className="flex">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          ))}
                          {[...Array(5 - review.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-muted-foreground" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {review.job} • {review.date}
                      </p>
                      <p className="text-sm">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setViewAllReviewsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toast component */}
      <Toaster />
    </div>
  )
}
