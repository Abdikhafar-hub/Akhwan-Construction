"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { SignupFormData } from "@/components/signup/signup-wizard"
import { Loader2 } from "lucide-react"

interface VerificationProps {
  formData: SignupFormData
  updateFormData: (data: Partial<SignupFormData>) => void
  onNext: () => void
  onBack: () => void
}

export function Verification({ formData, updateFormData, onNext, onBack }: VerificationProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(60)
  const [verificationInputs, setVerificationInputs] = useState(["", "", "", "", "", ""])

  // Simulate sending verification code
  const sendVerificationCode = () => {
    setIsLoading(true)
    setError(null)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSent(true)
      setCountdown(60)
    }, 1500)
  }

  // Start countdown when code is sent
  useEffect(() => {
    if (!isSent) return

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isSent])

  // Send code on initial load
  useEffect(() => {
    if (!isSent && !isLoading) {
      sendVerificationCode()
    }
  }, [])

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    const newInputs = [...verificationInputs]
    newInputs[index] = value
    setVerificationInputs(newInputs)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`verification-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }

    // Update form data
    updateFormData({ verificationCode: newInputs.join("") })
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !verificationInputs[index] && index > 0) {
      const prevInput = document.getElementById(`verification-${index - 1}`)
      if (prevInput) {
        prevInput.focus()
      }
    }
  }

  const handleResend = () => {
    setVerificationInputs(["", "", "", "", "", ""])
    updateFormData({ verificationCode: "" })
    sendVerificationCode()
  }

  const handleVerify = () => {
    const code = verificationInputs.join("")
    if (code.length !== 6) {
      setError("Please enter the complete 6-digit code")
      return
    }

    setIsLoading(true)
    setError(null)

    // Simulate verification
    setTimeout(() => {
      setIsLoading(false)

      // For demo purposes, any code works
      onNext()

      // In a real app, you would verify the code with your backend
      // if (code === "123456") {
      //   onNext()
      // } else {
      //   setError("Invalid verification code. Please try again.")
      // }
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Verify Your Account</h2>
        <p className="text-muted-foreground">We've sent a 6-digit verification code to {formData.email}</p>
      </div>

      <div className="space-y-6">
        <div className="flex justify-center gap-2">
          {verificationInputs.map((digit, index) => (
            <Input
              key={index}
              id={`verification-${index}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              className="w-12 h-12 text-center text-lg"
              value={digit}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={isLoading}
            />
          ))}
        </div>

        {error && <div className="text-center text-red-500 text-sm">{error}</div>}

        <div className="text-center">
          {countdown > 0 ? (
            <p className="text-sm text-muted-foreground">
              Didn't receive the code? You can resend in {countdown} seconds
            </p>
          ) : (
            <Button variant="link" className="text-sm p-0 h-auto" onClick={handleResend} disabled={isLoading}>
              Resend verification code
            </Button>
          )}
        </div>
      </div>

      <div className="pt-4 flex gap-4">
        <Button variant="outline" onClick={onBack} className="flex-1" disabled={isLoading}>
          Back
        </Button>
        <Button onClick={handleVerify} className="flex-1" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify & Continue"
          )}
        </Button>
      </div>
    </div>
  )
}
