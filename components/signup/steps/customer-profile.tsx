"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { SignupFormData } from "@/components/signup/signup-wizard"
import { Textarea } from "@/components/ui/textarea"

interface CustomerProfileProps {
  formData: SignupFormData
  updateFormData: (data: Partial<SignupFormData>) => void
  onNext: () => void
  onBack: () => void
}

export function CustomerProfile({ formData, updateFormData, onNext, onBack }: CustomerProfileProps) {
  const [errors, setErrors] = useState<{
    fullName?: string
    address?: string
    phone?: string
  }>({})

  const handleContinue = () => {
    const newErrors: {
      fullName?: string
      address?: string
      phone?: string
    } = {}

    if (!formData.fullName) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.address) {
      newErrors.address = "Address is required"
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10,12}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Profile Information</h2>
        <p className="text-muted-foreground">Tell us a bit about yourself</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            placeholder="Your full name"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
          />
          {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="organization">Organization (Optional)</Label>
          <Input
            id="organization"
            placeholder="Company or organization name"
            value={formData.organization}
            onChange={(e) => updateFormData({ organization: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address (Where jobs will occur)</Label>
          <Textarea
            id="address"
            placeholder="Your physical address"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            rows={3}
          />
          {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            placeholder="e.g. 0712345678"
            value={formData.phone}
            onChange={(e) => updateFormData({ phone: e.target.value })}
          />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
        </div>
      </div>

      <div className="pt-4 flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleContinue} className="flex-1">
          Continue
        </Button>
      </div>
    </div>
  )
}
