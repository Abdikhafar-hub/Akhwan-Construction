"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RoleSelection } from "@/components/signup/steps/role-selection"
import { Credentials } from "@/components/signup/steps/credentials"
import { CustomerProfile } from "@/components/signup/steps/customer-profile"
import { BuilderProfile } from "@/components/signup/steps/builder-profile"
import { Verification } from "@/components/signup/steps/verification"
import { Completion } from "@/components/signup/steps/completion"
import { Progress } from "@/components/ui/progress"
import type { UserRole } from "@/lib/types"

export type SignupFormData = {
  role: UserRole | null
  email: string
  password: string
  confirmPassword: string
  // Customer fields
  fullName: string
  organization?: string
  address: string
  phone: string
  // Builder fields
  contactPerson: string
  idNumber: string
  skills: string[]
  serviceAreas: string[]
  // Verification
  verificationCode: string
}

interface SignupWizardProps {
  initialRole?: string | null
}

export function SignupWizard({ initialRole }: SignupWizardProps) {
  const router = useRouter()
  // If initialRole is provided, start at step 2 (credentials), otherwise start at step 1 (role selection)
  const [step, setStep] = useState(initialRole ? 2 : 1)
  const [formData, setFormData] = useState<SignupFormData>({
    role: mapInitialRole(initialRole),
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    organization: "",
    address: "",
    phone: "",
    contactPerson: "",
    idNumber: "",
    skills: [],
    serviceAreas: [],
    verificationCode: "",
  })

  // Map the URL role parameter to a valid UserRole
  function mapInitialRole(role: string | null): UserRole | null {
    if (!role) return null

    if (role === "customer") return "customer"
    if (role === "fundi") return "fundi"
    if (role === "contractor") return "contractor"
    if (role === "professional") return "professional"
    if (role === "hardware") return "hardware"

    // Handle the generic "builder" case by defaulting to "fundi"
    if (role === "builder") return "fundi"

    return null
  }

  // Calculate total steps - if role is predefined, we skip the role selection step
  const totalSteps = formData.role ? 4 : 5
  // Adjust progress calculation based on whether we're skipping the role step
  const progress = ((formData.role && step === 1 ? 2 : step) / totalSteps) * 100

  const updateFormData = (data: Partial<SignupFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async () => {
    // In a real app, this would submit the data to your backend/Supabase
    console.log("Form submitted:", formData)

    // Simulate API call
    setTimeout(() => {
      // Redirect to the appropriate dashboard
      router.push("/wallet")
    }, 1500)
  }

  const renderStep = () => {
    // If role is already defined and we're at step 1, automatically move to step 2
    if (formData.role && step === 1) {
      nextStep()
      return null
    }

    switch (step) {
      case 1:
        return <RoleSelection formData={formData} updateFormData={updateFormData} onNext={nextStep} />
      case 2:
        return <Credentials formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />
      case 3:
        return formData.role === "customer" ? (
          <CustomerProfile formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />
        ) : (
          <BuilderProfile formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />
        )
      case 4:
        return <Verification formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />
      case 5:
        return <Completion formData={formData} onSubmit={handleSubmit} onBack={prevStep} />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>
            Step {step} of {totalSteps}
          </span>
          <span className="text-muted-foreground">
            {step === 1 && "Role Selection"}
            {step === 2 && "Account Credentials"}
            {step === 3 && (formData.role === "customer" ? "Customer Profile" : "Builder Profile")}
            {step === 4 && "Verification"}
            {step === 5 && "Complete Registration"}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="py-4">{renderStep()}</div>
    </div>
  )
}
