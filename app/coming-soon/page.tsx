"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PageWrapper from "@/components/PageWrapper"

export default function ComingSoonPage() {
  const [email, setEmail] = useState("")
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Countdown to a future date (example: 90 days from now)
  useEffect(() => {
    const targetDate = new Date()
    targetDate.setDate(targetDate.getDate() + 90)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate.getTime() - now

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle email subscription
    console.log("Subscribing email:", email)
    setEmail("")
  }

  return (
    <PageWrapper>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Coming Soon</h1>

          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Revolutionary technology is on the horizon. Be the first to know when we launch.
          </p>

          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-4 mb-12 max-w-md mx-auto">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-gray-900 p-4 rounded-lg border border-gray-800">
                <div className="text-3xl font-bold text-blue-400">{value}</div>
                <div className="text-sm text-gray-400 capitalize">{unit}</div>
              </div>
            ))}
          </div>

          {/* Email Subscription */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-900 border-gray-800 text-white"
              />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Notify Me
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">We'll notify you when we launch. No spam, ever.</p>
          </form>
        </div>
      </div>
    </PageWrapper>
  )
}
