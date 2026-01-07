import { NextResponse } from "next/server"
import type { NewsItem } from "@/lib/types"

// Mock data - replace with actual database calls
const mockNewsItems: NewsItem[] = [
  {
    id: "1",
    headline: "Tsalla Aerospace Announces Breakthrough in AI Pilot Technology",
    summary: "Revolutionary Roadrunner AI system achieves unprecedented autonomous flight capabilities",
    content: "Full news article content here...",
    publishedAt: "2024-01-15T00:00:00Z",
    category: "press-release",
    featuredImage: "/placeholder.jpg",
  },
]

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return NextResponse.json(mockNewsItems)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch news items" }, { status: 500 })
  }
}
