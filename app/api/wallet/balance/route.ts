import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const userRole = searchParams.get("userRole")

    if (!userId || !userRole) {
      return NextResponse.json({ success: false, message: "Missing user ID or role" }, { status: 400 })
    }

    // In a real implementation, this would:
    // 1. Query the database for the user's wallet
    // 2. Return the current balance and details

    // For demo purposes, we'll simulate different responses based on role
    let response

    if (userRole === "customer") {
      response = {
        availableBalance: 15000,
        escrowBalance: 45000,
        totalSpent: 128500,
        currency: "KES",
        lastUpdated: new Date().toISOString(),
      }
    } else {
      response = {
        availableBalance: 32500,
        pendingPayouts: 28500,
        totalEarnings: 245000,
        currency: "KES",
        lastUpdated: new Date().toISOString(),
      }
    }

    return NextResponse.json({
      success: true,
      data: response,
    })
  } catch (error) {
    console.error("Wallet balance error:", error)
    return NextResponse.json({ success: false, message: "Failed to retrieve wallet balance" }, { status: 500 })
  }
}
