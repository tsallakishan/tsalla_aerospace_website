import { NextResponse } from "next/server"
import type { TeamMember } from "@/lib/types"

// Mock data - replace with actual database calls
const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Dr. Sarah Chen",
    role: "Chief Technology Officer",
    department: "Engineering",
    bio: "Leading AI and autonomous systems development with 15+ years of experience.",
    avatar: "/placeholder-user.jpg",
    linkedin: "https://linkedin.com/in/sarahchen",
  },
]

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return NextResponse.json(mockTeamMembers)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 })
  }
}
