"use client"

import type React from "react"

import { useState } from "react"
import PageWrapper from "@/components/PageWrapper"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    enquiryType: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [errorFields, setErrorFields] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const missing: string[] = []
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        const formatted = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())
        missing.push(formatted)
      }
    })

    if (missing.length > 0) {
      setErrorFields(missing)
      setSubmitted(false)
      setErrorMessage("")
      return
    }

    setErrorFields([])
    setErrorMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          enquiryType: "",
          message: "",
        })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        const errorData = await response.json()
        setErrorMessage(errorData.error || "Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setErrorMessage("Failed to send message. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageWrapper>
      <div className="bg-black text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="uppercase text-4xl md:text-6xl font-bold text-gray-200 mb-3">Reach Out to Us</h1>
            <p className="font-light text-sm font-inter text-gray-400 max-w-2xl mx-auto">
              Got a question, idea, or collaboration in mind? Reach out using the form below — our team will be in touch
              soon.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-xs mb-1 uppercase tracking-wider font-sans">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="bg-[#D8D8D8] text-black border-none rounded-md"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs mb-1 uppercase tracking-wider font-sans">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-[#D8D8D8] text-black border-none rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs mb-1 uppercase tracking-wider font-sans">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-[#D8D8D8] text-black border-none rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="enquiryType" className="block text-xs mb-1 uppercase tracking-wider font-sans">
                  Enquiry Type
                </label>
                <Input
                  id="enquiryType"
                  value={formData.enquiryType}
                  onChange={handleChange}
                  className="bg-[#D8D8D8] text-black border-none rounded-md"
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-xs mb-1 uppercase tracking-wider font-sans">
                Message
              </label>
              <Textarea
                id="message"
                rows={10}
                value={formData.message}
                onChange={handleChange}
                className="bg-[#D8D8D8] text-black border-none w-full rounded-md"
              />
            </div>
          </form>

          <div className="text-center mt-6 font-semibold font-inter">
            {errorFields.length > 0 && (
              <div className="text-red-500 text-sm animate-bounce mb-2">
                Please fill out the following fields: <span className="font-semibold">{errorFields.join(", ")}</span>
              </div>
            )}
            {errorMessage && <div className="text-red-500 text-sm mb-2">❌ {errorMessage}</div>}
            {submitted && (
              <p className="text-green-400 text-sm animate-pulse mb-2">
                ✅ Message sent successfully! We'll get back to you soon.
              </p>
            )}
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 bg-[#D8D8D8] text-black font-normal text-base px-10 py-2 hover:bg-gray-400 rounded-md"
            >
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-16 text-sm">
            <div className="bg-zinc-900 p-6 md:p-10 rounded-lg shadow-sm">
              <h2 className="block text-xl mb-4 uppercase tracking-wider font-sans font-semibold">Contact Us</h2>
              <p className="mb-2 font-light text-sm font-inter">
                <span className="font-semibold font-inter">Phone Number</span> - 095357 20540
              </p>
              <p className="font-light text-sm font-inter">
                <span className="font-semibold font-inter">Email Address</span> - info@tsallaaerospace.com
              </p>
            </div>
            <div className="bg-zinc-900 p-6 md:p-10 rounded-lg shadow-sm">
              <h2 className="block text-xl mb-4 uppercase tracking-wider font-sans font-semibold">Headquarters</h2>
              <p className="font-light text-sm font-inter">
                2nd Floor, Indian Institute of Science (Bengaluru), Society for Innovation and Development,
                Entrepreneurship Centre Rd, IISc, Malleswaram, Bengaluru, Karnataka 560012
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
