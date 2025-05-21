"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart, ChartContainer, ChartLegend, ChartLegendItem, ChartPie } from "@/components/ui/chart"

export function UserTypeChart() {
  const data = [
    { name: "Customers", value: 1402, color: "#2563eb" },
    { name: "Fundis", value: 845, color: "#16a34a" },
    { name: "Contractors", value: 324, color: "#d97706" },
    { name: "Professionals", value: 187, color: "#8b5cf6" },
    { name: "Hardware", value: 98, color: "#ec4899" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Distribution</CardTitle>
        <CardDescription>Breakdown of user types</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ChartContainer>
            <Chart className="h-60">
              <ChartPie data={data} />
            </Chart>
            <ChartLegend>
              {data.map((item) => (
                <ChartLegendItem key={item.name} color={item.color} label={item.name} value={item.value} />
              ))}
            </ChartLegend>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
