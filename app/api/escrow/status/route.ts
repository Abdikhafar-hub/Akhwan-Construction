import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const jobId = searchParams.get("jobId")

    if (!jobId) {
      return NextResponse.json({ success: false, message: "Missing job ID" }, { status: 400 })
    }

    // In a real implementation, this would:
    // 1. Query the database for the escrow record
    // 2. Return the current status and details

    // For demo purposes, we'll simulate a response
    return NextResponse.json({
      success: true,
      data: {
        jobId,
        escrowId: "ESC-123456",
        status: "PENDING",
        amount: "45000",
        currency: "KES",
        createdAt: "2023-05-01T10:30:00Z",
        updatedAt: "2023-05-01T10:30:00Z",
        autoReleaseDate: "2023-05-15T10:30:00Z",
      },
    })
  } catch (error) {
    console.error("Escrow status error:", error)
    return NextResponse.json({ success: false, message: "Failed to retrieve escrow status" }, { status: 500 })
  }
}
