"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard, Loader2 } from "lucide-react"

interface CardFormProps {
  amount: string
  onSuccess: () => void
  onCancel: () => void
}

export function CardForm({ amount, onSuccess, onCancel }: CardFormProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardholderName, setCardholderName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Basic validation
    if (!cardNumber || !expiryDate || !cvv || !cardholderName) {
      setError("Please fill in all card details")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would make an API call to process card payment
      const response = await fetch("/api/payments/card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cardNumber,
          expiryDate,
          cvv,
          amount,
          email: "user@example.com", // In a real app, this would come from the user's profile
        }),
      })

      const data = await response.json()

      if (data.success) {
        setTimeout(() => {
          setIsLoading(false)
          onSuccess()
        }, 2000)
      } else {
        setError(data.message || "Failed to process card payment")
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
        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
          <CreditCard className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardholder-name">Cardholder Name</Label>
        <Input
          id="cardholder-name"
          placeholder="Name on card"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="card-number">Card Number</Label>
        <Input
          id="card-number"
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiry">Expiry Date</Label>
          <Input
            id="expiry"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input id="cvv" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} disabled={isLoading} />
        </div>
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
            "Pay with Card"
          )}
        </Button>
      </div>
    </form>
  )
}
