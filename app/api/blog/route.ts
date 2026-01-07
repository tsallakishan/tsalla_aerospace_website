import { NextResponse } from "next/server"
import type { BlogPost } from "@/lib/types"

// Mock data - replace with actual database calls
const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Autonomous Flight",
    slug: "future-of-autonomous-flight",
    excerpt: "Exploring how AI is revolutionizing unmanned aerial systems.",
    content: "Full blog post content here...",
    author: {
      name: "Dr. Sarah Chen",
      role: "Chief Technology Officer",
      avatar: "/placeholder-user.jpg",
    },
    publishedAt: "2024-01-15T00:00:00Z",
    tags: ["AI", "Autonomous Systems", "Technology"],
    featuredImage: "/placeholder.jpg",
    readTime: 8,
  },
]

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return NextResponse.json(mockBlogPosts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}
