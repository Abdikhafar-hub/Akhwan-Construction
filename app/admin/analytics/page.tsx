"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Chart from "chart.js/auto"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPage() {
  const userGrowthChartRef = useRef<HTMLCanvasElement>(null)
  const jobCategoryChartRef = useRef<HTMLCanvasElement>(null)
  const revenueChartRef = useRef<HTMLCanvasElement>(null)
  const regionMapChartRef = useRef<HTMLCanvasElement>(null)

  const userGrowthChartInstance = useRef<Chart | null>(null)
  const jobCategoryChartInstance = useRef<Chart | null>(null)
  const revenueChartInstance = useRef<Chart | null>(null)
  const regionMapChartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    // User Growth Chart
    if (userGrowthChartRef.current) {
      if (userGrowthChartInstance.current) {
        userGrowthChartInstance.current.destroy()
      }

      const ctx = userGrowthChartRef.current.getContext("2d")
      if (!ctx) return

      userGrowthChartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Customers",
              data: [120, 150, 180, 220, 270, 310, 350, 390, 430, 480, 520, 580],
              borderColor: "rgba(34, 197, 94, 1)",
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              tension: 0.3,
              fill: true,
            },
            {
              label: "Builders",
              data: [80, 100, 120, 140, 170, 190, 210, 230, 250, 270, 290, 320],
              borderColor: "rgba(59, 130, 246, 1)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "User Growth 2023",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Number of Users",
              },
            },
            x: {
              title: {
                display: true,
                text: "Month",
              },
            },
          },
        },
      })
    }

    // Job Category Chart
    if (jobCategoryChartRef.current) {
      if (jobCategoryChartInstance.current) {
        jobCategoryChartInstance.current.destroy()
      }

      const ctx = jobCategoryChartRef.current.getContext("2d")
      if (!ctx) return

      jobCategoryChartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Plumbing", "Electrical", "Masonry", "Carpentry", "Painting", "Roofing", "Tiling", "Design"],
          datasets: [
            {
              label: "Jobs Posted",
              data: [120, 150, 180, 90, 110, 70, 85, 65],
              backgroundColor: "rgba(34, 197, 94, 0.8)",
            },
            {
              label: "Jobs Completed",
              data: [100, 130, 160, 75, 95, 60, 70, 55],
              backgroundColor: "rgba(59, 130, 246, 0.8)",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Job Categories",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Number of Jobs",
              },
            },
            x: {
              title: {
                display: true,
                text: "Category",
              },
            },
          },
        },
      })
    }

    // Revenue Chart
    if (revenueChartRef.current) {
      if (revenueChartInstance.current) {
        revenueChartInstance.current.destroy()
      }

      const ctx = revenueChartRef.current.getContext("2d")
      if (!ctx) return

      revenueChartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Platform Revenue (KSh)",
              data: [120000, 150000, 180000, 220000, 270000, 310000, 350000, 390000, 430000, 480000, 520000, 580000],
              borderColor: "rgba(34, 197, 94, 1)",
              backgroundColor: "rgba(34, 197, 94, 0.1)",
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Platform Revenue 2023",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Revenue (KSh)",
              },
            },
            x: {
              title: {
                display: true,
                text: "Month",
              },
            },
          },
        },
      })
    }

    // Region Map Chart (Simplified as a bar chart for now)
    if (regionMapChartRef.current) {
      if (regionMapChartInstance.current) {
        regionMapChartInstance.current.destroy()
      }

      const ctx = regionMapChartRef.current.getContext("2d")
      if (!ctx) return

      regionMapChartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Machakos", "Kitale"],
          datasets: [
            {
              label: "Number of Jobs",
              data: [350, 180, 120, 90, 70, 60, 50, 40],
              backgroundColor: "rgba(34, 197, 94, 0.8)",
            },
            {
              label: "Number of Builders",
              data: [250, 120, 80, 60, 50, 40, 35, 30],
              backgroundColor: "rgba(59, 130, 246, 0.8)",
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Regional Distribution",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Count",
              },
            },
            x: {
              title: {
                display: true,
                text: "Region",
              },
            },
          },
        },
      })
    }

    return () => {
      if (userGrowthChartInstance.current) {
        userGrowthChartInstance.current.destroy()
      }
      if (jobCategoryChartInstance.current) {
        jobCategoryChartInstance.current.destroy()
      }
      if (revenueChartInstance.current) {
        revenueChartInstance.current.destroy()
      }
      if (regionMapChartInstance.current) {
        regionMapChartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Platform insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="2023">
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="nairobi">Nairobi</SelectItem>
              <SelectItem value="mombasa">Mombasa</SelectItem>
              <SelectItem value="kisumu">Kisumu</SelectItem>
              <SelectItem value="nakuru">Nakuru</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  <canvas ref={userGrowthChartRef} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Job Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  <canvas ref={jobCategoryChartRef} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Platform Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  <canvas ref={revenueChartRef} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Regional Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[350px] w-full">
                  <canvas ref={regionMapChartRef} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>User Growth Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <canvas ref={userGrowthChartRef} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Acquisition Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-center justify-center">
                  <p className="text-muted-foreground">Detailed user acquisition data will be available here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-center justify-center">
                  <p className="text-muted-foreground">User retention metrics will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="jobs">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Job Categories Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <canvas ref={jobCategoryChartRef} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-center justify-center">
                  <p className="text-muted-foreground">Job completion metrics will be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Job Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-center justify-center">
                  <p className="text-muted-foreground">Average job value data will be shown here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <canvas ref={revenueChartRef} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-center justify-center">
                  <p className="text-muted-foreground">Payment method breakdown will be displayed here</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Region</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full flex items-center justify-center">
                  <p className="text-muted-foreground">Regional revenue data will be shown here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
