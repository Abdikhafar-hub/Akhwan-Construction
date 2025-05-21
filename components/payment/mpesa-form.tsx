"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Phone, Loader2 } from "lucide-react"

interface MPesaFormProps {
  amount: string
  onSuccess: () => void
  onCancel: () => void
}

export function MPesaForm({ amount, onSuccess, onCancel }: MPesaFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Basic validation
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid phone number")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would make an API call to initiate M-Pesa payment
      const response = await fetch("/api/payments/mpesa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumber,
          amount,
          accountReference: "Akhwan Wallet",
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Simulate waiting for M-Pesa confirmation
        setTimeout(() => {
          setIsLoading(false)
          onSuccess()
        }, 2000)
      } else {
        setError(data.message || "Failed to process M-Pesa payment")
        setIsLoading(false)
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-center mb-6">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
          <Phone className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">M-Pesa Phone Number</Label>
        <Input
          id="phone"
          placeholder="e.g. 0712345678"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          disabled={isLoading}
        />
        <p className="text-sm text-muted-foreground">Enter the phone number registered with M-Pesa</p>
      </div>

      <div className="bg-muted p-4 rounded-md">
        <div className="flex justify-between">
          <span>Amount:</span>
          <span className="font-bold">KSh {amount}</span>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}

      <div className="flex gap-4 pt-2">
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            "Pay with M-Pesa"
          )}
        </Button>
      </div>
    </form>
  )
}
