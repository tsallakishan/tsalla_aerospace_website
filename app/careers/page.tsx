"use client"

import Image from "next/image"
import { useEffect } from "react"
import HomeCareersSection from "./components/HomeCareersSection"
import MissionSection from "./components/MissionSection"
import ValuesSection from "./components/ValuesSection"
import TeamsSection from "./components/TeamsSection"
import HomeCareers2 from "./components/HomeCareers2"
import HomeFounder from "./components/HomeFounder"
import HomeHiringProcess from "./components/HomeHiringProcess"

import HiringProcess from "./components/HiringProcess"
import InnovationSection from "./components/InnovationSection"



export default function CareersPage() {
  useEffect(() => {
    const style = document.createElement("style")
    style.innerHTML = `
      @keyframes sliding {
        0% { transform: translateX(0); }
        100% { transform: translateX(calc(-100%)); }
      }
      @keyframes slidingReverse {
        0% { transform: translateX(calc(-100%)); }
        100% { transform: translateX(0); }
      }
    `
    document.head.appendChild(style)
  }, [])

  return (
    <main className="bg-black text-white font-[Farro]">
      <HomeCareersSection />
      <HomeCareers2 />
      <HiringProcess />
      <ValuesSection />
      <HomeFounder />
      <MissionSection />
      <HomeHiringProcess />
      <TeamsSection />
      <InnovationSection />
    </main>
  )
}
