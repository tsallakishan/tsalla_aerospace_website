import { ContentWrapper } from "@/components/ContentWrapper"
import { motion } from "framer-motion"

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
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
              style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}
            >
              A <span className="text-[#5ce1e6]">NOTE</span> FROM OUR
              <br />
              FOUNDER
            </motion.h1>

            {/* Paragraph Text */}
            <div className="space-y-6 text-lg md:text-xl font-light leading-relaxed text-neutral-600" style={{ fontFamily: "sans-serif" }}>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                When we started this company, the goal wasn't just to build cutting-edge systems. It was to build a team
                that believes in doing meaningful work. We are solving hard problems that matter.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Every feature we ship and every product we launch is a step toward making the world safer and smarter.
                If you're someone who thrives on autonomy, loves solving challenges, and cares about creating real
                impact,
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="font-semibold text-black"
              >
                This is the place for you.
              </motion.p>
            </div>
          </div>

          {/* Right Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full max-w-xl mx-auto relative p-4"
          >


            <div className="relative w-full h-[32rem] bg-gray-200 overflow-hidden group shadow-2xl">
              <img
                src="/images/design-mode/hero-2-2.jpg"
                alt="Founder team photo"
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default FounderNotePage
