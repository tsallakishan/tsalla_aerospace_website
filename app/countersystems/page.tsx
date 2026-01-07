import type { Metadata } from "next"
import CounterHero from "./components/CounterHero"
import CounterFeatures from "./components/CounterFeatures"
import CounterMissions from "./components/CounterMissions"
import CounterSpec from "./components/CounterSpec"
import CounterDrones from "./components/CounterDrones"
import CounterLast from "./components/CounterLast"



import PageWrapper from "@/components/PageWrapper"

export const metadata: Metadata = {
  title: "Counter Systems - Tsalla Aerospace",
  description: "Advanced counter-drone and defensive systems for comprehensive threat protection.",
}

export default function CounterSystemsPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-black text-white">
      <CounterHero />
      <CounterDrones/>
      <CounterFeatures />
      <CounterMissions />
       <CounterSpec />
        <CounterLast />
    </div>
    </PageWrapper>
  )
}
