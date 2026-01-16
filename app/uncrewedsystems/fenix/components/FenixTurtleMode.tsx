"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { ShieldAlert, CheckCircle2, Cpu, Zap } from "lucide-react"

export default function FenixTurtleMode(): React.JSX.Element {
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

    // Animation values - Left-Normal -> Center-Flipped -> Right-Normal
    // Expanded ranges to make the animation slower (requires more scrolling)
    const droneX = useTransform(smoothProgress, [0, 0.25, 0.5, 0.65, 0.85, 1], ["-25vw", "-25vw", "0vw", "0vw", "25vw", "25vw"])
    const rotationZ = useTransform(smoothProgress, [0.25, 0.5, 0.65, 0.85], [0, 180, 180, 360])
    const rotationX = useTransform(smoothProgress, [0.25, 0.5, 0.65, 0.85], [0, 20, -20, 0])
    const droneY = useTransform(smoothProgress, [0.25, 0.5, 0.65, 0.85], [0, -50, -50, 0])
    const droneScale = useTransform(smoothProgress, [0, 0.4, 0.75, 1], [0.8, 1, 1, 0.8])

    // Image Opacities (matching stages)
    const op3 = useTransform(smoothProgress, [0, 0.25, 0.35, 0.75, 0.85, 1], [1, 1, 0, 0, 1, 1])
    const op2 = useTransform(smoothProgress, [0.25, 0.35, 0.45, 0.65, 0.75, 0.85], [0, 1, 0, 0, 1, 0])
    const op1 = useTransform(smoothProgress, [0.35, 0.5, 0.65, 0.75], [0, 1, 1, 0])

    // Ghost Opacities (the "trace" left behind)
    const ghostLeftOpacity = useTransform(smoothProgress, [0.25, 0.5], [0, 0.15])
    const ghostCenterOpacity = useTransform(smoothProgress, [0.75, 0.85], [0, 0.15])

    // Info Card Opacities - Adjusted for slower timeline
    const card1Opacity = useTransform(smoothProgress, [0.35, 0.45, 0.55, 0.65], [0, 1, 1, 0])
    const card1Y = useTransform(smoothProgress, [0.35, 0.45], [20, 0])

    const card3Opacity = useTransform(smoothProgress, [0.85, 0.9, 0.95, 1], [0, 1, 1, 0.5])
    const card3Y = useTransform(smoothProgress, [0.85, 0.9], [20, 0])

    const line1Draw = useTransform(smoothProgress, [0.35, 0.45], [0, 1])
    const line3Draw = useTransform(smoothProgress, [0.85, 0.9], [0, 1])

    const sectionBg = useTransform(smoothProgress, [0.95, 1], ["#ffffff", "#0a0a0a"])

    return (
        <motion.div
            ref={containerRef}
            style={{ backgroundColor: sectionBg }}
            className="relative h-[800vh] text-neutral-900 font-sans selection:bg-cyan-500/30 overflow-clip"
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
        .font-mono-tech {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>

            {/* Sticky Render Area */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* Cinematic Background Grid */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,217,255,0.05)_0%,transparent_80%)]" />
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `linear-gradient(to right, rgba(0,217,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,217,255,0.15) 1px, transparent 1px)`,
                            backgroundSize: '60px 60px'
                        }}
                    />
                </div>

                {/* Ghost State: Left (Normal Position) */}
                <motion.div
                    style={{
                        x: "-25vw",
                        opacity: ghostLeftOpacity,
                        scale: 0.8,
                        filter: "grayscale(1) contrast(0.8)",
                    }}
                    className="absolute w-[85vw] md:w-[70vw] aspect-square z-0 pointer-events-none"
                >
                    <img
                        src="/images/Fenix/flip3.png"
                        alt="Drone Left Ghost"
                        className="w-full h-full object-contain opacity-50"
                    />
                </motion.div>

                {/* Ghost State: Center (Inverted Position) */}
                <motion.div
                    style={{
                        x: "0vw",
                        rotateZ: 180,
                        opacity: ghostCenterOpacity,
                        scale: 1,
                        filter: "grayscale(1) contrast(0.8)",
                    }}
                    className="absolute w-[85vw] md:w-[70vw] aspect-square z-0 pointer-events-none"
                >
                    <img
                        src="/images/Fenix/flip1.png"
                        alt="Drone Center Ghost"
                        className="w-full h-full object-contain opacity-40"
                    />
                </motion.div>

                {/* Drone Animation Layer (Active) */}
                <motion.div
                    style={{
                        x: droneX,
                        rotateZ: rotationZ,
                        rotateX: rotationX,
                        y: droneY,
                        scale: droneScale,
                        perspective: 2000,
                    }}
                    animate={{
                        y: [0, -8, 0], // Subtle hover oscillation
                        rotateX: [0, 1.5, -1.5, 0], // Micro-adjustments
                        rotateY: [0, -1, 1, 0],
                    }}
                    transition={{
                        y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                        rotateX: { repeat: Infinity, duration: 5, ease: "easeInOut" },
                        rotateY: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                    }}
                    className="relative w-[85vw] md:w-[70vw] aspect-square z-10"
                >
                    {/* Stage 1: Inverted Image */}
                    <motion.div
                        style={{ opacity: op1 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <img
                            src="/images/Fenix/flip1.png"
                            alt="Drone Inverted"
                            className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                        />
                    </motion.div>

                    {/* Stage 2: Mid-Flip Image */}
                    <motion.div
                        style={{ opacity: op2 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <img
                            src="/images/Fenix/flip2.png"
                            alt="Drone Mid-Flip"
                            className="w-full h-full object-contain filter drop-shadow-[0_20px_60px_rgba(0,217,255,0.2)]"
                        />
                        <motion.div
                            animate={{ opacity: [0, 0.1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.5 }}
                            className="absolute inset-0 bg-cyan-400/5 blur-3xl"
                        />
                    </motion.div>

                    {/* Stage 3: Operational Image */}
                    <motion.div
                        style={{ opacity: op3 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <img
                            src="/images/Fenix/flip3.png"
                            alt="Drone Upright"
                            className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(34,197,94,0.1)]"
                        />
                    </motion.div>
                </motion.div>

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center px-6">
                    {/* Watermark Branding */}
                    <motion.div
                        style={{
                            opacity: useTransform(smoothProgress, [0, 0.5, 1], [0.06, 0.1, 0.06]),
                            scale: useTransform(smoothProgress, [0, 1], [1, 1.05])
                        }}
                        className="absolute top-[12%] left-0 w-full text-center px-4"
                    >
                        <h1 className="text-[9vw] font-black text-neutral-900 uppercase tracking-tighter italic leading-none whitespace-nowrap">
                            Turtle Mode
                        </h1>
                    </motion.div>

                    {/* Description Text */}
                    <motion.div
                        style={{
                            opacity: useTransform(smoothProgress, [0, 0.9, 1], [1, 1, 0]),
                            y: useTransform(smoothProgress, [0, 1], [0, 0])
                        }}
                        className="absolute bottom-24 text-center max-w-2xl px-8"
                    >
                        <p className="text-neutral-500 font-medium tracking-tight leading-relaxed text-lg md:text-xl">
                            enables autonomous flip-back to restore operational posture without manual intervention.
                        </p>
                    </motion.div>

                    {/* Stage 1 Info Card: Detection - Disabled
                    <motion.div
                        style={{ opacity: card1Opacity, y: card1Y }}
                        className="absolute left-[10%] bottom-[25%] z-30 pointer-events-auto"
                    >
                        <div className="relative bg-white shadow-2xl border border-neutral-100 p-6 w-[280px] md:w-[320px]">
                            <svg className="absolute -right-[120px] top-1/2 -translate-y-1/2 w-[400px] h-[300px] pointer-events-none overflow-visible">
                                <motion.path
                                    d="M -20 180 L 150 190 L 230 -20"
                                    fill="none"
                                    stroke="#5ce1e6"
                                    strokeWidth="1.5"
                                    style={{ pathLength: line1Draw }}
                                />
                                <motion.circle
                                    cx="550" cy="40" r="3" fill="#5ce1e6"
                                    style={{ opacity: line1Draw }}
                                />
                            </svg>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-cyan-50 rounded-lg">
                                    <ShieldAlert className="w-5 h-5 text-[#5ce1e6]" />
                                </div>
                                <h3 className="text-sm font-bold tracking-widest text-[#5ce1e6] uppercase">Detection Mode</h3>
                            </div>

                            <ul className="space-y-3">
                                {[
                                    { label: "IMU Orientation", value: "180° Inverted" },
                                    { label: "AI Decision", value: "Recovery Required" },
                                    { label: "Signal Strength", value: "-45 dBm" },
                                    { label: "Power Status", value: "Optimal" }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 group">
                                        <div className="w-1.5 h-0.5 bg-neutral-200 group-hover:bg-[#5ce1e6] transition-colors" />
                                        <div className="flex justify-between w-full text-[11px] md:text-xs">
                                            <span className="text-neutral-400">{item.label}</span>
                                            <span className="font-bold text-neutral-800">{item.value}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                    */}

                    {/* Stage 3 Info Card: Restoration - Disabled
                    <motion.div
                        style={{ opacity: card3Opacity, y: card3Y }}
                        className="absolute right-[10%] top-[25%] z-30 pointer-events-auto"
                    >
                        <div className="relative bg-white shadow-2xl border border-neutral-100 p-6 w-[280px] md:w-[320px]">
                            <svg className="absolute -left-[120px] top-1/2 -translate-y-1/2 w-[120px] h-[300px] pointer-events-none overflow-visible">
                                <motion.path
                                    d="M 120 150 L 50 150 L -180 300"
                                    fill="none"
                                    stroke="#22c55e"
                                    strokeWidth="1.5"
                                    style={{ pathLength: line3Draw }}
                                />
                                <motion.circle
                                    cx="-180" cy="300" r="3" fill="#22c55e"
                                    style={{ opacity: line3Draw }}
                                />
                            </svg>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-green-50 rounded-lg">
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                </div>
                                <h3 className="text-sm font-bold tracking-widest text-green-600 uppercase">Recovery Success</h3>
                            </div>

                            <ul className="space-y-3">
                                {[
                                    { label: "Attitude", value: "0° Nominal" },
                                    { label: "Gyro State", value: "Stabilized" },
                                    { label: "Motor Ready", value: "100% Armed" },
                                    { label: "System Check", value: "Passed ✓" }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 group">
                                        <div className="w-1.5 h-0.5 bg-neutral-200 group-hover:bg-green-400 transition-colors" />
                                        <div className="flex justify-between w-full text-[11px] md:text-xs">
                                            <span className="text-neutral-400">{item.label}</span>
                                            <span className="font-bold text-neutral-800">{item.value}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                    */}
                </div >

            </div >
        </motion.div >
    )
}
