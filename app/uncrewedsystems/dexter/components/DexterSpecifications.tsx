"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, ChevronDown } from "lucide-react"
import { ContentWrapper } from "@/components/ContentWrapper"

// --- Accordion Item Component ---
interface PayloadFeature {
  title: string
  whatItMeans: string
  keyBenefit: string
}

const PayloadAccordionItem = ({
  feature,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: {
  feature: PayloadFeature
  isOpen: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}) => (
  <div
    className="border-b border-gray-300 py-4 cursor-pointer"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-medium text-black">{feature.title}</h3>

      {/* Swap between + and - */}
      <motion.div
        initial={false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? (
          <Minus className="w-5 h-5 text-black" />
        ) : (
          <Plus className="w-5 h-5 text-black" />
        )}
      </motion.div>
    </div>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0, marginTop: 0 }}
          animate={{ height: "auto", opacity: 1, marginTop: "16px" }}
          exit={{ height: 0, opacity: 0, marginTop: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="text-gray-700 space-y-2 text-sm">
            <p>
              <span className="font-semibold">What it means:</span>{" "}
              {feature.whatItMeans}
            </p>
            <p>
              <span className="font-semibold">Key benefit:</span>{" "}
              {feature.keyBenefit}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
)

// --- Data ---
const categories = {
  ISR: {
    title: "ISR (Intelligence, Surveillance, Reconnaissance)",
    headline: "Advanced ISR Capabilities",
    subcategories: [
      { name: "EO Zoom Camera" },
      { name: "Thermal Camera" },
      { name: "Stabilized Gimbal" },
      { name: "Compact & Lightweight" },
    ],
    description: [
      {
        title: "EO Zoom Camera",
        whatItMeans:
          "A powerful daylight camera with smooth 40x zoom – combines 20x true optical zoom and 2x digital boost.",
        keyBenefit:
          "Wide-area coverage and stand-off detail with zero risk to the aircraft.",
      },
      {
        title: "Thermal Camera — 640x480",
        whatItMeans:
          "A high-resolution thermal sensor at the core of the gimbal – detects heat signatures invisible to the naked eye.",
        keyBenefit:
          "Reliable day/night situational awareness and thermal inspection in any environment.",
      },
      {
        title: "Stabilized Gimbal",
        whatItMeans: "Keeps imagery stable even in turbulent conditions.",
        keyBenefit: "Smooth and reliable footage for critical ISR operations.",
      },
      {
        title: "Compact & Lightweight",
        whatItMeans: "Designed for small UAVs without compromising capability.",
        keyBenefit: "Extends endurance and maximizes payload efficiency.",
      },
    ],
    image:
      "https://cdn.sanity.io/images/9w6n0tb6/production/f0f1a5dabcfec99d58024cd069b67a4644ae7d0f-1683x1560.png",
  },

  Mapping: {
    title: "High-Resolution Mapping",
    headline: "Precision Mapping & Surveying",
    subcategories: [
      { name: "61MP Sensor" },
      { name: "Remote Operation" },
      { name: "Compact Body" },
      { name: "Lens Options" },
    ],
    description: [
      {
        title: "61MP Full-Frame Sensor",
        whatItMeans: "Ultra-high resolution – captures extremely detailed still images.",
        keyBenefit:
          "You can fly higher or cover more area without losing image quality.",
      },
      {
        title: "Remote Operation (USB-C / LAN)",
        whatItMeans:
          "You can control the camera from a distance – trigger, change settings, transfer data.",
        keyBenefit: "Full automation or remote piloting – efficient workflows.",
      },
      {
        title: "Compact Body",
        whatItMeans: "Lightweight housing optimized for drone integration.",
        keyBenefit: "Minimizes drag and weight impact on flight performance.",
      },
      {
        title: "Lens Options",
        whatItMeans: "Interchangeable lenses for flexible mission profiles.",
        keyBenefit: "Adaptable to a variety of mapping and survey needs.",
      },
    ],
    image:
      "https://cdn.sanity.io/images/9w6n0tb6/production/3efb323c85cf4b1583dc48c6cb043329901ebf22-688x546.png",
  },

  Multispectral: {
    title: "Multispectral & Agricultural Analytics",
    headline: "Crop Health & Environmental Monitoring",
    subcategories: [
      { name: "Multi-Sensor Gimbal" },
      { name: "High-Resolution Capture" },
      { name: "Seamless Integration" },
    ],
    description: [
      {
        title: "Multi-Sensor Gimbal",
        whatItMeans:
          "A single, integrated payload combining a high-resolution RGB camera and a multispectral sensor.",
        keyBenefit:
          "Captures both visual and non-visible light data simultaneously, saving flight time and increasing efficiency.",
      },
      {
        title: "High-Resolution Capture",
        whatItMeans:
          "Captures clear, detailed images in both visual and multispectral bands.",
        keyBenefit:
          "Provides precise data for detailed crop analysis, disease detection, and plant counting.",
      },
      {
        title: "Seamless Integration",
        whatItMeans:
          "Works smoothly with existing drone systems and workflows.",
        keyBenefit:
          "Reduces setup time and simplifies field deployment.",
      },
    ],
    image:
      "https://cdn.sanity.io/images/9w6n0tb6/production/88fab3a74f0c1658a8e8e8d496f1ca06b00a05ac-616x726.png",
  },
}

export default function PayloadCategories() {
  const [active, setActive] = useState<keyof typeof categories>("Multispectral")
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [dropdownActive, setDropdownActive] = useState<keyof typeof categories | null>(null)

  const data = categories[active]

  return (
    <section className="font-clash-grotesk bg-white w-full min-h-screen py-12">
      <ContentWrapper>
        {/* Tabs */}
        <div className="flex justify-center relative">
          <div className="flex space-x-1 border border-black rounded-md p-1">
            {Object.keys(categories).map((key) => (
              <div
                key={key}
                className="relative group"
                onMouseEnter={() => {
                  setActive(key as keyof typeof categories)
                  setDropdownActive(key as keyof typeof categories)
                }}
                onMouseLeave={() => setDropdownActive(null)}
              >
                <button
                  className={`relative rounded-md px-4 py-2 text-sm font-medium transition flex items-center space-x-2 focus-visible:outline-2 text-black`}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  {/* Tab Title with underline */}
                  <span
                    className={`relative z-10 after:absolute after:bottom-0 after:left-0 after:h-[0.01rem] after:bg-black after:transition-all after:duration-300 after:w-0 group-hover:after:w-full ${
                      active === key ? "after:w-full" : ""
                    }`}
                  >
                    {categories[key as keyof typeof categories].title}
                  </span>

                  {/* Dropdown Arrow */}
                  <motion.span
                    className="relative z-10"
                    animate={{ rotate: dropdownActive === key ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {dropdownActive === key &&
                    categories[key as keyof typeof categories].subcategories && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-2 w-max bg-white border border-gray-200 rounded-md shadow-lg z-20 overflow-hidden"
                      >
                        <ul className="py-1 text-sm text-gray-700">
                          {categories[
                            key as keyof typeof categories
                          ].subcategories.map((sub, subIndex) => (
                            <li
                              key={subIndex}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                              <span className="font-medium">{sub.name}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
          >
            {/* Left: Fixed Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              className="w-full h-[400px] flex items-start justify-center rounded-lg overflow-hidden self-start"
            >
              <Image
                src={data.image}
                alt={data.headline}
                width={400}
                height={300}
                className="object-contain max-h-full"
              />
            </motion.div>

            {/* Right: Accordion */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: 0.4 }}
              className="self-start max-w-[400px]"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-black mb-6">
                {data.headline}
              </h2>
              <div className="space-y-4">
                {(data.description as PayloadFeature[]).map((feature, index) => (
                  <PayloadAccordionItem
                    key={index}
                    feature={feature}
                    isOpen={hoverIndex === index}
                    onMouseEnter={() => setHoverIndex(index)}
                    onMouseLeave={() => setHoverIndex(null)}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </ContentWrapper>
    </section>
  )
}
