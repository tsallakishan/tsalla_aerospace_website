"use client"
import React, { useState } from "react"
import type { FC } from "react"
import { motion } from "framer-motion"

interface CardData {
    title: string
    description: string
    icon: string
}

const perksData: CardData[] = [
    {
        title: "Comprehensive Health Coverage",
        description: "From Preventive Care To Emergencies, We've Got Your Back With Top-Tier Medical Insurance For Peace Of Mind.",
        icon: "health",
    },
    {
        title: "Wear What Works",
        description: "We Keep Things Relaxed And Idea-Focused. Just Come Dressed In A Way That's Comfortable And Office-Appropriate.",
        icon: "casual",
    },
    {
        title: "Pet-Friendly Environment",
        description: "Your Four-Legged Companions Are Welcome—Because Innovation Happens Best In Spaces That Feel Like Home.",
        icon: "pet",
    },
    {
        title: "Above-Market Compensation",
        description: "We Pay For Performance, Competitive Salaries Designed To Reflect Your Impact, Not Just Your Title.",
        icon: "compensation",
    },
]

const IconComponent: React.FC<{ type: string; size?: number }> = ({ type, size = 32 }) => {
    const icons: Record<string, React.ReactElement> = {
        health: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="white" />
                <path d="M12 8v5M9.5 10.5h5" stroke="#5ce1e6" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
        casual: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        pet: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.5 8.5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM16.5 8.5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" fill="white" />
                <path d="M5.5 11.5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM22.5 11.5c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z" fill="white" />
                <path d="M17.5 17.5c0 2.21-2.46 4-5.5 4s-5.5-1.79-5.5-4c0-1.38.62-2.5 2.5-2.5h6c1.88 0 2.5 1.12 2.5 2.5z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
        compensation: (
            <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8v8M8 12h8" stroke="#5ce1e6" strokeWidth="2" strokeLinecap="round" />
            </svg>
        ),
    }

    return icons[type] || icons.health
}

const FluidCard: React.FC<{
    card: CardData
    index: number
    isHovered: boolean
    onHover: () => void
    onLeave: () => void
    hasAnyHovered: boolean
}> = ({ card, index, isHovered, onHover, onLeave, hasAnyHovered }) => {
    // Determine card size based on hover state
    const getFlexValue = () => {
        if (!hasAnyHovered) return 1 // All equal when nothing hovered
        if (isHovered) return 2.5 // Expanded when this card is hovered
        return 0.6 // Shrunk when another card is hovered
    }

    return (
        <motion.div
            layout
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            className="relative h-[500px] overflow-hidden rounded-3xl cursor-pointer"
            style={{
                flex: getFlexValue(),
            }}
            transition={{
                layout: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
            }}
        >
            {/* Card Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/95 to-neutral-800/95 backdrop-blur-xl border border-white/10 rounded-3xl" />

            {/* Vertical accent line (blue gradient) - only show when hovered */}
            {isHovered && (
                <motion.div
                    initial={{ scaleY: 0, opacity: 0 }}
                    animate={{ scaleY: 1, opacity: 1 }}
                    exit={{ scaleY: 0, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-[#5ce1e6] to-transparent origin-center z-10"
                />
            )}

            {/* Content Container */}
            <div className="relative h-full flex flex-col justify-between p-8">
                {/* Icon - stays at top */}
                <motion.div
                    layout="position"
                    className="flex-shrink-0"
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                >
                    <motion.div
                        className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30"
                        animate={{
                            width: isHovered ? "80px" : "56px",
                            height: isHovered ? "80px" : "56px",
                        }}
                        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                    >
                        <IconComponent type={card.icon} size={isHovered ? 40 : 28} />
                    </motion.div>
                </motion.div>

                {/* Middle content - only show when hovered */}
                <motion.div
                    className="flex-1 flex flex-col justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: isHovered ? 0.2 : 0 }}
                >
                    {isHovered && (
                        <div className="space-y-6">
                            <p
                                className="text-gray-400 text-base leading-relaxed font-light"
                                style={{ fontFamily: "'Inter', sans-serif" }}
                            >
                                {card.description}
                            </p>

                            <button className="px-6 py-2.5 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-colors duration-300 text-sm">
                                Learn More
                            </button>
                        </div>
                    )}
                </motion.div>

                {/* Title - stays at bottom */}
                <motion.div
                    layout="position"
                    className="flex-shrink-0"
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                >
                    <motion.h3
                        className="text-white font-bold tracking-tight overflow-hidden"
                        animate={{
                            fontSize: isHovered ? "2rem" : hasAnyHovered ? "0.85rem" : "1.35rem",
                            lineHeight: isHovered ? "2.25rem" : hasAnyHovered ? "1rem" : "1.6rem",
                        }}
                        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                        style={{
                            fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif",
                            overflowWrap: "break-word",
                        }}
                    >
                        {card.title.split('.')[1]?.trim() || card.title}
                    </motion.h3>
                </motion.div>
            </div>

            {/* Hover Glow Effect */}
            <motion.div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                animate={{
                    background: isHovered
                        ? "linear-gradient(to bottom right, rgba(59, 130, 246, 0.05), rgba(168, 85, 247, 0.05))"
                        : "linear-gradient(to bottom right, rgba(59, 130, 246, 0), rgba(168, 85, 247, 0))"
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    )
}

export default function FluidBenefitsStack() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <section className="relative bg-black py-32 md:py-40 overflow-hidden">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 relative z-10 mb-20 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-[#5ce1e6] font-bold tracking-[0.3em] uppercase mb-4 block text-sm md:text-base"
                >
                    Benefits
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white mb-8"
                    style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}
                >
                    PERKS & BENEFITS
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-gray-400 max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    We're building the future of aerospace, and we want our team to have everything they need to flourish along the way.
                </motion.p>
            </div>

            {/* Fluid Card Stack */}
            <div className="max-w-5xl mx-auto px-6">
                <div className="flex gap-4 h-[540px]">
                    {perksData.map((card, index) => (
                        <FluidCard
                            key={index}
                            card={card}
                            index={index}
                            isHovered={hoveredIndex === index}
                            onHover={() => setHoveredIndex(index)}
                            onLeave={() => setHoveredIndex(null)}
                            hasAnyHovered={hoveredIndex !== null}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
