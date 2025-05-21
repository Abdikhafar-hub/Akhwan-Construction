import { Badge } from "@/components/ui/badge"

interface ActivityItemProps {
  name: string
  action: string
  timestamp: string
  status: "success" | "warning" | "error" | "info"
}

export function ActivityItem({ name, action, timestamp, status }: ActivityItemProps) {
  return (
    <div className="flex items-center justify-between space-x-4">
      <div className="flex items-center space-x-4">
        <div>
          <p className="text-sm font-medium leading-none">{name}</p>
          <p className="text-sm text-muted-foreground">{action}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-sm text-muted-foreground">{timestamp}</p>
        <Badge
          variant={
            status === "success"
              ? "default"
              : status === "warning"
                ? "secondary"
                : status === "error"
                  ? "destructive"
                  : "outline"
          }
        >
          {status === "success" && "Success"}
          {status === "warning" && "Warning"}
          {status === "error" && "Error"}
          {status === "info" && "Info"}
        </Badge>
      </div>
    </div>
  )
}
