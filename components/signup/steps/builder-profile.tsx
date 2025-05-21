"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { SignupFormData } from "@/components/signup/signup-wizard"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

interface BuilderProfileProps {
  formData: SignupFormData
  updateFormData: (data: Partial<SignupFormData>) => void
  onNext: () => void
  onBack: () => void
}

export function BuilderProfile({ formData, updateFormData, onNext, onBack }: BuilderProfileProps) {
  const [errors, setErrors] = useState<{
    contactPerson?: string
    idNumber?: string
    skills?: string
    serviceAreas?: string
    phone?: string
  }>({})

  const [newSkill, setNewSkill] = useState("")
  const [newArea, setNewArea] = useState("")

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      updateFormData({ skills: [...formData.skills, newSkill.trim()] })
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    updateFormData({ skills: formData.skills.filter((s) => s !== skill) })
  }

  const handleAddArea = () => {
    if (newArea.trim() && !formData.serviceAreas.includes(newArea.trim())) {
      updateFormData({ serviceAreas: [...formData.serviceAreas, newArea.trim()] })
      setNewArea("")
    }
  }

  const handleRemoveArea = (area: string) => {
    updateFormData({ serviceAreas: formData.serviceAreas.filter((a) => a !== area) })
  }

  const handleContinue = () => {
    const newErrors: {
      contactPerson?: string
      idNumber?: string
      skills?: string
      serviceAreas?: string
      phone?: string
    } = {}

    if (!formData.contactPerson) {
      newErrors.contactPerson = "Contact person name is required"
    }

    if (!formData.idNumber) {
      newErrors.idNumber = "ID/Passport number is required"
    }

    if (formData.skills.length === 0) {
      newErrors.skills = "At least one skill is required"
    }

    if (formData.serviceAreas.length === 0) {
      newErrors.serviceAreas = "At least one service area is required"
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
        <h2 className="text-xl font-semibold mb-2">Your Builder Profile</h2>
        <p className="text-muted-foreground">Tell us about your services and expertise</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="contactPerson">Contact Person (Full Name)</Label>
          <Input
            id="contactPerson"
            placeholder="Full name of primary contact"
            value={formData.contactPerson}
            onChange={(e) => updateFormData({ contactPerson: e.target.value })}
          />
          {errors.contactPerson && <p className="text-sm text-red-500">{errors.contactPerson}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="idNumber">ID/Passport Number</Label>
          <Input
            id="idNumber"
            placeholder="Your ID or passport number"
            value={formData.idNumber}
            onChange={(e) => updateFormData({ idNumber: e.target.value })}
          />
          {errors.idNumber && <p className="text-sm text-red-500">{errors.idNumber}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills">Skills & Expertise</Label>
          <div className="flex gap-2">
            <Input
              id="skills"
              placeholder="Add a skill (e.g., Plumbing, Electrical)"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddSkill()
                }
              }}
            />
            <Button type="button" size="icon" onClick={handleAddSkill}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {errors.skills && <p className="text-sm text-red-500">{errors.skills}</p>}

          {formData.skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="pl-2 pr-1 py-1">
                  {skill}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="serviceAreas">Service Areas</Label>
          <div className="flex gap-2">
            <Input
              id="serviceAreas"
              placeholder="Add a location (e.g., Nairobi, Mombasa)"
              value={newArea}
              onChange={(e) => setNewArea(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddArea()
                }
              }}
            />
            <Button type="button" size="icon" onClick={handleAddArea}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {errors.serviceAreas && <p className="text-sm text-red-500">{errors.serviceAreas}</p>}

          {formData.serviceAreas.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.serviceAreas.map((area) => (
                <Badge key={area} variant="secondary" className="pl-2 pr-1 py-1">
                  {area}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1"
                    onClick={() => handleRemoveArea(area)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          )}
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

        <div className="space-y-2">
          <Label htmlFor="address">Business Address</Label>
          <Textarea
            id="address"
            placeholder="Your business address"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            rows={3}
          />
          {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
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
