import type { Metadata } from "next"
import PageWrapper from "@/components/PageWrapper"
import BatHero from "./components/BatHero"
import BatCapabilities from "./components/BatCapabilities"
import BatSpecifications from "./components/BatSpecifications"
import BatLast from "./components/BatLast"
import BatFeatures from "./components/BatFeatures"
import BatMission from "./components/BatMission"
import BatLaunchSequence from "./components/BatLaunchSequence"
import BatPayLoad1 from "./components/BatPayLoad1"
import BatPayLoad2 from "./components/BatPayLoad2"
import BatPayLoad3 from "./components/BatPayLoad3"





export const metadata: Metadata = {
  title: "BAT - Battlefield Aerial Tactical UAS - Tsalla Aerospace",
  description: "BAT is a tactical unmanned aerial system optimized for battlefield operations and surveillance.",
}

export default function BatPage() {
  return (
    <PageWrapper>
      <BatHero />
      <BatCapabilities />
      <BatSpecifications />
      <BatMission />
      <BatLaunchSequence />
      <BatPayLoad2 />
      <BatPayLoad1 />
      <BatPayLoad3 />
      <BatFeatures />
      <BatLast />
    </PageWrapper>
  )
}
