"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

const OPPOSE_ITEMS = [
    {
        title: "Design",
        description: "We start from first principles, architecting autonomous systems that redefine the physics of flight. Every line and every curve is engineered for extreme performance.",
        image: "/images/design-mode/08b50f4f-79c5-4ae5-b5bf-fa2fcfb0b544.jpg"
    },
    {
        title: "Build",
        description: "From carbon composites to custom PCBs, our team turns CAD into reality. We build hardware that survives the harshest environments on Earth and beyond.",
        image: "/images/design-mode/abb6bab613d7d967786b922562d07d61f60f873e-3840x2160.jpg"
    },
    {
        title: "Fly",
        description: "Launch. Navigate. Execute. Our autonomous flight controllers manage complex missions with millisecond precision, pushing the edge of what's possible in the sky.",
        image: "/images/design-mode/v-bat-7c.jpg"
    },
    {
        title: "Crash",
        description: "Failure is just data. We push our prototypes beyond their limits to find the breaking point. If we don't crash, we aren't innovating fast enough.",
        image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80"
    },
    {
        title: "Modify",
        description: "Analyze the debris. Iterate the code. Refine the structural integrity. We adapt our systems based on every flight, turning weaknesses into unfair advantages.",
        image: "/images/design-mode/759cf3b1631ac09f8787809500212d9914788964-4064x2286.jpg"
    },
    {
        title: "Repeat",
        description: "Relentless iteration is our heartbeat. We scale our breakthroughs across platforms, constantly evolving to stay one step ahead of the challenge.",
        image: "/images/design-mode/c30de4a3e1c213e28f4b49a5d01d81652fca6f51-1536x1024.png"
    }
]

const OpposingMotionReveal = () => {
    const containerRef = useRef<HTMLDivElement>(null)

    // Preload images for smooth performance
    React.useEffect(() => {
        OPPOSE_ITEMS.forEach((item) => {
            const img = new window.Image()
            img.src = item.image
        })
    }, [])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Faster, snappier transitions
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 40, // Increased from 20 for faster response
        damping: 30,
        restDelta: 0.001
    })

    return (
        <div ref={containerRef} className="relative h-[1200vh] bg-white">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {OPPOSE_ITEMS.map((item, index) => {
                    const sectionSize = 1 / OPPOSE_ITEMS.length
                    const start = index * sectionSize
                    const end = (index + 1) * sectionSize

                    // Transition timings - snappier window
                    const entryDone = start + sectionSize * 0.15
                    const exitStart = end - sectionSize * 0.15

                    // Consistently use [start, entryDone, exitStart, end] for all phases
                    const entranceValues = [start, entryDone, exitStart, end]

                    // Text motion: slide UP from bottom (140vh) to 0, then exit UP
                    const textY = useTransform(
                        smoothProgress,
                        entranceValues,
                        ["140vh", "0vh", "0vh", "-140vh"]
                    )

                    // Image motion: slide DOWN from top (-140vh) to 0, then exit DOWN
                    const imageY = useTransform(
                        smoothProgress,
                        entranceValues,
                        ["-140vh", "0vh", "0vh", "140vh"]
                    )

                    const opacity = useTransform(
                        smoothProgress,
                        entranceValues,
                        [0, 1, 1, 0]
                    )

                    // Cinematic Blur Effect: Clearing as it enters, blurring as it exits
                    const blurValue = useTransform(
                        smoothProgress,
                        entranceValues,
                        [20, 0, 0, 20]
                    )
                    const filter = useTransform(blurValue, (v) => `blur(${v}px)`)

                    // Breathing Scale Effect: Blossoming into focus
                    const scale = useTransform(
                        smoothProgress,
                        entranceValues,
                        [0.65, 1, 1, 0.65]
                    )

                    const isRepeat = item.title === "Repeat"

                    return (
                        <motion.div
                            key={index}
                            style={{ opacity }}
                            className={`absolute inset-0 w-full h-full flex flex-col md:flex-row items-center justify-center px-6 md:px-12 lg:px-20 py-12 transition-colors duration-500 ${isRepeat ? "bg-black" : "bg-white"}`}
                        >
                            {/* Text Column - 30% Width */}
                            <motion.div
                                style={{ scale, filter }}
                                className="w-full md:w-[30%] flex flex-col justify-center gap-2 z-10 items-start text-left"
                            >
                                <div className="flex flex-col gap-0">
                                    <span className="text-[#5ce1e6] text-xl md:text-2xl font-bold uppercase tracking-widest font-clash relative -top-16">
                                        How we work
                                    </span>
                                    <h2
                                        className={`text-6xl md:text-7xl lg:text-8xl font-bold uppercase leading-none tracking-tighter ${isRepeat ? "text-white" : "text-[#1a1a1a]"}`}
                                        style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}
                                    >
                                        {item.title}
                                    </h2>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="w-16 h-1 bg-[#5ce1e6]" />
                                    <p
                                        className={`text-lg md:text-xl lg:text-2xl font-light max-w-xl leading-relaxed ${isRepeat ? "text-neutral-300" : "text-neutral-600"}`}
                                        style={{ fontFamily: "sans-serif" }}
                                    >
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>

                            {/* Image Column - 70% Width */}
                            <motion.div
                                style={{ y: imageY, scale, filter }}
                                className="w-full md:w-[70%] h-[70vh] md:h-full relative flex items-center justify-center px-4 md:px-6 lg:px-10 py-4 md:py-2 mb-8 md:mb-0"
                            >
                                <div className="relative w-full h-full md:h-[95%] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] rounded-sm grayscale hover:grayscale-0 transition-all duration-1000">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover scale-110"
                                    />
                                </div>
                            </motion.div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}

export default OpposingMotionReveal
