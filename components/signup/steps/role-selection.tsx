"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { UserRole } from "@/lib/types"
import type { SignupFormData } from "@/components/signup/signup-wizard"
import { User, Hammer, Building2, HardHat, ShoppingBag } from "lucide-react"

interface RoleSelectionProps {
  formData: SignupFormData
  updateFormData: (data: Partial<SignupFormData>) => void
  onNext: () => void
}

export function RoleSelection({ formData, updateFormData, onNext }: RoleSelectionProps) {
  const handleRoleSelect = (role: UserRole) => {
    updateFormData({ role })
    onNext()
  }

  const roles = [
    {
      id: "customer",
      title: "Customer",
      description: "I need to hire builders for construction or repair work",
      icon: User,
    },
    {
      id: "fundi",
      title: "Fundi",
      description: "I provide skilled labor services (plumbing, electrical, etc.)",
      icon: Hammer,
    },
    {
      id: "contractor",
      title: "Contractor",
      description: "I manage construction projects and teams",
      icon: Building2,
    },
    {
      id: "professional",
      title: "Professional",
      description: "I provide specialized services (architect, engineer, etc.)",
      icon: HardHat,
    },
    {
      id: "hardware",
      title: "Hardware Supplier",
      description: "I sell construction materials and supplies",
      icon: ShoppingBag,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Choose your role on Akhwan</h2>
        <p className="text-muted-foreground">Select the option that best describes you</p>
      </div>

      <div className="grid gap-4">
        {roles.map((role) => (
          <Card
            key={role.id}
            className={`p-4 cursor-pointer transition-all hover:border-primary hover:shadow ${
              formData.role === role.id ? "border-2 border-primary bg-primary/5" : ""
            }`}
            onClick={() => handleRoleSelect(role.id as UserRole)}
          >
            <div className="flex items-center gap-4">
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  formData.role === role.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <role.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-medium">{role.title}</h3>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="pt-4">
        <Button className="w-full" disabled={!formData.role} onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  )
}
