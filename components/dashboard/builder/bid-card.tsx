import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, MapPin, Clock, Users } from "lucide-react"

interface BidCardProps {
  job: {
    id: string
    title: string
    description: string
    location: string
    budget: string
    deadline: string
    postedAt: string
    category: string
    applicants: number
  }
}

export function BidCard({ job }: BidCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{job.title}</CardTitle>
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
          >
            {job.budget}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-1 h-3 w-3" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <CalendarDays className="mr-1 h-3 w-3" />
            <span>Due: {job.deadline}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="mr-1 h-3 w-3" />
            <span>Posted: {job.postedAt}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="mr-1 h-3 w-3" />
            <span>{job.applicants} applicants</span>
          </div>
        </div>

        <Badge variant="secondary" className="mr-1">
          {job.category}
        </Badge>
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        <Button variant="default" size="sm" className="w-full">
          Place Bid
        </Button>
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
