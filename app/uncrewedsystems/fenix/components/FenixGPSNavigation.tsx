"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

export default function FenixGPSNavigation(): React.JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    // Expanded Animation range for the wipe transition (makes it much slower)
    const wipeRange = [0.15, 0.85]

    // Simple White Line moving from Right (100vw) to Left (0vw)
    const splitLineX = useTransform(smoothProgress, wipeRange, ["100vw", "0vw"])
    const splitLineOpacity = useTransform(smoothProgress, [0.1, 0.15, 0.85, 0.9], [0, 1, 1, 0])

    // Masking values for the text wipe
    const wipePercent = useTransform(smoothProgress, wipeRange, [100, 0])

    // Using current wipe direction: Right to Left
    // Phase 1 (Old) is revealed on the left side of the moving line
    const text2Clip = useTransform(wipePercent, (v) => `inset(0 ${100 - v}% 0 0)`)
    // Phase 2 (New) is revealed on the right side of the moving line
    const text1Clip = useTransform(wipePercent, (v) => `inset(0 0 0 ${v}%)`)

    // Visual Transitions
    const bgColor = useTransform(
        smoothProgress,
        [0, 0.4, 0.6, 1],
        ["#0a0a0a", "#050505", "#0a0a0a", "#000000"]
    )

    // Dynamic Color Transitions for the Drone Light
    // Transition from Red to Blue (#5ce1e6) as the scan line passes 50%
    const lightColorPrimary = useTransform(smoothProgress, [0.49, 0.51], ["#ef4444", "#5ce1e6"])
    const lightColorSecondary = useTransform(smoothProgress, [0.49, 0.51], ["#dc2626", "#5ce1e6"])
    const lightShadowColor = useTransform(smoothProgress, [0.49, 0.51], ["#ff0000", "#5ce1e6"])
    const ambientGlowColor = useTransform(smoothProgress, [0.49, 0.51], ["rgba(239, 68, 68, 0.25)", "rgba(92, 225, 230, 0.25)"])
    const spillColor = useTransform(smoothProgress, [0.49, 0.51], ["rgba(239, 68, 68, 0.4)", "rgba(92, 225, 230, 0.4)"])

    // Scale and Opacity
    const redGlowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.6, 1, 0.8])
    const redGlowScale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.2, 1])
    const droneScale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1.1, 1])

    return (
        <section ref={containerRef} className="relative h-[400vh] overflow-clip select-none">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap');
                .font-inter { font-family: 'Inter', sans-serif; }
                .text-wipe-container {
                    display: grid;
                    grid-template-areas: "stack";
                    place-items: center;
                }
                .text-wipe-item {
                    grid-area: stack;
                }
            `}</style>

            <motion.div
                style={{ backgroundColor: bgColor }}
                className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
            >
                {/* Background Grid Elements */}
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
                </div>

                {/* Simple Full-Height Scan Line (Moving Right to Left) */}
                <motion.div
                    style={{ left: splitLineX, opacity: splitLineOpacity }}
                    className="absolute top-0 bottom-0 w-[1.5px] bg-white z-[100] shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                />

                {/* Subtle Global Ambient Glow */}
                <motion.div
                    style={{
                        opacity: useTransform(smoothProgress, [0.5, 1], [0, 0.1]),
                        backgroundColor: lightColorSecondary
                    }}
                    className="absolute inset-0 blur-[150px] z-0"
                />

                {/* Text Content Layer */}
                <div className="relative z-30 w-full max-w-5xl px-8 text-center flex flex-col items-center h-[40vh] pt-20">
                    <div className="relative w-full h-full text-wipe-container">

                        {/* PHASE 1 TEXT (NO GPS) */}
                        <motion.div
                            style={{ clipPath: text2Clip }}
                            className="text-wipe-item flex flex-col items-center w-full"
                        >
                            <h3 className="text-white text-4xl md:text-6xl font-bold tracking-tight mb-6 font-inter" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
                                No GPS ? <span className="text-emerald-400">No problem!</span>
                            </h3>
                            <p className="text-lg md:text-xl max-w-2xl font-light leading-relaxed text-neutral-600">
                                Reliable positioning without GPS using SLAM, sensor fusion, and real-time mapping built for tunnels, urban canyons, and signal-jammed zones.
                            </p>
                        </motion.div>

                        {/* PHASE 2 TEXT (LIGHTING) */}
                        <motion.div
                            style={{ clipPath: text1Clip }}
                            className="text-wipe-item flex flex-col items-center w-full"
                        >
                            <h3 className="text-white text-4xl md:text-6xl font-bold tracking-tight mb-6 font-inter" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
                                Navigation <span style={{ color: '#5ce1e6' }}>Lighting</span>
                            </h3>
                            <p className="text-lg md:text-xl max-w-2xl font-light leading-relaxed text-neutral-600">
                                Integrated illumination for dark environments — optimized for pathfinding, obstacle avoidance, and operational safety without compromising stealth.
                            </p>
                        </motion.div>
                    </div>
                </div>

                {/* Drone Visual Center */}
                <div className="relative z-20 w-full max-w-6xl aspect-[21/9] flex items-center justify-center">
                    <motion.div
                        style={{ scale: droneScale }}
                        className="relative w-full h-full flex items-center justify-center"
                    >
                        {/* THE DRONE IMAGE */}
                        <img
                            src="/images/Fenix/gps.png"
                            alt="Fenix Mission Status"
                            className="w-[80%] h-auto object-contain z-10 filter drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]"
                        />

                        {/* DYNAMIC VOLUMETRIC GLOW (Top Button) */}
                        <div className="absolute top-[37%] left-[50%] -translate-x-1/2 -translate-y-[15px] z-20 flex items-center justify-center">

                            {/* NEW: Top Dome Glow (The "little circle" on top) */}
                            <motion.div
                                style={{
                                    opacity: useTransform(smoothProgress, [0, 1], [0.4, 0.7]),
                                    backgroundColor: lightColorSecondary
                                }}
                                className="absolute -top-3 w-8 h-8 rounded-full blur-[6px] z-10"
                            />

                            {/* 1. The Core (White-Primary center) */}
                            <motion.div
                                style={{
                                    opacity: redGlowOpacity,
                                    scale: redGlowScale,
                                    boxShadow: useTransform(lightShadowColor, (c) => `0 0 15px ${c}`)
                                }}
                                className="w-10 h-2 bg-white bg-opacity-95 rounded-full blur-[1px] z-30"
                            />

                            {/* 2. Intense Primary Glow */}
                            <motion.div
                                style={{
                                    opacity: useTransform(smoothProgress, [0, 1], [0.8, 1]),
                                    backgroundColor: lightColorSecondary
                                }}
                                className="absolute w-20 h-6 rounded-full blur-[6px] z-20"
                            />

                            {/* 3. Surface Spill */}
                            <motion.div
                                style={{ backgroundColor: spillColor }}
                                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                className="absolute w-32 h-14 rounded-[50%] blur-[16px] z-10"
                            />

                            {/* 4. Atmospheric Bloom */}
                            <motion.div
                                style={{
                                    opacity: useTransform(smoothProgress, [0, 1], [0.3, 0.6]),
                                    backgroundColor: ambientGlowColor
                                }}
                                className="absolute w-64 h-64 rounded-full blur-[50px] z-0"
                            />

                            {/* 5. Sharp Light Beam / Flare */}
                            <motion.div
                                style={{
                                    scaleX: useTransform(smoothProgress, [0, 1], [1, 1.8]),
                                    backgroundColor: useTransform(lightColorPrimary, (c) => `${c}66`) // Hex + 40% opacity
                                }}
                                className="absolute w-64 h-[1px] blur-[1px] z-10"
                            />
                        </div>

                        {/* Shadow/Reflection Layer */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[60%] h-4 bg-black/40 blur-2xl rounded-[100%] z-0" />
                    </motion.div>
                </div>

                {/* Navigation Hint */}
                <motion.div
                    style={{ opacity: useTransform(smoothProgress, [0, 0.1, 0.9, 1], [1, 0, 0, 1]) }}
                    className="absolute bottom-12 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Scroll to navigate</span>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent" />
                </motion.div>
            </motion.div>
        </section>
    )
}
