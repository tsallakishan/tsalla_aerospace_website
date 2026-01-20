"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface BatCurtainRevealProps {
    images?: string[]
    duration?: number
    staggerDelay?: number
    variant?: "small" | "medium" | "large"
    onComplete?: () => void
}

/**
 * BatCurtainReveal Component
 * 
 * A sophisticated preloader/reveal section with a sequential upward "curtain lift" animation.
 * Images are stacked and "peeled away" one by one to reveal underlying content.
 */
const BatCurtainReveal: React.FC<BatCurtainRevealProps> = ({
    images = [
        "/images/Bat/bat_wing.png",
        "/images/Bat/bat_sensor.png",
        "/images/design-mode/5775ccaf2c5cd09152a9dd145194077947d82a6a-1558x1781.jpg",
    ],
    duration = 1.2,
    staggerDelay = 0.8,
    onComplete,
}) => {
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        const totalDuration = (images.length * staggerDelay + duration) * 1000
        const timer = setTimeout(() => {
            setIsComplete(true)
            if (onComplete) onComplete()
        }, totalDuration)

        return () => clearTimeout(timer)
    }, [images.length, duration, staggerDelay, onComplete])

    return (
        <section className="relative overflow-hidden bg-black w-full h-screen font-clash-grotesk">
            {/* Background Base */}
            <div className="absolute inset-0 bg-black" />

            <div className="absolute inset-0 z-10 flex items-center justify-center">
                {images.map((img, index) => {
                    const isLast = index === images.length - 1;

                    return (
                        <motion.div
                            key={index}
                            initial={{ y: "120%", opacity: 0, scale: index === 1 ? 0.75 : 0.6 }}
                            animate={{
                                y: isLast ? ["120%", "0%", "0%"] : ["120%", "0%", "0%"],
                                opacity: isLast ? [0, 1, 1] : [0, 1, 0],
                                scale: isLast ? [0.6, 0.6, 1] : (index === 1 ? [0.75, 0.75, 0.75] : [0.6, 0.6, 0.6])
                            }}
                            transition={{
                                duration: isLast ? duration * 3 : duration * 2,
                                delay: 1.9 + (index * staggerDelay),
                                times: isLast ? [0, 0.4, 1] : [0, 0.5, 1],
                                ease: isLast
                                    ? ["easeOut", "easeInOut"]
                                    : ["easeOut", "easeIn"]
                            }}
                            className="absolute w-full h-full flex items-center justify-center"
                            style={{
                                zIndex: index + 1,
                                willChange: "transform, opacity"
                            }}
                        >
                            <div className={`relative overflow-hidden shadow-2xl ${isLast ? "w-full h-full" : (index === 1 ? "w-[75%] h-[75%]" : "w-[60%] h-[60%]")
                                }`}>
                                <Image
                                    src={img}
                                    alt={`Sequence ${index + 1}`}
                                    fill
                                    className={`${isLast ? "object-cover" : "object-contain"} brightness-[0.85]`}
                                />

                                {/* Stronger vignette for better text legibility */}
                                {isLast && (
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/60 opacity-60 pointer-events-none" />
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Permanent Title at Top */}
            <div className="absolute top-0 left-0 w-full z-20 pt-8 md:pt-10 flex flex-col items-center pointer-events-none px-6">
                <div className="text-center">
                    <h2 className="text-white text-2xl md:text-5xl lg:text-7xl font-medium tracking-tight leading-[0.9] uppercase" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
                        Battlefield Tactical <br />
                        <span style={{ color: '#5ce1e6' }}>Precision</span>
                    </h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{
                            delay: 0.5,
                            duration: 1.5,
                            ease: "circOut"
                        }}
                        className="h-[1px] bg-[#5ce1e6] mt-4 md:mt-6 mx-auto w-16 md:w-32"
                    />
                </div>
            </div>

            {/* Description Text at Bottom */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 1.9 + (images.length - 1) * staggerDelay + (duration * 2),
                    duration: 1.2,
                    ease: "easeOut"
                }}
                className="absolute bottom-8 md:bottom-12 left-0 w-full z-20 px-6 text-center pointer-events-none"
            >
                <p className="max-w-3xl mx-auto text-white font-light text-base md:text-xl leading-relaxed">
                    Optimized for rapid deployment and versatile reconnaissance, BAT delivers high-fidelity situational awareness
                    to the front lines, ensuring mission success in the most demanding environments.
                </p>
            </motion.div>

            <style jsx global>{`
                @import url('https://fonts.cdnfonts.com/css/clash-grotesk');
                .font-clash-grotesk {
                  font-family: 'Clash Grotesk', sans-serif;
                }
            `}</style>
        </section>
    )
}

export default BatCurtainReveal
