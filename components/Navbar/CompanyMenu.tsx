"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

// --- "Sexy" & Synced 3D Animations ---

const MissionIcon = () => (
    <div className="w-14 h-14 lg:w-24 lg:h-24 relative flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full text-gray-800" fill="none" strokeWidth="0.8">
            {/* Central Core - Pulsing */}
            <motion.circle
                cx="50" cy="50" r="6"
                className="fill-[#5ce1e6] stroke-none"
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Core Glow */}
            <motion.circle
                cx="50" cy="50" r="12"
                className="fill-[#5ce1e6]/20 stroke-none"
                animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Orbital Ring 1 - Horizontal-ish */}
            <motion.ellipse
                cx="50" cy="50" rx="40" ry="12"
                stroke="currentColor"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            {/* Electron 1 */}
            <motion.circle
                r="3" fill="currentColor" className="text-gray-600"
                animate={{
                    x: [40, 0, -40, 0, 40],
                    y: [0, 12, 0, -12, 0],
                    scale: [1, 1.2, 0.8, 0.8, 1], // Pseudo-3D depth
                    zIndex: [10, 20, 0, 0, 10]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear", times: [0, 0.25, 0.5, 0.75, 1] }}
                style={{ x: 50, y: 50 }} // Relative to center
            />

            {/* Orbital Ring 2 - Tilted */}
            <motion.ellipse
                cx="50" cy="50" rx="40" ry="12"
                stroke="currentColor"
                initial={{ rotate: 60 }}
                animate={{ rotate: 420 }} // 60 + 360
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            {/* Orbital Ring 3 - Tilted Opposite */}
            <motion.ellipse
                cx="50" cy="50" rx="40" ry="12"
                stroke="currentColor"
                initial={{ rotate: -60 }}
                animate={{ rotate: 300 }} // -60 + 360
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
        </svg>
    </div>
)

const LeadershipIcon = () => (
    <div className="w-14 h-14 lg:w-24 lg:h-24 relative flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full text-gray-800" fill="none" strokeWidth="0.8">
            {/* Central Hub */}
            <motion.circle cx="50" cy="50" r="4" fill="currentColor" />

            {/* Rotating Network - Group 1 */}
            <motion.g animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ originX: "50px", originY: "50px" }}>
                <line x1="50" y1="50" x2="50" y2="20" stroke="currentColor" className="opacity-30" />
                <circle cx="50" cy="20" r="2" fill="currentColor" />

                <line x1="50" y1="50" x2="76" y2="65" stroke="currentColor" className="opacity-30" />
                <circle cx="76" cy="65" r="2" fill="currentColor" />

                <line x1="50" y1="50" x2="24" y2="65" stroke="currentColor" className="opacity-30" />
                <circle cx="24" cy="65" r="2" fill="currentColor" />
            </motion.g>

            {/* Rotating Network - Group 2 (Counter-Rotate) */}
            <motion.g animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} style={{ originX: "50px", originY: "50px" }}>
                <line x1="50" y1="50" x2="80" y2="50" stroke="currentColor" className="opacity-20" />
                <circle cx="80" cy="50" r="1.5" fill="currentColor" />

                <line x1="50" y1="50" x2="20" y2="50" stroke="currentColor" className="opacity-20" />
                <circle cx="20" cy="50" r="1.5" fill="currentColor" />
            </motion.g>

            {/* Interactive "Visionary" Node - Orbiting */}
            <motion.g animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} style={{ originX: "50px", originY: "50px" }}>
                <motion.circle
                    cx="50" cy="15" r="3"
                    className="fill-[#5ce1e6]"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
                <line x1="50" y1="50" x2="50" y2="15" stroke="url(#gradient-blue)" strokeDasharray="2 2" />
            </motion.g>

            <defs>
                <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#5ce1e6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#5ce1e6" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    </div>
)

const CultureIcon = () => (
    <div className="w-14 h-14 lg:w-24 lg:h-24 relative flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full text-gray-800" fill="none" strokeWidth="1">
            {/* 3D Rotating DNA Double Helix Structure */}

            {/* Loop through segments to create the twisted ladder effect */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => {
                const yPos = 20 + i * 10;
                // Staggered delay creates the "twist" in the helix
                const delay = i * -0.4;

                return (
                    <g key={i}>
                        {/* Connecting Hydrogen Bond (Rung) */}
                        {/* We use specific stroke-dasharray and offsets to simulate it disappearing behind */}
                        <motion.line
                            y1={yPos} y2={yPos}
                            stroke="currentColor"
                            strokeWidth="1"
                            animate={{
                                x1: [35, 65, 35],
                                x2: [65, 35, 65],
                                opacity: [0.2, 0.6, 0.2]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear",
                                delay: delay
                            }}
                        />

                        {/* Strand 1 Node (Blue) */}
                        <motion.circle
                            cy={yPos}
                            fill="currentColor"
                            className="text-[#5ce1e6]"
                            animate={{
                                cx: [30, 70, 30], // Left <-> Right
                                r: [2, 4.5, 2],   // Small (Back) <-> Large (Front)
                                opacity: [0.4, 1, 0.4]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear",
                                delay: delay
                            }}
                        />

                        {/* Strand 2 Node (Gray) - 180deg Out of Phase */}
                        <motion.circle
                            cy={yPos}
                            fill="currentColor"
                            className="text-gray-400 group-hover:text-[#5ce1e6] transition-colors"
                            animate={{
                                cx: [70, 30, 70], // Right <-> Left
                                r: [4.5, 2, 4.5], // Large (Front) <-> Small (Back)
                                opacity: [1, 0.4, 1]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear",
                                delay: delay
                            }}
                        />
                    </g>
                )
            })}
        </svg>
    </div>
)

const HistoryIcon = () => (
    <div className="w-14 h-14 lg:w-24 lg:h-24 relative flex items-center justify-center overflow-hidden">
        {/* Infinite Timeline Stream */}
        <div className="absolute inset-0 w-full h-full [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
            <motion.div
                className="w-full h-full flex flex-col items-center"
                animate={{ y: [-50, 0] }} // Loop from -50px to 0px
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
                {/* We create a repeating pattern that is tall enough to loop smoothly */}
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="flex items-center w-full h-[25px] justify-center relative">
                        {/* Center Line Segment */}
                        <div className="absolute top-0 bottom-0 w-px bg-gray-200" />

                        {/* Side Markers - Alternating */}
                        {i % 2 === 0 && (
                            <div className="absolute right-[52%] w-3 h-px bg-gray-300" />
                        )}
                        {i % 2 !== 0 && (
                            <div className="absolute left-[52%] w-3 h-px bg-gray-300" />
                        )}

                        {/* Special Milestones */}
                        {i % 5 === 0 && (
                            <div className="z-10 w-2 h-2 rounded-full border border-[#5ce1e6] bg-white" />
                        )}
                    </div>
                ))}
            </motion.div>
        </div>

        {/* Static Focus Cursor */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-px bg-[#5ce1e6]/30" />
            <div className="w-px h-6 bg-[#5ce1e6]/50" />
        </div>
    </div>
)


const menuItems = [
    {
        title: "Our Mission",
        subtitle: "BUILDING THE FUTURE",
        href: "/about#mission",
        icon: <MissionIcon />
    },
    {
        title: "Leadership",
        subtitle: "MEET OUR VISIONARY TEAM",
        href: "/leadership",
        icon: <LeadershipIcon />
    },
    {
        title: "Culture",
        subtitle: "UNFAIR ADVANTAGES",
        href: "/about#culture",
        icon: <CultureIcon />
    },
    {
        title: "History",
        subtitle: "THE JOURNEY TO EXCELLENCE",
        href: "/about#history",
        icon: <HistoryIcon />
    }
]

interface CompanyMenuProps {
    onClose: () => void;
}

export const CompanyMenu: React.FC<CompanyMenuProps> = ({ onClose }) => {
    return (
        <div className="flex flex-col xl:flex-row w-full h-auto xl:h-[50vh] bg-white text-black overflow-hidden relative shadow-2xl">
            {/* Left Side - Split Panel - 3 Equal Sections */}
            <div className="w-full xl:w-1/3 flex flex-col h-full border-r border-gray-200 relative z-20 shadow-lg">

                {/* Mobile Header: Back Button + Centered Title */}
                <div className="xl:hidden flex items-center justify-center relative w-full bg-white py-4 px-6 border-b border-gray-200 shrink-0">
                    <button
                        onClick={onClose}
                        className="absolute left-6 text-black hover:text-[#5ce1e6] text-[10px] font-orbit flex items-center gap-1 tracking-widest uppercase py-2"
                    >
                        <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                        BACK
                    </button>
                    <h2 className="text-xl font-bold tracking-tighter font-orbit text-center text-black">
                        COMPANY
                    </h2>
                </div>

                {/* Section 1: About Us - White - 1/3 height */}
                <Link href="/about" onClick={onClose} className="h-auto min-h-[120px] xl:h-1/3 xl:min-h-0 p-4 lg:p-6 bg-gray-50 hover:bg-gray-100 flex flex-col justify-center relative overflow-hidden group border-b border-gray-200 transition-colors">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#5ce1e6]/5 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5ce1e6] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10"
                    >
                        <h2 className="text-xl lg:text-3xl font-bold mb-1 lg:mb-2 tracking-tighter uppercase font-orbit">
                            <span className="text-black">About</span> <span className="text-[#5ce1e6] group-hover:text-[#5ce1e6] transition-colors">Us</span>
                        </h2>
                        <h3 className="text-[9px] lg:text-[10px] uppercase tracking-[0.3em] text-gray-400 group-hover:text-[#5ce1e6] transition-colors mb-2 font-mono font-semibold">Innovation Without Compromise</h3>
                        <p className="text-gray-600 group-hover:text-gray-800 transition-colors leading-relaxed text-xs lg:text-sm max-w-md font-light line-clamp-2 font-orbit">
                            Learn about Tsalla Aerospace's mission to revolutionize autonomous systems and create unfair advantages in modern warfare.
                        </p>
                    </motion.div>
                </Link>

                {/* Section 2: News - Black - 1/3 height */}
                <Link href="/news" onClick={onClose} className="h-auto min-h-[120px] xl:h-1/3 xl:min-h-0 bg-black text-white p-4 lg:p-6 flex flex-col justify-center relative group border-b border-white/10 hover:bg-zinc-900 transition-colors z-20">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5ce1e6] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-bottom" />
                    <h4 className="text-xl lg:text-2xl font-normal text-zinc-600 group-hover:text-white transition-colors mb-1 font-orbit">News</h4>
                    <div className="text-[9px] uppercase tracking-widest text-zinc-700 group-hover:text-[#5ce1e6] transition-colors mb-2 font-mono">The Latest From The Front.</div>
                    <p className="text-zinc-600 text-xs lg:text-sm leading-relaxed group-hover:text-zinc-400 transition-colors line-clamp-2">
                        Stay updated with our latest breakthroughs, mission highlights, and industry impact.
                    </p>
                </Link>

                {/* Section 3: Events - Black - 1/3 height */}
                <Link href="/events" onClick={onClose} className="h-auto min-h-[120px] xl:h-1/3 xl:min-h-0 bg-black text-white p-4 lg:p-6 flex flex-col justify-center relative group hover:bg-zinc-900 transition-colors z-20">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5ce1e6] scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
                    <h4 className="text-xl lg:text-2xl font-normal text-zinc-600 group-hover:text-white transition-colors mb-1 font-orbit">Events</h4>
                    <div className="text-[9px] uppercase tracking-widest text-zinc-700 group-hover:text-[#5ce1e6] transition-colors mb-2 font-mono">On The Ground.</div>
                    <p className="text-zinc-600 text-xs lg:text-sm leading-relaxed group-hover:text-zinc-400 transition-colors line-clamp-2">
                        Connect with us at global defense expos, tech summits, and hardware demonstrations.
                    </p>
                </Link>
            </div>

            {/* Right Side - Grid - Borders Fixed */}
            <div className="w-full xl:w-2/3 bg-white grid grid-cols-1 md:grid-cols-2 xl:grid-rows-2">
                {menuItems.map((item, index) => {
                    let borderClass = "border-gray-200"
                    if (index === 0) borderClass = "border-r border-b border-gray-200"
                    if (index === 1) borderClass = "border-b border-gray-200"
                    if (index === 2) borderClass = "border-r border-gray-200"
                    if (index === 3) borderClass = ""

                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            onClick={onClose}
                            className={`
                                relative bg-gray-100 hover:bg-white p-5 lg:p-8 pt-4 lg:pt-6 flex flex-col justify-between group hover:z-20 transition-all duration-500 ease-out overflow-hidden
                                ${borderClass}
                            `}
                        >
                            {/* Hover Overlay - Subtle Light Blue */}
                            <div className="absolute inset-0 bg-[#5ce1e6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Content */}
                            <div className="relative z-10 w-full">
                                <h4 className="text-xl lg:text-3xl font-light mb-2 group-hover:text-[#5ce1e6] transition-colors duration-300 font-orbit">{item.title}</h4>
                                <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-mono group-hover:text-black transition-colors delay-75">{item.subtitle}</p>
                            </div>

                            {/* Animated Icon - Positioned explicitly to avoid layout shift */}
                            <div className="relative z-10 mt-auto pt-4 flex justify-start opacity-70 group-hover:opacity-100 text-gray-400 group-hover:text-[#5ce1e6] transition-all duration-300 transform group-hover:scale-110 origin-center">
                                {item.icon}
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
