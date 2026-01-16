import type React from "react"
import type { Metadata } from "next"
import { Inter, Farro } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import InitialLoader from "@/components/InitialLoader"
import { Analytics } from "@vercel/analytics/next"

// Load Inter and Farro fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const farro = Farro({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-farro",
})

export const metadata: Metadata = {
  title: "Tsalla Aerospace - Unmanned Systems & AI Technology",
  description:
    "We Don't Build Drones. We Build Unfair Advantages. Leading aerospace technology company specializing in unmanned systems and AI.",
  keywords: "aerospace, drones, unmanned systems, AI, defense technology",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${farro.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Pontano+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbit:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="https://cdn.sanity.io/images/e2g21cdj/production/b713e54652cf0bd1898d61a04ac7a6dc928ea9d2-512x512.png" type="image/svg+xml" />

      </head>
      <body className="bg-black text-white font-farro" suppressHydrationWarning>
        <InitialLoader />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
