import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    if (!userId) {
      return NextResponse.json({ success: false, message: "Missing user ID" }, { status: 400 })
    }

    // In a real implementation, this would:
    // 1. Query the database for the user's transactions
    // 2. Paginate the results
    // 3. Return the transactions

    // For demo purposes, we'll return sample data
    const transactions = [
      {
        id: "TXN-001",
        description: "Payment for Kitchen Renovation",
        amount: "45000",
        type: "debit",
        status: "Completed",
        date: "2023-05-05T10:30:00Z",
      },
      {
        id: "TXN-002",
        description: "Wallet Top-up",
        amount: "20000",
        type: "credit",
        status: "Completed",
        date: "2023-05-03T14:15:00Z",
      },
      // More transactions would be here
    ]

    return NextResponse.json({
      success: true,
      data: {
        transactions,
        pagination: {
          page,
          limit,
          total: 25,
          totalPages: 3,
        },
      },
    })
  } catch (error) {
    console.error("Transactions error:", error)
    return NextResponse.json({ success: false, message: "Failed to retrieve transactions" }, { status: 500 })
  }
}
