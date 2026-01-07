import { NextResponse } from "next/server"
import type { Document } from "@/lib/types"

// Mock data - replace with actual database calls
const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Phantom X1 Technical Specifications",
    description: "Complete technical documentation for the Phantom X1 reconnaissance drone",
    type: "pdf",
    url: "/documents/phantom-x1-specs.pdf",
    size: "2.4 MB",
    category: "specification",
    uploadedAt: "2024-01-15T00:00:00Z",
  },
]

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return NextResponse.json(mockDocuments)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch documents" }, { status: 500 })
  }
}
