"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Briefcase,
  MessageSquare,
  Bell,
  Star,
  CreditCard,
  Shield,
  Plus,
  Eye,
  X,
  DollarSign,
  Calendar,
  FileText,
  ChevronRight,
  Filter,
  Upload,
  LogOut,
  Smartphone,
  Laptop,
} from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function CustomerDashboardPage() {
  const router = useRouter()

  // State for modals
  const [postJobDialogOpen, setPostJobDialogOpen] = useState(false)
  const [quickPostDialogOpen, setQuickPostDialogOpen] = useState(false)
  const [viewDetailsDialogOpen, setViewDetailsDialogOpen] = useState(false)
  const [replyDialogOpen, setReplyDialogOpen] = useState(false)
  const [viewContractDialogOpen, setViewContractDialogOpen] = useState(false)
  const [chatReplyDialogOpen, setChatReplyDialogOpen] = useState(false)
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false)
  const [editProfileDialogOpen, setEditProfileDialogOpen] = useState(false)
  const [addPaymentMethodDialogOpen, setAddPaymentMethodDialogOpen] = useState(false)
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] = useState(false)
  const [enable2FADialogOpen, setEnable2FADialogOpen] = useState(false)
  const [loginHistoryDialogOpen, setLoginHistoryDialogOpen] = useState(false)

  // State for selected items
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [selectedBid, setSelectedBid] = useState<any>(null)
  const [selectedChat, setSelectedChat] = useState<any>(null)
  const [selectedReview, setSelectedReview] = useState<any>(null)

  // Form states
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [jobBudget, setJobBudget] = useState("")
  const [jobCategory, setJobCategory] = useState("")
  const [jobLocation, setJobLocation] = useState("")
  const [jobDeadline, setJobDeadline] = useState("")
  const [replyMessage, setReplyMessage] = useState("")
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewComment, setReviewComment] = useState("")

  // Profile form states
  const [fullName, setFullName] = useState("John Doe")
  const [email, setEmail] = useState("john.doe@example.com")
  const [phone, setPhone] = useState("+254 712 345 678")
  const [address, setAddress] = useState("123 Nairobi Way, Nairobi, Kenya")

  // Password form states
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // Payment method form states
  const [paymentType, setPaymentType] = useState("mpesa")
  const [mpesaNumber, setMpesaNumber] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardCVC, setCardCVC] = useState("")
  const [paypalEmail, setPaypalEmail] = useState("")

  // Handle post job submission
  const handlePostJob = () => {
    toast({
      title: "Job Posted Successfully",
      description: `Your job "${jobTitle}" has been posted and is now visible to builders.`,
    })
    setPostJobDialogOpen(false)
    resetJobForm()
  }

  // Handle quick post job submission
  const handleQuickPostJob = () => {
    toast({
      title: "Job Posted Successfully",
      description: "Your quick job has been posted and is now visible to builders.",
    })
    setQuickPostDialogOpen(false)
    resetJobForm()
  }

  // Handle reply to bid
  const handleReplyToBid = () => {
    toast({
      title: "Reply Sent",
      description: `Your reply has been sent to ${selectedBid?.name}.`,
    })
    setReplyDialogOpen(false)
    setReplyMessage("")
  }

  // Handle reply to chat
  const handleReplyToChat = () => {
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${selectedChat?.name}.`,
    })
    setChatReplyDialogOpen(false)
    setReplyMessage("")
  }

  // Handle submit review
  const handleSubmitReview = () => {
    toast({
      title: "Review Submitted",
      description: `Your ${reviewRating}-star review has been submitted.`,
    })
    setReviewDialogOpen(false)
    setReviewRating(0)
    setReviewComment("")
  }

  // Handle skip review
  const handleSkipReview = () => {
    toast({
      title: "Review Skipped",
      description: "You can always leave a review later from your completed jobs.",
    })
    setReviewDialogOpen(false)
  }

  // Handle update profile
  const handleUpdateProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    })
    setEditProfileDialogOpen(false)
  }

  // Handle add payment method
  const handleAddPaymentMethod = () => {
    toast({
      title: "Payment Method Added",
      description: "Your new payment method has been added successfully.",
    })
    setAddPaymentMethodDialogOpen(false)
    resetPaymentForm()
  }

  // Handle change password
  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirmation password must match.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Password Changed",
      description: "Your password has been changed successfully.",
    })
    setChangePasswordDialogOpen(false)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  // Handle enable 2FA
  const handleEnable2FA = () => {
    toast({
      title: "2FA Enabled",
      description: "Two-factor authentication has been enabled for your account.",
    })
    setEnable2FADialogOpen(false)
  }

  // Reset job form
  const resetJobForm = () => {
    setJobTitle("")
    setJobDescription("")
    setJobBudget("")
    setJobCategory("")
    setJobLocation("")
    setJobDeadline("")
  }

  // Reset payment form
  const resetPaymentForm = () => {
    setPaymentType("mpesa")
    setMpesaNumber("")
    setCardNumber("")
    setCardExpiry("")
    setCardCVC("")
    setPaypalEmail("")
  }

  // Open job details
  const openJobDetails = (job: any) => {
    setSelectedJob(job)
    setViewDetailsDialogOpen(true)
  }

  // Open bid reply
  const openBidReply = (bid: any) => {
    setSelectedBid(bid)
    setReplyDialogOpen(true)
  }

  // Open contract view
  const openContractView = (bid: any) => {
    setSelectedBid(bid)
    setViewContractDialogOpen(true)
  }

  // Open chat reply
  const openChatReply = (chat: any) => {
    setSelectedChat(chat)
    setChatReplyDialogOpen(true)
  }

  // Open review dialog
  const openReviewDialog = (review: any) => {
    setSelectedReview(review)
    setReviewDialogOpen(true)
  }

  // Navigate to wallet
  const navigateToWallet = () => {
    router.push("/wallet")
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <span className="font-bold">J</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Akhwan</h1>
                <p className="text-sm text-muted-foreground">Customer Dashboard</p>
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
                <Avatar>
                  <AvatarImage src="/diverse-group.png" alt="John Doe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Customer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome, John!</h2>
            <p className="text-muted-foreground">Manage your projects and payments from your dashboard</p>
          </div>
          <Dialog open={postJobDialogOpen} onOpenChange={setPostJobDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0">
                <Plus className="mr-2 h-4 w-4" /> Post New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Post a New Job</DialogTitle>
                <DialogDescription>
                  Fill in the details below to post a new job for builders to bid on.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input
                    id="job-title"
                    placeholder="e.g. Kitchen Renovation"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="job-description">Job Description</Label>
                  <Textarea
                    id="job-description"
                    placeholder="Describe the job in detail..."
                    rows={4}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="job-budget">Budget (KSh)</Label>
                    <Input
                      id="job-budget"
                      placeholder="e.g. 50,000"
                      value={jobBudget}
                      onChange={(e) => setJobBudget(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="job-category">Category</Label>
                    <Select value={jobCategory} onValueChange={setJobCategory}>
                      <SelectTrigger id="job-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="carpentry">Carpentry</SelectItem>
                        <SelectItem value="masonry">Masonry</SelectItem>
                        <SelectItem value="painting">Painting</SelectItem>
                        <SelectItem value="roofing">Roofing</SelectItem>
                        <SelectItem value="design">Design & Architecture</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="job-location">Location</Label>
                    <Input
                      id="job-location"
                      placeholder="e.g. Nairobi, Westlands"
                      value={jobLocation}
                      onChange={(e) => setJobLocation(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="job-deadline">Deadline</Label>
                    <Input
                      id="job-deadline"
                      type="date"
                      value={jobDeadline}
                      onChange={(e) => setJobDeadline(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Attachments (Optional)</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-1">Drag & drop files here or click to browse</p>
                    <p className="text-xs text-muted-foreground">Supports images, PDFs, and CAD files up to 10MB</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setPostJobDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handlePostJob}>Post Job</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* 1.1 Overview Panel */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                <span>2 Requested</span>
                <span>2 In Progress</span>
                <span>1 Awaiting Review</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Escrow Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KSh 78,500</div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                <span>KSh 45,000 Held</span>
                <span>KSh 32,000 Released</span>
                <span>KSh 1,500 Refunded</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-2">From 2 different builders</p>
            </CardContent>
          </Card>
          <Card onClick={navigateToWallet} className="cursor-pointer hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KSh 15,000</div>
              <p className="text-xs text-muted-foreground mt-2">Available for new jobs</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="jobs" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="jobs">My Job Requests</TabsTrigger>
            <TabsTrigger value="bids">Bid Management</TabsTrigger>
            <TabsTrigger value="messages">Chat & Notifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews & Ratings</TabsTrigger>
            <TabsTrigger value="account">Account & Settings</TabsTrigger>
          </TabsList>

          {/* 1.2 My Job Requests */}
          <TabsContent value="jobs">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>My Job Requests</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" /> Filter
                    </Button>
                    <Dialog open={quickPostDialogOpen} onOpenChange={setQuickPostDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" /> Quick-Post Job
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Quick Post a Job</DialogTitle>
                          <DialogDescription>
                            Quickly post a job with minimal details. You can add more information later.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="quick-job-title">Job Title</Label>
                            <Input
                              id="quick-job-title"
                              placeholder="e.g. Bathroom Plumbing"
                              value={jobTitle}
                              onChange={(e) => setJobTitle(e.target.value)}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="quick-job-description">Brief Description</Label>
                            <Textarea
                              id="quick-job-description"
                              placeholder="Briefly describe what you need..."
                              rows={3}
                              value={jobDescription}
                              onChange={(e) => setJobDescription(e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="quick-job-budget">Budget (KSh)</Label>
                              <Input
                                id="quick-job-budget"
                                placeholder="e.g. 25,000"
                                value={jobBudget}
                                onChange={(e) => setJobBudget(e.target.value)}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="quick-job-category">Category</Label>
                              <Select value={jobCategory} onValueChange={setJobCategory}>
                                <SelectTrigger id="quick-job-category">
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="plumbing">Plumbing</SelectItem>
                                  <SelectItem value="electrical">Electrical</SelectItem>
                                  <SelectItem value="carpentry">Carpentry</SelectItem>
                                  <SelectItem value="masonry">Masonry</SelectItem>
                                  <SelectItem value="painting">Painting</SelectItem>
                                  <SelectItem value="roofing">Roofing</SelectItem>
                                  <SelectItem value="design">Design</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setQuickPostDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleQuickPostJob}>Post Job</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <CardDescription>Track all your posted jobs and their current status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm">
                    <div className="col-span-4">Job Title & ID</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-1 text-center">Bids</div>
                    <div className="col-span-2">Amount Escrowed</div>
                    <div className="col-span-3 text-right">Actions</div>
                  </div>

                  {[
                    {
                      title: "Kitchen Renovation",
                      id: "JOB-1234",
                      status: "In Progress",
                      bids: 5,
                      amount: "45,000",
                    },
                    {
                      title: "Bathroom Plumbing",
                      id: "JOB-1235",
                      status: "Requested",
                      bids: 3,
                      amount: "0",
                    },
                    {
                      title: "House Design",
                      id: "JOB-1236",
                      status: "In Progress",
                      bids: 4,
                      amount: "95,000",
                    },
                    {
                      title: "Roof Repair",
                      id: "JOB-1237",
                      status: "Disputed",
                      bids: 6,
                      amount: "78,500",
                    },
                    {
                      title: "Wall Painting",
                      id: "JOB-1238",
                      status: "Completed",
                      bids: 8,
                      amount: "32,000",
                    },
                  ].map((job, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 p-4 border-t items-center text-sm">
                      <div className="col-span-4">
                        <div className="font-medium">{job.title}</div>
                        <div className="text-xs text-muted-foreground">{job.id}</div>
                      </div>
                      <div className="col-span-2">
                        <Badge
                          variant={
                            job.status === "Completed"
                              ? "default"
                              : job.status === "In Progress"
                                ? "secondary"
                                : job.status === "Requested"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {job.status}
                        </Badge>
                      </div>
                      <div className="col-span-1 text-center">{job.bids}</div>
                      <div className="col-span-2">{job.amount === "0" ? "—" : `KSh ${job.amount}`}</div>
                      <div className="col-span-3 flex justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => openJobDetails(job)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only md:not-sr-only md:ml-2">View</span>
                        </Button>
                        {job.status === "Requested" && (
                          <Button variant="outline" size="sm">
                            <X className="h-4 w-4" />
                            <span className="sr-only md:not-sr-only md:ml-2">Cancel</span>
                          </Button>
                        )}
                        {job.status === "In Progress" && (
                          <Button variant="outline" size="sm">
                            <DollarSign className="h-4 w-4" />
                            <span className="sr-only md:not-sr-only md:ml-2">Release</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Job Details Dialog */}
            <Dialog open={viewDetailsDialogOpen} onOpenChange={setViewDetailsDialogOpen}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Job Details</DialogTitle>
                  <DialogDescription>{selectedJob?.id}</DialogDescription>
                </DialogHeader>
                {selectedJob && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">{selectedJob.title}</h3>
                      <Badge
                        variant={
                          selectedJob.status === "Completed"
                            ? "default"
                            : selectedJob.status === "In Progress"
                              ? "secondary"
                              : selectedJob.status === "Requested"
                                ? "outline"
                                : "destructive"
                        }
                        className="mt-2"
                      >
                        {selectedJob.status}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Description</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedJob.title === "Kitchen Renovation"
                          ? "Complete renovation of kitchen including cabinets, countertops, flooring, and appliance installation."
                          : selectedJob.title === "Bathroom Plumbing"
                            ? "Fix leaking pipes, install new shower, and replace toilet fixtures."
                            : selectedJob.title === "House Design"
                              ? "Design a 3-bedroom house with modern aesthetics and energy efficiency in mind."
                              : selectedJob.title === "Roof Repair"
                                ? "Repair damaged roof sections and replace missing shingles after recent storm."
                                : "Paint all interior walls with premium quality paint in selected colors."}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm">Budget</h4>
                        <p className="text-sm">KSh {selectedJob.amount === "0" ? "Not set" : selectedJob.amount}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Location</h4>
                        <p className="text-sm">Nairobi, Kenya</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm">Posted On</h4>
                        <p className="text-sm">April 1, 2025</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Deadline</h4>
                        <p className="text-sm">April 30, 2025</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="font-medium text-sm mb-2">Bids ({selectedJob.bids})</h4>
                      <div className="space-y-3 max-h-[200px] overflow-y-auto">
                        {[...Array(selectedJob.bids)].map((_, i) => (
                          <div key={i} className="flex justify-between items-center p-2 border rounded-md">
                            <div>
                              <p className="text-sm font-medium">Builder {i + 1}</p>
                              <p className="text-xs text-muted-foreground">
                                KSh{" "}
                                {Math.floor(
                                  Number.parseInt(selectedJob.amount || "30000") * (0.9 + Math.random() * 0.2),
                                )}
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              View Bid
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedJob.status === "In Progress" && (
                      <>
                        <Separator />
                        <div>
                          <h4 className="font-medium text-sm mb-2">Progress</h4>
                          <Progress value={60} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-2">Last updated: 2 days ago</p>
                        </div>
                      </>
                    )}
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setViewDetailsDialogOpen(false)}>
                    Close
                  </Button>
                  {selectedJob?.status === "Requested" && <Button variant="destructive">Cancel Job</Button>}
                  {selectedJob?.status === "In Progress" && <Button>Release Payment</Button>}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* 1.3 Bid Management */}
          <TabsContent value="bids">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Bid Invitations</CardTitle>
                  <CardDescription>Builders who have reached out with questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "Jane Smith",
                        role: "Fundi",
                        job: "Kitchen Renovation",
                        message: "I have a question about the cabinet specifications...",
                        time: "2 hours ago",
                        avatar: "/diverse-woman-portrait.png",
                      },
                      {
                        name: "Michael Johnson",
                        role: "Contractor",
                        job: "Bathroom Plumbing",
                        message: "Can you provide more details about the existing plumbing?",
                        time: "Yesterday",
                        avatar: "/thoughtful-man.png",
                      },
                    ].map((bid, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={bid.avatar || "/placeholder.svg"} alt={bid.name} />
                            <AvatarFallback>{bid.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <div>
                                <span className="font-medium">{bid.name}</span>
                                <span className="text-xs text-muted-foreground ml-2">{bid.role}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">{bid.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">Re: {bid.job}</p>
                            <p className="text-sm mb-3">{bid.message}</p>
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  openJobDetails({
                                    title: bid.job,
                                    id: "JOB-" + (1234 + index),
                                    status: "Requested",
                                    bids: 3 + index,
                                    amount: "0",
                                  })
                                }
                              >
                                View Details
                              </Button>
                              <Button size="sm" onClick={() => openBidReply(bid)}>
                                Reply
                              </Button>
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
                  <CardTitle>Accepted Bids</CardTitle>
                  <CardDescription>Winning builders and project details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "James Miller",
                        role: "Professional",
                        job: "House Design",
                        price: "95,000",
                        timeline: "30 days",
                        progress: 40,
                        avatar: "/architect-studio.png",
                      },
                      {
                        name: "Bob Fundi",
                        role: "Fundi",
                        job: "Kitchen Renovation",
                        price: "45,000",
                        timeline: "14 days",
                        progress: 60,
                        avatar: "/hardworking-construction-worker.png",
                      },
                    ].map((bid, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={bid.avatar || "/placeholder.svg"} alt={bid.name} />
                            <AvatarFallback>{bid.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <div>
                                <span className="font-medium">{bid.name}</span>
                                <span className="text-xs text-muted-foreground ml-2">{bid.role}</span>
                              </div>
                              <span className="font-medium">KSh {bid.price}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{bid.job}</p>
                            <div className="flex justify-between text-xs text-muted-foreground mb-2">
                              <span>Timeline: {bid.timeline}</span>
                              <span>{bid.progress}% Complete</span>
                            </div>
                            <Progress value={bid.progress} className="h-2 mb-3" />
                            <div className="flex justify-end">
                              <Button variant="outline" size="sm" onClick={() => openContractView(bid)}>
                                View Contract
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Bid Reply Dialog */}
            <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reply to {selectedBid?.name}</DialogTitle>
                  <DialogDescription>Regarding: {selectedBid?.job}</DialogDescription>
                </DialogHeader>
                {selectedBid && (
                  <div className="space-y-4 py-4">
                    <div className="p-4 bg-muted/50 rounded-md">
                      <p className="text-sm font-medium mb-1">{selectedBid.name} wrote:</p>
                      <p className="text-sm">{selectedBid.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{selectedBid.time}</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reply-message">Your Reply</Label>
                      <Textarea
                        id="reply-message"
                        placeholder="Type your response here..."
                        rows={4}
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Attachments (Optional)</Label>
                      <div className="border-2 border-dashed rounded-md p-4 text-center">
                        <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                        <p className="text-xs text-muted-foreground">Drag & drop files here or click to browse</p>
                      </div>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setReplyDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleReplyToBid}>Send Reply</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Contract View Dialog */}
            <Dialog open={viewContractDialogOpen} onOpenChange={setViewContractDialogOpen}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Contract Details</DialogTitle>
                  <DialogDescription>
                    Contract for {selectedBid?.job} with {selectedBid?.name}
                  </DialogDescription>
                </DialogHeader>
                {selectedBid && (
                  <div className="space-y-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex justify-between mb-2">
                        <h3 className="font-semibold">Contract Summary</h3>
                        <Badge>Active</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Project:</p>
                          <p className="font-medium">{selectedBid.job}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Builder:</p>
                          <p className="font-medium">{selectedBid.name}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Amount:</p>
                          <p className="font-medium">KSh {selectedBid.price}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Timeline:</p>
                          <p className="font-medium">{selectedBid.timeline}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Scope of Work</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedBid.job === "House Design"
                          ? "Design a 3-bedroom house with modern aesthetics and energy efficiency in mind. Includes floor plans, elevations, 3D renderings, and construction documents."
                          : "Complete renovation of kitchen including cabinets, countertops, flooring, and appliance installation. All materials to be provided by the contractor except appliances."}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Payment Schedule</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Initial Deposit (30%)</span>
                          <span>KSh {Math.round(Number.parseInt(selectedBid.price) * 0.3).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Milestone 1 (30%)</span>
                          <span>KSh {Math.round(Number.parseInt(selectedBid.price) * 0.3).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Final Payment (40%)</span>
                          <span>KSh {Math.round(Number.parseInt(selectedBid.price) * 0.4).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Current Progress</h4>
                      <Progress value={selectedBid.progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">Last updated: 3 days ago</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium">Contract Documents</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">Full Contract.pdf</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">Project Specifications.pdf</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setViewContractDialogOpen(false)}>
                    Close
                  </Button>
                  <Button>Contact Builder</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* 1.4 Chat & Notifications */}
          <TabsContent value="messages">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Conversations</CardTitle>
                  <CardDescription>Your latest messages with builders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        name: "James Miller",
                        role: "Professional",
                        message: "I've uploaded the revised floor plans for your review.",
                        time: "10 minutes ago",
                        unread: true,
                        avatar: "/architect-studio.png",
                      },
                      {
                        name: "Bob Fundi",
                        role: "Fundi",
                        message: "The kitchen cabinets will be installed tomorrow as scheduled.",
                        time: "2 hours ago",
                        unread: true,
                        avatar: "/hardworking-construction-worker.png",
                      },
                      {
                        name: "Linda Garcia",
                        role: "Hardware Supplier",
                        message: "Your order of tiles has been dispatched and will arrive on Friday.",
                        time: "Yesterday",
                        unread: false,
                        avatar: "/diverse-woman-portrait.png",
                      },
                    ].map((chat, index) => (
                      <div
                        key={index}
                        className={`p-4 border rounded-lg ${chat.unread ? "bg-muted/50 border-primary/20" : ""}`}
                      >
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={chat.avatar || "/placeholder.svg"} alt={chat.name} />
                            <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <div>
                                <span className="font-medium">{chat.name}</span>
                                <span className="text-xs text-muted-foreground ml-2">{chat.role}</span>
                              </div>
                              <span className="text-xs text-muted-foreground">{chat.time}</span>
                            </div>
                            <p className="text-sm mb-2">{chat.message}</p>
                            <div className="flex justify-end">
                              <Button variant="outline" size="sm" onClick={() => openChatReply(chat)}>
                                <MessageSquare className="h-4 w-4 mr-2" /> Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                        {chat.unread && (
                          <div className="flex justify-end mt-2">
                            <Badge variant="secondary">New message</Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Alerts & Reminders</CardTitle>
                  <CardDescription>Important updates about your projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Milestone Due",
                        description: "Kitchen cabinet installation is due tomorrow",
                        time: "Due April 15, 2025",
                        icon: Calendar,
                        iconColor: "text-amber-500",
                      },
                      {
                        title: "Escrow Release Pending",
                        description: "Payment release for 'Bathroom Plumbing' awaiting your confirmation",
                        time: "Requested 2 days ago",
                        icon: DollarSign,
                        iconColor: "text-green-500",
                      },
                      {
                        title: "Document Review",
                        description: "House design blueprints need your approval",
                        time: "Uploaded yesterday",
                        icon: FileText,
                        iconColor: "text-blue-500",
                      },
                      {
                        title: "New Bid Received",
                        description: "You have a new bid for 'Roof Repair' from Contractor Team",
                        time: "1 hour ago",
                        icon: Briefcase,
                        iconColor: "text-purple-500",
                      },
                    ].map((alert, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start">
                          <div className={`${alert.iconColor} mr-3 mt-0.5`}>
                            <alert.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <h3 className="font-medium">{alert.title}</h3>
                              <Button variant="ghost" size="sm" className="h-6 px-2">
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">{alert.description}</p>
                            <span className="text-xs text-muted-foreground">{alert.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Chat Reply Dialog */}
            <Dialog open={chatReplyDialogOpen} onOpenChange={setChatReplyDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reply to {selectedChat?.name}</DialogTitle>
                  <DialogDescription>Continue your conversation</DialogDescription>
                </DialogHeader>
                {selectedChat && (
                  <div className="space-y-4 py-4">
                    <div className="space-y-4 max-h-[300px] overflow-y-auto">
                      <div className="flex items-start space-x-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} alt={selectedChat.name} />
                          <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="bg-muted/50 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                          <p className="text-sm">{selectedChat.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{selectedChat.time}</p>
                        </div>
                      </div>

                      {selectedChat.name === "James Miller" && (
                        <>
                          <div className="flex items-start space-x-2 justify-end">
                            <div className="bg-primary/10 p-3 rounded-lg rounded-tr-none max-w-[80%]">
                              <p className="text-sm">Thanks for the update. When can I expect the 3D renderings?</p>
                              <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                            </div>
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/diverse-group.png" alt="You" />
                              <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                          </div>

                          <div className="flex items-start space-x-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} alt={selectedChat.name} />
                              <AvatarFallback>{selectedChat.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="bg-muted/50 p-3 rounded-lg rounded-tl-none max-w-[80%]">
                              <p className="text-sm">
                                I'll have the 3D renderings ready by tomorrow afternoon. I've also included some
                                material options in the revised plans.
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">{selectedChat.time}</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="chat-message">Your Message</Label>
                      <Textarea
                        id="chat-message"
                        placeholder="Type your message here..."
                        rows={3}
                        value={replyMessage}
                        onChange={(e) => setReplyMessage(e.target.value)}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Upload className="h-4 w-4" />
                        Attach
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Calendar className="h-4 w-4" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setChatReplyDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleReplyToChat}>Send Message</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* 1.5 Reviews & Ratings */}
          <TabsContent value="reviews">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Leave Feedback</CardTitle>
                  <CardDescription>Rate and review completed jobs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Wall Painting",
                        builder: "Michael Johnson (Fundi)",
                        completed: "April 17, 2025",
                        avatar: "/artist-at-work.png",
                      },
                      {
                        title: "Electrical Wiring",
                        builder: "Sarah Williams (Fundi)",
                        completed: "April 19, 2025",
                        avatar: "/electrician-working.png",
                      },
                    ].map((job, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={job.avatar || "/placeholder.svg"} alt={job.builder} />
                            <AvatarFallback>{job.builder.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <h3 className="font-medium">{job.title}</h3>
                              <span className="text-xs text-muted-foreground">Completed: {job.completed}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{job.builder}</p>
                            <div className="flex items-center space-x-1 mb-3">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Button
                                  key={star}
                                  variant="ghost"
                                  size="sm"
                                  className={`p-1 h-auto ${reviewRating >= star ? "text-yellow-400" : "text-muted-foreground"}`}
                                  onClick={() => setReviewRating(star)}
                                >
                                  <Star className={`h-6 w-6 ${reviewRating >= star ? "fill-yellow-400" : ""}`} />
                                </Button>
                              ))}
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  handleSkipReview()
                                }}
                              >
                                Skip
                              </Button>
                              <Button size="sm" onClick={() => openReviewDialog(job)}>
                                Submit Review
                              </Button>
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
                  <CardTitle>Your Reviews</CardTitle>
                  <CardDescription>What builders have said about you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        builder: "James Miller",
                        role: "Professional",
                        job: "House Design",
                        rating: 5,
                        comment:
                          "Great client! Clear requirements and prompt responses to questions. Would work with again.",
                        date: "March 25, 2025",
                        avatar: "/architect-studio.png",
                      },
                      {
                        builder: "Linda Garcia",
                        role: "Hardware Supplier",
                        job: "Material Order",
                        rating: 4,
                        comment: "Smooth transaction. Payment was made on time and pickup was well coordinated.",
                        date: "March 18, 2025",
                        avatar: "/diverse-woman-portrait.png",
                      },
                    ].map((review, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.builder} />
                            <AvatarFallback>{review.builder.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <div>
                                <span className="font-medium">{review.builder}</span>
                                <span className="text-xs text-muted-foreground ml-2">{review.role}</span>
                              </div>
                              <div className="flex">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                              Re: {review.job} • {review.date}
                            </p>
                            <p className="text-sm">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Review Dialog */}
            <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Leave a Review</DialogTitle>
                  <DialogDescription>Share your experience with {selectedReview?.builder}</DialogDescription>
                </DialogHeader>
                {selectedReview && (
                  <div className="space-y-4 py-4">
                    <div className="flex items-center space-x-2 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedReview.avatar || "/placeholder.svg"} alt={selectedReview.builder} />
                        <AvatarFallback>{selectedReview.builder?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{selectedReview.title}</h3>
                        <p className="text-sm text-muted-foreground">{selectedReview.builder}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Rating</Label>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button
                            key={star}
                            variant="ghost"
                            size="sm"
                            className={`p-1 h-auto ${reviewRating >= star ? "text-yellow-400" : "text-muted-foreground"}`}
                            onClick={() => setReviewRating(star)}
                          >
                            <Star className={`h-6 w-6 ${reviewRating >= star ? "fill-yellow-400" : ""}`} />
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="review-comment">Your Review</Label>
                      <Textarea
                        id="review-comment"
                        placeholder="Share your experience with this builder..."
                        rows={4}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="recommend" />
                        <Label htmlFor="recommend">I would recommend this builder to others</Label>
                      </div>
                    </div>
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={handleSkipReview}>
                    Skip
                  </Button>
                  <Button onClick={handleSubmitReview}>Submit Review</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* 1.6 Account & Settings */}
          <TabsContent value="account">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-center mb-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/diverse-group.png" alt="John Doe" />
                        <AvatarFallback className="text-2xl">JD</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium text-sm">Full Name</div>
                      <div className="p-2 border rounded-md">John Doe</div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium text-sm">Email Address</div>
                      <div className="p-2 border rounded-md">john.doe@example.com</div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium text-sm">Phone Number</div>
                      <div className="p-2 border rounded-md">+254 712 345 678</div>
                    </div>
                    <div className="space-y-2">
                      <div className="font-medium text-sm">Address</div>
                      <div className="p-2 border rounded-md">123 Nairobi Way, Nairobi, Kenya</div>
                    </div>
                    <Dialog open={editProfileDialogOpen} onOpenChange={setEditProfileDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full">Edit Profile</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Profile</DialogTitle>
                          <DialogDescription>Update your personal information</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="flex justify-center mb-2">
                            <Avatar className="h-20 w-20">
                              <AvatarImage src="/diverse-group.png" alt="John Doe" />
                              <AvatarFallback className="text-xl">JD</AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex justify-center">
                            <Button variant="outline" size="sm" className="gap-1">
                              <Upload className="h-4 w-4" />
                              Change Photo
                            </Button>
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="full-name">Full Name</Label>
                            <Input id="full-name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea
                              id="address"
                              rows={2}
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setEditProfileDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleUpdateProfile}>Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
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
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                          </div>
                          <div></div>
                          <div>
                            <div className="font-medium">Visa Card</div>
                            <div className="text-sm text-muted-foreground">**** **** **** 4321</div>
                          </div>
                        </div>
                        <Badge variant="outline">Secondary</Badge>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <span className="font-bold text-blue-600">P</span>
                          </div>
                          <div>
                            <div className="font-medium">PayPal</div>
                            <div className="text-sm text-muted-foreground">john.doe@example.com</div>
                          </div>
                        </div>
                        <Badge variant="outline">Secondary</Badge>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>

                    <Dialog open={addPaymentMethodDialogOpen} onOpenChange={setAddPaymentMethodDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="w-full">
                          <Plus className="mr-2 h-4 w-4" /> Add Payment Method
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Payment Method</DialogTitle>
                          <DialogDescription>Add a new payment method to your account</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label>Payment Type</Label>
                            <RadioGroup value={paymentType} onValueChange={setPaymentType}>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="mpesa" id="mpesa" />
                                <Label htmlFor="mpesa" className="flex items-center">
                                  <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                                    <span className="text-xs font-bold text-green-600">M</span>
                                  </div>
                                  M-Pesa
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="card" id="card" />
                                <Label htmlFor="card" className="flex items-center">
                                  <CreditCard className="h-4 w-4 mr-2 text-blue-600" />
                                  Credit/Debit Card
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="paypal" id="paypal" />
                                <Label htmlFor="paypal" className="flex items-center">
                                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                                    <span className="text-xs font-bold text-blue-600">P</span>
                                  </div>
                                  PayPal
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          {paymentType === "mpesa" && (
                            <div className="grid gap-2">
                              <Label htmlFor="mpesa-number">M-Pesa Number</Label>
                              <Input
                                id="mpesa-number"
                                placeholder="e.g. 0712345678"
                                value={mpesaNumber}
                                onChange={(e) => setMpesaNumber(e.target.value)}
                              />
                            </div>
                          )}

                          {paymentType === "card" && (
                            <>
                              <div className="grid gap-2">
                                <Label htmlFor="card-number">Card Number</Label>
                                <Input
                                  id="card-number"
                                  placeholder="1234 5678 9012 3456"
                                  value={cardNumber}
                                  onChange={(e) => setCardNumber(e.target.value)}
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="card-expiry">Expiry Date</Label>
                                  <Input
                                    id="card-expiry"
                                    placeholder="MM/YY"
                                    value={cardExpiry}
                                    onChange={(e) => setCardExpiry(e.target.value)}
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="card-cvc">CVC</Label>
                                  <Input
                                    id="card-cvc"
                                    placeholder="123"
                                    value={cardCVC}
                                    onChange={(e) => setCardCVC(e.target.value)}
                                  />
                                </div>
                              </div>
                            </>
                          )}

                          {paymentType === "paypal" && (
                            <div className="grid gap-2">
                              <Label htmlFor="paypal-email">PayPal Email</Label>
                              <Input
                                id="paypal-email"
                                type="email"
                                placeholder="your@email.com"
                                value={paypalEmail}
                                onChange={(e) => setPaypalEmail(e.target.value)}
                              />
                            </div>
                          )}

                          <div className="flex items-center space-x-2">
                            <Checkbox id="default-payment" />
                            <Label htmlFor="default-payment">Set as default payment method</Label>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setAddPaymentMethodDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleAddPaymentMethod}>Add Payment Method</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 mr-3 text-muted-foreground" />
                          <div className="font-medium">Password</div>
                        </div>
                        <Dialog open={changePasswordDialogOpen} onOpenChange={setChangePasswordDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              Change
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Change Password</DialogTitle>
                              <DialogDescription>Update your account password</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input
                                  id="current-password"
                                  type="password"
                                  value={currentPassword}
                                  onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input
                                  id="new-password"
                                  type="password"
                                  value={newPassword}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="confirm-password">Confirm New Password</Label>
                                <Input
                                  id="confirm-password"
                                  type="password"
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setChangePasswordDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleChangePassword}>Update Password</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <p className="text-sm text-muted-foreground">Last updated 30 days ago</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 mr-3 text-muted-foreground" />
                          <div className="font-medium">Two-Factor Authentication</div>
                        </div>
                        <Dialog open={enable2FADialogOpen} onOpenChange={setEnable2FADialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              Enable
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Enable Two-Factor Authentication</DialogTitle>
                              <DialogDescription>Add an extra layer of security to your account</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="flex justify-center mb-4">
                                <div className="p-4 border rounded-md bg-muted/50">
                                  <div className="h-40 w-40 bg-white flex items-center justify-center">
                                    <div className="text-center">
                                      <Shield className="h-12 w-12 mx-auto text-primary mb-2" />
                                      <p className="text-sm">QR Code</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label>Setup Options</Label>
                                <RadioGroup defaultValue="app">
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="app" id="app" />
                                    <Label htmlFor="app" className="flex items-center">
                                      <Smartphone className="h-4 w-4 mr-2" />
                                      Authenticator App
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="sms" id="sms" />
                                    <Label htmlFor="sms" className="flex items-center">
                                      <MessageSquare className="h-4 w-4 mr-2" />
                                      SMS Verification
                                    </Label>
                                  </div>
                                </RadioGroup>
                              </div>

                              <div className="grid gap-2">
                                <Label htmlFor="verification-code">Verification Code</Label>
                                <Input id="verification-code" placeholder="Enter 6-digit code" />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setEnable2FADialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleEnable2FA}>Enable 2FA</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 mr-3 text-muted-foreground" />
                          <div className="font-medium">Login History</div>
                        </div>
                        <Dialog open={loginHistoryDialogOpen} onOpenChange={setLoginHistoryDialogOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Login History</DialogTitle>
                              <DialogDescription>Recent account activity</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="rounded-md border">
                                <div className="grid grid-cols-12 gap-4 p-3 bg-muted/50 font-medium text-sm">
                                  <div className="col-span-3">Date & Time</div>
                                  <div className="col-span-3">IP Address</div>
                                  <div className="col-span-3">Location</div>
                                  <div className="col-span-3">Device</div>
                                </div>

                                {[
                                  {
                                    date: "Today, 2:00 PM",
                                    ip: "196.200.xx.xx",
                                    location: "Nairobi, Kenya",
                                    device: "Chrome / Windows",
                                    current: true,
                                  },
                                  {
                                    date: "Tomorrow, 10:00 AM",
                                    ip: "196.200.xx.xx",
                                    location: "Nairobi, Kenya",
                                    device: "Safari / iPhone",
                                    current: false,
                                  },
                                  {
                                    date: "April 17, 2025, 3:30 PM",
                                    ip: "196.200.xx.xx",
                                    location: "Nairobi, Kenya",
                                    device: "Chrome / Windows",
                                    current: false,
                                  },
                                  {
                                    date: "April 24, 2025",
                                    ip: "196.200.xx.xx",
                                    location: "Nairobi, Kenya",
                                    device: "Safari / iPhone",
                                    current: false,
                                  },
                                ].map((login, index) => (
                                  <div
                                    key={index}
                                    className="grid grid-cols-12 gap-4 p-3 border-t items-center text-sm"
                                  >
                                    <div className="col-span-3 flex items-center">
                                      {login.date}
                                      {login.current && (
                                        <Badge variant="secondary" className="ml-2 text-xs">
                                          Current
                                        </Badge>
                                      )}
                                    </div>
                                    <div className="col-span-3">{login.ip}</div>
                                    <div className="col-span-3">{login.location}</div>
                                    <div className="col-span-3 flex items-center">
                                      {login.device.includes("Chrome") ? (
                                        <Laptop className="h-4 w-4 mr-1 text-muted-foreground" />
                                      ) : (
                                        <Smartphone className="h-4 w-4 mr-1 text-muted-foreground" />
                                      )}
                                      {login.device}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="flex items-center space-x-2">
                                <Shield className="h-4 w-4 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                  If you notice any suspicious activity, please change your password immediately.
                                </p>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setLoginHistoryDialogOpen(false)}>
                                Close
                              </Button>
                              <Button variant="destructive" className="gap-1">
                                <LogOut className="h-4 w-4" />
                                Logout All Devices
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <p className="text-sm text-muted-foreground">Monitor recent account activity</p>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 mr-3 text-muted-foreground" />
                          <div className="font-medium">Connected Devices</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Manage
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">2 devices currently connected</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
