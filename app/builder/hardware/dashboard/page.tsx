import type { Metadata } from "next"
import { HardwareSupplierDashboard } from "@/components/dashboard/builder/hardware-dashboard"

export const metadata: Metadata = {
  title: "Hardware Supplier Dashboard | Akhwan",
  description: "Manage your hardware supply business on Akhwan platform",
}

export default function HardwareSupplierDashboardPage() {
  return <HardwareSupplierDashboard />
}
