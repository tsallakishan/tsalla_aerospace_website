"use client"

import type React from "react"
import TestimonialsCarousel from "./TestimonialsCarousel"

const Newsletter: React.FC = () => {
  // News data from the previous section with background images
  const testimonials = [
    {
      id: "1",
      text: "Tsalla Aerospace and Rheinmetall Partner to Design and Manufacture Advanced Propulsion Systems for Next-Gen Aircraft",
      author: "Latest Partnership",
      role: "Press Release",
      company: "Tsalla Aerospace",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z'/%3E%3C/svg%3E",
      image: "https://cdn.sanity.io/images/z5s3oquj/production/40c0d9411b398e8b3e1114c6269c9a86195f8-3840x2160.jpg?auto=format&fit=max&w=1920&q=90"
    },
    {
      id: "2",
      text: "Riverside Research and Tsalla Aerospace Collaborate to Cyber Harden Critical Defense Capabilities",
      author: "Strategic Collaboration",
      role: "Press Release",
      company: "Tsalla Aerospace",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z'/%3E%3C/svg%3E",
      image: "https://cdn.sanity.io/images/z5s3oquj/production/987e977c745ccff57f4f705ca6335eb3ddf0dc5f-11648x8736.jpg?auto=format&fit=max&w=1200&q=90"
    },
    {
      id: "3",
      text: "Tsalla Aerospace Unveils Revolutionary AI Pilot System for Autonomous Flight Operations",
      author: "Product Innovation",
      role: "Press Release",
      company: "Tsalla Aerospace",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z'/%3E%3C/svg%3E",
      image: "https://cdn.sanity.io/images/z5s3oquj/production/8ba9aa42b68cb9b70f07dfe1583f4d0ed4477dd1-11648x8736.jpg?auto=format&fit=max&w=1200&q=90"
    },
    {
      id: "4",
      text: "Tsalla Aerospace Expands Bengaluru Facility for Advanced AI Research and Development Center",
      author: "Facility Expansion",
      role: "Press Release",
      company: "Tsalla Aerospace",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z'/%3E%3C/svg%3E",
      image: "https://cdn.sanity.io/images/z5s3oquj/production/40c0d9411b398e8b3e1114c6269c9a86195f8-3840x2160.jpg?auto=format&fit=max&w=1920&q=90"
    },
    {
      id: "5",
      text: "Tsalla Aerospace Successfully Completes First Flight Test of AI-Powered DEXTER System from Bengaluru Operations",
      author: "Milestone Achievement",
      role: "Press Release",
      company: "Tsalla Aerospace",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z'/%3E%3C/svg%3E",
      image: "https://cdn.sanity.io/images/z5s3oquj/production/987e977c745ccff57f4f705ca6335eb3ddf0dc5f-11648x8736.jpg?auto=format&fit=max&w=1200&q=90"
    },
    {
      id: "6",
      text: "Tsalla Aerospace Partners with Indian Defense Ministry for Autonomous Systems Development in Bengaluru",
      author: "Government Partnership",
      role: "Press Release",
      company: "Tsalla Aerospace",
      logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z'/%3E%3C/svg%3E",
      image: "https://cdn.sanity.io/images/z5s3oquj/production/8ba9aa42b68cb9b70f07dfe1583f4d0ed4477dd1-11648x8736.jpg?auto=format&fit=max&w=1200&q=90"
    },
  ]

  return <TestimonialsCarousel testimonials={testimonials} />
}

export default Newsletter
