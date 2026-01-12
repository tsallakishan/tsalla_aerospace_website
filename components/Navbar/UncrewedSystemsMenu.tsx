"use client"

import React, { useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"
import { ArrowRight } from "lucide-react"

const cn = (...classes: (string | boolean | undefined | null)[]) => classes.filter(Boolean).join(' ');

interface HangarMenuProps {
    data: any
    hoveredUncrewedSystemDetails: any
    setHoveredUncrewedSystemDetails: (details: any) => void
    onClose: () => void
}

export const HangarMenu: React.FC<HangarMenuProps> = ({
    data,
    hoveredUncrewedSystemDetails,
    setHoveredUncrewedSystemDetails,
    onClose
}) => {
    const imageContainerRef = useRef<HTMLDivElement>(null)

    // 3D Tilt Values
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const tiltX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), { stiffness: 100, damping: 30 })
    const tiltY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), { stiffness: 100, damping: 30 })
    const ghostX = useTransform(mouseX, [-300, 300], [10, -10])
    const ghostY = useTransform(mouseY, [-300, 300], [10, -10])

    const handleDroneMouseMove = (e: React.MouseEvent) => {
        if (!imageContainerRef.current) return
        const rect = imageContainerRef.current.getBoundingClientRect()
        const x = e.clientX - (rect.left + rect.width / 2)
        const y = e.clientY - (rect.top + rect.height / 2)
        mouseX.set(x)
        mouseY.set(y)
    }

    const handleDroneMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
    }

    // GSAP for entrance animation (Simplified for performance)
    useEffect(() => {
        const { gsap }: any = window;
        if (!gsap || !imageContainerRef.current || !hoveredUncrewedSystemDetails) return;

        gsap.fromTo(imageContainerRef.current,
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
    }, [hoveredUncrewedSystemDetails?.headline]);

    return (
        <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-80px)] bg-black overflow-hidden relative">

            {/* Mobile Header: Integrated Back Button + Centered Title */}
            <div className="lg:hidden flex items-center justify-center relative w-full p-4 border-b border-white/10 bg-black shrink-0 z-50">
                <button
                    onClick={() => {
                        if (hoveredUncrewedSystemDetails) {
                            setHoveredUncrewedSystemDetails(null);
                        } else {
                            onClose();
                        }
                    }}
                    className="absolute left-4 text-white hover:text-[#5ce1e6] text-[10px] font-orbit flex items-center gap-1.5 tracking-widest uppercase py-2"
                >
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    BACK
                </button>
                <h2 className="text-xl font-bold tracking-tighter font-orbit text-center text-white">
                    HANGAR
                </h2>
            </div>

            {/* Left Side: System Registry */}
            <div className={cn(
                "w-full lg:w-[320px] bg-black/60 lg:border-r border-white/10 flex flex-col h-full relative z-20 transition-all duration-500",
                hoveredUncrewedSystemDetails ? "hidden lg:flex" : "flex"
            )}>
                <div className="p-4 lg:p-6 border-b border-white/5 flex justify-between items-center hidden">
                    <span className="text-[10px] text-[#5ce1e6]/40 uppercase tracking-[0.4em] font-orbit">System Registry</span>
                    <div className="flex gap-1">
                        <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 h-1 bg-[#5ce1e6] rounded-full" />
                        <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 h-1 bg-[#5ce1e6] rounded-full" />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                    {data.links.map((link: any, index: number) => {
                        const isActive = hoveredUncrewedSystemDetails?.headline === link.details.headline;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onMouseEnter={() => !window.matchMedia('(max-width: 1024px)').matches && setHoveredUncrewedSystemDetails({ ...link.details, href: link.href })}
                                onClick={() => {
                                    setHoveredUncrewedSystemDetails({ ...link.details, href: link.href });
                                    onClose();
                                }}
                                className={cn(
                                    "group relative flex items-center justify-between p-4 rounded-sm transition-all duration-300 border border-transparent cursor-pointer",
                                    isActive ? "bg-[#5ce1e6]/10 border-[#5ce1e6]/20" : "hover:bg-white/5"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="hangar-scanline"
                                        className="absolute inset-0 bg-gradient-to-r from-[#5ce1e6]/5 via-transparent to-transparent pointer-events-none"
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    />
                                )}

                                <div className="relative z-10">
                                    <div className={cn(
                                        "text-sm font-semibold tracking-widest transition-all duration-300 font-orbit uppercase",
                                        isActive ? "text-[#5ce1e6] translate-x-1" : "text-white/60 group-hover:text-white"
                                    )}>
                                        {link.name}
                                    </div>
                                    <div className="text-[9px] text-white/30 tracking-widest mt-0.5 uppercase font-orbit truncate max-w-[150px] lg:max-w-[180px]">
                                        {link.description}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {isActive && (
                                        <motion.div initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-[8px] text-[#5ce1e6]/60 font-mono">
                                            [ONLINE]
                                        </motion.div>
                                    )}
                                    <ArrowRight className={cn(
                                        "w-3 h-3 transition-all duration-300",
                                        isActive ? "text-[#5ce1e6]" : "text-white/20 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                                    )} />
                                </div>
                            </Link>
                        );
                    })}
                </div>


            </div>

            {/* Right Side: Main Display */}
            <div className={cn(
                "flex-1 relative overflow-hidden transition-all duration-700 flex flex-col",
                hoveredUncrewedSystemDetails ? "flex bg-[#0b4a9a]" : "hidden lg:flex bg-black"
            )}>
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px'
                        }}
                    />
                    <motion.div
                        animate={{ opacity: [0.1, 0.2, 0.1] }}
                        transition={{ duration: 5, repeat: Infinity }}
                        className="absolute inset-0 bg-[url('/blueprint-background.png')] bg-cover opacity-20 mix-blend-overlay"
                    />
                </div>

                <AnimatePresence mode="wait">
                    {hoveredUncrewedSystemDetails ? (
                        <motion.div
                            key={hoveredUncrewedSystemDetails.headline}
                            initial={{ opacity: 0, filter: "blur(10px) brightness(2)" }}
                            animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
                            exit={{ opacity: 0, filter: "blur(10px) brightness(0.5)" }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="flex-1 p-4 lg:p-12 relative flex flex-col pt-16 lg:pt-12 overflow-hidden"
                        >
                            {/* HUD Brackets */}
                            <div className="absolute top-4 lg:top-8 left-4 lg:left-8 w-8 h-8 lg:w-16 lg:h-16 border-t-2 border-l-2 border-[#5ce1e6]/30" />
                            <div className="absolute top-4 lg:top-8 right-4 lg:right-8 w-8 h-8 lg:w-16 lg:h-16 border-t-2 border-r-2 border-[#5ce1e6]/30" />
                            <div className="absolute bottom-4 lg:bottom-8 left-4 lg:left-8 w-8 h-8 lg:w-16 lg:h-16 border-b-2 border-l-2 border-[#5ce1e6]/30" />
                            <div className="absolute bottom-4 lg:bottom-8 right-4 lg:right-8 w-8 h-8 lg:w-16 lg:h-16 border-b-2 border-r-2 border-[#5ce1e6]/30" />



                            <div className="flex flex-col lg:flex-row flex-1 pt-2 lg:pt-12 items-center lg:items-start justify-start lg:justify-between gap-12 lg:gap-0">
                                <div className="w-full lg:w-1/2 z-20 text-center lg:text-left">
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                                        <h2 className="text-4xl lg:text-7xl font-bold tracking-tighter text-white mb-1 lg:mb-2 font-orbit group relative inline-block">
                                            {hoveredUncrewedSystemDetails.headline}
                                            <motion.div animate={{ width: ["0%", "100%", "0%"] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -bottom-1 left-0 h-[2px] bg-[#5ce1e6]/50" />
                                        </h2>
                                        <div className="text-[10px] lg:text-lg text-white/60 font-orbit leading-tight mb-4 lg:mb-10 max-w-sm lg:max-w-md uppercase tracking-widest mx-auto lg:mx-0" dangerouslySetInnerHTML={{ __html: hoveredUncrewedSystemDetails.subheadline }} />
                                    </motion.div>

                                    <div className="grid grid-cols-2 gap-2 lg:gap-4 max-w-xs lg:max-w-sm mx-auto lg:mx-0">
                                        {Object.entries(hoveredUncrewedSystemDetails.stats || {}).map(([key, val]: [string, any], i) => (
                                            <motion.div key={key} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + (i * 0.05) }}
                                                className="bg-white/[0.03] border border-white/10 p-2 lg:p-4 rounded-sm backdrop-blur-md group hover:border-[#5ce1e6]/40 transition-colors"
                                            >
                                                <div className="text-[8px] lg:text-xs text-white uppercase font-orbit mb-0.5 lg:mb-1 opacity-60">{key}</div>
                                                <div className="text-xs lg:text-xl text-white font-orbit group-hover:text-[#5ce1e6] transition-colors">{val}</div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="my-4 lg:my-12">
                                        <Link href={hoveredUncrewedSystemDetails.href || "#"}
                                            onClick={onClose}
                                            className="relative group inline-flex items-center px-6 lg:px-10 py-2.5 lg:py-4 bg-[#5ce1e6]/5 border border-[#5ce1e6]/20 text-[#5ce1e6] overflow-hidden transition-all duration-500 hover:bg-[#5ce1e6]/20 hover:border-[#5ce1e6] hover:shadow-[0_0_30px_rgba(92,225,230,0.3)]"
                                        >
                                            <motion.div className="absolute inset-0" initial={false}>
                                                <motion.div animate={{ left: ["0%", "100%", "100%", "0%", "0%"], top: ["0%", "0%", "100%", "100%", "0%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                                    className="absolute w-20 h-[1px] bg-[#5ce1e6] shadow-[0_0_8px_rgba(92,225,230,0.8)]"
                                                />
                                            </motion.div>
                                            <span className="relative z-10 text-[9px] lg:text-xs font-bold uppercase tracking-[0.3em] font-orbit">Initiate Mission</span>
                                            <ArrowRight className="relative z-10 ml-3 lg:ml-4 w-3 lg:w-4 h-3 lg:h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="w-full lg:w-1/2 relative flex items-center justify-center min-h-[180px] lg:min-h-[400px]" style={{ perspective: "1200px" }}>
                                    <motion.div animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.05, 0.12, 0.05], rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                        className="absolute w-[80%] h-[80%] lg:w-[90%] lg:h-[90%] border border-[#5ce1e6]/10 rounded-full"
                                    />

                                    <motion.div
                                        ref={imageContainerRef}
                                        onMouseMove={handleDroneMouseMove}
                                        onMouseLeave={handleDroneMouseLeave}
                                        style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
                                        className={cn(
                                            "relative z-10 w-full max-w-[320px] lg:mt-0 lg:max-w-xl group transition-transform duration-500 overflow-hidden rounded-lg lg:rounded-xl bg-white/[0.03] backdrop-blur-[4px] border border-white/10",
                                            hoveredUncrewedSystemDetails.headline === "BAT" && "lg:xl:-translate-y-20 lg:xl:-translate-x-12 lg:scale-110",
                                            hoveredUncrewedSystemDetails.headline === "DEXTER" && "lg:xl:-translate-y-16",
                                            (hoveredUncrewedSystemDetails.headline === "STORM" || hoveredUncrewedSystemDetails.headline === "FENIX") && "lg:xl:-translate-y-20"
                                        )}
                                    >
                                        <motion.div animate={{ top: ["-20%", "120%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 z-20 pointer-events-none">
                                            <div className="h-[2px] w-full bg-[#5ce1e6] shadow-[0_0_15px_rgba(92,225,230,0.8)]" />
                                            <div className="h-32 w-full bg-gradient-to-b from-[#5ce1e6]/20 to-transparent opacity-40" />
                                        </motion.div>

                                        <motion.img src={hoveredUncrewedSystemDetails.droneImage} alt="" style={{ x: ghostX, y: ghostY, translateZ: "-40px" }} className="absolute inset-0 w-full h-auto object-contain opacity-15 blur-md pointer-events-none" />

                                        <motion.img
                                            src={hoveredUncrewedSystemDetails.droneImage}
                                            alt={hoveredUncrewedSystemDetails.headline}
                                            style={{ translateZ: "40px", WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent)' }}
                                            animate={{ filter: ["invert(1) brightness(2)", "invert(1) brightness(2.5)", "invert(1) brightness(2)"] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                            className="w-full h-auto object-contain opacity-95 group-hover:opacity-100 transition-all duration-700 relative z-10"
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div key="idle" className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12 text-center relative">
                            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-xl z-20">
                                <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white mb-4 lg:mb-6 font-orbit uppercase">
                                    RESERVE <span className="text-[#5ce1e6]">HANGAR</span> ACTIVE
                                </h2>
                                <p className="text-sm lg:text-xl text-white/40 font-orbit leading-relaxed tracking-widest uppercase mb-8 lg:mb-0">
                                    {data?.description}
                                </p>
                                <div className="mt-6 lg:mt-10 flex gap-4 justify-center">
                                    <div className="w-2 h-2 bg-[#5ce1e6] rounded-full animate-ping" />
                                    <span className="text-[8px] lg:text-[10px] text-[#5ce1e6]/60 uppercase tracking-[0.4em] font-orbit">Awaiting Selection</span>
                                </div>
                            </motion.div>

                            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                                <svg viewBox="0 0 200 200" className="w-full max-w-[300px] lg:max-w-[500px] h-auto text-[#5ce1e6]">
                                    <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
                                    <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
                                    <motion.line x1="100" y1="100" x2="100" y2="20" stroke="currentColor" strokeWidth="1" animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} style={{ originX: "100px", originY: "100px" }} />
                                </svg>
                            </div>
                        </div>
                    )}
                </AnimatePresence>

                <div className="absolute bottom-4 left-0 right-0 px-6 lg:px-12 flex justify-between items-center pointer-events-none opacity-20 z-30">
                    <div className="text-[5px] lg:text-[6px] text-[#5ce1e6] font-mono tracking-[0.3em] uppercase">
                        system_integrity: 100% | core_temp: 34c | uplink_strength: 98%
                    </div>
                    <div className="text-[5px] lg:text-[6px] text-[#5ce1e6] font-mono tracking-[0.3em] uppercase hidden sm:block">
                        uncrewed_registry_v2.0.4
                    </div>
                </div>
            </div>
        </div>
    )
}
