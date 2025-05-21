"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DollarSign, Loader2 } from "lucide-react"

interface PayPalFormProps {
  amount: string
  onSuccess: () => void
  onCancel: () => void
}

export function PayPalForm({ amount, onSuccess, onCancel }: PayPalFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePayPalCheckout = async () => {
    setError(null)
    setIsLoading(true)

    try {
      // In a real app, this would make an API call to initiate PayPal payment
      const response = await fetch("/api/payments/paypal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency: "USD",
          description: "Akhwan Wallet Top-up",
        }),
      })

      const data = await response.json()

      if (data.success) {
        // In a real app, this would redirect to PayPal
        // For demo purposes, we'll simulate a successful payment
        setTimeout(() => {
          setIsLoading(false)
          onSuccess()
        }, 2000)
      } else {
        setError(data.message || "Failed to initiate PayPal payment")
        setIsLoading(false)
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center mb-6">
        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
          <DollarSign className="h-8 w-8 text-blue-600" />
        </div>
      </div>

      <div className="bg-muted p-4 rounded-md">
        <div className="flex justify-between">
          <span>Amount:</span>
          <span className="font-bold">KSh {amount}</span>
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          You will be redirected to PayPal to complete this payment securely.
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}

      <div className="flex gap-4 pt-2">
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="button" className="flex-1" onClick={handlePayPalCheckout} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            "Continue to PayPal"
          )}
        </Button>
      </div>
    </div>
  )
}
