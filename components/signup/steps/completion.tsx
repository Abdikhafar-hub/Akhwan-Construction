"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { SignupFormData } from "@/components/signup/signup-wizard"
import { CheckCircle, Loader2 } from "lucide-react"

interface CompletionProps {
  formData: SignupFormData
  onSubmit: () => void
  onBack: () => void
}

export function Completion({ formData, onSubmit, onBack }: CompletionProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = () => {
    setIsLoading(true)
    onSubmit()
  }

  const getRoleName = (role: string | null) => {
    switch (role) {
      case "customer":
        return "Customer"
      case "fundi":
        return "Fundi"
      case "contractor":
        return "Contractor"
      case "professional":
        return "Professional"
      case "hardware":
        return "Hardware Supplier"
      default:
        return "User"
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2">You're Almost Done!</h2>
        <p className="text-muted-foreground">Review your information and complete your registration</p>
      </div>

      <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Account Type</h3>
            <p>{getRoleName(formData.role)}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
            <p>{formData.email}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Profile Information</h3>
          <div className="grid grid-cols-2 gap-4">
            {formData.role === "customer" ? (
              <>
                <div>
                  <h4 className="text-sm font-medium">Full Name</h4>
                  <p>{formData.fullName}</p>
                </div>
                {formData.organization && (
                  <div>
                    <h4 className="text-sm font-medium">Organization</h4>
                    <p>{formData.organization}</p>
                  </div>
                )}
              </>
            ) : (
              <>
                <div>
                  <h4 className="text-sm font-medium">Contact Person</h4>
                  <p>{formData.contactPerson}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">ID/Passport</h4>
                  <p>{formData.idNumber}</p>
                </div>
              </>
            )}
            <div>
              <h4 className="text-sm font-medium">Phone</h4>
              <p>{formData.phone}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Address</h4>
              <p>{formData.address}</p>
            </div>
          </div>

          {formData.role !== "customer" && (
            <>
              <div className="mt-4">
                <h4 className="text-sm font-medium">Skills & Expertise</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.skills.map((skill) => (
                    <span key={skill} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium">Service Areas</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.serviceAreas.map((area) => (
                    <span key={area} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="pt-4 flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1" disabled={isLoading}>
          Back
        </Button>
        <Button onClick={handleSubmit} className="flex-1" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Complete Registration"
          )}
        </Button>
      </div>
    </div>
  )
}
