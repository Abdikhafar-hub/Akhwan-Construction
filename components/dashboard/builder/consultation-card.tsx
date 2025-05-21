import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Clock, FileText } from "lucide-react"

interface ConsultationCardProps {
  consultation: {
    id: string
    title: string
    client: {
      name: string
      avatar?: string
    }
    date: string
    time: string
    description: string
    status: "scheduled" | "pending" | "completed" | "cancelled"
    hasDocuments: boolean
  }
}

export function ConsultationCard({ consultation }: ConsultationCardProps) {
  const statusColors = {
    scheduled: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    cancelled: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  }

  const statusText = {
    scheduled: "Scheduled",
    pending: "Pending",
    completed: "Completed",
    cancelled: "Cancelled",
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{consultation.title}</CardTitle>
          <Badge className={statusColors[consultation.status]}>{statusText[consultation.status]}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={consultation.client.avatar || "/placeholder.svg"} alt={consultation.client.name} />
            <AvatarFallback>{consultation.client.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{consultation.client.name}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">{consultation.description}</p>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center text-muted-foreground">
            <CalendarDays className="mr-1 h-3 w-3" />
            <span>{consultation.date}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            <span>{consultation.time}</span>
          </div>
        </div>

        {consultation.hasDocuments && (
          <div className="flex items-center text-xs text-blue-600 dark:text-blue-400">
            <FileText className="mr-1 h-3 w-3" />
            <span>Documents available</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="default" size="sm" className="w-full">
          {consultation.status === "scheduled" ? "Join Meeting" : "View Details"}
        </Button>
      </CardFooter>
    </Card>
  )
}
