import { NextResponse } from "next/server"
import type { MediaItem } from "@/lib/types"

// Mock data - replace with actual database calls
const mockMediaItems: MediaItem[] = [
  {
    id: "1",
    title: "Phantom X1 in Action",
    type: "image",
    url: "/placeholder.jpg",
    description: "Advanced reconnaissance drone during field testing",
    tags: ["drone", "testing", "phantom-x1"],
    uploadedAt: "2024-01-15T00:00:00Z",
  },
]

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return NextResponse.json(mockMediaItems)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch media items" }, { status: 500 })
  }
}
