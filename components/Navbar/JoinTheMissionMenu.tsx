"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

// --- "Sexy", Synced & Perfectly Contained 3D Icons ---

const OpenPositionsIcon = () => (
    <div className="w-14 h-14 lg:w-20 lg:h-20 relative flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full text-gray-800" fill="none" strokeWidth="1">
            {/* Base Target Circles - Centered & Contained */}
            <circle cx="50" cy="50" r="32" stroke="currentColor" className="opacity-20" strokeDasharray="3 3" />
            <circle cx="50" cy="50" r="18" stroke="currentColor" className="opacity-40" />
            <circle cx="50" cy="50" r="2" fill="currentColor" className="text-[#5ce1e6]" />

            {/* Rotating Radar Scan - Strictly Bounded */}
            <motion.g
                style={{ originX: "50px", originY: "50px" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
                <line x1="50" y1="50" x2="50" y2="18" stroke="url(#radar-gradient)" strokeWidth="1.5" />
                <path d="M50 50 L50 18 A 32 32 0 0 1 82 50 Z" fill="url(#sector-gradient)" className="opacity-10" />
            </motion.g>

            {/* Targets - Staying within r=32 */}
            <motion.circle cx="65" cy="35" r="1.5" className="fill-[#5ce1e6]"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
            />
            <motion.circle cx="35" cy="65" r="1.5" className="fill-[#5ce1e6]"
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />

            {/* Tech Markers - Safe Zone */}
            <path d="M30 30 L34 30 M30 30 L30 34" stroke="currentColor" strokeWidth="0.5" />
            <path d="M70 30 L66 30 M70 30 L70 34" stroke="currentColor" strokeWidth="0.5" />
            <path d="M30 70 L34 70 M30 70 L30 66" stroke="currentColor" strokeWidth="0.5" />
            <path d="M70 70 L66 70 M70 70 L70 66" stroke="currentColor" strokeWidth="0.5" />

            <defs>
                <linearGradient id="radar-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#5ce1e6" stopOpacity="0" />
                    <stop offset="100%" stopColor="#5ce1e6" stopOpacity="0.8" />
                </linearGradient>
                <radialGradient id="sector-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#5ce1e6" stopOpacity="0" />
                    <stop offset="100%" stopColor="#5ce1e6" stopOpacity="0.3" />
                </radialGradient>
            </defs>
        </svg>
    </div>
)

const EngineeringIcon = () => (
    <div className="w-14 h-14 lg:w-20 lg:h-20 relative flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full text-gray-800" fill="none" strokeWidth="1">
            {/* Isometric Cube - Scaled Down to prevent clipping */}
            <motion.g
                animate={{ rotateX: [0, 360], rotateY: [0, 360] }} // 3D Rotation
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{ originX: "50px", originY: "50px", perspective: 200 }}
            >
                {/* We simulate 3D rotation with 2D transforms for reliability across browsers where SVG 3D is flaky */}
                <motion.g animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} style={{ originX: "50px", originY: "50px" }} >
                    <path d="M50 25 L72 37 L72 63 L50 75 L28 63 L28 37 Z" stroke="currentColor" />
                    <path d="M50 50 L50 25" stroke="currentColor" className="opacity-50" />
                    <path d="M50 50 L72 63" stroke="currentColor" className="opacity-50" />
                    <path d="M50 50 L28 63" stroke="currentColor" className="opacity-50" />
                </motion.g>
            </motion.g>

            {/* Orbiting Satellite - Tighter Orbit */}
            <motion.circle
                cx="50" cy="20" r="2" fill="#5ce1e6"
                animate={{
                    rotate: 360
                }}
                style={{ originX: "50px", originY: "50px" }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            {/* Counter Orbit - Dashed */}
            <motion.circle
                cx="50" cy="50" r="30" stroke="currentColor" strokeDasharray="2 3" className="opacity-20"
                animate={{ rotate: -360 }}
                style={{ originX: "50px", originY: "50px" }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />
        </svg>
    </div>
)

const ResearchIcon = () => (
    <div className="w-14 h-14 lg:w-20 lg:h-20 relative flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full text-gray-800" fill="none" strokeWidth="1">
            {/* Concept: Aerodynamic Flow / Wind Tunnel Simulation (Aerospace Research) */}

            {/* Test Object (Sphere) */}
            <circle cx="50" cy="50" r="12" className="fill-[#5ce1e6]" />
            <circle cx="50" cy="50" r="16" stroke="currentColor" className="opacity-30" strokeDasharray="2 2" />

            {/* Flow Streamlines - Top */}
            <motion.path
                d="M10 30 Q 50 30 90 30"
                stroke="currentColor"
                fill="none"
                animate={{ d: ["M10 30 Q 50 20 90 30", "M10 30 Q 50 35 90 30", "M10 30 Q 50 20 90 30"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Particle on Top Streamline */}
            <motion.circle r="1.5" fill="currentColor"
                animate={{
                    offsetDistance: ["0%", "100%"]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ offsetPath: "path('M10 30 Q 50 20 90 30')" }}
            />

            {/* Flow Streamlines - Bottom */}
            <motion.path
                d="M10 70 Q 50 70 90 70"
                stroke="currentColor"
                fill="none"
                animate={{ d: ["M10 70 Q 50 80 90 70", "M10 70 Q 50 65 90 70", "M10 70 Q 50 80 90 70"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Particle on Bottom Streamline */}
            <motion.circle r="1.5" fill="currentColor"
                animate={{
                    offsetDistance: ["0%", "100%"]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                style={{ offsetPath: "path('M10 70 Q 50 80 90 70')" }}
            />

            {/* Middle Diverging Streams */}
            <motion.path
                d="M10 50 Q 30 50 50 38 Q 70 50 90 50"
                stroke="currentColor"
                className="opacity-50"
                animate={{ d: ["M10 50 Q 30 50 50 35 Q 70 50 90 50", "M10 50 Q 30 50 50 40 Q 70 50 90 50", "M10 50 Q 30 50 50 35 Q 70 50 90 50"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
                d="M10 50 Q 30 50 50 62 Q 70 50 90 50"
                stroke="currentColor"
                className="opacity-50"
                animate={{ d: ["M10 50 Q 30 50 50 65 Q 70 50 90 50", "M10 50 Q 30 50 50 60 Q 70 50 90 50", "M10 50 Q 30 50 50 65 Q 70 50 90 50"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
        </svg>
    </div>
)

const CultureIcon = () => (
    <div className="w-14 h-14 lg:w-20 lg:h-20 relative flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full text-gray-800" fill="none" strokeWidth="1">
            {/* Concept: Interconnected Hive / Synergy (Our Work Environment) */}

            <motion.g
                style={{ originX: "50px", originY: "50px" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
                {/* 3 Interlocking Hexagons/Circles representing Unity */}
                {[0, 120, 240].map((angle, i) => (
                    <g key={i} transform={`rotate(${angle} 50 50)`}>
                        <motion.circle
                            cx="50" cy="35" r="12"
                            stroke="currentColor"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 4, repeat: Infinity, delay: i * 1, ease: "easeInOut" }}
                        />
                        <circle cx="50" cy="35" r="3" fill={i === 0 ? "#3b82f6" : "currentColor"} className={i !== 0 ? "text-gray-400" : ""} />

                        {/* Connecting Lines to Center */}
                        <line x1="50" y1="50" x2="50" y2="47" stroke="currentColor" className="opacity-50" />
                    </g>
                ))}
            </motion.g>

            {/* Central Hub */}
            <circle cx="50" cy="50" r="5" fill="currentColor" className="text-gray-300" />
            <motion.circle
                cx="50" cy="50" r="8"
                stroke="currentColor"
                strokeDasharray="2 2"
                animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity } }}
                style={{ originX: "50px", originY: "50px" }}
            />
        </svg>
    </div>
)


const menuItems = [
    {
        title: "Open Positions",
        subtitle: "CURRENT OPPORTUNITIES",
        href: "/careers/open-positions",
        icon: <OpenPositionsIcon />
    },
    {
        title: "Engineering",
        subtitle: "BUILD THE FUTURE",
        href: "/careers/engineering",
        icon: <EngineeringIcon />
    },
    {
        title: "Research",
        subtitle: "ADVANCE THE SCIENCE",
        href: "/careers/research",
        icon: <ResearchIcon />
    },
    {
        title: "Culture",
        subtitle: "OUR WORK ENVIRONMENT",
        href: "/careers/culture",
        icon: <CultureIcon />
    }
]

interface JoinTheMissionMenuProps {
    onClose: () => void;
}

export const JoinTheMissionMenu: React.FC<JoinTheMissionMenuProps> = ({ onClose }) => {
    return (
        <div className="flex flex-col xl:flex-row w-full h-auto xl:h-[50vh] bg-white text-black overflow-hidden relative shadow-2xl">
            {/* Left Side - Black Panel */}
            <div className="w-full xl:w-1/3 bg-black text-white p-4 lg:p-12 flex flex-col justify-center relative overflow-hidden z-10 shadow-lg">
                {/* Background Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/10" />
                <div className="absolute right-0 top-0 h-full w-1 bg-white/10" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#5ce1e6]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10"
                >
                    {/* Mobile Header: Back Button + Centered Title */}
                    <div className="xl:hidden flex items-center justify-center relative w-full mb-6">
                        <button
                            onClick={onClose}
                            className="absolute left-0 text-white hover:text-[#5ce1e6] text-[10px] font-orbit flex items-center gap-1 tracking-widest uppercase py-2"
                        >
                            <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                            BACK
                        </button>
                        <h2 className="text-xl font-bold tracking-tighter font-orbit text-center">
                            JOIN THE <span className="text-[#5ce1e6]">MISSION</span>
                        </h2>
                    </div>

                    {/* Desktop Title */}
                    <h2 className="hidden xl:block text-5xl font-bold mb-4 tracking-tighter leading-none font-orbit">
                        Join the <br /> <span className="text-[#5ce1e6]">Mission</span>
                    </h2>
                    <h3 className="text-[9px] lg:text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-2 lg:mb-6 font-mono pl-1">Push The Boundaries</h3>

                    <p className="text-gray-400 leading-relaxed max-w-md mb-4 lg:mb-8 text-xs lg:text-sm font-light border-l-2 border-[#5ce1e6]/30 pl-4 lg:pl-6 font-orbit">
                        Join a team of innovators, engineers, and visionaries pushing the boundaries of what's possible in autonomous systems and aerospace technology.
                    </p>


                </motion.div>
            </div>

            {/* Right Side - Grid - Fixed Borders */}
            <div className="w-full xl:w-2/3 bg-white grid grid-cols-1 md:grid-cols-2 xl:grid-rows-2">
                {menuItems.map((item, index) => {
                    let borderClass = "border-gray-200"
                    // Border partition logic matching CompanyMenu
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
                                relative bg-gray-100 hover:bg-white px-4 lg:px-6 py-5 lg:py-12 pt-4 lg:pt-8 flex flex-col justify-start group hover:z-20 transition-all duration-500 ease-out text-left overflow-hidden
                                ${borderClass}
                            `}
                        >
                            {/* Hover Overlay - Subtle Light Blue */}
                            <div className="absolute inset-0 bg-[#5ce1e6]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Content */}
                            <div className="relative z-10 w-full transition-transform duration-300 group-hover:translate-x-1">
                                <h4 className="text-xl lg:text-3xl font-light mb-2 group-hover:text-[#5ce1e6] transition-colors duration-300 font-orbit">{item.title}</h4>
                                <p className="text-[9px] uppercase tracking-widest text-gray-400 font-mono group-hover:text-black transition-colors">{item.subtitle}</p>
                            </div>

                            {/* Animated Icon - Strictly positioned and contained */}
                            <div className="relative z-10 mt-4 lg:mt-6 flex justify-start opacity-70 group-hover:opacity-100 text-gray-800 group-hover:text-[#5ce1e6] transition-all duration-300 transform group-hover:scale-105 origin-center">
                                {item.icon}
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
