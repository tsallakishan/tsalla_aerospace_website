import type { Metadata } from "next"
import PageWrapper from "@/components/PageWrapper"
import DexterHero from "./components/DexterHero"
import DexterCapabilities from "./components/DexterCapabilities"
import DexterSpecifications from "./components/DexterSpecifications"
import Dexter1 from "./components/Dexter1"
import Dexter_2 from "./components/Dexter_2"
import Dexter_3 from "./components/Dexter_3"
import Dexter_4 from "./components/Dexter_4"
import Dexter_5 from "./components/Dexter_5"
import Dexter_6 from "./components/Dexter_6"



export const metadata: Metadata = {
  title: "DEXTER - Multi-Role Single Solution - Tsalla Aerospace",
  description:
    "DEXTER is a versatile uncrewed system designed for multiple mission profiles with advanced adaptability.",
}

export default function DexterPage() {
  return (
    <PageWrapper>
      <DexterHero />
       <DexterCapabilities />
      <Dexter1 />
      <Dexter_2/>
      <Dexter_3/>
      <Dexter_6/>
       <Dexter_4/>
       <DexterSpecifications />
      <Dexter_5/>
    </PageWrapper>
  )
}
