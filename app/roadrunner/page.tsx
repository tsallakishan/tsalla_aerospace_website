"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function RoadrunnerContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">Roadrunner</h1>
        <div className="text-center">
          <p className="text-xl text-gray-300 mb-8">Advanced aerospace technology platform</p>
          {id && <p className="text-lg text-blue-400">ID: {id}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
            <ul className="space-y-2 text-gray-300">
              <li>• High-performance propulsion systems</li>
              <li>• Advanced navigation and control</li>
              <li>• Modular payload integration</li>
              <li>• Real-time telemetry</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
            <div className="space-y-2 text-gray-300">
              <p>
                <strong>Range:</strong> 500+ km
              </p>
              <p>
                <strong>Payload:</strong> Up to 50kg
              </p>
              <p>
                <strong>Flight Time:</strong> 8+ hours
              </p>
              <p>
                <strong>Altitude:</strong> 15,000+ ft
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RoadrunnerPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}
    >
      <RoadrunnerContent />
    </Suspense>
  )
}
