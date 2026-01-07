import { ContentWrapper } from "@/components/ContentWrapper"

// Main Component for the Founder's Note Page
const FounderNotePage = () => {
  return (
    <div className="bg-white text-black font-clash min-h-screen flex items-center justify-center py-16">
      <ContentWrapper>
        {/* Content Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center w-full">
          {/* Left Column: Text Content */}
          <div className="flex flex-col gap-8 text-center md:text-left">
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              A NOTE FROM
              <br />
              OUR FOUNDER
            </h1>

            {/* Paragraph Text */}
            <div className="space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed">
              <p>
                When We Started This Company, The Goal Wasn't Just To Build Cutting-Edge Systems. It Was To Build A Team
                That Believes In Doing Meaningful Work. We Are Solving Hard Problems That Matter.
              </p>
              <p>
                Every Feature We Ship And Every Product We Launch Is A Step Toward Making The World Safer And Smarter.
                If You're Someone Who Thrives On Autonomy, Loves Solving Challenges, And Cares About Creating Real
                Impact,
              </p>
              <p className="font-semibold text-black">This Is The Place For You.</p>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="w-full max-w-lg mx-auto">
            <div className="w-full h-[25rem] bg-gray-200 overflow-hidden">
              <img
                src="/images/design-mode/hero-2-2.jpg"
                alt="Founder team photo"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
  
}

export default FounderNotePage
