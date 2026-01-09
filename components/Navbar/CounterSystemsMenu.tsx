"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Activity } from "lucide-react"

// --- Custom Animated Icons for Each System ---

const AntiDroneIcon = ({ isHovered }: { isHovered: boolean }) => (
    <div className="w-12 h-12 relative flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#5ce1e6]" fill="none" strokeWidth="1.5">
            {/* Drone Silhouette */}
            <path d="M20 40 L40 50 L60 50 L80 40 M30 50 L30 60 M70 50 L70 60" stroke="currentColor" className="opacity-80" />
            <circle cx="20" cy="40" r="8" className="animate-spin-slow" strokeDasharray="2 2" />
            <circle cx="80" cy="40" r="8" className="animate-spin-slow" strokeDasharray="2 2" />

            {/* Crosshair / Targeting System */}
            <motion.g
                animate={isHovered ? { rotate: 90, scale: 0.8 } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="origin-center"
            >
                <circle cx="50" cy="50" r="25" stroke="currentColor" strokeDasharray="4 4" className={isHovered ? "text-red-500" : "text-[#5ce1e6]"} />
                <line x1="50" y1="20" x2="50" y2="35" stroke="currentColor" />
                <line x1="50" y1="80" x2="50" y2="65" stroke="currentColor" />
                <line x1="20" y1="50" x2="35" y2="50" stroke="currentColor" />
                <line x1="80" y1="50" x2="65" y2="50" stroke="currentColor" />
            </motion.g>

            {/* Lock Effect */}
            <motion.circle
                cx="50" cy="50" r="40"
                stroke="currentColor"
                initial={{ opacity: 0, scale: 1.2 }}
                animate={isHovered ? { opacity: [0, 1, 0], scale: 1 } : { opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-red-500"
            />
        </svg>
    </div>
)

const DetectionIcon = ({ isHovered }: { isHovered: boolean }) => (
    <div className="w-12 h-12 relative flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#5ce1e6]" fill="none" strokeWidth="1.5">
            {/* Radar Dish Base */}
            <path d="M30 70 Q 50 90 70 70" stroke="currentColor" />
            <line x1="50" y1="80" x2="50" y2="50" stroke="currentColor" />
            <circle cx="50" cy="50" r="3" fill="currentColor" />

            {/* Emitting Waves */}
            {[1, 2, 3].map((i) => (
                <motion.path
                    key={i}
                    d={`M${50 - i * 10} ${50 - i * 5} Q 50 ${50 - i * 15} ${50 + i * 10} ${50 - i * 5}`}
                    stroke="currentColor"
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                />
            ))}

            {/* Scanning Sector */}
            <motion.path
                d="M50 50 L20 20 A 45 45 0 0 1 80 20 Z"
                fill="url(#scan-gradient)"
                className="opacity-20"
                animate={{ rotate: [30, -30, 30] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ originX: "50px", originY: "50px" }}
            />
            <defs>
                <linearGradient id="scan-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#5ce1e6" stopOpacity="0" />
                    <stop offset="100%" stopColor="#5ce1e6" stopOpacity="0.8" />
                </linearGradient>
            </defs>
        </svg>
    </div>
)

const JammingIcon = ({ isHovered }: { isHovered: boolean }) => (
    <div className="w-12 h-12 relative flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#5ce1e6]" fill="none" strokeWidth="1.5">
            {/* Central Power Core */}
            <motion.circle
                cx="50" cy="50" r="8"
                className="text-[#5ce1e6]"
                fill="currentColor"
                animate={isHovered ? { r: [8, 10, 8], opacity: [0.8, 1, 0.8] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
            />

            {/* 3D Rotating Shield Rings */}
            <motion.ellipse
                cx="50" cy="50" rx="35" ry="15"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ originX: "50px", originY: "50px" }}
                className="opacity-70"
            />
            <motion.ellipse
                cx="50" cy="50" rx="35" ry="15"
                stroke="currentColor"
                strokeWidth="1"
                fill="none"
                animate={isHovered ? { rotate: -360 } : { rotate: 90 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ originX: "50px", originY: "50px" }}
                className="opacity-70"
            />

            {/* Glitch/Noise Lines interrupting signals */}
            {isHovered && Array.from({ length: 4 }).map((_, i) => (
                <motion.path
                    key={i}
                    d={`M${50} ${50} L${50 + (i % 2 === 0 ? 40 : -40)} ${50 + (i < 2 ? -30 : 30)}`}
                    stroke={i % 2 === 0 ? "#fbbf24" : "currentColor"}
                    strokeDasharray="4 2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 0.2, repeat: Infinity, delay: i * 0.15, repeatDelay: Math.random() * 0.5 }}
                />
            ))}

            {/* Outer Static Field */}
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeDasharray="2 4" className="opacity-30" />
        </svg>
    </div>
)

const KineticIcon = ({ isHovered }: { isHovered: boolean }) => (
    <div className="w-12 h-12 relative flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full text-[#5ce1e6]" fill="none" strokeWidth="1.5">
            {/* Target (Drone) */}
            <motion.circle
                cx="20" cy="20" r="5"
                fill="none"
                stroke="currentColor"
                className="opacity-60"
                animate={isHovered ? { cx: [20, 80], cy: [20, 80], opacity: [1, 0], scale: [1, 2] } : {}}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Turret Base */}
            <path d="M40 80 L60 80 L55 60 L45 60 Z" fill="currentColor" className="opacity-40" />

            {/* Rotating Turret Head & Projectile */}
            <motion.g
                style={{ originX: "50px", originY: "70px" }}
                animate={isHovered ? { rotate: [0, 45, 0] } : { rotate: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <rect x="48" y="55" width="4" height="15" fill="currentColor" />

                {/* Firing Beam/Projectile */}
                {isHovered && (
                    <motion.line
                        x1="50" y1="55" x2="50" y2="10"
                        stroke="#fbbf24"
                        strokeWidth="2"
                        strokeDasharray="10 10"
                        initial={{ y2: 55, opacity: 0 }}
                        animate={{ y2: -20, opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.1 }}
                    />
                )}
            </motion.g>

            {/* Impact debris */}
            {isHovered && (
                <motion.g animate={{ x: 60, y: 60, opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}>
                    <circle r="2" fill="#ef4444" />
                    <line x1="0" y1="0" x2="5" y2="5" stroke="#ef4444" />
                    <line x1="0" y1="0" x2="-5" y2="5" stroke="#ef4444" />
                </motion.g>
            )}
        </svg>
    </div>
)


const systems = [
    {
        id: "anti-drone",
        title: "ANTI-DRONE",
        subtitle: "Advanced counter-drone systems",
        status: "ACTIVE",
        metricLabel: "Threat Neutralization",
        metricValue: "99.7%",
        href: "/countersystems/anti-drone",
        icon: AntiDroneIcon,
        description: "Kinetic and non-kinetic interdiction capabilities."
    },
    {
        id: "detection",
        title: "Detection Systems",
        subtitle: "Early threat identification",
        status: "SCANNING",
        metricLabel: "Detection Range",
        metricValue: "5km",
        href: "/countersystems/detection",
        icon: DetectionIcon,
        description: "Multi-modal sensor fusion for redundant tracking."
    },
    {
        id: "jamming",
        title: "Jamming Technology",
        subtitle: "Signal disruption capabilities",
        status: "READY",
        metricLabel: "Disruption Rate",
        metricValue: "100%",
        href: "/countersystems#jamming",
        icon: JammingIcon,
        description: "Full-spectrum RF denial and link severance."
    },
    {
        id: "kinetic",
        title: "Kinetic Solutions",
        subtitle: "Physical threat neutralization",
        status: "ARMED",
        metricLabel: "Intercept Success",
        metricValue: "98.2%",
        href: "/countersystems#kinetic",
        icon: KineticIcon,
        description: "Hard-kill options for terminal phase defense."
    }
]

interface CounterSystemsMenuProps {
    onClose: () => void;
}

export const CounterSystemsMenu: React.FC<CounterSystemsMenuProps> = ({ onClose }) => {
    const [hoveredSystem, setHoveredSystem] = useState<string | null>(null);

    return (
        <div className="relative w-full h-auto xl:h-[50vh] bg-black text-white overflow-hidden font-orbit flex flex-col shadow-2xl border-b border-[#5ce1e6]/30/50">
            {/* --- Background Layers --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Tactical Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] opacity-20" />
                {/* Random Particles */}
                <motion.div
                    className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"
                    animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                {/* Radar Sweep Overlay */}
                <motion.div
                    className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_340deg,rgba(59,130,246,0.1)_360deg)] opacity-10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* --- Header Section --- */}
            <div className="relative z-10 px-8 py-4 lg:px-12 lg:py-4 border-b border-white/10 flex items-center justify-center backdrop-blur-sm shrink-0">
                {/* Mobile Header: Back Button + Centered Title */}
                <div className="xl:hidden flex items-center justify-center relative w-full">
                    <button
                        onClick={onClose}
                        className="absolute left-0 text-white hover:text-[#5ce1e6] text-[10px] font-orbit flex items-center gap-1 tracking-widest uppercase py-2"
                    >
                        <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                        BACK
                    </button>
                    <h2 className="text-xl font-bold tracking-tighter text-center">
                        <span className="text-white">COUNTER</span> <span className="text-[#5ce1e6]">SYSTEMS</span>
                    </h2>
                </div>

                {/* Desktop Header */}
                <div className="hidden xl:block relative w-full text-left">
                    <h2 className="text-3xl font-bold tracking-tighter">
                        <span className="text-white">COUNTER</span> <span className="text-[#5ce1e6]">SYSTEMS</span>
                    </h2>
                </div>
            </div>

            {/* --- Main Content Grid --- */}
            <div className="relative z-10 flex-1 px-8 py-2 lg:px-12 lg:py-4 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 h-full">
                    {systems.map((system, index) => (
                        <Link
                            key={system.id}
                            href={system.href}
                            onClick={onClose}
                            className="h-full"
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                className="group h-full relative"
                                onMouseEnter={() => setHoveredSystem(system.id)}
                                onMouseLeave={() => setHoveredSystem(null)}
                                style={{ perspective: "1000px" }}
                            >
                                {/* Card Container with 3D and Glass effects */}
                                <motion.div
                                    className={`
                                    h-full flex flex-col justify-between p-4 bg-black/40 border-2 border-white/30 backdrop-blur-md 
                                    transition-all duration-300 ease-out relative overflow-hidden clip-path-hex
                                    group-hover:bg-[#5ce1e6]/10/20 group-hover:border-[#5ce1e6]/70 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]
                                `}
                                    whileHover={{ scale: 1.01, z: 10 }}
                                >
                                    {/* Decorative Corner Accents */}
                                    <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/20 group-hover:border-[#5ce1e6] transition-colors" />
                                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/20 group-hover:border-[#5ce1e6] transition-colors" />

                                    {/* Header: Icon + Status */}
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-[#5ce1e6]/30 group-hover:bg-[#5ce1e6]/10 transition-colors">
                                            <div className="scale-75 origin-top-left">
                                                <system.icon isHovered={hoveredSystem === system.id} />
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className={`w-1 h-1 rounded-full ${hoveredSystem === system.id ? "bg-[#5ce1e6] animate-ping" : "bg-[#5ce1e6]/30"}`} />
                                            <span className="text-[9px] font-mono tracking-widest text-[#5ce1e6] group-hover:text-[#5ce1e6]">{system.status}</span>
                                        </div>
                                    </div>

                                    {/* Main Text */}
                                    <div>
                                        <h3 className="text-lg font-bold mb-1 group-hover:text-[#5ce1e6] transition-colors tracking-wide">{system.title}</h3>
                                        <p className="text-[9px] text-white/70 font-mono tracking-widest uppercase mb-2">{system.subtitle}</p>
                                        <p className="text-[10px] text-white/80 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                                            {system.description}
                                        </p>
                                    </div>

                                    {/* Footer: Metrics */}
                                    <div className="mt-auto pt-3 border-t border-white/5 group-hover:border-[#5ce1e6]/20 transition-colors">
                                        <div className="flex justify-between items-end">
                                            <div className="text-[8px] text-gray-500 uppercase tracking-wider">{system.metricLabel}</div>
                                            <div className="text-base font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 group-hover:from-[#5ce1e6] group-hover:to-[#5ce1e6] transition-all">
                                                {system.metricValue}
                                            </div>
                                        </div>
                                        {/* Animated Bar Graph - Immediate on Hover */}
                                        <div className="w-full h-0.5 bg-gray-800 mt-2 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-[#5ce1e6]"
                                                initial={{ width: "60%" }}
                                                animate={hoveredSystem === system.id ? { width: "100%" } : { width: "60%" }}
                                                transition={{ duration: 0.3, ease: "easeOut" }}
                                            />
                                        </div>
                                    </div>

                                    {/* Holographic Scan Line Effect on Hover */}
                                    <motion.div
                                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-blue-500/5 to-transparent pointer-events-none"
                                        initial={{ y: "-100%" }}
                                        animate={hoveredSystem === system.id ? { y: "200%" } : { y: "-100%" }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                </motion.div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
