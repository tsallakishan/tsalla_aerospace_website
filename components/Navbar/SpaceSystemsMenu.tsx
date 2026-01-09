"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Lock } from "lucide-react"

export const SpaceSystemsMenu = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="w-full h-full xl:h-[50vh] bg-black text-white overflow-hidden font-orbit flex flex-col xl:flex-row shadow-2xl border-b border-[#5ce1e6]/30 relative group">

            {/* --- Background Starfield --- */}
            <div className="absolute inset-0 z-0 bg-black">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#0b1026] via-black to-black opacity-80" />
                <motion.div
                    className="absolute inset-0 opacity-40 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"
                    animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                {/* Stars */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute bg-white rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: Math.random() * 2 + 1 + "px",
                            height: Math.random() * 2 + 1 + "px",
                        }}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
                    />
                ))}
            </div>

            {/* --- Left Panel: Navigation & Description --- */}
            <div className="relative z-10 w-full xl:w-1/3 p-8 lg:p-12 flex flex-col border-b xl:border-b-0 xl:border-r border-[#5ce1e6]/10 bg-gray-100 hover:bg-white transition-colors duration-500 justify-center shrink-0">
                {/* Mobile Header: Back Button + Centered Title */}
                <div className="xl:hidden flex items-center justify-center relative w-full mb-6">
                    <button
                        onClick={onClose}
                        className="absolute left-0 text-black hover:text-[#5ce1e6] font-bold text-[10px] font-orbit flex items-center gap-1 tracking-widest uppercase py-2"
                    >
                        <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                        BACK
                    </button>
                    <h2 className="text-xl font-bold tracking-tighter font-orbit text-center">
                        <span className="text-black">SPACE</span> <span className="text-[#5ce1e6]">SYSTEMS</span>
                    </h2>
                </div>

                {/* Desktop Title */}
                <h2 className="hidden xl:block text-5xl font-bold tracking-tighter mb-4 font-orbit">
                    <span className="text-black">SPACE</span> <span className="text-[#5ce1e6]">SYSTEMS</span>
                </h2>


                <p className="text-black text-sm lg:text-base leading-relaxed font-orbit mb-8 max-w-md">
                    Advanced unmanned systems engineered for superiority in the field. Every component designed for reliability, performance, and tactical advantage.
                </p>
            </div>

            {/* --- Right Panel: Hero / Visualization --- */}
            <div className="relative z-10 w-full xl:w-2/3 py-12 lg:py-0 flex-1 flex items-center justify-center overflow-hidden min-h-[400px] xl:min-h-0">

                {/* 3D Holographic Globe/Structure Animation */}
                <motion.div
                    className="relative w-48 h-48 lg:w-72 lg:h-72"
                    initial={{ rotateX: 20, rotateZ: -10 }}
                    animate={{ rotateZ: [-10, 10, -10] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                >
                    {/* Core Planet */}
                    <div className="absolute inset-0 rounded-full border border-[#5ce1e6]/20 shadow-[0_0_50px_rgba(92,225,230,0.1)] bg-black/80 backdrop-blur-md overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(92,225,230,0.2),_transparent)]" />

                        {/* Rotating Grid Lines Container */}
                        <motion.div
                            className="absolute inset-0"
                            animate={{ rotateY: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        >
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="absolute inset-0 rounded-full border border-[#5ce1e6]/10" style={{ transform: `rotateY(${i * 22.5}deg)` }} />
                            ))}
                        </motion.div>

                        {/* Horizontal Grid Line */}
                        <div className="absolute inset-0 rounded-full border border-[#5ce1e6]/10 transform rotate-90" />

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="text-[#5ce1e6] font-bold text-2xl lg:text-4xl tracking-[0.2em] text-center relative z-20"
                        >
                            COMING<br />SOON
                        </motion.div>
                    </div>

                    {/* Orbiting Rings - Outer */}
                    <motion.div
                        className="absolute inset-[-30%] rounded-full border border-[#5ce1e6]/20 border-dashed"
                        style={{ borderTopColor: 'transparent', borderBottomColor: 'transparent' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Orbiting Rings - Inner Tilt */}
                    <motion.div
                        className="absolute inset-[-15%] rounded-full border border-[#5ce1e6]/15"
                        style={{ borderLeftColor: 'transparent', borderRightColor: 'transparent' }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Satellites - Multi Path */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute top-[-25%] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#5ce1e6] rounded-full shadow-[0_0_15px_#5ce1e6]" />
                    </motion.div>

                    <motion.div
                        className="absolute inset-0"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute bottom-[-35%] left-1/4 w-1.5 h-1.5 bg-[#5ce1e6]/60 rounded-full shadow-[0_0_10px_#5ce1e6]" />
                    </motion.div>
                </motion.div>

                {/* Overlay UI Lines */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-12 left-12 w-32 h-[1px] bg-[#5ce1e6]/30" />
                    <div className="absolute bottom-12 right-12 w-32 h-[1px] bg-[#5ce1e6]/30" />
                </div>

            </div>
        </div>
    )
}
