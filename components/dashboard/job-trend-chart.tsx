"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Chart,
  ChartArea,
  ChartContainer,
  ChartGrid,
  ChartLine,
  ChartTooltip,
  ChartXAxis,
  ChartYAxis,
} from "@/components/ui/chart"

export function JobTrendChart() {
  const data = [
    { month: "Jan", jobs: 65, completed: 52 },
    { month: "Feb", jobs: 78, completed: 63 },
    { month: "Mar", jobs: 92, completed: 75 },
    { month: "Apr", jobs: 105, completed: 89 },
    { month: "May", jobs: 124, completed: 97 },
  ]

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Job Trends</CardTitle>
        <CardDescription>Posted vs. completed jobs over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer>
            <Chart>
              <ChartGrid x={{ show: false }} />
              <ChartXAxis dataKey="month" />
              <ChartYAxis />
              <ChartLine dataKey="jobs" name="Posted Jobs" color="#2563eb" />
              <ChartLine dataKey="completed" name="Completed Jobs" color="#16a34a" />
              <ChartArea dataKey="completed" color="#16a34a" opacity={0.1} />
              <ChartTooltip />
            </Chart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
