import { NextResponse } from "next/server"
import type { Mission } from "@/lib/types"

// Mock data - replace with actual database calls
const mockMissions: Mission[] = [
  {
    id: "1",
    name: "Operation Nighthawk",
    description: "Advanced reconnaissance mission using autonomous drone swarms",
    objectives: ["Establish perimeter surveillance", "Collect intelligence data", "Maintain operational security"],
    status: "active",
    startDate: "2024-01-01T00:00:00Z",
    technologies: ["Roadrunner AI", "Phantom X1", "Sentinel Pro"],
    images: ["/placeholder.jpg"],
  },
]

export async function GET() {
  try {
    await new Promise((resolve) => setTimeout(resolve, 100))
    return NextResponse.json(mockMissions)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch missions" }, { status: 500 })
  }
}
