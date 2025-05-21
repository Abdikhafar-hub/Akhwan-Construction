"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  CalendarIcon,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Filter,
  Home,
  Plus,
  Settings,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

export default function ContractorDashboard() {
  // State for dialogs
  const [newProjectOpen, setNewProjectOpen] = useState(false)
  const [addTeamMemberOpen, setAddTeamMemberOpen] = useState(false)
  const [viewTeamMemberOpen, setViewTeamMemberOpen] = useState(false)
  const [assignTeamMemberOpen, setAssignTeamMemberOpen] = useState(false)
  const [addMilestoneOpen, setAddMilestoneOpen] = useState(false)
  const [createTeamBidOpen, setCreateTeamBidOpen] = useState(false)
  const [placeBidOpen, setPlaceBidOpen] = useState(false)
  const [processPaymentsOpen, setProcessPaymentsOpen] = useState(false)
  const [requestWithdrawalOpen, setRequestWithdrawalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTeamMember, setSelectedTeamMember] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)

  // Mock data for team members
  const teamMembers = [
    {
      id: 1,
      name: "John Doe",
      role: "Electrician",
      avatar: "/diverse-group.png",
      availability: "Available",
      projects: 3,
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Plumber",
      avatar: "/diverse-woman-portrait.png",
      availability: "On Project",
      projects: 2,
    },
    {
      id: 3,
      name: "Mike Johnson",
      role: "Carpenter",
      avatar: "/thoughtful-man.png",
      availability: "Available",
      projects: 1,
    },
  ]

  // Mock data for projects
  const projects = [
    {
      id: 1,
      name: "Residential Complex",
      client: "ABC Developers",
      status: "In Progress",
      budget: "KSh 2,500,000",
      deadline: "Dec 15, 2023",
    },
    {
      id: 2,
      name: "Office Renovation",
      client: "XYZ Corp",
      status: "Planning",
      budget: "KSh 1,200,000",
      deadline: "Jan 30, 2024",
    },
  ]

  // Mock data for bids
  const bids = [
    {
      id: 1,
      project: "Commercial Building",
      client: "LMN Enterprises",
      amount: "KSh 4,800,000",
      status: "Pending",
      submitted: "Nov 5, 2023",
    },
    {
      id: 2,
      project: "School Renovation",
      client: "Education Board",
      amount: "KSh 3,200,000",
      status: "Under Review",
      submitted: "Nov 10, 2023",
    },
  ]

  // Form submission handlers
  const handleNewProject = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Project Created",
      description: "New project has been successfully created.",
    })
    setNewProjectOpen(false)
  }

  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Team Member Added",
      description: "New team member has been successfully added.",
    })
    setAddTeamMemberOpen(false)
  }

  const handleAssignTeamMember = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Team Member Assigned",
      description: "Team member has been successfully assigned to the project.",
    })
    setAssignTeamMemberOpen(false)
  }

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Milestone Added",
      description: "New milestone has been successfully added to the project.",
    })
    setAddMilestoneOpen(false)
  }

  const handleCreateTeamBid = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Team Bid Created",
      description: "New team bid has been successfully created.",
    })
    setCreateTeamBidOpen(false)
  }

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Bid Placed",
      description: "Your bid has been successfully placed.",
    })
    setPlaceBidOpen(false)
  }

  const handleProcessPayments = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Payments Processed",
      description: "All pending payments have been processed.",
    })
    setProcessPaymentsOpen(false)
  }

  const handleRequestWithdrawal = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Withdrawal Requested",
      description: "Your withdrawal request has been submitted.",
    })
    setRequestWithdrawalOpen(false)
  }

  const viewTeamMember = (member) => {
    setSelectedTeamMember(member)
    setViewTeamMemberOpen(true)
  }

  const assignTeamMember = (member) => {
    setSelectedTeamMember(member)
    setAssignTeamMemberOpen(true)
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Contractor Dashboard</h1>
          <p className="text-muted-foreground">Manage your projects, team, and bids</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Dialog open={newProjectOpen} onOpenChange={setNewProjectOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> New Project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>Enter the details for your new construction project.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleNewProject}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="project-name" className="text-right">
                      Name
                    </Label>
                    <Input id="project-name" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="client" className="text-right">
                      Client
                    </Label>
                    <Input id="client" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="budget" className="text-right">
                      Budget (KSh)
                    </Label>
                    <Input id="budget" type="number" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="deadline" className="text-right">
                      Deadline
                    </Label>
                    <div className="col-span-3">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !selectedDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea id="description" className="col-span-3" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create Project</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Home className="mr-2 h-5 w-5 text-primary" />
              Active Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
            <p className="text-muted-foreground">2 in planning, 3 in progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <Users className="mr-2 h-5 w-5 text-primary" />
              Team Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-muted-foreground">8 available, 4 assigned</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-primary" />
              Revenue (This Month)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">KSh 850,000</div>
            <p className="text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="bids">Bids</TabsTrigger>
          <TabsTrigger value="finances">Finances</TabsTrigger>
        </TabsList>

        <TabsContent value="projects">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Projects</CardTitle>
                <CardDescription>Manage your ongoing construction projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Project Name</th>
                        <th className="text-left py-3 px-4">Client</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Budget</th>
                        <th className="text-left py-3 px-4">Deadline</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project.id} className="border-b">
                          <td className="py-3 px-4">{project.name}</td>
                          <td className="py-3 px-4">{project.client}</td>
                          <td className="py-3 px-4">
                            <Badge variant={project.status === "In Progress" ? "default" : "secondary"}>
                              {project.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">{project.budget}</td>
                          <td className="py-3 px-4">{project.deadline}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Dialog open={addMilestoneOpen} onOpenChange={setAddMilestoneOpen}>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => setSelectedProject(project)}>
                                    Add Milestone
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Add Project Milestone</DialogTitle>
                                    <DialogDescription>
                                      Create a new milestone for tracking project progress.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <form onSubmit={handleAddMilestone}>
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="milestone-name" className="text-right">
                                          Name
                                        </Label>
                                        <Input id="milestone-name" className="col-span-3" required />
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="milestone-date" className="text-right">
                                          Due Date
                                        </Label>
                                        <div className="col-span-3">
                                          <Popover>
                                            <PopoverTrigger asChild>
                                              <Button
                                                variant={"outline"}
                                                className={cn(
                                                  "w-full justify-start text-left font-normal",
                                                  !selectedDate && "text-muted-foreground",
                                                )}
                                              >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                                              </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                              <Calendar
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={setSelectedDate}
                                                initialFocus
                                              />
                                            </PopoverContent>
                                          </Popover>
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="milestone-amount" className="text-right">
                                          Amount (KSh)
                                        </Label>
                                        <Input id="milestone-amount" type="number" className="col-span-3" required />
                                      </div>
                                      <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="milestone-description" className="text-right">
                                          Description
                                        </Label>
                                        <Textarea id="milestone-description" className="col-span-3" required />
                                      </div>
                                    </div>
                                    <DialogFooter>
                                      <Button type="submit">Add Milestone</Button>
                                    </DialogFooter>
                                  </form>
                                </DialogContent>
                              </Dialog>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>Manage your construction team</CardDescription>
                </div>
                <Dialog open={addTeamMemberOpen} onOpenChange={setAddTeamMemberOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Add Team Member
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add Team Member</DialogTitle>
                      <DialogDescription>Add a new member to your construction team.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddTeamMember}>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input id="name" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="role" className="text-right">
                            Role
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="electrician">Electrician</SelectItem>
                              <SelectItem value="plumber">Plumber</SelectItem>
                              <SelectItem value="carpenter">Carpenter</SelectItem>
                              <SelectItem value="mason">Mason</SelectItem>
                              <SelectItem value="painter">Painter</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phone" className="text-right">
                            Phone
                          </Label>
                          <Input id="phone" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input id="email" type="email" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="id-number" className="text-right">
                            ID Number
                          </Label>
                          <Input id="id-number" className="col-span-3" required />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Add Member</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Role</th>
                        <th className="text-left py-3 px-4">Availability</th>
                        <th className="text-left py-3 px-4">Projects</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamMembers.map((member) => (
                        <tr key={member.id} className="border-b">
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              {member.name}
                            </div>
                          </td>
                          <td className="py-3 px-4">{member.role}</td>
                          <td className="py-3 px-4">
                            <Badge variant={member.availability === "Available" ? "outline" : "secondary"}>
                              {member.availability}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">{member.projects}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => viewTeamMember(member)}>
                                View
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => assignTeamMember(member)}>
                                Assign
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* View Team Member Dialog */}
            <Dialog open={viewTeamMemberOpen} onOpenChange={setViewTeamMemberOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Team Member Details</DialogTitle>
                </DialogHeader>
                {selectedTeamMember && (
                  <div className="py-4">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-16 w-16 mr-4">
                        <AvatarImage
                          src={selectedTeamMember.avatar || "/placeholder.svg"}
                          alt={selectedTeamMember.name}
                        />
                        <AvatarFallback>{selectedTeamMember.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-lg font-semibold">{selectedTeamMember.name}</h3>
                        <p className="text-muted-foreground">{selectedTeamMember.role}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Contact Information</p>
                        <p className="text-sm">Phone: +254 712 345 678</p>
                        <p className="text-sm">
                          Email: {selectedTeamMember.name.toLowerCase().replace(" ", ".")}@example.com
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Status</p>
                        <Badge variant={selectedTeamMember.availability === "Available" ? "outline" : "secondary"}>
                          {selectedTeamMember.availability}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium">Skills</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="outline">Construction</Badge>
                        <Badge variant="outline">Renovation</Badge>
                        <Badge variant="outline">Installation</Badge>
                        {selectedTeamMember.role === "Electrician" && (
                          <>
                            <Badge variant="outline">Wiring</Badge>
                            <Badge variant="outline">Troubleshooting</Badge>
                          </>
                        )}
                        {selectedTeamMember.role === "Plumber" && (
                          <>
                            <Badge variant="outline">Piping</Badge>
                            <Badge variant="outline">Fixtures</Badge>
                          </>
                        )}
                        {selectedTeamMember.role === "Carpenter" && (
                          <>
                            <Badge variant="outline">Woodworking</Badge>
                            <Badge variant="outline">Framing</Badge>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium">Current Projects</p>
                      {selectedTeamMember.projects > 0 ? (
                        <div className="mt-1">
                          {selectedTeamMember.availability === "On Project" && (
                            <div className="p-3 border rounded-md mb-2">
                              <div className="flex justify-between">
                                <p className="font-medium">Residential Complex</p>
                                <Badge>In Progress</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">ABC Developers</p>
                            </div>
                          )}
                          {selectedTeamMember.projects > 1 && (
                            <div className="p-3 border rounded-md">
                              <div className="flex justify-between">
                                <p className="font-medium">Office Renovation</p>
                                <Badge variant="outline">Planning</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">XYZ Corp</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground">No active projects</p>
                      )}
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            {/* Assign Team Member Dialog */}
            <Dialog open={assignTeamMemberOpen} onOpenChange={setAssignTeamMemberOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Assign Team Member to Project</DialogTitle>
                  <DialogDescription>
                    {selectedTeamMember && `Assign ${selectedTeamMember.name} to a project`}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAssignTeamMember}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="project" className="text-right">
                        Project
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select project" />
                        </SelectTrigger>
                        <SelectContent>
                          {projects.map((project) => (
                            <SelectItem key={project.id} value={project.id.toString()}>
                              {project.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Role in Project
                      </Label>
                      <Input id="role" className="col-span-3" defaultValue={selectedTeamMember?.role} required />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="start-date" className="text-right">
                        Start Date
                      </Label>
                      <div className="col-span-3">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !selectedDate && "text-muted-foreground",
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDate ? format(selectedDate, "PPP") : "Select a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="notes" className="text-right">
                        Notes
                      </Label>
                      <Textarea id="notes" className="col-span-3" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Assign to Project</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>

        <TabsContent value="bids">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Active Bids</CardTitle>
                  <CardDescription>Track your submitted project bids</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Dialog open={createTeamBidOpen} onOpenChange={setCreateTeamBidOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <Plus className="mr-2 h-4 w-4" /> Create Team Bid
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create Team Bid</DialogTitle>
                        <DialogDescription>Create a bid that includes multiple team members.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleCreateTeamBid}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="project-name" className="text-right">
                              Project Name
                            </Label>
                            <Input id="project-name" className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="client" className="text-right">
                              Client
                            </Label>
                            <Input id="client" className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="team-members" className="text-right">
                              Team Members
                            </Label>
                            <Select>
                              <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select members" />
                              </SelectTrigger>
                              <SelectContent>
                                {teamMembers.map((member) => (
                                  <SelectItem key={member.id} value={member.id.toString()}>
                                    {member.name} ({member.role})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="bid-amount" className="text-right">
                              Bid Amount (KSh)
                            </Label>
                            <Input id="bid-amount" type="number" className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="timeline" className="text-right">
                              Timeline (days)
                            </Label>
                            <Input id="timeline" type="number" className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="proposal" className="text-right">
                              Proposal
                            </Label>
                            <Textarea id="proposal" className="col-span-3" required />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Create Bid</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Dialog open={placeBidOpen} onOpenChange={setPlaceBidOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" /> Place Bid
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Place New Bid</DialogTitle>
                        <DialogDescription>Submit a bid for a new construction project.</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handlePlaceBid}>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="project-name" className="text-right">
                              Project Name
                            </Label>
                            <Input id="project-name" className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="client" className="text-right">
                              Client
                            </Label>
                            <Input id="client" className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="bid-amount" className="text-right">
                              Bid Amount (KSh)
                            </Label>
                            <Input id="bid-amount" type="number" className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="timeline" className="text-right">
                              Timeline (days)
                            </Label>
                            <Input id="timeline" type="number" className="col-span-3" required />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="proposal" className="text-right">
                              Proposal
                            </Label>
                            <Textarea id="proposal" className="col-span-3" required />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Submit Bid</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Project</th>
                        <th className="text-left py-3 px-4">Client</th>
                        <th className="text-left py-3 px-4">Amount</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Submitted</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bids.map((bid) => (
                        <tr key={bid.id} className="border-b">
                          <td className="py-3 px-4">{bid.project}</td>
                          <td className="py-3 px-4">{bid.client}</td>
                          <td className="py-3 px-4">{bid.amount}</td>
                          <td className="py-3 px-4">
                            <Badge variant={bid.status === "Pending" ? "outline" : "secondary"}>{bid.status}</Badge>
                          </td>
                          <td className="py-3 px-4">{bid.submitted}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              <Button variant="outline" size="sm">
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="finances">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
                <CardDescription>Overview of your financial transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Total Earnings</p>
                      <p className="text-2xl font-bold">KSh 3,250,000</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Pending</p>
                      <p className="text-xl font-bold">KSh 850,000</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground">Available</p>
                      <p className="text-xl font-bold">KSh 425,000</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <p className="font-medium mb-2">Recent Transactions</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">Project Payment</p>
                          <p className="text-sm text-muted-foreground">Residential Complex</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">KSh 250,000</p>
                          <p className="text-sm text-muted-foreground">Nov 15, 2023</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">Milestone Payment</p>
                          <p className="text-sm text-muted-foreground">Office Renovation</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">KSh 180,000</p>
                          <p className="text-sm text-muted-foreground">Nov 10, 2023</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog open={processPaymentsOpen} onOpenChange={setProcessPaymentsOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Process All Payments</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Process Pending Payments</DialogTitle>
                      <DialogDescription>Review and process all pending payments.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleProcessPayments}>
                      <div className="py-4">
                        <div className="space-y-4">
                          <div className="border rounded-md p-4">
                            <div className="flex justify-between items-center mb-2">
                              <p className="font-medium">Residential Complex</p>
                              <p className="font-medium">KSh 250,000</p>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">Milestone: Foundation Completion</p>
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-primary mr-2" />
                              <p className="text-sm">Verified by Client</p>
                            </div>
                          </div>
                          <div className="border rounded-md p-4">
                            <div className="flex justify-between items-center mb-2">
                              <p className="font-medium">Office Renovation</p>
                              <p className="font-medium">KSh 180,000</p>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">Milestone: Electrical Work</p>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-amber-500 mr-2" />
                              <p className="text-sm">Pending Verification</p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 p-4 border rounded-md bg-muted/50">
                          <div className="flex justify-between items-center">
                            <p className="font-medium">Total to Process</p>
                            <p className="font-bold">KSh 430,000</p>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Process Payments</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                <Dialog open={requestWithdrawalOpen} onOpenChange={setRequestWithdrawalOpen}>
                  <DialogTrigger asChild>
                    <Button>Request Withdrawal</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Request Withdrawal</DialogTitle>
                      <DialogDescription>Withdraw funds from your available balance.</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleRequestWithdrawal}>
                      <div className="grid gap-4 py-4">
                        <div className="p-4 border rounded-md bg-muted/50">
                          <p className="text-sm text-muted-foreground">Available Balance</p>
                          <p className="text-xl font-bold">KSh 425,000</p>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="amount" className="text-right">
                            Amount (KSh)
                          </Label>
                          <Input id="amount" type="number" className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="payment-method" className="text-right">
                            Payment Method
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mpesa">M-Pesa</SelectItem>
                              <SelectItem value="bank">Bank Transfer</SelectItem>
                              <SelectItem value="paypal">PayPal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="account" className="text-right">
                            Account Details
                          </Label>
                          <Input id="account" className="col-span-3" required />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Request Withdrawal</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Documents & Invoices</CardTitle>
                <CardDescription>Manage your financial documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-3 border rounded-md">
                    <FileText className="h-5 w-5 mr-3 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">Invoice #2023-112</p>
                      <p className="text-sm text-muted-foreground">Residential Complex - Nov 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center p-3 border rounded-md">
                    <FileText className="h-5 w-5 mr-3 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">Invoice #2023-108</p>
                      <p className="text-sm text-muted-foreground">Office Renovation - Oct 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center p-3 border rounded-md">
                    <FileText className="h-5 w-5 mr-3 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">Tax Report</p>
                      <p className="text-sm text-muted-foreground">Q3 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center p-3 border rounded-md">
                    <FileText className="h-5 w-5 mr-3 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">Payment Receipt</p>
                      <p className="text-sm text-muted-foreground">Commercial Building - Sep 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Generate New Invoice
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
