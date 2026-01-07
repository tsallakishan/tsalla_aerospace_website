import { NextResponse } from "next/server"
import type { HardwareItem } from "@/lib/types"

// Mock data - replace with actual database calls
const mockHardware: HardwareItem[] = [
  {
    id: "1",
    name: "Phantom X1",
    description: "Advanced reconnaissance drone with AI-powered target identification",
    specifications: {
      weight: "2.5 kg",
      dimensions: "45cm x 35cm x 12cm",
      range: "50 km",
      payload: "500g",
    },
    images: ["/hardware/phantom-x1.jpg"],
    category: "drone",
    status: "active",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Sentinel Pro",
    description: "Long-range surveillance system with thermal imaging capabilities",
    specifications: {
      weight: "4.2 kg",
      dimensions: "60cm x 45cm x 18cm",
      range: "100 km",
      payload: "1.2kg",
    },
    images: ["/hardware/sentinel-pro.jpg"],
    category: "drone",
    status: "active",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
  },
]

export async function GET() {
  try {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    return NextResponse.json(mockHardware)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch hardware data" }, { status: 500 })
  }
}
