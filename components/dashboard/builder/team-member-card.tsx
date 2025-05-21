import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface TeamMemberCardProps {
  member: {
    id: string
    name: string
    role: string
    avatar?: string
    phone: string
    email: string
    status: "available" | "on-job" | "off-duty"
    skills: string[]
  }
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const statusColors = {
    available: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "on-job": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "off-duty": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  }

  const statusText = {
    available: "Available",
    "on-job": "On Job",
    "off-duty": "Off Duty",
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Assign to Job</DropdownMenuItem>
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Edit Details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Badge className={`mt-3 ${statusColors[member.status]}`}>{statusText[member.status]}</Badge>

        <div className="mt-3 space-y-1">
          <div className="flex items-center text-xs">
            <Phone className="mr-2 h-3 w-3 text-muted-foreground" />
            <span>{member.phone}</span>
          </div>
          <div className="flex items-center text-xs">
            <Mail className="mr-2 h-3 w-3 text-muted-foreground" />
            <span>{member.email}</span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1">
          {member.skills.map((skill, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        <div className="mt-4 flex space-x-2">
          <Button size="sm" variant="outline" className="w-full">
            Message
          </Button>
          <Button size="sm" variant="default" className="w-full">
            Assign
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
