import type * as React from "react"

export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full">{children}</div>
}

export const Chart = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <svg className={className} viewBox="0 0 100 100">
      {children}
    </svg>
  )
}

export const ChartArea = ({ dataKey, color, opacity }: { dataKey: string; color: string; opacity: number }) => {
  return null
}

export const ChartGrid = ({ x, y }: { x?: { show: boolean }; y?: { show: boolean } }) => {
  return null
}

export const ChartLine = ({ dataKey, name, color }: { dataKey: string; name: string; color: string }) => {
  return null
}

export const ChartXAxis = ({ dataKey }: { dataKey: string }) => {
  return null
}

export const ChartYAxis = () => {
  return null
}

export const ChartTooltip = () => {
  return null
}

export const ChartLegend = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center justify-center gap-4">{children}</div>
}

export const ChartLegendItem = ({ color, label, value }: { color: string; label: string; value: number }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="block h-3 w-3 rounded-full" style={{ backgroundColor: color }}></span>
      <span className="text-sm">{label}</span>
      <span className="text-sm text-muted-foreground">({value})</span>
    </div>
  )
}

interface ChartPieProps {
  data: { name: string; value: number; color: string }[]
}

export function ChartPie({ data }: ChartPieProps) {
  return null
}
