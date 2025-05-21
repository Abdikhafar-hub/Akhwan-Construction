"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Loader2 } from "lucide-react"

interface ReleaseConfirmationProps {
  jobId: string | number
  jobTitle: string
  builder: string
  amount: string
  completionDate: string | null
  onSuccess: () => void
  onCancel: () => void
}

export function ReleaseConfirmation({
  jobId,
  jobTitle,
  builder,
  amount,
  completionDate,
  onSuccess,
  onCancel,
}: ReleaseConfirmationProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleReleasePayment = async () => {
    setError(null)
    setIsLoading(true)

    try {
      // In a real app, this would make an API call to release escrow
      const response = await fetch("/api/escrow/release", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          customerId: "CUST-123", // In a real app, this would come from auth context
          builderId: "BLDR-456", // In a real app, this would be derived from the job
          amount,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setTimeout(() => {
          setIsLoading(false)
          onSuccess()
        }, 1000)
      } else {
        setError(data.message || "Failed to release escrow payment")
        setIsLoading(false)
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center mb-6">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Job</h4>
            <p className="font-medium">{jobTitle}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Builder</h4>
            <p className="font-medium">{builder}</p>
          </div>
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Amount</h4>
            <p className="font-medium">KSh {amount}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Completion Date</h4>
            <p className="font-medium">{completionDate || "Today"}</p>
          </div>
        </div>
        <Separator />
        <div>
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Confirmation</h4>
          <p className="text-sm">
            By releasing this payment, you confirm that the job has been completed to your satisfaction. This action
            cannot be undone.
          </p>
        </div>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{error}</div>}

      <div className="flex gap-4 pt-2">
        <Button type="button" variant="outline" className="flex-1" onClick={onCancel} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="button" className="flex-1" onClick={handleReleasePayment} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing
            </>
          ) : (
            "Release Payment"
          )}
        </Button>
      </div>
    </div>
  )
}
