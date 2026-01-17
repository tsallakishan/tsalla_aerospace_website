"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ContentWrapper } from "@/components/ContentWrapper"

export default function ValuesSection() {
  const values = [
    {
      title: "Impact",
      description:
        "Everyone at Tsalla Aerospace has the ability to be a catalyst. You are encouraged to make your mark from day one and be supported every day after.",
      image:
        "https://cdn.sanity.io/images/z5s3oquj/production/3647a8b9537089b773eaa34114f918b87f2b8ab1-1295x864.jpg?auto=format&fit=max&w=1200&q=90",
    },
    {
      title: "Autonomy",
      description: "Self-motivation is vital. You’re empowered to act on your ideas — show, don’t tell.",
      image:
        "https://cdn.sanity.io/images/z5s3oquj/production/bbb0f40d0f389e428cfb75c2dece4ff485db0503-7892x5264.jpg?auto=format&fit=max&w=1200&q=90",
    },
    {
      title: "Speed",
      description: "We move fast. It’s not uncommon for an idea on Monday to be prototyped by Friday.",
      image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Culture",
      description: "We value curiosity, collaboration, and balance — building a safer tomorrow together.",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Innovation",
      description: "Innovation is in our DNA. We iterate, experiment, and evolve rapidly.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
    },
  ]

  const [selectedIndex, setSelectedIndex] = useState(0)
  const selected = values[selectedIndex]
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startAutoPlay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % values.length)
    }, 5000)
  }

  useEffect(() => {
    startAutoPlay()
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const handleTabClick = (index: number) => {
    setSelectedIndex(index)
    startAutoPlay()
  }

  return (
    <section className="bg-black text-white py-16 font-clash">
      <ContentWrapper>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Heading and description */}
          <div>
            <h2 className="text-white mb-4 uppercase tracking-widest text-4xl font-semibold font-clash">Our Key Values</h2>
            <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-gray-300 mb-6">
              Tsalla Aerospace is where visionaries and veterans converge to reimagine what's possible in flight and
              defense. We prototype by sunrise, refine by midnight, and never settle for ordinary. Shaped by lived
              experience and fearless innovation, our team transforms challenges into breakthroughs.
            </p>

            {/* Tabs */}
            {/* Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-2 w-full">
              {values.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleTabClick(index)}
                  className={`group relative px-4 py-3 border border-gray-700 text-sm md:text-base font-medium transition-all text-left overflow-hidden ${index === selectedIndex
                    ? "bg-neutral-800 text-white"
                    : "bg-black text-gray-400"
                    }`}
                >
                  <div className="absolute inset-0 bg-[#5ce1e6] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className={`relative z-10 transition-colors duration-300 group-hover:text-black ${index === selectedIndex ? 'text-white' : 'text-gray-400'}`}>
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Image + title + description */}
          <div className="relative h-[25rem] md:h-[31.25rem] w-full p-2 md:p-3 border border-transparent">
            {/* Top Left Corner */}
            <div className="absolute top-0 left-0 w-8 h-8 md:w-12 md:h-12 border-t-2 border-l-2 border-[#5ce1e6]" />

            {/* Bottom Right Corner */}
            <div className="absolute bottom-0 right-0 w-8 h-8 md:w-12 md:h-12 border-b-2 border-r-2 border-[#5ce1e6]" />

            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={selected.image || "/placeholder.svg"}
                alt={selected.title}
                fill
                className="object-cover brightness-125"
                priority
              />
              <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-6 md:p-8">
                <h3
                  key={selected.title + selectedIndex}
                  className="text-2xl md:text-3xl font-semibold border-b border-white pb-2 mb-4 animate-text-up"
                >
                  {selected.title}
                </h3>
                <p
                  key={selected.description + selectedIndex}
                  className="text-gray-200 text-base md:text-lg max-w-xl animate-text-up"
                  style={{ animationDelay: "0.1s" }}
                >
                  {selected.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </section>
  )
}
