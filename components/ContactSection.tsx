"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactSection() {
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
        <div className="bg-black text-white py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="uppercase text-4xl md:text-6xl font-bold text-white mb-3 tracking-tight">Reach Out to Us</h1>
                    <p className="font-light text-sm font-inter text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        Got a question, idea, or collaboration in mind? Reach out using the form below — our team will be in touch
                        soon.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="group">
                                <label htmlFor="fullName" className="block text-xs mb-2 uppercase tracking-widest font-bold font-sans text-white transition-colors">
                                    Full Name
                                </label>
                                <Input
                                    id="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="bg-transparent border-0 border-b border-white/40 rounded-none px-0 py-3 text-white placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:border-white focus-visible:ring-offset-0 transition-all duration-300 font-medium"
                                    placeholder="ENTER YOUR NAME"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="group">
                                    <label htmlFor="email" className="block text-xs mb-2 uppercase tracking-widest font-bold font-sans text-white transition-colors">
                                        Email Address
                                    </label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="bg-transparent border-0 border-b border-white/40 rounded-none px-0 py-3 text-white placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:border-white focus-visible:ring-offset-0 transition-all duration-300 font-medium"
                                        placeholder="EMAIL@EXAMPLE.COM"
                                    />
                                </div>
                                <div className="group">
                                    <label htmlFor="phone" className="block text-xs mb-2 uppercase tracking-widest font-bold font-sans text-white transition-colors">
                                        Phone Number
                                    </label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="bg-transparent border-0 border-b border-white/40 rounded-none px-0 py-3 text-white placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:border-white focus-visible:ring-offset-0 transition-all duration-300 font-medium"
                                        placeholder="+91 00000 00000"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label htmlFor="enquiryType" className="block text-xs mb-2 uppercase tracking-widest font-bold font-sans text-white transition-colors">
                                    Enquiry Type
                                </label>
                                <Input
                                    id="enquiryType"
                                    value={formData.enquiryType}
                                    onChange={handleChange}
                                    className="bg-transparent border-0 border-b border-white/40 rounded-none px-0 py-3 text-white placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:border-white focus-visible:ring-offset-0 transition-all duration-300 font-medium"
                                    placeholder="PARTNERSHIP / GENERAL / CAREERS"
                                />
                            </div>

                            <div className="group">
                                <label htmlFor="message" className="block text-xs mb-2 uppercase tracking-widest font-bold font-sans text-white transition-colors">
                                    Message
                                </label>
                                <Textarea
                                    id="message"
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="bg-transparent border-0 border-b border-white/40 rounded-none px-0 py-3 text-white placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:border-white focus-visible:ring-offset-0 transition-all duration-300 resize-none font-medium"
                                    placeholder="TELL US ABOUT YOUR PROJECT..."
                                />
                            </div>

                            <div className="pt-6">
                                {errorFields.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="text-red-500 text-xs mb-4"
                                    >
                                        Please fill out: <span className="font-semibold">{errorFields.join(", ")}</span>
                                    </motion.div>
                                )}
                                {errorMessage && <div className="text-red-500 text-xs mb-4">❌ {errorMessage}</div>}
                                {submitted && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-green-400 text-xs mb-4"
                                    >
                                        ✅ Message sent successfully!
                                    </motion.p>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className="w-full h-14 bg-white text-black font-medium text-sm tracking-widest uppercase rounded-sm hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? "Sending..." : "Send Message"}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="w-full h-full min-h-[500px] lg:min-h-0 relative group overflow-hidden border border-zinc-800 rounded-sm"
                    >
                        <iframe
                            width="100%"
                            height="100%"
                            className="absolute inset-0 w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                            frameBorder="0"
                            title="map"
                            marginHeight={0}
                            marginWidth={0}
                            scrolling="no"
                            src="https://maps.google.com/maps?q=13.013616,77.568779&z=15&output=embed"
                        />
                        <div className="absolute inset-0 pointer-events-none border border-zinc-800/50 mix-blend-overlay"></div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="grid md:grid-cols-2 gap-6 mt-20 text-sm"
                >
                    <div className="bg-zinc-900/50 border border-zinc-800/50 p-8 rounded-sm hover:bg-zinc-900 transition-colors duration-300">
                        <h2 className="block text-sm mb-6 uppercase tracking-[0.2em] font-sans font-bold text-white">Contact Us</h2>
                        <p className="mb-3 font-light text-sm font-inter text-zinc-400 group">
                            <span className="font-semibold text-white block mb-1">Phone Number</span>
                            <span className="group-hover:text-white transition-colors">095357 20540</span>
                        </p>
                        <p className="font-light text-sm font-inter text-zinc-400 group">
                            <span className="font-semibold text-white block mb-1">Email Address</span>
                            <span className="group-hover:text-white transition-colors">info@tsallaaerospace.com</span>
                        </p>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800/50 p-8 rounded-sm hover:bg-zinc-900 transition-colors duration-300">
                        <h2 className="block text-sm mb-6 uppercase tracking-[0.2em] font-sans font-bold text-white">Headquarters</h2>
                        <p className="font-light text-sm font-inter text-zinc-400 group-hover:text-white transition-colors leading-relaxed">
                            2nd Floor, Indian Institute of Science (Bengaluru), Society for Innovation and Development,
                            Entrepreneurship Centre Rd, IISc, Malleswaram, Bengaluru, Karnataka 560012
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
