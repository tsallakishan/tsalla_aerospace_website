import type { Metadata } from "next"
import MaverickHero from "./components/MaverickHero"
import MaverickCapabilities from "./components/MaverickCapabilities"
import MaverickIntegration from "./components/MaverickIntegration"
import MaverickShip from "./components/MaverickShip"


export const metadata: Metadata = {
  title: "Maverick - Mission Control System | Tsalla Aerospace",
  description:
    "Advanced mission planning and execution systems for complex autonomous operations. Seamless coordination of multiple systems for mission-critical operations.",
}

export default function MaverickPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <MaverickHero />
      <MaverickCapabilities />
      <MaverickIntegration />
      <MaverickShip />
    </div>
  )
}
