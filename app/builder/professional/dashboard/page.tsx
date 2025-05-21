"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  HardHat,
  Clock,
  Star,
  CheckCircle,
  Calendar,
  MessageSquare,
  Bell,
  FileText,
  Filter,
  MapPin,
  Plus,
  Upload,
  Download,
  Building2,
  UserPlus,
  X,
} from "lucide-react"
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function ProfessionalDashboardPage() {
  const { logout } = useAuth();
  const router = useRouter();

  // State for dialogs
  const [newProjectDialogOpen, setNewProjectDialogOpen] = useState(false)
  const [viewDetailsDialogOpen, setViewDetailsDialogOpen] = useState(false)
  const [respondDialogOpen, setRespondDialogOpen] = useState(false)
  const [scheduleAppointmentDialogOpen, setScheduleAppointmentDialogOpen] = useState(false)
  const [uploadDocDialogOpen, setUploadDocDialogOpen] = useState(false)
  const [viewApprovalDialogOpen, setViewApprovalDialogOpen] = useState(false)
  const [submitRevisionDialogOpen, setSubmitRevisionDialogOpen] = useState(false)
  const [upgradeStorageDialogOpen, setUpgradeStorageDialogOpen] = useState(false)
  const [updateProgressDialogOpen, setUpdateProgressDialogOpen] = useState(false)
  const [viewDocsDialogOpen, setViewDocsDialogOpen] = useState(false)
  const [addTeamMemberDialogOpen, setAddTeamMemberDialogOpen] = useState(false)
  const [viewTeamMemberDialogOpen, setViewTeamMemberDialogOpen] = useState(false)
  const [assignTeamMemberDialogOpen, setAssignTeamMemberDialogOpen] = useState(false)
  const [manageTeamDialogOpen, setManageTeamDialogOpen] = useState(false)

  // State for selected items
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedApproval, setSelectedApproval] = useState(null)
  const [selectedTeamMember, setSelectedTeamMember] = useState(null)
  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [selectedDocument, setSelectedDocument] = useState(null)

  // State for date picker
  const [date, setDate] = useState(null)

  // Handle form submissions
  const handleNewProjectSubmit = (e) => {
    e.preventDefault()
    toast({
      title: "Project created",
      description: "Your new design project has been created successfully.",
    })
    setNewProjectDialogOpen(false)
  }

  const handleRespondSubmit = (e) => {
    e.preventDefault()
    toast({
      title: "Response sent",
      description: "Your response has been sent to the client.",
    })
    setRespondDialogOpen(false)
  }

  const handleScheduleAppointment = (e) => {
    e.preventDefault()
    toast({
      title: "Appointment scheduled",
      description: "Your appointment has been scheduled successfully.",
    })
    setScheduleAppointmentDialogOpen(false)
  }

  const handleUploadDoc = (e) => {
    e.preventDefault()
    toast({
      title: "Document uploaded",
      description: "Your document has been uploaded successfully.",
    })
    setUploadDocDialogOpen(false)
  }

  const handleSubmitRevision = (e) => {
    e.preventDefault()
    toast({
      title: "Revision submitted",
      description: "Your revision has been submitted successfully.",
    })
    setSubmitRevisionDialogOpen(false)
  }

  const handleUpgradeStorage = (e) => {
    e.preventDefault()
    toast({
      title: "Storage upgraded",
      description: "Your storage has been upgraded successfully.",
    })
    setUpgradeStorageDialogOpen(false)
  }

  const handleSendReminder = (approval) => {
    toast({
      title: "Reminder sent",
      description: `A reminder has been sent to ${approval.client}.`,
    })
  }

  const handleUpdateProgress = (e) => {
    e.preventDefault()
    toast({
      title: "Progress updated",
      description: "Project progress has been updated successfully.",
    })
    setUpdateProgressDialogOpen(false)
  }

  const handleAddTeamMember = (e) => {
    e.preventDefault()
    toast({
      title: "Team member added",
      description: "New team member has been added successfully.",
    })
    setAddTeamMemberDialogOpen(false)
  }

  const handleAssignTeamMember = (e) => {
    e.preventDefault()
    toast({
      title: "Team member assigned",
      description: "Team member has been assigned successfully.",
    })
    setAssignTeamMemberDialogOpen(false)
  }

  const handleManageTeam = (e) => {
    e.preventDefault()
    toast({
      title: "Team updated",
      description: "Team assignments have been updated successfully.",
    })
    setManageTeamDialogOpen(false)
  }

  const handleMarkMilestoneComplete = (project, milestoneIndex) => {
    toast({
      title: "Milestone completed",
      description: "Milestone has been marked as complete.",
    })
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
              <p className="text-sm text-muted-foreground">Professional Dashboard</p>
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
              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                <HardHat className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium">James Miller</p>
                <p className="text-xs text-muted-foreground">Architect</p>
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
            <h2 className="text-2xl font-bold mb-1">Welcome, James!</h2>
            <p className="text-muted-foreground">
              Manage your projects, designs, and consultations from your dashboard
            </p>
          </div>
          <Button className="mt-4 md:mt-0" onClick={() => setNewProjectDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Design Project
          </Button>
        </div>

        {/* At-a-Glance Metrics */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                <span>2 Design</span>
                <span>2 Consultation</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Designs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <div className="flex items-center text-xs text-muted-foreground mt-2">
                <span>Completed designs</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KSh 95,000</div>
              <p className="text-xs text-muted-foreground mt-2">Ready for withdrawal</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                4.9 <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 ml-1" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">From 15 reviews</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="consultation" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="consultation">Consultation Requests</TabsTrigger>
            <TabsTrigger value="documents">Document Management</TabsTrigger>
            <TabsTrigger value="projects">Active Projects</TabsTrigger>
            <TabsTrigger value="team">Team Management</TabsTrigger>
          </TabsList>

          {/* 4.1 Consultation Requests */}
          <TabsContent value="consultation">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Design Inquiries</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4 mr-2" /> Filter
                        </Button>
                      </div>
                    </div>
                    <CardDescription>New requests tagged "Needs Design" or "Blueprint Review"</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Residential House Design",
                          client: "John Doe",
                          type: "Needs Design",
                          budget: "120,000 - 150,000",
                          description:
                            "Looking for an architect to design a 4-bedroom residential house with modern aesthetics and energy efficiency in mind.",
                          requirements: ["4 Bedrooms", "Open Plan", "Energy Efficient", "Modern Design"],
                          location: "Karen, Nairobi",
                          posted: "2 hours ago",
                        },
                        {
                          title: "Office Building Blueprint Review",
                          client: "Safaricom",
                          type: "Blueprint Review",
                          budget: "80,000 - 100,000",
                          description:
                            "Need a professional architect to review our office building blueprints for compliance and optimization suggestions.",
                          requirements: ["Structural Review", "Compliance Check", "Optimization Suggestions"],
                          location: "Westlands, Nairobi",
                          posted: "Yesterday",
                        },
                        {
                          title: "Shopping Mall Layout Design",
                          client: "Naivas",
                          type: "Needs Design",
                          budget: "250,000 - 300,000",
                          description:
                            "Seeking architectural services for designing a modern shopping mall layout with optimal customer flow and space utilization.",
                          requirements: ["Commercial Design", "Traffic Flow Optimization", "Modern Aesthetics"],
                          location: "CBD, Nairobi",
                          posted: "2 days ago",
                        },
                      ].map((inquiry, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between mb-2">
                            <h3 className="font-medium">{inquiry.title}</h3>
                            <Badge variant={inquiry.type === "Needs Design" ? "default" : "secondary"}>
                              {inquiry.type}
                            </Badge>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <Building2 className="h-4 w-4 mr-1" />
                            <span>Client: {inquiry.client}</span>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{inquiry.location}</span>
                          </div>
                          <p className="text-sm mb-3">{inquiry.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {inquiry.requirements.map((req, i) => (
                              <Badge key={i} variant="outline">
                                {req}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm font-medium">Budget: KSh {inquiry.budget}</span>
                            <span className="text-xs text-muted-foreground">Posted: {inquiry.posted}</span>
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedInquiry(inquiry)
                                setViewDetailsDialogOpen(true)
                              }}
                            >
                              View Details
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => {
                                setSelectedInquiry(inquiry)
                                setRespondDialogOpen(true)
                              }}
                            >
                              Respond
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
                    <CardTitle>Appointment Scheduler</CardTitle>
                    <CardDescription>Integrated calendar for site visits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">April 2025</h3>
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                            &lt;
                          </Button>
                          <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                            &gt;
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, i) => (
                          <div key={i} className="py-1">
                            {day}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1 text-center text-xs">
                        {Array.from({ length: 35 }).map((_, i) => {
                          const day = i - 1 + 1 // Adjust for May starting on Monday
                          const isCurrentMonth = day > 0 && day <= 31
                          const isToday = day === 15 // Assuming today is May 15
                          const hasEvent = [3, 8, 15, 17, 24, 26].includes(day)
                          const eventCount = hasEvent ? (day % 3 === 0 ? 2 : 1) : 0

                          return (
                            <div
                              key={i}
                              className={`aspect-square flex flex-col items-center justify-center rounded-md ${
                                isCurrentMonth
                                  ? isToday
                                    ? "bg-primary text-primary-foreground"
                                    : hasEvent
                                      ? "bg-muted/70"
                                      : "bg-muted/30"
                                  : "text-muted-foreground bg-transparent"
                              }`}
                            >
                              {isCurrentMonth && (
                                <>
                                  <span>{day}</span>
                                  {eventCount > 0 && (
                                    <div className="flex space-x-0.5 mt-0.5">
                                      {Array.from({ length: eventCount }).map((_, j) => (
                                        <div
                                          key={j}
                                          className={`h-1 w-1 rounded-full ${
                                            isToday ? "bg-primary-foreground" : "bg-primary"
                                          }`}
                                        ></div>
                                      ))}
                                    </div>
                                  )}
                                </>
                              )}
                            </div>
                          )
                        })}
                      </div>

                      <div className="space-y-2 mt-2">
                        <h4 className="text-sm font-medium">Upcoming Appointments</h4>
                        {[
                          {
                            date: "Today, 2:00 PM",
                            title: "Site Visit: Residential House",
                            client: "John Doe",
                            location: "Karen, Nairobi",
                          },
                          {
                            date: "Tomorrow, 10:00 AM",
                            title: "Client Meeting: Office Building",
                            client: "Safaricom",
                            location: "Westlands, Nairobi",
                          },
                          {
                            date: "April 17, 2025, 3:30 PM",
                            title: "Blueprint Review: Shopping Mall",
                            client: "Naivas",
                            location: "CBD, Nairobi",
                          },
                        ].map((appointment, index) => (
                          <div key={index} className="flex items-start space-x-2 p-2 border rounded-md">
                            <div className="bg-primary/10 p-2 rounded-md text-primary">
                              <Calendar className="h-4 w-4" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">{appointment.title}</div>
                              <div className="text-xs text-muted-foreground">{appointment.date}</div>
                              <div className="text-xs text-muted-foreground">
                                {appointment.client} • {appointment.location}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Button className="w-full" onClick={() => setScheduleAppointmentDialogOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Schedule New Appointment
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Consultation Stats</CardTitle>
                    <CardDescription>Your consultation performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="text-sm font-medium">Response Rate</div>
                        <div className="text-sm font-bold">95%</div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="text-sm font-medium">Avg. Response Time</div>
                        <div className="text-sm font-bold">4.2 hours</div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="text-sm font-medium">Conversion Rate</div>
                        <div className="text-sm font-bold">68%</div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="text-sm font-medium">Client Satisfaction</div>
                        <div className="text-sm font-bold flex items-center">
                          4.9 <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 ml-1" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* 4.2 Document Management */}
          <TabsContent value="documents">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Upload & Share</CardTitle>
                      <Button size="sm" onClick={() => setUploadDocDialogOpen(true)}>
                        <Upload className="mr-2 h-4 w-4" /> Upload New Document
                      </Button>
                    </div>
                    <CardDescription>CAD files, specs, permits attached to each job</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm">
                        <div className="col-span-5">Document Name</div>
                        <div className="col-span-3">Project</div>
                        <div className="col-span-2">Uploaded</div>
                        <div className="col-span-2 text-right">Actions</div>
                      </div>

                      {[
                        {
                          name: "Residential_House_Blueprint_v2.dwg",
                          type: "CAD File",
                          project: "Residential House Design",
                          client: "John Doe",
                          uploaded: "April 10, 2025",
                          size: "15.2 MB",
                        },
                        {
                          name: "Office_Building_Structural_Analysis.pdf",
                          type: "PDF Document",
                          project: "Office Building Plans",
                          client: "Safaricom",
                          uploaded: "April 8, 2025",
                          size: "4.7 MB",
                        },
                        {
                          name: "Shopping_Mall_Layout_Final.dwg",
                          type: "CAD File",
                          project: "Shopping Mall Layout",
                          client: "Naivas",
                          uploaded: "April 5, 2025",
                          size: "22.1 MB",
                        },
                        {
                          name: "Apartment_Complex_Permits.pdf",
                          type: "PDF Document",
                          project: "Apartment Complex",
                          client: "KCB Group",
                          uploaded: "April 3, 2025",
                          size: "2.3 MB",
                        },
                        {
                          name: "Residential_House_3D_Render.skp",
                          type: "SketchUp File",
                          project: "Residential House Design",
                          client: "John Doe",
                          uploaded: "April 1, 2025",
                          size: "45.6 MB",
                        },
                      ].map((document, index) => (
                        <div key={index} className="grid grid-cols-12 gap-4 p-4 border-t items-center text-sm">
                          <div className="col-span-5">
                            <div className="font-medium">{document.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {document.type} • {document.size}
                            </div>
                          </div>
                          <div className="col-span-3">
                            <div>{document.project}</div>
                            <div className="text-xs text-muted-foreground">{document.client}</div>
                          </div>
                          <div className="col-span-2">{document.uploaded}</div>
                          <div className="col-span-2 flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: "Downloading document",
                                  description: `Downloading ${document.name}`,
                                })
                              }}
                            >
                              <Download className="h-4 w-4" />
                              <span className="sr-only">Download</span>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: "Sharing document",
                                  description: `Opening share options for ${document.name}`,
                                })
                              }}
                            >
                              <MessageSquare className="h-4 w-4" />
                              <span className="sr-only">Share</span>
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
                    <CardTitle>Client Approvals</CardTitle>
                    <CardDescription>Track when a customer has signed off on drawings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          project: "Residential House Design",
                          client: "John Doe",
                          document: "Blueprint_v2.dwg",
                          status: "Approved",
                          date: "April 12, 2025",
                          comments: "Looks great! Exactly what I was looking for.",
                        },
                        {
                          project: "Office Building Plans",
                          client: "Safaricom",
                          document: "Structural_Analysis.pdf",
                          status: "Pending",
                          date: "April 8, 2025",
                          comments: "Awaiting client review",
                        },
                        {
                          project: "Shopping Mall Layout",
                          client: "Naivas",
                          document: "Layout_Final.dwg",
                          status: "Revision Requested",
                          date: "April 7, 2025",
                          comments: "Please adjust the entrance area for better customer flow.",
                        },
                        {
                          project: "Apartment Complex",
                          client: "KCB Group",
                          document: "Initial_Design.pdf",
                          status: "Pending",
                          date: "April 5, 2025",
                          comments: "Awaiting client review",
                        },
                      ].map((approval, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between mb-2">
                            <h3 className="font-medium">{approval.project}</h3>
                            <Badge
                              variant={
                                approval.status === "Approved"
                                  ? "default"
                                  : approval.status === "Pending"
                                    ? "outline"
                                    : "destructive"
                              }
                            >
                              {approval.status}
                            </Badge>
                          </div>
                          <div className="text-sm mb-2">Client: {approval.client}</div>
                          <div className="text-sm text-muted-foreground mb-2">Document: {approval.document}</div>
                          <div className="text-sm text-muted-foreground mb-2">Date: {approval.date}</div>
                          <div className="text-sm mb-3">
                            <span className="font-medium">Comments:</span> {approval.comments}
                          </div>
                          <div className="flex justify-end">
                            {approval.status === "Revision Requested" ? (
                              <Button
                                size="sm"
                                onClick={() => {
                                  setSelectedApproval(approval)
                                  setSubmitRevisionDialogOpen(true)
                                }}
                              >
                                Submit Revision
                              </Button>
                            ) : approval.status === "Pending" ? (
                              <Button variant="outline" size="sm" onClick={() => handleSendReminder(approval)}>
                                Send Reminder
                              </Button>
                            ) : (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedApproval(approval)
                                  setViewApprovalDialogOpen(true)
                                }}
                              >
                                View Approval
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Document Storage</CardTitle>
                    <CardDescription>Storage usage and limits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Storage Used</span>
                          <span>4.2 GB of 10 GB</span>
                        </div>
                        <Progress value={42} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="text-xs text-muted-foreground">CAD Files</div>
                          <div className="text-sm font-medium">2.8 GB</div>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="text-xs text-muted-foreground">PDF Documents</div>
                          <div className="text-sm font-medium">0.7 GB</div>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="text-xs text-muted-foreground">3D Models</div>
                          <div className="text-sm font-medium">0.5 GB</div>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-lg">
                          <div className="text-xs text-muted-foreground">Other Files</div>
                          <div className="text-sm font-medium">0.2 GB</div>
                        </div>
                      </div>

                      <Button variant="outline" className="w-full" onClick={() => setUpgradeStorageDialogOpen(true)}>
                        Upgrade Storage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Active Projects (Similar to Fundi but with design focus) */}
          <TabsContent value="projects">
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "Residential House Design",
                  client: "John Doe",
                  location: "Karen, Nairobi",
                  amount: "120,000",
                  progress: 80,
                  dueDate: "April 20, 2025",
                  type: "Architectural Design",
                  milestones: [
                    { name: "Initial Consultation", completed: true },
                    { name: "Concept Design", completed: true },
                    { name: "Detailed Drawings", completed: true },
                    { name: "Final Blueprints", completed: false },
                  ],
                },
                {
                  title: "Office Building Plans",
                  client: "Safaricom",
                  location: "Westlands, Nairobi",
                  amount: "350,000",
                  progress: 45,
                  dueDate: "May 15, 2025",
                  type: "Structural Engineering",
                  milestones: [
                    { name: "Site Analysis", completed: true },
                    { name: "Structural Design", completed: true },
                    { name: "MEP Integration", completed: false },
                    { name: "Final Documentation", completed: false },
                  ],
                },
                {
                  title: "Shopping Mall Layout",
                  client: "Naivas",
                  location: "CBD, Nairobi",
                  amount: "280,000",
                  progress: 30,
                  dueDate: "April 5, 2025",
                  type: "Architectural Design",
                  milestones: [
                    { name: "Requirements Gathering", completed: true },
                    { name: "Concept Design", completed: true },
                    { name: "Traffic Flow Analysis", completed: false },
                    { name: "Final Layout Design", completed: false },
                  ],
                },
                {
                  title: "Apartment Complex",
                  client: "KCB Group",
                  location: "Kilimani, Nairobi",
                  amount: "420,000",
                  progress: 15,
                  dueDate: "April 10, 2025",
                  type: "Full Design Package",
                  milestones: [
                    { name: "Initial Consultation", completed: true },
                    { name: "Concept Design", completed: false },
                    { name: "Detailed Drawings", completed: false },
                    { name: "Final Documentation", completed: false },
                  ],
                },
              ].map((project, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription>Client: {project.client}</CardDescription>
                      </div>
                      <Badge variant="secondary">{project.type}</Badge>
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
                        {project.milestones.map((milestone, i) => (
                          <div key={i} className="flex items-center justify-between text-sm">
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
                                onClick={() => handleMarkMilestoneComplete(project, i)}
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
                            setSelectedProject(project)
                            setViewDocsDialogOpen(true)
                          }}
                        >
                          <FileText className="h-4 w-4 mr-2" /> View Documents
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedProject(project)
                            setUpdateProgressDialogOpen(true)
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
          </TabsContent>

          {/* Team Management (Similar to Contractor but focused on design team) */}
          <TabsContent value="team">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Design Team</CardTitle>
                      <Button size="sm" onClick={() => setAddTeamMemberDialogOpen(true)}>
                        <UserPlus className="mr-2 h-4 w-4" /> Add Team Member
                      </Button>
                    </div>
                    <CardDescription>Manage your design and engineering team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm">
                        <div className="col-span-4">Name & Role</div>
                        <div className="col-span-3">Specialization</div>
                        <div className="col-span-3">Current Project</div>
                        <div className="col-span-2 text-right">Actions</div>
                      </div>

                      {[
                        {
                          name: "Sarah Williams",
                          role: "Interior Designer",
                          specialization: "Commercial Spaces",
                          project: "Shopping Mall Layout",
                          avatar: "/diverse-woman-portrait.png",
                        },
                        {
                          name: "Michael Johnson",
                          role: "Structural Engineer",
                          specialization: "High-Rise Buildings",
                          project: "Office Building Plans",
                          avatar: "/thoughtful-man.png",
                        },
                        {
                          name: "Linda Garcia",
                          role: "3D Visualization",
                          specialization: "Photorealistic Renders",
                          project: "Residential House Design",
                          avatar: "/diverse-woman-portrait.png",
                        },
                        {
                          name: "David Brown",
                          role: "CAD Technician",
                          specialization: "Technical Drawings",
                          project: "Apartment Complex",
                          avatar: "/hardworking-construction-worker.png",
                        },
                      ].map((member, index) => (
                        <div key={index} className="grid grid-cols-12 gap-4 p-4 border-t items-center text-sm">
                          <div className="col-span-4">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{member.name}</div>
                                <div className="text-xs text-muted-foreground">{member.role}</div>
                              </div>
                            </div>
                          </div>
                          <div className="col-span-3">{member.specialization}</div>
                          <div className="col-span-3">
                            <Badge variant="outline">{member.project}</Badge>
                          </div>
                          <div className="col-span-2 flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedTeamMember(member)
                                setViewTeamMemberDialogOpen(true)
                              }}
                            >
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedTeamMember(member)
                                setAssignTeamMemberDialogOpen(true)
                              }}
                            >
                              Assign
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Project Assignments</CardTitle>
                    <CardDescription>Manage team workload and project assignments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          project: "Residential House Design",
                          client: "John Doe",
                          team: [
                            { name: "James Miller", role: "Lead Architect" },
                            { name: "Linda Garcia", role: "3D Visualization" },
                          ],
                          deadline: "April 20, 2025",
                          progress: 80,
                        },
                        {
                          project: "Office Building Plans",
                          client: "Safaricom",
                          team: [
                            { name: "James Miller", role: "Lead Architect" },
                            { name: "Michael Johnson", role: "Structural Engineer" },
                          ],
                          deadline: "May 15, 2025",
                          progress: 45,
                        },
                        {
                          project: "Shopping Mall Layout",
                          client: "Naivas",
                          team: [
                            { name: "James Miller", role: "Lead Architect" },
                            { name: "Sarah Williams", role: "Interior Designer" },
                            { name: "David Brown", role: "CAD Technician" },
                          ],
                          deadline: "April 5, 2025",
                          progress: 30,
                        },
                      ].map((assignment, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between mb-2">
                            <h3 className="font-medium">{assignment.project}</h3>
                            <span className="text-sm text-muted-foreground">Client: {assignment.client}</span>
                          </div>
                          <div className="space-y-2 mb-3">
                            <div className="text-sm font-medium">Team Members:</div>
                            <div className="flex flex-wrap gap-2">
                              {assignment.team.map((member, i) => (
                                <div key={i} className="flex items-center space-x-1 text-sm">
                                  <span>{member.name}</span>
                                  <span className="text-muted-foreground">({member.role})</span>
                                  {i < assignment.team.length - 1 && <span className="text-muted-foreground">,</span>}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Deadline: {assignment.deadline}</span>
                          </div>
                          <div className="space-y-1 mb-3">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{assignment.progress}%</span>
                            </div>
                            <Progress value={assignment.progress} className="h-2" />
                          </div>
                          <div className="flex justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedAssignment(assignment)
                                setManageTeamDialogOpen(true)
                              }}
                            >
                              Manage Team
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
                    <CardTitle>Team Performance</CardTitle>
                    <CardDescription>Productivity and efficiency metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Project Completion Rate</span>
                          <span className="font-medium">94%</span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Design Revision Requests</span>
                          <span className="font-medium">12%</span>
                        </div>
                        <Progress value={12} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Client Satisfaction</span>
                          <span className="font-medium">97%</span>
                        </div>
                        <Progress value={97} className="h-2" />
                      </div>

                      <div className="p-3 bg-muted/50 rounded-lg text-sm">
                        <p>
                          <span className="font-medium">Top Performer:</span> Linda Garcia with 8 completed designs this
                          month.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Team Workload</CardTitle>
                    <CardDescription>Current capacity and availability</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          name: "James Miller",
                          role: "Lead Architect",
                          workload: 85,
                          projects: 4,
                          availability: "Limited",
                        },
                        {
                          name: "Sarah Williams",
                          role: "Interior Designer",
                          workload: 60,
                          projects: 1,
                          availability: "Available",
                        },
                        {
                          name: "Michael Johnson",
                          role: "Structural Engineer",
                          workload: 70,
                          projects: 1,
                          availability: "Available",
                        },
                        {
                          name: "Linda Garcia",
                          role: "3D Visualization",
                          workload: 90,
                          projects: 2,
                          availability: "Limited",
                        },
                        {
                          name: "David Brown",
                          role: "CAD Technician",
                          workload: 50,
                          projects: 1,
                          availability: "Available",
                        },
                      ].map((member, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="font-medium text-sm">{member.name}</div>
                            <Badge
                              variant={
                                member.availability === "Available"
                                  ? "default"
                                  : member.availability === "Limited"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {member.availability}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {member.role} • {member.projects} active projects
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Workload</span>
                              <span>{member.workload}%</span>
                            </div>
                            <Progress
                              value={member.workload}
                              className="h-2"
                              indicatorClassName={
                                member.workload > 80
                                  ? "bg-red-500"
                                  : member.workload > 60
                                    ? "bg-amber-500"
                                    : "bg-green-500"
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* New Project Dialog */}
      <Dialog open={newProjectDialogOpen} onOpenChange={setNewProjectDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Design Project</DialogTitle>
            <DialogDescription>Enter the details for your new design project.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNewProjectSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="project-title">Project Title</Label>
                <Input id="project-title" placeholder="Enter project title" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project-type">Project Type</Label>
                <Select defaultValue="architectural">
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="architectural">Architectural Design</SelectItem>
                    <SelectItem value="structural">Structural Engineering</SelectItem>
                    <SelectItem value="interior">Interior Design</SelectItem>
                    <SelectItem value="full">Full Design Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="client">Client</Label>
                <Input id="client" placeholder="Enter client name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter project location" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="budget">Budget (KSh)</Label>
                <Input id="budget" type="number" placeholder="Enter project budget" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea id="description" placeholder="Enter project description" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setNewProjectDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Project</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={viewDetailsDialogOpen} onOpenChange={setViewDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
            <DialogDescription>Detailed information about the inquiry</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedInquiry && (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Title:</div>
                  <div className="col-span-2">{selectedInquiry.title}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Client:</div>
                  <div className="col-span-2">{selectedInquiry.client}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Type:</div>
                  <div className="col-span-2">{selectedInquiry.type}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Budget:</div>
                  <div className="col-span-2">KSh {selectedInquiry.budget}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Location:</div>
                  <div className="col-span-2">{selectedInquiry.location}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Posted:</div>
                  <div className="col-span-2">{selectedInquiry.posted}</div>
                </div>
                <div className="grid gap-2">
                  <div className="font-medium">Description:</div>
                  <div>{selectedInquiry.description}</div>
                </div>
                <div className="grid gap-2">
                  <div className="font-medium">Requirements:</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedInquiry.requirements.map((req, i) => (
                      <Badge key={i} variant="outline">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDetailsDialogOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setViewDetailsDialogOpen(false)
                setRespondDialogOpen(true)
              }}
            >
              Respond
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Respond Dialog */}
      <Dialog open={respondDialogOpen} onOpenChange={setRespondDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Respond to Inquiry</DialogTitle>
            <DialogDescription>Send a response to the client</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRespondSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="response-type">Response Type</Label>
                <Select defaultValue="quote">
                  <SelectTrigger>
                    <SelectValue placeholder="Select response type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quote">Provide Quote</SelectItem>
                    <SelectItem value="meeting">Schedule Meeting</SelectItem>
                    <SelectItem value="info">Request More Information</SelectItem>
                    <SelectItem value="decline">Decline Inquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Enter your response" rows={5} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quote">Quote Amount (KSh)</Label>
                <Input id="quote" type="number" placeholder="Enter quote amount" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setRespondDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Send Response</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Schedule Appointment Dialog */}
      <Dialog open={scheduleAppointmentDialogOpen} onOpenChange={setScheduleAppointmentDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule New Appointment</DialogTitle>
            <DialogDescription>Schedule a meeting or site visit</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleScheduleAppointment}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="appointment-title">Appointment Title</Label>
                <Input id="appointment-title" placeholder="Enter appointment title" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="client">Client</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select client" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Doe</SelectItem>
                    <SelectItem value="safaricom">Safaricom</SelectItem>
                    <SelectItem value="naivas">Naivas</SelectItem>
                    <SelectItem value="kcb">KCB Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9am">9:00 AM</SelectItem>
                    <SelectItem value="10am">10:00 AM</SelectItem>
                    <SelectItem value="11am">11:00 AM</SelectItem>
                    <SelectItem value="12pm">12:00 PM</SelectItem>
                    <SelectItem value="1pm">1:00 PM</SelectItem>
                    <SelectItem value="2pm">2:00 PM</SelectItem>
                    <SelectItem value="3pm">3:00 PM</SelectItem>
                    <SelectItem value="4pm">4:00 PM</SelectItem>
                    <SelectItem value="5pm">5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter appointment location" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Enter any additional notes" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setScheduleAppointmentDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Schedule Appointment</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Upload Document Dialog */}
      <Dialog open={uploadDocDialogOpen} onOpenChange={setUploadDocDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload New Document</DialogTitle>
            <DialogDescription>Upload a document to share with clients or team members</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUploadDoc}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="document-name">Document Name</Label>
                <Input id="document-name" placeholder="Enter document name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="document-type">Document Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cad">CAD File</SelectItem>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="3d">3D Model</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project">Project</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential House Design</SelectItem>
                    <SelectItem value="office">Office Building Plans</SelectItem>
                    <SelectItem value="mall">Shopping Mall Layout</SelectItem>
                    <SelectItem value="apartment">Apartment Complex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="file">File</Label>
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">Drag and drop your file here, or click to browse</p>
                  <Button variant="outline" className="mt-4">
                    Select File
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter document description" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setUploadDocDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Upload Document</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Approval Dialog */}
      <Dialog open={viewApprovalDialogOpen} onOpenChange={setViewApprovalDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Approval Details</DialogTitle>
            <DialogDescription>View approval details and client feedback</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedApproval && (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Project:</div>
                  <div className="col-span-2">{selectedApproval.project}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Client:</div>
                  <div className="col-span-2">{selectedApproval.client}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Document:</div>
                  <div className="col-span-2">{selectedApproval.document}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Status:</div>
                  <div className="col-span-2">
                    <Badge
                      variant={
                        selectedApproval.status === "Approved"
                          ? "default"
                          : selectedApproval.status === "Pending"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {selectedApproval.status}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Date:</div>
                  <div className="col-span-2">{selectedApproval.date}</div>
                </div>
                <div className="grid gap-2">
                  <div className="font-medium">Comments:</div>
                  <div className="p-3 bg-muted/50 rounded-lg">{selectedApproval.comments}</div>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button onClick={() => setViewApprovalDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Submit Revision Dialog */}
      <Dialog open={submitRevisionDialogOpen} onOpenChange={setSubmitRevisionDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Submit Revision</DialogTitle>
            <DialogDescription>Submit a revised document based on client feedback</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitRevision}>
            <div className="grid gap-4 py-4">
              {selectedApproval && (
                <>
                  <div className="grid gap-2">
                    <Label>Project</Label>
                    <div className="p-2 bg-muted/50 rounded-md">{selectedApproval.project}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Client</Label>
                    <div className="p-2 bg-muted/50 rounded-md">{selectedApproval.client}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Original Document</Label>
                    <div className="p-2 bg-muted/50 rounded-md">{selectedApproval.document}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Client Feedback</Label>
                    <div className="p-2 bg-muted/50 rounded-md">{selectedApproval.comments}</div>
                  </div>
                </>
              )}
              <div className="grid gap-2">
                <Label htmlFor="revision-file">Revised File</Label>
                <div className="border-2 border-dashed rounded-md p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Drag and drop your revised file here, or click to browse
                  </p>
                  <Button variant="outline" className="mt-4">
                    Select File
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="revision-notes">Revision Notes</Label>
                <Textarea id="revision-notes" placeholder="Describe the changes made in this revision" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setSubmitRevisionDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Submit Revision</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Upgrade Storage Dialog */}
      <Dialog open={upgradeStorageDialogOpen} onOpenChange={setUpgradeStorageDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upgrade Storage</DialogTitle>
            <DialogDescription>Choose a storage plan that fits your needs</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpgradeStorage}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="border rounded-md p-4 cursor-pointer hover:border-primary">
                  <div className="font-medium mb-2">Basic</div>
                  <div className="text-2xl font-bold mb-2">10 GB</div>
                  <div className="text-sm text-muted-foreground mb-4">KSh 0 / month</div>
                  <div className="text-sm">Current plan</div>
                </div>
                <div className="border rounded-md p-4 cursor-pointer hover:border-primary">
                  <div className="font-medium mb-2">Pro</div>
                  <div className="text-2xl font-bold mb-2">50 GB</div>
                  <div className="text-sm text-muted-foreground mb-4">KSh 1,500 / month</div>
                  <div className="text-sm">Recommended</div>
                </div>
                <div className="border rounded-md p-4 cursor-pointer hover:border-primary">
                  <div className="font-medium mb-2">Business</div>
                  <div className="text-2xl font-bold mb-2">100 GB</div>
                  <div className="text-sm text-muted-foreground mb-4">KSh 2,500 / month</div>
                  <div className="text-sm">For growing teams</div>
                </div>
                <div className="border rounded-md p-4 cursor-pointer hover:border-primary">
                  <div className="font-medium mb-2">Enterprise</div>
                  <div className="text-2xl font-bold mb-2">500 GB</div>
                  <div className="text-sm text-muted-foreground mb-4">KSh 10,000 / month</div>
                  <div className="text-sm">For large organizations</div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="payment-method">Payment Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mpesa">M-Pesa</SelectItem>
                    <SelectItem value="card">Credit/Debit Card</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setUpgradeStorageDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Upgrade Now</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Update Progress Dialog */}
      <Dialog open={updateProgressDialogOpen} onOpenChange={setUpdateProgressDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Update Project Progress</DialogTitle>
            <DialogDescription>Update the progress of your project</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateProgress}>
            <div className="grid gap-4 py-4">
              {selectedProject && (
                <>
                  <div className="grid gap-2">
                    <Label>Project</Label>
                    <div className="p-2 bg-muted/50 rounded-md">{selectedProject.title}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Client</Label>
                    <div className="p-2 bg-muted/50 rounded-md">{selectedProject.client}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Current Progress</Label>
                    <div className="p-2 bg-muted/50 rounded-md">{selectedProject.progress}%</div>
                  </div>
                </>
              )}
              <div className="grid gap-2">
                <Label htmlFor="new-progress">New Progress (%)</Label>
                <Input
                  id="new-progress"
                  type="number"
                  min="0"
                  max="100"
                  defaultValue={selectedProject?.progress || 0}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="progress-notes">Progress Notes</Label>
                <Textarea id="progress-notes" placeholder="Describe the progress made" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setUpdateProgressDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Progress</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Docs Dialog */}
      <Dialog open={viewDocsDialogOpen} onOpenChange={setViewDocsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Project Documents</DialogTitle>
            <DialogDescription>View and manage project documents</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedProject && (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Project:</div>
                  <div className="col-span-2">{selectedProject.title}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Client:</div>
                  <div className="col-span-2">{selectedProject.client}</div>
                </div>
                <div className="border rounded-md">
                  <div className="grid grid-cols-12 gap-4 p-3 bg-muted/50 font-medium text-sm">
                    <div className="col-span-6">Document</div>
                    <div className="col-span-3">Uploaded</div>
                    <div className="col-span-3 text-right">Actions</div>
                  </div>
                  {[
                    {
                      name: `${selectedProject.title.replace(/\s+/g, "_")}_Blueprint.dwg`,
                      type: "CAD File",
                      uploaded: "April 10, 2025",
                      size: "15.2 MB",
                    },
                    {
                      name: `${selectedProject.title.replace(/\s+/g, "_")}_Specs.pdf`,
                      type: "PDF Document",
                      uploaded: "April 8, 2025",
                      size: "4.7 MB",
                    },
                    {
                      name: `${selectedProject.title.replace(/\s+/g, "_")}_3D_Model.skp`,
                      type: "SketchUp File",
                      uploaded: "April 5, 2025",
                      size: "22.1 MB",
                    },
                  ].map((doc, index) => (
                    <div key={index} className="grid grid-cols-12 gap-4 p-3 border-t items-center text-sm">
                      <div className="col-span-6">
                        <div className="font-medium">{doc.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {doc.type} • {doc.size}
                        </div>
                      </div>
                      <div className="col-span-3">{doc.uploaded}</div>
                      <div className="col-span-3 flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Downloading document",
                              description: `Downloading ${doc.name}`,
                            })
                          }}
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDocsDialogOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setViewDocsDialogOpen(false)
                setUploadDocDialogOpen(true)
              }}
            >
              Upload New
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Team Member Dialog */}
      <Dialog open={addTeamMemberDialogOpen} onOpenChange={setAddTeamMemberDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
            <DialogDescription>Add a new member to your design team</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddTeamMember}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="architect">Architect</SelectItem>
                    <SelectItem value="interior">Interior Designer</SelectItem>
                    <SelectItem value="structural">Structural Engineer</SelectItem>
                    <SelectItem value="3d">3D Visualization</SelectItem>
                    <SelectItem value="cad">CAD Technician</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="specialization">Specialization</Label>
                <Input id="specialization" placeholder="Enter specialization" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="project">Assign to Project</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential House Design</SelectItem>
                    <SelectItem value="office">Office Building Plans</SelectItem>
                    <SelectItem value="mall">Shopping Mall Layout</SelectItem>
                    <SelectItem value="apartment">Apartment Complex</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddTeamMemberDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Team Member</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Team Member Dialog */}
      <Dialog open={viewTeamMemberDialogOpen} onOpenChange={setViewTeamMemberDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Team Member Details</DialogTitle>
            <DialogDescription>View team member information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {selectedTeamMember && (
              <>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedTeamMember.avatar || "/placeholder.svg"} alt={selectedTeamMember.name} />
                    <AvatarFallback>{selectedTeamMember.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-medium">{selectedTeamMember.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedTeamMember.role}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Specialization:</div>
                  <div className="col-span-2">{selectedTeamMember.specialization}</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Current Project:</div>
                  <div className="col-span-2">
                    <Badge variant="outline">{selectedTeamMember.project}</Badge>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Email:</div>
                  <div className="col-span-2">team.member@akhwan.com</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Phone:</div>
                  <div className="col-span-2">+254 712 345 678</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium">Joined:</div>
                  <div className="col-span-2">January 15, 2025</div>
                </div>
                <div className="grid gap-2">
                  <div className="font-medium">Skills:</div>
                  <div className="flex flex-wrap gap-2">
                    {["AutoCAD", "Revit", "SketchUp", "3D Max", "Photoshop"].map((skill, i) => (
                      <Badge key={i} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewTeamMemberDialogOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setViewTeamMemberDialogOpen(false)
                setAssignTeamMemberDialogOpen(true)
              }}
            >
              Assign to Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Team Member Dialog */}
      <Dialog open={assignTeamMemberDialogOpen} onOpenChange={setAssignTeamMemberDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assign Team Member</DialogTitle>
            <DialogDescription>Assign team member to a project</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAssignTeamMember}>
            <div className="grid gap-4 py-4">
              {selectedTeamMember && (
                <>
                  <div className="grid gap-2">
                    <Label>Team Member</Label>
                    <div className="p-2 bg-muted/50 rounded-md">{selectedTeamMember.name}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Current Role</Label>
                    <div className="p-2 bg-muted/50 rounded-md">{selectedTeamMember.role}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Current Project</Label>
                    <div className="p-2 bg-muted/50 rounded-md">{selectedTeamMember.project}</div>
                  </div>
                </>
              )}
              <div className="grid gap-2">
                <Label htmlFor="project">Assign to Project</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential House Design</SelectItem>
                    <SelectItem value="office">Office Building Plans</SelectItem>
                    <SelectItem value="mall">Shopping Mall Layout</SelectItem>
                    <SelectItem value="apartment">Apartment Complex</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Project Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead">Lead Designer</SelectItem>
                    <SelectItem value="support">Support Designer</SelectItem>
                    <SelectItem value="technical">Technical Support</SelectItem>
                    <SelectItem value="review">Reviewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Assignment Notes</Label>
                <Textarea id="notes" placeholder="Enter any additional notes" />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAssignTeamMemberDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Assign</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Manage Team Dialog */}
      <Dialog open={manageTeamDialogOpen} onOpenChange={setManageTeamDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Manage Team</DialogTitle>
            <DialogDescription>Manage team assignments for this project</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleManageTeam}>
            <div className="grid gap-4 py-4">
              {selectedAssignment && (
                <>
                  <div className="grid gap-2">
                    <Label>Project</Label>
                    <div className="p-2 bg-muted/50 rounded-md">{selectedAssignment.project}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Client</Label>
                    <div className="p-2 bg-muted/50 rounded-md">{selectedAssignment.client}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Deadline</Label>
                    <div className="p-2 bg-muted/50 rounded-md">{selectedAssignment.deadline}</div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Current Team</Label>
                    <div className="space-y-2">
                      {selectedAssignment.team.map((member, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                          <div>
                            <span className="font-medium">{member.name}</span>
                            <span className="text-sm text-muted-foreground ml-2">({member.role})</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Remove</span>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              <div className="grid gap-2">
                <Label htmlFor="add-member">Add Team Member</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="david">David Brown (Available)</SelectItem>
                    <SelectItem value="michael">Michael Johnson (Available)</SelectItem>
                    <SelectItem value="sarah">Sarah Williams (Available)</SelectItem>
                    <SelectItem value="linda">Linda Garcia (Limited)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead">Lead Designer</SelectItem>
                    <SelectItem value="support">Support Designer</SelectItem>
                    <SelectItem value="technical">Technical Support</SelectItem>
                    <SelectItem value="review">Reviewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="button" variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" /> Add to Team
              </Button>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setManageTeamDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
