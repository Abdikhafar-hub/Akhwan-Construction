import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, MapPin } from "lucide-react"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    customer: {
      name: string
      avatar?: string
    }
    location: string
    progress: number
    deadline: string
    status: "in-progress" | "pending" | "completed" | "on-hold"
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusColors = {
    "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    completed: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "on-hold": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  const statusText = {
    "in-progress": "In Progress",
    pending: "Pending",
    completed: "Completed",
    "on-hold": "On Hold",
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{project.title}</CardTitle>
          <Badge className={statusColors[project.status]}>{statusText[project.status]}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={project.customer.avatar || "/placeholder.svg"} alt={project.customer.name} />
            <AvatarFallback>{project.customer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{project.customer.name}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="mr-1 h-3 w-3" />
              {project.location}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Progress</span>
            <span>{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        <div className="flex items-center text-xs text-muted-foreground">
          <CalendarDays className="mr-1 h-3 w-3" />
          <span>Deadline: {project.deadline}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
