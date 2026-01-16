"use client"

import React, { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FeaturePoint {
    id: string
    title: string
    description: string | string[]
    position: { top?: string; bottom?: string; left?: string; right?: string }
    textAlign: "left" | "right"
    connectorStart: { x: number; y: number } // Point near text
    connectorEnd: { x: number; y: number }   // Point on drone
    controlPoint?: { x: number; y: number }  // For curved lines
}

const FeatureBox = ({
    feature,
    index,
    isActive,
    setActiveId
}: {
    feature: FeaturePoint;
    index: number;
    isActive: boolean;
    setActiveId: (id: string | null) => void;
}) => {
    return (
        <motion.div
            className="absolute z-30 pointer-events-auto"
            style={{
                ...feature.position,
                transformOrigin: feature.textAlign === "left" ? "top left" : "top right",
                right: feature.textAlign === "right" ? feature.position.right : undefined,
                left: feature.textAlign === "left" ? feature.position.left : undefined,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.8,
                pointerEvents: isActive ? "auto" : "none"
            }}
            transition={{ duration: 0.3 }}
            onMouseEnter={() => setActiveId(feature.id)}
            onMouseLeave={() => setActiveId(null)}
        >
            <motion.div
                layout
                className={`bg-white border-2 border-[#5ce1e6] overflow-hidden shadow-2xl relative z-50`}
                style={{
                    borderRadius: 0,
                    width: 320,
                    height: "auto",
                }}
            >
                <div className="p-6 min-w-[320px]">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold tracking-tight uppercase">
                            {feature.title}
                        </h3>
                        <span className="text-xs font-mono text-neutral-400">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                    </div>

                    <div className="w-full h-[2px] bg-[#5ce1e6] mb-4" />

                    {Array.isArray(feature.description) ? (
                        <div className="flex flex-col gap-2">
                            {feature.description.map((line, idx) => (
                                <p key={idx} className="text-sm text-neutral-600 leading-relaxed">
                                    {line}
                                </p>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-neutral-600 leading-relaxed">
                            {feature.description}
                        </p>
                    )}
                </div>
            </motion.div>
        </motion.div>
    )
}

export default function FenixFUI2(): React.JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null)
    const [activeId, setActiveId] = useState<string | null>(null)

    const features: FeaturePoint[] = [
        {
            id: "edge-compute",
            title: "EDGE Compute",
            description: "State of the art companion computer running customized AI & ML algorithms, integrated with the autopilot with active cooling system",
            position: { top: "25.5%", right: "76.7%" },
            textAlign: "right",
            connectorStart: { x: 250, y: 220 },
            connectorEnd: { x: 550, y: 390 },
            controlPoint: { x: 250, y: 390 }
        },
        {
            id: "propulsion",
            title: "Propulsion",
            description: [
                "Highly Efficient",
                "Custom made motors"
            ],
            position: { top: "20.5%", left: "61.7%" },
            textAlign: "left",
            connectorStart: { x: 750, y: 180 },
            connectorEnd: { x: 420, y: 312 },
            controlPoint: { x: 420, y: 180 }
        },
        {
            id: "collision",
            title: "Collision Resistance",
            description: "Airframe - carbon reinforced aerospace grade nylon",
            position: { top: "33%", left: "81.7%" },
            textAlign: "left",
            connectorStart: { x: 1020, y: 280 },
            connectorEnd: { x: 995, y: 360 },
            controlPoint: { x: 995, y: 280 }
        },
        {
            id: "payload",
            title: "Payload",
            description: [
                "High Resolution Camera",
                "Thermal Camera",
                "Equipped with LEDs for operations in low light"
            ],
            position: { bottom: "25.6%", right: "83.3%" },
            textAlign: "right",
            connectorStart: { x: 160, y: 580 },
            connectorEnd: { x: 440, y: 520 },
            controlPoint: { x: 440, y: 580 }
        },
        {
            id: "sensor",
            title: "Sensor Suite",
            description: "Fusion of visual, inertial and lasers",
            position: { bottom: "23%", left: "80.3%" },
            textAlign: "left",
            connectorStart: { x: 1000, y: 600 },
            connectorEnd: { x: 500, y: 540 },
            controlPoint: { x: 500, y: 600 }
        }
    ]

    return (
        <div ref={containerRef} className="relative w-full min-h-[120vh] bg-white text-black overflow-hidden font-sans flex flex-col items-center">

            {/* Header Title */}
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-40 text-3xl md:text-5xl lg:text-5xl font-bold tracking-[0.1em] text-center mt-12 md:mt-20 mb-8 px-4"
                style={{ maxWidth: "100%" }}
            >
                <span className="text-[#5ce1e6]">F</span>AST <span className="text-[#5ce1e6]">E</span>NTRY <span className="text-[#5ce1e6]">N</span>AVIGATIONAL <span className="text-[#5ce1e6]">I</span>NTRUSION E<span className="text-[#5ce1e6]">X</span>PLORER
            </motion.h2>

            {/* Background Drone Image */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                    className="w-full max-w-6xl relative z-10"
                >
                    <img
                        src="/images/Fenix/parts.png"
                        alt="Fenix Drone"
                        className="w-full h-auto object-contain drop-shadow-2xl"
                    />
                </motion.div>
            </div>

            {/* SVG Connectors Container */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                viewBox="0 0 1200 800"
                preserveAspectRatio="xMidYMid meet"
            >
                {features.map((feature, i) => {
                    const { connectorStart, connectorEnd, controlPoint } = feature;
                    const isActive = activeId === feature.id;

                    // Reversed D path to draw from drone to box
                    let d = "";
                    if (controlPoint) {
                        d = `M ${connectorEnd.x} ${connectorEnd.y} L ${controlPoint.x} ${controlPoint.y} L ${connectorStart.x} ${connectorStart.y}`;
                    } else {
                        d = `M ${connectorEnd.x} ${connectorEnd.y} L ${connectorStart.x} ${connectorStart.y}`;
                    }

                    return (
                        <g key={feature.id} className="pointer-events-auto">
                            {/* Animated Line */}
                            <motion.path
                                d={d}
                                stroke="#5ce1e6"
                                strokeWidth="1.5"
                                strokeDasharray="4 4"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{
                                    pathLength: isActive ? 1 : 0,
                                    opacity: isActive ? 1 : 0
                                }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />

                            {/* Continuous Ripple Layer 1 */}
                            <motion.circle
                                cx={connectorEnd.x}
                                cy={connectorEnd.y}
                                r="8"
                                stroke="#5ce1e6"
                                strokeWidth="0.5"
                                fill="none"
                                initial={{ scale: 1, opacity: 0.5 }}
                                animate={{ scale: 2.5, opacity: 0 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                            />
                            {/* Continuous Ripple Layer 2 */}
                            <motion.circle
                                cx={connectorEnd.x}
                                cy={connectorEnd.y}
                                r="8"
                                stroke="#5ce1e6"
                                strokeWidth="0.5"
                                fill="none"
                                initial={{ scale: 1, opacity: 0.3 }}
                                animate={{ scale: 4, opacity: 0 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
                            />

                            {/* Outer Ring */}
                            <circle
                                cx={connectorEnd.x}
                                cy={connectorEnd.y}
                                r="8"
                                fill="none"
                                stroke="#5ce1e6"
                                strokeWidth="1"
                                className="opacity-60"
                            />
                            {/* Inner Dot */}
                            <circle
                                cx={connectorEnd.x}
                                cy={connectorEnd.y}
                                r="3"
                                fill="#5ce1e6"
                                className="cursor-pointer"
                                onMouseEnter={() => setActiveId(feature.id)}
                                onMouseLeave={() => setActiveId(null)}
                            />

                            {/* Hover Expansion Pulse for Dot (More intense on hover) */}
                            {isActive && (
                                <motion.circle
                                    cx={connectorEnd.x}
                                    cy={connectorEnd.y}
                                    r="10"
                                    stroke="#5ce1e6"
                                    strokeWidth="1.5"
                                    fill="none"
                                    initial={{ scale: 0.8, opacity: 1 }}
                                    animate={{ scale: 2.2, opacity: 0 }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                />
                            )}

                            {/* Transparent Hit Area for Dot */}
                            <circle
                                cx={connectorEnd.x}
                                cy={connectorEnd.y}
                                r="20"
                                fill="transparent"
                                className="cursor-pointer"
                                onMouseEnter={() => setActiveId(feature.id)}
                                onMouseLeave={() => setActiveId(null)}
                            />

                            {/* Box Point (End of line) */}
                            <motion.circle
                                cx={connectorStart.x}
                                cy={connectorStart.y}
                                r="4"
                                fill="#5ce1e6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: isActive ? 1 : 0 }}
                            />
                        </g>
                    )
                })}
            </svg>

            {/* Interactive Feature Boxes */}
            <div className="absolute inset-0 z-30 pointer-events-none">
                {features.map((feature, i) => (
                    <FeatureBox
                        key={feature.id}
                        feature={feature}
                        index={i}
                        isActive={activeId === feature.id}
                        setActiveId={setActiveId}
                    />
                ))}
            </div>

        </div>
    )
}
