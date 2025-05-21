// Add client directive and state management
"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building2,
  Clock,
  Star,
  Calendar,
  MessageSquare,
  Bell,
  Filter,
  Plus,
  BarChart,
  UserPlus,
  ClipboardList,
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
import { toast } from "@/components/ui/use-toast"

export default function ContractorDashboardPage() {
  // State for managing dialog visibility
  const [openDialogs, setOpenDialogs] = useState({
    newProject: false,
    addTeamMember: false,
    viewTeamMember: false,
    assignTeamMember: false,
    addMilestone: false,
    createTeamBid: false,
    placeBid: false,
    processPayments: false,
    requestWithdrawal: false,
    viewDetails: false,
    messageClient: false,
  })

  // Function to handle opening and closing dialogs
  const toggleDialog = (dialog: string, isOpen: boolean) => {
    setOpenDialogs((prev) => ({ ...prev, [dialog]: isOpen }))
  }

  // Function to handle form submissions
  const handleSubmit = (formType: string) => {
    // In a real app, this would send data to the server
    console.log(`Submitting ${formType} form`)
    toast({
      title: "Success!",
      description: `Your ${formType} has been submitted.`,
    })
    // Close the relevant dialog
    toggleDialog(formType, false)
  }

  // Function to handle notifications
  const handleNotifications = () => {
    toast({
      title: "Notifications",
      description: "You have 3 new notifications.",
    })
  }

  // Function to handle messages
  const handleMessages = () => {
    toast({
      title: "Messages",
      description: "Opening message center.",
    })
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
                <p className="text-sm text-muted-foreground">Contractor Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative" onClick={handleNotifications}>
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleMessages}>
                <MessageSquare className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">Contractor Team</p>
                  <p className="text-xs text-muted-foreground">General Contractor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome, Contractor Team!</h2>
            <p className="text-muted-foreground">Manage your projects, teams, and payments from your dashboard</p>
          </div>

          {/* New Project Dialog */}
          <Dialog open={openDialogs.newProject} onOpenChange={(isOpen) => toggleDialog("newProject", isOpen)}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0">
                <Plus className="mr-2 h-4 w-4" /> New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>Enter the details for your new construction project.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input id="project-name" placeholder="Enter project name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-type">Project Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="renovation">Renovation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-location">Location</Label>
                  <Input id="project-location" placeholder="Enter project location" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-budget">Budget (KES)</Label>
                  <Input id="project-budget" type="number" placeholder="Enter budget amount" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-description">Description</Label>
                  <Textarea id="project-description" placeholder="Describe the project" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="project-timeline">Timeline (days)</Label>
                  <Input id="project-timeline" type="number" placeholder="Estimated days to complete" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => toggleDialog("newProject", false)}>
                  Cancel
                </Button>
                <Button onClick={() => handleSubmit("newProject")}>Create Project</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* At-a-Glance Metrics */}
        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                <span>2 On Schedule</span>
                <span>3 In Progress</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <div className="flex items-center text-xs text-muted-foreground mt-2">
                <span>Across all projects</span>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">KSh 125,500</div>
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
              <p className="text-xs text-muted-foreground mt-2">From 32 reviews</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="team" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="team">Team Management</TabsTrigger>
            <TabsTrigger value="projects">Project Oversight</TabsTrigger>
            <TabsTrigger value="bidding">Bidding Board</TabsTrigger>
            <TabsTrigger value="wallet">Wallet & Payouts</TabsTrigger>
          </TabsList>

          {/* 3.1 Team Management */}
          <TabsContent value="team">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Roster View</CardTitle>

                      {/* Add Team Member Dialog */}
                      <Dialog
                        open={openDialogs.addTeamMember}
                        onOpenChange={(isOpen) => toggleDialog("addTeamMember", isOpen)}
                      >
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <UserPlus className="mr-2 h-4 w-4" /> Add Team Member
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Add Team Member</DialogTitle>
                            <DialogDescription>Add a new member to your construction team.</DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="grid gap-2">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="first-name" placeholder="Enter first name" />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" placeholder="Enter last name" />
                              </div>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="role">Role</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="fundi">Fundi</SelectItem>
                                  <SelectItem value="professional">Professional</SelectItem>
                                  <SelectItem value="foreman">Foreman</SelectItem>
                                  <SelectItem value="laborer">Laborer</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="specialization">Specialization</Label>
                              <Input id="specialization" placeholder="Enter specialization" />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input id="phone" placeholder="Enter phone number" />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" type="email" placeholder="Enter email address" />
                            </div>
                            <div className="grid gap-2">
                              <Label htmlFor="project-assign">Assign to Project</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select project" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="office">Office Renovation</SelectItem>
                                  <SelectItem value="residential">Residential Complex</SelectItem>
                                  <SelectItem value="restaurant">Restaurant Remodeling</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => toggleDialog("addTeamMember", false)}>
                              Cancel
                            </Button>
                            <Button onClick={() => handleSubmit("addTeamMember")}>Add Member</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <CardDescription>List of your subcontracted Fundis & Professionals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm">
                        <div className="col-span-4">Name & Role</div>
                        <div className="col-span-3">Specialization</div>
                        <div className="col-span-2">Current Project</div>
                        <div className="col-span-1 text-center">Rating</div>
                        <div className="col-span-2 text-right">Actions</div>
                      </div>

                      {[
                        {
                          name: "Bob Fundi",
                          role: "Fundi",
                          specialization: "Plumbing",
                          project: "Office Renovation",
                          rating: 4.8,
                          avatar: "/hardworking-construction-worker.png",
                        },
                        {
                          name: "James Miller",
                          role: "Professional",
                          specialization: "Architecture",
                          project: "Residential Complex",
                          rating: 4.9,
                          avatar: "/architect-studio.png",
                        },
                        {
                          name: "Sarah Williams",
                          role: "Fundi",
                          specialization: "Electrical",
                          project: "Office Renovation",
                          rating: 4.7,
                          avatar: "/diverse-woman-portrait.png",
                        },
                        {
                          name: "Michael Johnson",
                          role: "Fundi",
                          specialization: "Carpentry",
                          project: "Restaurant Remodeling",
                          rating: 4.6,
                          avatar: "/thoughtful-man.png",
                        },
                        {
                          name: "Linda Garcia",
                          role: "Professional",
                          specialization: "Interior Design",
                          project: "Residential Complex",
                          rating: 4.9,
                          avatar: "/diverse-woman-portrait.png",
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
                          <div className="col-span-2">
                            <Badge variant="outline">{member.project}</Badge>
                          </div>
                          <div className="col-span-1 text-center flex items-center justify-center">
                            <span className="mr-1">{member.rating}</span>
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                          </div>
                          <div className="col-span-2 flex justify-end space-x-2">
                            {/* View Team Member Dialog */}
                            <Dialog
                              open={openDialogs.viewTeamMember && openDialogs.currentMember === index}
                              onOpenChange={(isOpen) => {
                                setOpenDialogs((prev) => ({
                                  ...prev,
                                  viewTeamMember: isOpen,
                                  currentMember: isOpen ? index : null,
                                }))
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle>Team Member Profile</DialogTitle>
                                  <DialogDescription>View details for {member.name}</DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                  <div className="flex items-center gap-4 mb-4">
                                    <Avatar className="h-16 w-16">
                                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h3 className="text-lg font-medium">{member.name}</h3>
                                      <p className="text-sm text-muted-foreground">
                                        {member.role} • {member.specialization}
                                      </p>
                                      <div className="flex items-center mt-1">
                                        <span className="text-sm font-medium mr-1">{member.rating}</span>
                                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                      </div>
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">Contact Information</h4>
                                      <p className="text-sm">Phone: +254 712 345 678</p>
                                      <p className="text-sm">
                                        Email: {member.name.toLowerCase().replace(" ", ".")}@example.com
                                      </p>
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium mb-1">Current Assignment</h4>
                                      <p className="text-sm">Project: {member.project}</p>
                                      <p className="text-sm">Role: {member.specialization}</p>
                                    </div>
                                  </div>

                                  <div className="mb-4">
                                    <h4 className="text-sm font-medium mb-1">Skills & Experience</h4>
                                    <p className="text-sm">Experience: {Math.floor(Math.random() * 10) + 5} years</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      {[
                                        "Construction",
                                        member.specialization,
                                        "Team Management",
                                        "Safety Protocols",
                                      ].map((skill, i) => (
                                        <Badge key={i} variant="secondary" className="text-xs">
                                          {skill}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="text-sm font-medium mb-1">Performance</h4>
                                    <div className="space-y-2">
                                      <div>
                                        <div className="flex justify-between text-sm">
                                          <span>Task Completion</span>
                                          <span>{85 + Math.floor(Math.random() * 15)}%</span>
                                        </div>
                                        <Progress value={85 + Math.floor(Math.random() * 15)} className="h-2" />
                                      </div>
                                      <div>
                                        <div className="flex justify-between text-sm">
                                          <span>Quality of Work</span>
                                          <span>{90 + Math.floor(Math.random() * 10)}%</span>
                                        </div>
                                        <Progress value={90 + Math.floor(Math.random() * 10)} className="h-2" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => toggleDialog("viewTeamMember", false)}>
                                    Close
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      toggleDialog("viewTeamMember", false)
                                      toggleDialog("messageClient", true)
                                    }}
                                  >
                                    Message
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>

                            {/* Assign Team Member Dialog */}
                            <Dialog
                              open={openDialogs.assignTeamMember && openDialogs.currentMember === index}
                              onOpenChange={(isOpen) => {
                                setOpenDialogs((prev) => ({
                                  ...prev,
                                  assignTeamMember: isOpen,
                                  currentMember: isOpen ? index : null,
                                }))
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  Assign
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Assign Team Member</DialogTitle>
                                  <DialogDescription>Assign {member.name} to a project or task</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="assign-project">Project</Label>
                                    <Select defaultValue={member.project.toLowerCase().replace(" ", "-")}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="office-renovation">Office Renovation</SelectItem>
                                        <SelectItem value="residential-complex">Residential Complex</SelectItem>
                                        <SelectItem value="restaurant-remodeling">Restaurant Remodeling</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="assign-task">Task</Label>
                                    <Select>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select task" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="plumbing">Plumbing Installation</SelectItem>
                                        <SelectItem value="electrical">Electrical Wiring</SelectItem>
                                        <SelectItem value="flooring">Floor Tiling</SelectItem>
                                        <SelectItem value="painting">Wall Painting</SelectItem>
                                        <SelectItem value="carpentry">Carpentry Work</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="assign-start">Start Date</Label>
                                    <Input id="assign-start" type="date" />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="assign-end">End Date</Label>
                                    <Input id="assign-end" type="date" />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="assign-notes">Notes</Label>
                                    <Textarea id="assign-notes" placeholder="Add any specific instructions" />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => toggleDialog("assignTeamMember", false)}>
                                    Cancel
                                  </Button>
                                  <Button onClick={() => handleSubmit("assignTeamMember")}>Assign</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Assign Jobs</CardTitle>
                    <CardDescription>Drag-and-drop job requests to team members</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-3 flex items-center">
                          <ClipboardList className="h-4 w-4 mr-2" /> Unassigned Tasks
                        </h3>
                        <div className="space-y-3">
                          {[
                            {
                              title: "Bathroom Fixtures Installation",
                              project: "Office Renovation",
                              deadline: "May 20, 2023",
                            },
                            {
                              title: "Electrical Wiring",
                              project: "Restaurant Remodeling",
                              deadline: "May 18, 2023",
                            },
                            {
                              title: "Floor Tiling",
                              project: "Residential Complex",
                              deadline: "May 25, 2023",
                            },
                          ].map((task, index) => (
                            <div key={index} className="p-3 bg-muted/50 rounded-md cursor-move">
                              <div className="font-medium text-sm">{task.title}</div>
                              <div className="text-xs text-muted-foreground">Project: {task.project}</div>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>Due: {task.deadline}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-3 flex items-center">
                          <Calendar className="h-4 w-4 mr-2" /> This Week
                        </h3>
                        <div className="space-y-3">
                          {[
                            {
                              title: "Wall Painting",
                              project: "Office Renovation",
                              assignee: "Michael Johnson",
                              deadline: "May 17, 2023",
                            },
                            {
                              title: "Kitchen Cabinets",
                              project: "Restaurant Remodeling",
                              assignee: "Sarah Williams",
                              deadline: "May 19, 2023",
                            },
                          ].map((task, index) => (
                            <div key={index} className="p-3 bg-muted/50 rounded-md cursor-move">
                              <div className="font-medium text-sm">{task.title}</div>
                              <div className="text-xs text-muted-foreground">Project: {task.project}</div>
                              <div className="text-xs text-muted-foreground">Assigned to: {task.assignee}</div>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>Due: {task.deadline}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h3 className="font-medium mb-3 flex items-center">
                          <Calendar className="h-4 w-4 mr-2" /> Next Week
                        </h3>
                        <div className="space-y-3">
                          {[
                            {
                              title: "Roof Installation",
                              project: "Residential Complex",
                              assignee: "Bob Fundi",
                              deadline: "May 24, 2023",
                            },
                            {
                              title: "Interior Design Finalization",
                              project: "Office Renovation",
                              assignee: "Linda Garcia",
                              deadline: "May 26, 2023",
                            },
                          ].map((task, index) => (
                            <div key={index} className="p-3 bg-muted/50 rounded-md cursor-move">
                              <div className="font-medium text-sm">{task.title}</div>
                              <div className="text-xs text-muted-foreground">Project: {task.project}</div>
                              <div className="text-xs text-muted-foreground">Assigned to: {task.assignee}</div>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>Due: {task.deadline}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Team Calendar</CardTitle>
                    <CardDescription>Shared schedule with assignments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">May 2023</h3>
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
                        <h4 className="text-sm font-medium">Today's Schedule</h4>
                        {[
                          {
                            time: "9:00 AM",
                            title: "Team Meeting",
                            members: ["All Team Members"],
                          },
                          {
                            time: "11:00 AM",
                            title: "Site Visit: Office Renovation",
                            members: ["Bob Fundi", "Sarah Williams"],
                          },
                          {
                            time: "2:00 PM",
                            title: "Client Meeting: Residential Complex",
                            members: ["James Miller", "Linda Garcia"],
                          },
                        ].map((event, index) => (
                          <div key={index} className="flex items-start space-x-2 p-2 border rounded-md">
                            <div className="text-xs font-medium min-w-[60px]">{event.time}</div>
                            <div className="flex-1">
                              <div className="text-sm font-medium">{event.title}</div>
                              <div className="text-xs text-muted-foreground">{event.members.join(", ")}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Team Performance</CardTitle>
                    <CardDescription>Productivity and efficiency metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Project Completion Rate</span>
                          <span className="font-medium">92%</span>
                        </div>
                        <Progress value={92} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Task Completion On Time</span>
                          <span className="font-medium">87%</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Client Satisfaction</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>

                      <div className="p-3 bg-muted/50 rounded-lg text-sm">
                        <p>
                          <span className="font-medium">Top Performer:</span> James Miller with 15 completed tasks this
                          month.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* 3.2 Project Oversight */}
          <TabsContent value="projects">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Gantt-style Timeline</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Filter Applied",
                              description: "Timeline filtered by current projects.",
                            })
                          }}
                        >
                          <Filter className="h-4 w-4 mr-2" /> Filter
                        </Button>

                        {/* Add Milestone Dialog */}
                        <Dialog
                          open={openDialogs.addMilestone}
                          onOpenChange={(isOpen) => toggleDialog("addMilestone", isOpen)}
                        >
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <Plus className="h-4 w-4 mr-2" /> Add Milestone
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Add Project Milestone</DialogTitle>
                              <DialogDescription>
                                Create a new milestone for your construction project.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="milestone-project">Project</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select project" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="office">Office Renovation</SelectItem>
                                    <SelectItem value="residential">Residential Complex</SelectItem>
                                    <SelectItem value="restaurant">Restaurant Remodeling</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="milestone-name">Milestone Name</Label>
                                <Input id="milestone-name" placeholder="Enter milestone name" />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="milestone-owner">Owner</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select owner" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="bob">Bob Fundi</SelectItem>
                                    <SelectItem value="james">James Miller</SelectItem>
                                    <SelectItem value="sarah">Sarah Williams</SelectItem>
                                    <SelectItem value="michael">Michael Johnson</SelectItem>
                                    <SelectItem value="linda">Linda Garcia</SelectItem>
                                    <SelectItem value="team">Contractor Team</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="milestone-start">Start Date</Label>
                                  <Input id="milestone-start" type="date" />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="milestone-end">End Date</Label>
                                  <Input id="milestone-end" type="date" />
                                </div>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="milestone-description">Description</Label>
                                <Textarea id="milestone-description" placeholder="Describe this milestone" />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="milestone-status">Status</Label>
                                <Select defaultValue="not-started">
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="not-started">Not Started</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => toggleDialog("addMilestone", false)}>
                                Cancel
                              </Button>
                              <Button onClick={() => handleSubmit("addMilestone")}>Add Milestone</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    <CardDescription>Visual of multi-milestone projects and who owns each</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-x-auto">
                      <div className="min-w-[800px]">
                        <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-medium text-sm">
                          <div className="col-span-3">Project / Milestone</div>
                          <div className="col-span-2">Owner</div>
                          <div className="col-span-1">Status</div>
                          <div className="col-span-6">Timeline (May 2023)</div>
                        </div>

                        {[
                          {
                            project: "Office Renovation",
                            milestones: [
                              {
                                name: "Demolition",
                                owner: "Bob Fundi",
                                status: "Completed",
                                startDay: 1,
                                endDay: 5,
                              },
                              {
                                name: "Plumbing",
                                owner: "Bob Fundi",
                                status: "In Progress",
                                startDay: 6,
                                endDay: 12,
                              },
                              {
                                name: "Electrical",
                                owner: "Sarah Williams",
                                status: "In Progress",
                                startDay: 8,
                                endDay: 14,
                              },
                              {
                                name: "Painting",
                                owner: "Michael Johnson",
                                status: "Not Started",
                                startDay: 15,
                                endDay: 20,
                              },
                              {
                                name: "Finishing",
                                owner: "Linda Garcia",
                                status: "Not Started",
                                startDay: 21,
                                endDay: 28,
                              },
                            ],
                          },
                          {
                            project: "Residential Complex",
                            milestones: [
                              {
                                name: "Foundation",
                                owner: "Contractor Team",
                                status: "Completed",
                                startDay: 1,
                                endDay: 10,
                              },
                              {
                                name: "Framing",
                                owner: "Contractor Team",
                                status: "In Progress",
                                startDay: 11,
                                endDay: 20,
                              },
                              {
                                name: "Roofing",
                                owner: "Bob Fundi",
                                status: "Not Started",
                                startDay: 21,
                                endDay: 28,
                              },
                            ],
                          },
                          {
                            project: "Restaurant Remodeling",
                            milestones: [
                              {
                                name: "Design",
                                owner: "James Miller",
                                status: "Completed",
                                startDay: 1,
                                endDay: 7,
                              },
                              {
                                name: "Kitchen Renovation",
                                owner: "Contractor Team",
                                status: "In Progress",
                                startDay: 8,
                                endDay: 18,
                              },
                              {
                                name: "Dining Area",
                                owner: "Linda Garcia",
                                status: "Not Started",
                                startDay: 19,
                                endDay: 28,
                              },
                            ],
                          },
                        ].map((project, projectIndex) => (
                          <div key={projectIndex}>
                            <div className="grid grid-cols-12 gap-4 p-4 border-t bg-muted/20 items-center text-sm font-medium">
                              <div className="col-span-3">{project.project}</div>
                              <div className="col-span-9"></div>
                            </div>
                            {project.milestones.map((milestone, milestoneIndex) => (
                              <div
                                key={milestoneIndex}
                                className="grid grid-cols-12 gap-4 p-4 border-t items-center text-sm"
                              >
                                <div className="col-span-3 pl-4">— {milestone.name}</div>
                                <div className="col-span-2">{milestone.owner}</div>
                                <div className="col-span-1">
                                  <Badge
                                    variant={
                                      milestone.status === "Completed"
                                        ? "default"
                                        : milestone.status === "In Progress"
                                          ? "secondary"
                                          : "outline"
                                    }
                                  >
                                    {milestone.status}
                                  </Badge>
                                </div>
                                <div className="col-span-6 relative h-6">
                                  <div className="absolute inset-0 flex items-center">
                                    <div className="w-full bg-muted h-2 rounded-full"></div>
                                  </div>
                                  <div
                                    className={`absolute h-4 rounded-full ${
                                      milestone.status === "Completed"
                                        ? "bg-green-500"
                                        : milestone.status === "In Progress"
                                          ? "bg-blue-500"
                                          : "bg-gray-300"
                                    }`}
                                    style={{
                                      left: `${(milestone.startDay / 31) * 100}%`,
                                      width: `${((milestone.endDay - milestone.startDay + 1) / 31) * 100}%`,
                                      top: "4px",
                                    }}
                                  ></div>
                                </div>
                              </div>
                            ))}
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
                    <CardTitle>Budget Tracker</CardTitle>
                    <CardDescription>Estimated vs. actual spend per project</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        {
                          project: "Office Renovation",
                          estimated: 1245000,
                          actual: 1180000,
                          remaining: 65000,
                          progress: 75,
                        },
                        {
                          project: "Residential Complex",
                          estimated: 3780500,
                          actual: 1550000,
                          remaining: 2230500,
                          progress: 40,
                        },
                        {
                          project: "Restaurant Remodeling",
                          estimated: 950000,
                          actual: 210000,
                          remaining: 740000,
                          progress: 20,
                        },
                      ].map((budget, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{budget.project}</h3>
                            <Badge variant="outline">{budget.progress}% Complete</Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="p-2 bg-muted/50 rounded-md">
                              <div className="text-muted-foreground">Estimated</div>
                              <div className="font-medium">KSh {budget.estimated.toLocaleString()}</div>
                            </div>
                            <div className="p-2 bg-muted/50 rounded-md">
                              <div className="text-muted-foreground">Actual Spend</div>
                              <div className="font-medium">KSh {budget.actual.toLocaleString()}</div>
                            </div>
                          </div>

                          <div className="p-2 bg-muted/50 rounded-md text-sm">
                            <div className="text-muted-foreground">Remaining Budget</div>
                            <div className="font-medium">KSh {budget.remaining.toLocaleString()}</div>
                          </div>

                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Budget Utilization</span>
                              <span>{Math.round((budget.actual / budget.estimated) * 100)}%</span>
                            </div>
                            <Progress
                              value={Math.round((budget.actual / budget.estimated) * 100)}
                              className="h-2"
                              indicatorClassName={budget.actual > budget.estimated ? "bg-red-500" : "bg-green-500"}
                            />
                          </div>

                          <div className="flex justify-end">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: "Budget Details",
                                  description: `Viewing detailed budget for ${budget.project}.`,
                                })
                              }}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Project Analytics</CardTitle>
                    <CardDescription>Key performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-md text-primary mr-3">
                            <BarChart className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Average Project Duration</div>
                            <div className="text-xs text-muted-foreground">Based on last 5 projects</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold">45 days</div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-md text-primary mr-3">
                            <BarChart className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Budget Accuracy</div>
                            <div className="text-xs text-muted-foreground">Estimated vs. Actual</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold">92%</div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-md text-primary mr-3">
                            <BarChart className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Client Satisfaction</div>
                            <div className="text-xs text-muted-foreground">Post-project surveys</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold">4.8/5</div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          toast({
                            title: "Analytics Dashboard",
                            description: "Opening detailed analytics dashboard.",
                          })
                        }}
                      >
                        View Detailed Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Bidding Board (Same as Fundi but with team assignment) */}
          <TabsContent value="bidding">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>New Job Feed</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Jobs Filtered",
                              description: "Showing jobs matching your team's skills.",
                            })
                          }}
                        >
                          <Filter className="h-4 w-4 mr-2" /> Filter
                        </Button>
                      </div>
                    </div>
                    <CardDescription>Jobs matching your team's skills and service area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Office Building Renovation",
                          location: "Westlands, Nairobi",
                          budget: "1,200,000 - 1,500,000",
                          posted: "2 hours ago",
                          deadline: "Project starts in 2 weeks",
                          description:
                            "Complete renovation of a 3-floor office building including electrical, plumbing, and interior design work.",
                          skills: ["General Contracting", "Electrical", "Plumbing", "Interior Design"],
                        },
                        {
                          title: "Residential Complex Construction",
                          location: "Kilimani, Nairobi",
                          budget: "3,500,000 - 4,000,000",
                          posted: "Yesterday",
                          deadline: "Project starts next month",
                          description:
                            "Construction of a 20-unit residential complex with modern amenities and landscaping.",
                          skills: ["Construction", "Architecture", "Plumbing", "Electrical"],
                        },
                        {
                          title: "Restaurant Remodeling",
                          location: "CBD, Nairobi",
                          budget: "800,000 - 1,000,000",
                          posted: "2 days ago",
                          deadline: "Urgent",
                          description:
                            "Urgent remodeling of a restaurant in the CBD area, including kitchen and dining area upgrades.",
                          skills: ["Remodeling", "Kitchen Design", "Interior Design"],
                        },
                      ].map((job, index) => (
                        <div key={index} className="p-4 border rounded-md">
                          <div className="font-medium text-lg">{job.title}</div>
                          <div className="text-sm text-muted-foreground">{job.location}</div>
                          <div className="mt-2 space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Budget</span>
                              <span>KSh {job.budget}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Posted</span>
                              <div className="posted">2 days ago</div>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Deadline</span>
                              <div className="deadline">Urgent</div>
                            </div>
                          </div>
                          <div className="mt-3 text-sm">{job.description}</div>
                          <div className="mt-3">
                            {job.skills.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="secondary" className="mr-1 text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <div className="mt-4 flex justify-end">
                            {/* Create Team Bid Dialog */}
                            <Dialog
                              open={openDialogs.createTeamBid}
                              onOpenChange={(isOpen) => toggleDialog("createTeamBid", isOpen)}
                            >
                              <DialogTrigger asChild>
                                <Button>Create Team Bid</Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>Create Team Bid</DialogTitle>
                                  <DialogDescription>
                                    Enter the details for your team's bid on this project.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="bid-amount">Bid Amount (KES)</Label>
                                    <Input id="bid-amount" type="number" placeholder="Enter bid amount" />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="bid-timeline">Timeline (days)</Label>
                                    <Input id="bid-timeline" type="number" placeholder="Estimated days to complete" />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="bid-description">Description</Label>
                                    <Textarea id="bid-description" placeholder="Describe your team's approach" />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="bid-team">Assign Team</Label>
                                    <Select>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select team members" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="bob">Bob Fundi</SelectItem>
                                        <SelectItem value="james">James Miller</SelectItem>
                                        <SelectItem value="sarah">Sarah Williams</SelectItem>
                                        <SelectItem value="michael">Michael Johnson</SelectItem>
                                        <SelectItem value="linda">Linda Garcia</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => toggleDialog("createTeamBid", false)}>
                                    Cancel
                                  </Button>
                                  <Button onClick={() => handleSubmit("createTeamBid")}>Submit Bid</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
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
                    <CardTitle>Bidding Stats</CardTitle>
                    <CardDescription>Your bidding success rate</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-md text-primary mr-3">
                            <BarChart className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Bids Submitted</div>
                            <div className="text-xs text-muted-foreground">This month</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold">12</div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-md text-primary mr-3">
                            <BarChart className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Bids Won</div>
                            <div className="text-xs text-muted-foreground">This month</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold">3</div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-md text-primary mr-3">
                            <BarChart className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Success Rate</div>
                            <div className="text-xs text-muted-foreground">Bids won / bids submitted</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold">25%</div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          toast({
                            title: "Bidding Analytics",
                            description: "Opening detailed bidding analytics dashboard.",
                          })
                        }}
                      >
                        View Detailed Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Upcoming Bidding Deadlines</CardTitle>
                    <CardDescription>Don't miss out on these opportunities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          title: "Apartment Complex Construction",
                          location: "Lavington, Nairobi",
                          deadline: "May 10, 2023",
                        },
                        {
                          title: "School Building Renovation",
                          location: "Karen, Nairobi",
                          deadline: "May 15, 2023",
                        },
                        {
                          title: "Hospital Expansion Project",
                          location: "Upper Hill, Nairobi",
                          deadline: "May 20, 2023",
                        },
                      ].map((deadline, index) => (
                        <div key={index} className="p-3 border rounded-md">
                          <div className="font-medium text-sm">{deadline.title}</div>
                          <div className="text-xs text-muted-foreground">{deadline.location}</div>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Deadline: {deadline.deadline}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Wallet & Payouts */}
          <TabsContent value="wallet">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Balance Overview</CardTitle>
                    <CardDescription>Available funds and recent transactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Available Balance</h3>
                        <div className="text-2xl font-bold">KSh 125,500</div>
                      </div>

                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Pending Payments</h3>
                        <div className="text-2xl font-bold">KSh 32,000</div>
                      </div>

                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Total Earnings</h3>
                        <div className="text-2xl font-bold">KSh 1,250,000</div>
                      </div>

                      <div className="flex justify-end">
                        {/* Request Withdrawal Dialog */}
                        <Dialog
                          open={openDialogs.requestWithdrawal}
                          onOpenChange={(isOpen) => toggleDialog("requestWithdrawal", isOpen)}
                        >
                          <DialogTrigger asChild>
                            <Button>Request Withdrawal</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Request Withdrawal</DialogTitle>
                              <DialogDescription>
                                Enter the amount you wish to withdraw from your available balance.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="withdrawal-amount">Withdrawal Amount (KES)</Label>
                                <Input id="withdrawal-amount" type="number" placeholder="Enter amount" />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="withdrawal-method">Withdrawal Method</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select method" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="mpesa">M-Pesa</SelectItem>
                                    <SelectItem value="bank">Bank Transfer</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="withdrawal-notes">Notes</Label>
                                <Textarea id="withdrawal-notes" placeholder="Add any specific instructions" />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => toggleDialog("requestWithdrawal", false)}>
                                Cancel
                              </Button>
                              <Button onClick={() => handleSubmit("requestWithdrawal")}>Submit Request</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>Past payments and withdrawals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          type: "Payment",
                          project: "Office Renovation",
                          amount: 62500,
                          date: "May 5, 2023",
                          status: "Completed",
                        },
                        {
                          type: "Withdrawal",
                          amount: 50000,
                          date: "May 8, 2023",
                          status: "Completed",
                        },
                        {
                          type: "Payment",
                          project: "Residential Complex",
                          amount: 75000,
                          date: "May 12, 2023",
                          status: "Pending",
                        },
                      ].map((transaction, index) => (
                        <div key={index} className="p-3 border rounded-md">
                          <div className="flex justify-between items-center">
                            <div className="font-medium text-sm">{transaction.type}</div>
                            <div className="text-sm">KSh {transaction.amount}</div>
                          </div>
                          <div className="text-xs text-muted-foreground">Project: {transaction.project}</div>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>Date: {transaction.date}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">Status: {transaction.status}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Processing</CardTitle>
                    <CardDescription>Manage client payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-md text-primary mr-3">
                            <BarChart className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Outstanding Invoices</div>
                            <div className="text-xs text-muted-foreground">Awaiting client payment</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold">KSh 85,000</div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-md text-primary mr-3">
                            <BarChart className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Payments Received</div>
                            <div className="text-xs text-muted-foreground">This month</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold">KSh 210,000</div>
                      </div>

                      <div className="flex justify-end">
                        {/* Process Payments Dialog */}
                        <Dialog
                          open={openDialogs.processPayments}
                          onOpenChange={(isOpen) => toggleDialog("processPayments", isOpen)}
                        >
                          <DialogTrigger asChild>
                            <Button>Process Payments</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Process Client Payments</DialogTitle>
                              <DialogDescription>Review and process outstanding client payments.</DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="payment-project">Project</Label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select project" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="office">Office Renovation</SelectItem>
                                    <SelectItem value="residential">Residential Complex</SelectItem>
                                    <SelectItem value="restaurant">Restaurant Remodeling</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="payment-amount">Payment Amount (KES)</Label>
                                <Input id="payment-amount" type="number" placeholder="Enter amount" />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="payment-date">Payment Date</Label>
                                <Input id="payment-date" type="date" />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="payment-notes">Notes</Label>
                                <Textarea id="payment-notes" placeholder="Add any specific instructions" />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => toggleDialog("processPayments", false)}>
                                Cancel
                              </Button>
                              <Button onClick={() => handleSubmit("processPayments")}>Process Payment</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Financial Analytics</CardTitle>
                    <CardDescription>Income and expense trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-md text-primary mr-3">
                            <BarChart className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Monthly Income</div>
                            <div className="text-xs text-muted-foreground">From completed projects</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold">KSh 450,000</div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-md text-primary mr-3">
                            <BarChart className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Monthly Expenses</div>
                            <div className="text-xs text-muted-foreground">Team salaries and materials</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold">KSh 320,000</div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center">
                          <div className="bg-primary/10 p-2 rounded-md text-primary mr-3">
                            <BarChart className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">Profit Margin</div>
                            <div className="text-xs text-muted-foreground">Income vs. Expenses</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold">29%</div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          toast({
                            title: "Financial Dashboard",
                            description: "Opening detailed financial dashboard.",
                          })
                        }}
                      >
                        View Detailed Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
