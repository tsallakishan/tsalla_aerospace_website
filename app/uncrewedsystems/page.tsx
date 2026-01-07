import type { Metadata } from "next"
import PageWrapper from "@/components/PageWrapper"
import UncrewedSystemsHero from "./components/UncrewedSystemsHero"
import UncrewedDexter from "./components/UncrewedDexter"
import UncrewedFenix from "./components/UncrewedFenix"
import UncrewedBat from "./components/UncrewedBat"
import UncrewedStorm from "./components/UncrewedStorm"


export const metadata: Metadata = {
  title: "Uncrewed Systems - Tsalla Aerospace",
  description: "Advanced uncrewed systems for autonomous flight operations and mission execution.",
}

export default function UncrewedSystemsPage() {
  return (
    <PageWrapper>
      <UncrewedSystemsHero />
      <UncrewedDexter />
      <UncrewedFenix />
      <UncrewedBat />
      <UncrewedStorm />
    </PageWrapper>
  )
}
