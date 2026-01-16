"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

interface PanelData {
    id: string
    title: string
    subtitle: string
    icon: React.ReactNode
    features: string[]
    position: { top?: string; bottom?: string; left?: string; right?: string }
    connectorPath: string
}

export default function FenixFUI(): React.JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "center center"]
    })

    const drawProgress = useSpring(
        useTransform(scrollYProgress, [0.2, 0.8], [0, 1]),
        { stiffness: 50, damping: 20 }
    )

    const panels: PanelData[] = [
        {
            id: "mission",
            title: "MISSION SYSTEMS",
            subtitle: "Advanced Navigation",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                    <line x1="12" y1="2" x2="12" y2="6" />
                    <line x1="12" y1="18" x2="12" y2="22" />
                    <line x1="2" y1="12" x2="6" y2="12" />
                    <line x1="18" y1="12" x2="22" y2="12" />
                </svg>
            ),
            features: [
                "GPS Denied Navigation",
                "Semi Autonomous Mode",
                "P2P Autonomy",
                "Collision Prevention",
                "Turtle Mode",
                "Detection & Recognition Algorithms"
            ],
            position: { top: "15%", right: "8%" },
            connectorPath: "M 0 0 Q -100 0, -180 -30"
        },
        {
            id: "payload",
            title: "PAYLOAD SYSTEMS",
            subtitle: "Multi-Sensor Array",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="8" />
                    <path d="M12 8v8M8 12h8" />
                    <circle cx="12" cy="12" r="3" />
                    <line x1="4" y1="4" x2="7" y2="7" />
                    <line x1="20" y1="4" x2="17" y2="7" />
                    <line x1="4" y1="20" x2="7" y2="17" />
                    <line x1="20" y1="20" x2="17" y2="17" />
                </svg>
            ),
            features: [
                "High Resolution 4K Camera",
                "Thermal Imaging Camera",
                "LiDAR for Mapping"
            ],
            position: { top: "38%", left: "8%" },
            connectorPath: "M 0 0 Q 125 0, 220 -20"
        },
        {
            id: "communication",
            title: "COMMUNICATIONS",
            subtitle: "Secure Network",
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                    <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                    <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                    <circle cx="12" cy="20" r="1" />
                </svg>
            ),
            features: [
                "5 km LOS",
                "AES 256 Encrypted",
                "Mesh Network",
                "C2V"
            ],
            position: { bottom: "10%", right: "8%" },
            connectorPath: "M 0 0 Q -100 0, -180 30"
        }
    ]

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600&family=Inter:wght@400;500&family=Roboto+Mono:wght@300&display=swap');
        
        .fui-container {
            font-family: 'Inter', sans-serif;
        }
        
        .grid-overlay {
            background-image: 
            linear-gradient(rgba(229, 229, 229, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(229, 229, 229, 0.08) 1px, transparent 1px);
            background-size: 50px 50px;
        }
        
        .noise-texture {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
        }
        
        .drone-float {
            animation: float 4s ease-in-out infinite;
        }
        
        @keyframes pulse-line {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
        }
        
        .connector-pulse {
            animation: pulse-line 1.5s ease-in-out infinite;
        }
        `}</style>

            <div ref={containerRef} className="fui-container relative w-full min-h-screen bg-white py-24 px-4 md:px-8 overflow-hidden">
                {/* Grid Overlay */}
                <div className="grid-overlay absolute inset-0 pointer-events-none" />

                {/* Noise Texture */}
                <div className="noise-texture absolute inset-0 pointer-events-none" />

                {/* Main Content Container */}
                <div className="relative max-w-7xl mx-auto">

                    {/* Central Drone Image */}
                    <motion.div
                        className="relative z-10 w-full max-w-6xl mx-auto mb-16"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <img
                            src="/images/Fenix/fenix_backveiw.png"
                            alt="Fenix Tactical Drone"
                            className="w-full h-auto object-contain"
                            style={{
                                filter: "drop-shadow(0px 20px 60px rgba(0,0,0,0.15))"
                            }}
                        />
                    </motion.div>

                    {/* Interactive Panels */}
                    {panels.map((panel, index) => (
                        <motion.div
                            key={panel.id}
                            className="absolute z-20"
                            style={panel.position}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.8 + index * 0.15 }}
                        >
                            <div
                                className="relative bg-white border border-neutral-300 cursor-default"
                                style={{
                                    width: "280px",
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)"
                                }}
                            >
                                {/* Panel Content - Always Visible */}
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="text-[#5ce1e6]">
                                            {panel.icon}
                                        </div>
                                        <h3
                                            className="text-[17px] font-semibold tracking-[0.15em] uppercase text-[#5ce1e6]"
                                            style={{ fontFamily: "'Rajdhani', sans-serif" }}
                                        >
                                            {panel.title}
                                        </h3>
                                    </div>

                                    <div className="w-full h-[1px] bg-gradient-to-r from-[#5ce1e6] to-transparent mb-4 opacity-40" />

                                    <ul className="space-y-2">
                                        {panel.features.map((feature, idx) => (
                                            <li
                                                key={idx}
                                                className="text-[13px] leading-relaxed text-neutral-700 flex items-start"
                                            >
                                                <span className="text-neutral-400 mr-2">-</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* Connector Lines - Technical Drawing Style */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        style={{ zIndex: 15 }}
                        viewBox="0 0 1400 800"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        {/* Mission Systems (Top-Right) - Angular line to top sensor */}
                        <motion.path
                            d="M 1150 160 L 900 160 L 750 280"
                            stroke="#C9A063"
                            strokeWidth="1"
                            fill="none"
                            style={{ pathLength: drawProgress }}
                        />

                        {/* Payload Systems (Left) - Angular line to camera module */}
                        <motion.path
                            d="M 280 305 L 500 305 L 580 360"
                            stroke="#C9A063"
                            strokeWidth="1"
                            fill="none"
                            style={{ pathLength: drawProgress }}
                        />

                        {/* Communications (Bottom-Right) - Angular line to antenna */}
                        <motion.path
                            d="M 1150 650 L 900 650 L 800 520"
                            stroke="#C9A063"
                            strokeWidth="1"
                            fill="none"
                            style={{ pathLength: drawProgress }}
                        />

                        {/* Connection dots at drone contact points */}
                        <motion.circle
                            cx="750"
                            cy="280"
                            r="4"
                            fill="#C9A063"
                            style={{ scale: drawProgress, opacity: drawProgress }}
                        />
                        <motion.circle
                            cx="580"
                            cy="360"
                            r="4"
                            fill="#C9A063"
                            style={{ scale: drawProgress, opacity: drawProgress }}
                        />
                        <motion.circle
                            cx="800"
                            cy="520"
                            r="4"
                            fill="#C9A063"
                            style={{ scale: drawProgress, opacity: drawProgress }}
                        />
                    </svg>

                    {/* Decorative Diamond Elements */}
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 border border-[#5ce1e6] opacity-20 rotate-45" />
                    <div className="absolute bottom-1/3 right-1/4 w-2 h-2 border border-[#5ce1e6] opacity-20 rotate-45" />
                </div>

                {/* Vignette Effect */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: "radial-gradient(circle at center, transparent 50%, rgba(0,0,0,0.05) 100%)"
                    }}
                />
            </div>
        </>
    )
}
