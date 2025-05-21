export type UserRole = "customer" | "fundi" | "contractor" | "professional" | "hardware" | "admin"

export interface Transaction {
  id: number
  description: string
  amount: string
  type: "credit" | "debit"
  status: "Completed" | "Pending" | "Failed"
  date: string
}

export interface EscrowJob {
  id: number
  title: string
  builder: string
  amount: string
  status: "In Progress" | "Completed" | "Disputed"
  releaseDate: string
  completionDate: string | null
}

export interface PendingPayout {
  id: number
  title: string
  customer: string
  amount: string
  status: "Awaiting Release" | "Auto-Release Scheduled" | "Disputed"
  releaseDate: string
}

export interface ActiveJob {
  id: number
  title: string
  customer: string
  amount: string
  progress: number
  startDate: string
}
