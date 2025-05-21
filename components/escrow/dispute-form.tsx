"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Loader2 } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface DisputeFormProps {
  jobId: string | number
  jobTitle: string
  builder: string
  amount: string
  onSuccess: () => void
  onCancel: () => void
}

export function DisputeForm({ jobId, jobTitle, builder, amount, onSuccess, onCancel }: DisputeFormProps) {
  const [disputeReason, setDisputeReason] = useState("")
  const [disputeType, setDisputeType] = useState("quality")
  const [details, setDetails] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmitDispute = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Basic validation
    if (!disputeType || !details) {
      setError("Please provide all required information")
      return
    }

    setIsLoading(true)

    try {
      // In a real app, this would make an API call to file a dispute
      const response = await fetch("/api/escrow/dispute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          customerId: "CUST-123", // In a real app, this would come from auth context
          builderId: "BLDR-456", // In a real app, this would be derived from the job
          amount,
          reason: disputeType,
          details,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setTimeout(() => {
          setIsLoading(false)
          onSuccess()
        }, 1000)
      } else {
        setError(data.message || "Failed to file dispute")
        setIsLoading(false)
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmitDispute} className="space-y-4">
      <div className="flex items-center justify-center mb-6">
        <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-red-600" />
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
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Amount in Dispute</h4>
          <p className="font-medium">KSh {amount}</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Dispute Reason</Label>
        <RadioGroup value={disputeType} onValueChange={setDisputeType}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="quality" id="quality" />
            <Label htmlFor="quality">Quality Issues</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="timeline" id="timeline" />
            <Label htmlFor="timeline">Timeline Delays</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="scope" id="scope" />
            <Label htmlFor="scope">Scope of Work</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other">Other</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="details">Dispute Details</Label>
        <Textarea
          id="details"
          placeholder="Please provide details about your dispute..."
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={4}
          disabled={isLoading}
        />
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
            "File Dispute"
          )}
        </Button>
      </div>
    </form>
  )
}
