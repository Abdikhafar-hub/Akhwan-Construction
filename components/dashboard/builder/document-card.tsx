import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, FileText, Download, Eye } from "lucide-react"

interface DocumentCardProps {
  document: {
    id: string
    title: string
    type: string
    client: {
      name: string
      avatar?: string
    }
    project: string
    uploadDate: string
    status: "pending-review" | "approved" | "rejected" | "draft"
    fileSize: string
    fileType: string
  }
}

export function DocumentCard({ document }: DocumentCardProps) {
  const statusColors = {
    "pending-review": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    draft: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  }

  const statusText = {
    "pending-review": "Pending Review",
    approved: "Approved",
    rejected: "Rejected",
    draft: "Draft",
  }

  const fileTypeIcons = {
    pdf: "📄",
    doc: "📝",
    xls: "📊",
    jpg: "🖼️",
    png: "🖼️",
    dwg: "📐",
  }

  // Get file extension
  const fileExt = document.fileType.toLowerCase()
  const fileIcon = fileTypeIcons[fileExt as keyof typeof fileTypeIcons] || "📁"

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl mr-2">{fileIcon}</span>
            <CardTitle className="text-base font-medium">{document.title}</CardTitle>
          </div>
          <Badge className={statusColors[document.status]}>{statusText[document.status]}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={document.client.avatar || "/placeholder.svg"} alt={document.client.name} />
            <AvatarFallback>{document.client.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-xs">
            <p className="font-medium">{document.client.name}</p>
            <p className="text-muted-foreground">{document.project}</p>
          </div>
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <FileText className="mr-1 h-3 w-3" />
            <span>
              {document.fileType.toUpperCase()} • {document.fileSize}
            </span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="mr-1 h-3 w-3" />
            <span>{document.uploadDate}</span>
          </div>
        </div>

        <Badge variant="outline" className="mr-1">
          {document.type}
        </Badge>
      </CardContent>
      <CardFooter className="flex gap-2 pt-0">
        <Button variant="outline" size="sm" className="w-full">
          <Eye className="mr-1 h-3 w-3" />
          View
        </Button>
        <Button variant="default" size="sm" className="w-full">
          <Download className="mr-1 h-3 w-3" />
          Download
        </Button>
      </CardFooter>
    </Card>
  )
}
