import HeroSection from "@/components/HeroSection"
import CommitmentSection from "@/components/CommitmentSection"
import TechTools from "@/components/TechTools"
import Testimonials from "@/components/Testimonials"
import Testimonials1 from "@/components/Testimonials1"
import Newsletter from "@/components/Newsletter"
import PageWrapper from "@/components/PageWrapper"
import Missions from "@/components/Missions"


export default function HomePage() {
  return (
    <PageWrapper hasHero={true}>
      <HeroSection />
      <Missions/>
      <CommitmentSection />
      <Testimonials />
      <TechTools />
      
      <Newsletter />
    </PageWrapper>
  )
}
