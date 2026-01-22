"use client";

import React, { useState, useEffect, useRef, Suspense, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Define the 7 phases for manual adjustment
const PHASES = [
    {
        id: 1,
        title: "LRV TRANSITIONS TO VERTICAL POSITION",
        subtitle: "Preparing for initial separation sequence",
        drone: {
            x: 15, y: 85, rotateX: 0, rotateY: 90, rotateZ: 0, size: 990,
            cardX: 22.8, cardY: 60.8,
            ghostX: 12.5, ghostY: 82, ghostSize: 350, ghostOpacity: 0.25,
            lineStartX: 15.5, lineStartY: 80.5,
            lineMidX: 29, lineMidY: 80.5,
            lineEndX: 29, lineEndY: 68
        },
        camera: { position: [4.02, 2.96, 0.25], rotation: [-85.2, 53.5, 84.1], fov: 45 }
    },
    {
        id: 2,
        title: "LRV LAUNCHES BAT STRAIGHT UP",
        subtitle: "Vertical ascent phase initiated",
        drone: {
            x: 20, y: 42, rotateX: 0, rotateY: 90, rotateZ: 0, size: 990,
            cardX: 2, cardY: 27,
            ghostX: 20.3, ghostY: 50, ghostSize: 470, ghostOpacity: 0.25,
            lineStartX: 11.8, lineStartY: 46,
            lineMidX: 7, lineMidY: 46,
            lineEndX: 7, lineEndY: 35,
            pathStartX: 16.9, pathStartY: 81,
            pathMidX: 20, pathMidY: 81,
            pathEndX: 20, pathEndY: 56.7,
            pathOpacity: 0.8,
            pathCurve: 0.55
        },
        camera: { position: [0, 4.96, 0.65], rotation: [-82.5, 0, 0], fov: 45 }
    },
    {
        id: 3,
        title: "BAT TRANSITIONS TO HORIZONTAL POSITION",
        subtitle: "Level flight configuration engaged",
        drone: {
            x: 22, y: 18, rotateX: 0, rotateY: 90, rotateZ: 0, size: 990,
            cardX: 26, cardY: 20,
            ghostX: 20, ghostY: 13.4, ghostSize: 410, ghostOpacity: 0.25,
            lineStartX: 22.4, lineStartY: 13,
            lineMidX: 32.6, lineMidY: 13,
            lineEndX: 32.6, lineEndY: 23,
            pathStartX: 20, pathStartY: 41,
            pathEndX: 19.9, pathEndY: 18,
            pathOpacity: 0.8
        },
        camera: { position: [4.73, 1.62, 0.05], rotation: [-88.4, 71.1, 88.3], fov: 45 }
    },
    {
        id: 4,
        title: "CRUISE SPEED OPTIMIZATION",
        subtitle: "Adjusting for maximum aerodynamic efficiency",
        drone: {
            x: 52, y: 18, rotateX: 0, rotateY: 90, rotateZ: 0, size: 990,
            cardX: 53.7, cardY: 22,
            ghostX: 49, ghostY: 13.5, ghostSize: 410, ghostOpacity: 0.25,
            lineStartX: 53, lineStartY: 27,
            lineMidX: 49.3, lineMidY: 27,
            lineEndX: 49.3, lineEndY: 17,
            pathStartX: 23.7, pathStartY: 11.4,
            pathEndX: 45.2, pathEndY: 11.4,
            pathOpacity: 0.8
        },
        camera: { position: [4.73, 1.62, 0.05], rotation: [-88.4, 71.1, 88.3], fov: 45 }
    },
    {
        id: 4.5,
        title: "",
        subtitle: "",
        drone: {
            x: 68, y: 5, rotateX: 90, rotateY: 90, rotateZ: 0, size: 990,
            cardX: 0, cardY: 0,
            ghostX: 50, ghostY: 18, ghostSize: 320, ghostOpacity: 0.25,
            lineStartX: 0, lineStartY: 0,
            lineMidX: 0, lineMidY: 0,
            lineEndX: 0, lineEndY: 0,
            pathStartX: 52.7, pathStartY: 11.4,
            pathEndX: 63.8, pathEndY: 11.4,
            pathOpacity: 0.8
        },
        camera: { position: [4.78, 0.36, 0.19], rotation: [-62.2, 85.4, 62.2], fov: 45 }
    },
    {
        id: 5,
        title: "DECELERATES AND TRANSITIONS TO VERTICAL FLIGHT",
        subtitle: "Re-entry and landing preparation",
        drone: {
            x: 83, y: 6.5, rotateX: 0, rotateY: 90, rotateZ: 0, size: 990,
            cardX: 59, cardY: 22.9,
            ghostX: 83.3, ghostY: 13.5, ghostSize: 420, ghostOpacity: 0.25,
            lineStartX: 83, lineStartY: 21.7,
            lineMidX: 83, lineMidY: 28,
            lineEndX: 76, lineEndY: 28,
            pathStartX: 64.2, pathStartY: 11.4,
            pathEndX: 74.9, pathEndY: 11.4,
            pathOpacity: 0.8
        },
        camera: { position: [0, 5.0, 0.01], rotation: [-90, 0, -0.6], fov: 45 }
    },
    {
        id: 6,
        title: "MAINTAINS CONTROLLED DESCENT",
        subtitle: "Toward flight deck target landing zone",
        drone: {
            x: 83, y: 42, rotateX: 0, rotateY: 90,
            rotateZ: 0, size: 990,
            cardX: 63, cardY: 27,
            ghostX: 83.2, ghostY: 48.3, ghostSize: 420, ghostOpacity: 0.25,
            lineStartX: 74.9, lineStartY: 46,
            lineMidX: 69, lineMidY: 46,
            lineEndX: 69, lineEndY: 35,
            pathStartX: 83, pathStartY: 17.8,
            pathEndX: 83, pathEndY: 41.8,
            pathOpacity: 0.8
        },
        camera: { position: [0, 5.0, 0.01], rotation: [-90, 0, 0], fov: 45 }
    },
    {
        id: 7,
        title: "CONTACTS LRV AND ENGAGES LATCH",
        subtitle: "Secure recovery sequence completed",
        drone: {
            x: 83, y: 77.7, rotateX: 0, rotateY: 90, rotateZ: 0, size: 990,
            cardX: 60, cardY: 61.4,
            lineStartX: 74.9, lineStartY: 82,
            lineMidX: 65.5, lineMidY: 82,
            lineEndX: 65.5, lineEndY: 68,
            pathStartX: 82.9, pathStartY: 53,
            pathEndX: 83, pathEndY: 77.7,
            pathOpacity: 0.8
        },
        camera: { position: [0, 5.0, 0.01], rotation: [-90, 0, 0], fov: 45 }
    }
];

export default function Bat3DSequence() {
    const [currentPhase, setCurrentPhase] = useState(0);
    const [prevPhaseIndex, setPrevPhaseIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isManualMode, setIsManualMode] = useState(false);
    const [scrollTicks, setScrollTicks] = useState(0);
    const lastScrollTime = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Single source of truth for drone and card properties
    const [liveDrone, setLiveDrone] = useState(PHASES[0].drone);
    const [cameraStats, setCameraStats] = useState({ pos: { x: 0, y: 0, z: 5 }, rot: { x: 0, y: 0, z: 0 } });

    // Dedicated state for ghosts so they can be adjusted globally
    const [ghostConfigs, setGhostConfigs] = useState<{ [key: string]: any }>({});

    // Helper to build ghost configs from PHASES
    const getInitialGhostConfigs = () => {
        const configs: { [key: string]: any } = {};
        PHASES.slice(0, -1).forEach((p) => {
            configs[p.id.toString()] = {
                x: p.drone.ghostX ?? p.drone.x,
                y: p.drone.ghostY ?? p.drone.y,
                size: p.drone.ghostSize ?? 320,
                opacity: p.drone.ghostOpacity ?? 0.35
            };
        });
        return configs;
    };

    useLayoutEffect(() => {
        setGhostConfigs(getInitialGhostConfigs());
    }, []);

    // Sync state with code configuration when not in manual mode
    useEffect(() => {
        if (!isManualMode) {
            setLiveDrone({ ...PHASES[currentPhase].drone });
            setGhostConfigs(getInitialGhostConfigs());
        }
    }, [isManualMode, currentPhase,
        JSON.stringify(PHASES.map(p => p.drone))
    ]);

    // Handle phase change
    const handlePhaseChange = (index: number) => {
        if (isAnimating) return;

        // Reset scroll ticks whenever phase changes (scrolling or button click)
        setScrollTicks(0);

        // Transition durations synced for premium pacing
        const phaseA = PHASES[currentPhase].id;
        const phaseB = PHASES[index].id;

        // Fast transitions for cruise adjustments (4 to 4.5 is still relatively quick, but 4.5 to 5 is slow)
        const isFastPhase = (phaseA === 4 && phaseB === 4.5) || (phaseA === 4.5 && phaseB === 4);
        const isVerySlowPhase = (phaseA === 4.5 && phaseB === 5) || (phaseA === 5 && phaseB === 4.5);

        const duration = isVerySlowPhase ? 3500 : (isFastPhase ? 1200 : 2500);

        setIsAnimating(true);
        setIsManualMode(false);
        setPrevPhaseIndex(currentPhase);
        setCurrentPhase(index);
        setLiveDrone(PHASES[index].drone);

        // Match timeout exactly to the visual duration
        setTimeout(() => setIsAnimating(false), duration);
    };

    // Handle manual adjustments
    const handleOverrideChange = (key: string, value: number) => {
        setIsManualMode(true);
        if (key.startsWith('ghost')) {
            // ghost1X, ghost1Y, ghost2X, etc.
            const match = key.match(/ghost(\d+)(\w+)/);
            if (match) {
                const phaseId = parseInt(match[1]);
                const prop = match[2].toLowerCase();
                const actualKey = prop === 'size' ? 'size' : (prop === 'opacity' ? 'opacity' : prop);
                setGhostConfigs(prev => ({
                    ...prev,
                    [phaseId]: {
                        ...prev[phaseId],
                        [actualKey]: value
                    }
                }));
            }
        } else {
            setLiveDrone(prev => ({
                ...prev,
                [key]: value
            }));
        }
    };

    // Handle scroll to advance phases
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (!containerRef.current) return;

            const now = Date.now();
            const rect = containerRef.current.getBoundingClientRect();

            // Permissive detection for the sticky "active" state
            // We want to trap the scroll if the section is at or near the top
            const isNearTop = rect.top <= 50;
            const isVisible = rect.bottom > 100;

            if (isVisible && isNearTop) {
                // Direction of intent
                const isScrollingDown = e.deltaY > 0;
                const isScrollingUp = e.deltaY < 0;

                // Should we trap this movement?
                const isTrapped =
                    (isScrollingDown && currentPhase < PHASES.length - 1) ||
                    (isScrollingUp && currentPhase > 0);

                if (isTrapped) {
                    // If we haven't reached the perfect top yet, force it to snap
                    // but also prevent the default scroll to avoid skipping
                    e.preventDefault();

                    if (rect.top > 1 || rect.top < -1) {
                        containerRef.current.scrollIntoView({ behavior: 'auto' });
                    }

                    if (isAnimating) return;

                    // Normalize input: mouse wheels usually give 100, trackpads 5-30
                    const absDelta = Math.abs(e.deltaY);
                    if (absDelta < 10) return; // Filter out noise

                    // Throttling: 400ms is a sweet spot for both mouse clicks and touchpad gestures
                    if (now - lastScrollTime.current < 400) return;

                    if (isScrollingDown) {
                        // Special logic for first phase: requires 2 movements
                        if (currentPhase === 0) {
                            if (scrollTicks < 1) {
                                setScrollTicks(prev => prev + 1);
                                lastScrollTime.current = now;
                                return;
                            }
                        }

                        lastScrollTime.current = now;
                        handlePhaseChange(currentPhase + 1);
                    } else if (isScrollingUp) {
                        lastScrollTime.current = now;
                        handlePhaseChange(currentPhase - 1);
                    }
                }
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        return () => window.removeEventListener("wheel", handleWheel);
    }, [currentPhase, isAnimating, scrollTicks]);

    const activePhase = PHASES[currentPhase];
    const isFastTransition = ([4].includes(PHASES[currentPhase].id) && isAnimating && PHASES[currentPhase + (isAnimating ? 0 : 0)]?.id !== 5);

    return (
        <section
            ref={containerRef}
            className="sticky top-0 w-full h-screen bg-white overflow-hidden font-mono select-none z-40"
        >
            {/* Background Title - Cinematic Aesthetic */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.3] pointer-events-none">
                <div className="text-[9vw] font-bold text-black tracking-tighter flex flex-col items-center leading-[0.85]">
                    <span>Roadborne.</span>
                    <span>Airbound.</span>
                </div>
            </div>

            {/* Central Main Title (Optional but matches reference vibe) */}
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none text-center">
                <div className="text-black/5 title-text font-sans uppercase tracking-[15px] text-[24px]">
                    {/* Autonomous Air-to-Ground Recovery */}
                </div>
            </div>

            {/* Phase Indicator (Left side buttons) */}
            <div className="absolute top-[100px] left-[50px] z-50 flex flex-col gap-2">
                <div className="text-black text-[12px] font-bold tracking-[2px]">INDEX</div>
                <div className="flex flex-col gap-2">
                    {PHASES.map((p, i) => {
                        if (p.id === 4.5) return null;
                        return (
                            <button
                                key={i}
                                onClick={() => handlePhaseChange(i)}
                                className={`text-[12px] text-left transition-all ${currentPhase === i ? "text-black font-bold translate-x-1" : "text-gray-300 hover:text-gray-400"}`}
                            >
                                {p.id < 10 && p.id % 1 === 0 ? `0${p.id}` : p.id}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* 3D Canvas */}
            <div className="absolute inset-0 z-5">
                {/* Multi-Ghost Previews */}
                <AnimatePresence>
                    {PHASES.slice(0, -1).map((p, idx) => (
                        currentPhase > idx && p.id !== 4.5 && ghostConfigs[p.id.toString()] && (
                            <motion.div
                                key={`ghost-${p.id}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: ghostConfigs[p.id.toString()].opacity }}
                                exit={{ opacity: 0 }}
                                className="absolute pointer-events-none"
                                style={{
                                    left: `${ghostConfigs[p.id.toString()].x}%`,
                                    top: `${ghostConfigs[p.id.toString()].y}%`,
                                    width: ghostConfigs[p.id.toString()].size,
                                    height: ghostConfigs[p.id.toString()].size,
                                    x: "-50%",
                                    y: "-50%",
                                }}
                            >
                                <img
                                    src={`/images/Bat/phases/phase-${p.id}.png`}
                                    alt={`Phase ${p.id} Ghost`}
                                    className="w-full h-full object-contain brightness-110 contrast-125"
                                />
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>

                <motion.div
                    className="absolute"
                    animate={{
                        left: `${liveDrone.x}%`,
                        top: `${liveDrone.y}%`,
                        width: liveDrone.size,
                        height: liveDrone.size,
                        x: "-50%",
                        y: "-50%",
                    }}
                    transition={isManualMode ? { duration: 0 } : {
                        duration: isFastTransition ? 1.0 : 2.5,
                        ease: [0.33, 1, 0.68, 1] // Even smoother cubic ease
                    }}
                >
                    <Canvas
                        camera={{
                            position: activePhase.camera.position as [number, number, number],
                            fov: activePhase.camera.fov
                        }}
                    >
                        <ambientLight intensity={1.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} />
                        <Environment preset="city" />
                        <Suspense fallback={null}>
                            <SmoothDrone
                                drone={liveDrone}
                                isManualMode={isManualMode}
                                isFastTransition={isFastTransition}
                            />
                        </Suspense>
                        <CameraController
                            activePhase={activePhase}
                            prevPhase={PHASES[prevPhaseIndex]}
                            onUpdate={setCameraStats}
                            isManualMode={isManualMode}
                            isAnimating={isAnimating}
                        />
                    </Canvas>
                </motion.div>
            </div>

            {/* Persistent Paths Layer (No Key to avoid re-animation) */}
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none z-25 overflow-visible"
            >
                {/* Phase 1 Ghost to Phase 2 Model Path */}
                {currentPhase >= 1 && (
                    <motion.path
                        d={getRoundedCornerPath(
                            {
                                x: (currentPhase === 1 ? liveDrone.pathStartX : PHASES[1].drone.pathStartX) ?? 12.5,
                                y: (currentPhase === 1 ? liveDrone.pathStartY : PHASES[1].drone.pathStartY) ?? 82
                            },
                            {
                                x: (currentPhase === 1 ? liveDrone.pathMidX : PHASES[1].drone.pathMidX) ?? 16,
                                y: (currentPhase === 1 ? liveDrone.pathMidY : PHASES[1].drone.pathMidY) ?? 62
                            },
                            {
                                x: (currentPhase === 1 ? liveDrone.pathEndX : PHASES[1].drone.pathEndX) ?? 20,
                                y: (currentPhase === 1 ? liveDrone.pathEndY : PHASES[1].drone.pathEndY) ?? 42
                            },
                            (currentPhase === 1 ? liveDrone.pathCurve : PHASES[1].drone.pathCurve) ?? 0.1
                        )}
                        fill="none"
                        stroke="#A0A0A0"
                        strokeWidth="0.7"
                        strokeDasharray="9 9"
                        style={{ vectorEffect: "non-scaling-stroke" }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: (currentPhase === 1 ? liveDrone.pathOpacity : PHASES[1].drone.pathOpacity) ?? 0.9 }}
                        transition={{ duration: 1.7, delay: 0.8, ease: "easeOut" }}
                        strokeLinecap="round"
                    />
                )}

                {/* Additional 2-Point Paths for subsequent phases */}
                {PHASES.map((p, idx) => {
                    if (idx < 2 || currentPhase < idx) return null;

                    const pConfig = currentPhase === idx ? liveDrone : p.drone;
                    const startX = pConfig.pathStartX;
                    const startY = pConfig.pathStartY;
                    const endX = pConfig.pathEndX;
                    const endY = pConfig.pathEndY;
                    const opacity = pConfig.pathOpacity ?? 0.4;

                    if (startX === undefined) return null;

                    return (
                        <motion.path
                            key={`path-${p.id}`}
                            d={`M ${startX} ${startY} L ${endX} ${endY}`}
                            fill="none"
                            stroke="#A0A0A0"
                            strokeWidth="0.7"
                            strokeDasharray="9 9"
                            style={{ vectorEffect: "non-scaling-stroke" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: opacity > 0.4 ? opacity : 0.8 }}
                            transition={{ duration: 2.0, delay: 0.8, ease: "easeOut" }}
                            strokeLinecap="round"
                        />
                    );
                })}
            </svg>

            {/* Dotted Line for Phases 1-6 */}
            <AnimatePresence>
                {[1, 2, 3, 4, 5, 6, 7].includes(activePhase.id) && activePhase.id !== 4.5 && (
                    <motion.svg
                        key={currentPhase}
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
                    >
                        <defs>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="1" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                        </defs>



                        {/* 3-Point Path (Dotted/Dashed Polyline) */}
                        <motion.path
                            d={`M ${liveDrone.lineStartX ?? liveDrone.x} ${liveDrone.lineStartY ?? liveDrone.y}
                               L ${liveDrone.lineMidX ?? 50} ${liveDrone.lineMidY ?? 50}
                               L ${liveDrone.lineEndX ?? liveDrone.cardX} ${liveDrone.lineEndY ?? liveDrone.cardY}`}
                            fill="none"
                            stroke="#5ce1e6"
                            strokeWidth="0.12"
                            strokeDasharray="0.6 0.4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.8, delay: isManualMode ? 0 : 0.8, ease: "easeOut" }}
                            style={{ filter: "url(#glow)" }}
                            strokeLinecap="butt"
                        />

                        {/* Start Dot (Drone Side) */}
                        <motion.circle
                            cx={liveDrone.lineStartX ?? liveDrone.x}
                            cy={liveDrone.lineStartY ?? liveDrone.y}
                            r="0.2"
                            fill="#5ce1e6"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: isManualMode ? 0 : 1.2 }}
                        />

                        {/* End Dot (Card Side) - Reduced Radius */}
                        <motion.circle
                            cx={liveDrone.lineEndX ?? liveDrone.cardX}
                            cy={liveDrone.lineEndY ?? liveDrone.cardY}
                            r="0.2"
                            fill="#5ce1e6"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: isManualMode ? 0 : 2.2 }}
                        />
                    </motion.svg>
                )}
            </AnimatePresence>

            {/* Floating Phase Cards (Active Phase Only) */}
            <AnimatePresence mode="wait">
                {activePhase.id !== 4.5 && (
                    <motion.div
                        key={currentPhase}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10, transition: { duration: 0.2 } }}
                        transition={{ duration: 1.8, delay: ([1, 2, 3, 4, 5, 6, 7].includes(activePhase.id) && !isManualMode) ? 1.4 : 0 }}
                        style={{
                            position: 'absolute',
                            left: `${liveDrone.cardX}%`,
                            top: `${liveDrone.cardY}%`,
                            transform: 'translate(-50%, -50%)',
                            zIndex: 40,
                            pointerEvents: 'none'
                        }}
                        className="flex flex-col gap-0 min-w-[300px]"
                    >
                        {/* Current Phase Number */}
                        <div className={`${activePhase.id === 2 ? "pl-[200px]" :
                            activePhase.id === 5 ? "pl-[345px]" :
                                activePhase.id === 6 ? "pl-[227px]" :
                                    activePhase.id === 7 ? "pl-[225px]" : ""
                            }`}>
                            <span className="text-[#5ce1e6] font-extrabold text-[16px]">
                                {activePhase.id < 10 && activePhase.id % 1 === 0 ? `0${activePhase.id}` : activePhase.id}
                            </span>
                        </div>

                        {/* Content Block */}
                        <div className="flex flex-col gap-0.5">
                            <div className={`text-black font-bold text-[14px] uppercase tracking-wide leading-tight ${activePhase.id === 6 ? "pl-4" : ""}`}>
                                {activePhase.title}
                            </div>
                            <div className={`text-gray-400 font-medium text-[11px] uppercase tracking-widest ${activePhase.id === 5 ? "pl-12" : ""}`}>
                                {activePhase.subtitle}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Manual Adjust Controls Removed */}
        </section >
    );
}

// Sub-component to handle smooth interpolation of drone rotation
function SmoothDrone({ drone, isManualMode, isFastTransition }: { drone: any, isManualMode: boolean, isFastTransition: boolean }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!groupRef.current) return;

        const targetRotX = drone.rotateX * (Math.PI / 180);
        const targetRotY = drone.rotateY * (Math.PI / 180);
        const targetRotZ = drone.rotateZ * (Math.PI / 180);

        const lerpFactor = isManualMode ? 1.0 : (isFastTransition ? 0.2 : 0.04); // Reduced lerp for slower catch-up

        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, lerpFactor);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, lerpFactor);
        groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, lerpFactor);
    });

    return (
        <group ref={groupRef}>
            <Model scale={[1, 1, 1]} />
        </group>
    );
}

// Camera Controller
function CameraController({ activePhase, prevPhase, onUpdate, isManualMode, isAnimating }: { activePhase: any, prevPhase: any, onUpdate: (stats: any) => void, isManualMode: boolean, isAnimating: boolean }) {
    const { camera } = useThree();
    const frameCount = useRef(0);
    const wasAnimating = useRef(isAnimating);

    useLayoutEffect(() => {
        if (wasAnimating.current && !isAnimating && activePhase.camera) {
            camera.position.set(...(activePhase.camera.position as [number, number, number]));
            camera.rotation.set(
                activePhase.camera.rotation[0] * (Math.PI / 180),
                activePhase.camera.rotation[1] * (Math.PI / 180),
                activePhase.camera.rotation[2] * (Math.PI / 180)
            );
            camera.updateProjectionMatrix();
        }
        wasAnimating.current = isAnimating;
    }, [isAnimating, activePhase, camera]);

    useFrame(() => {
        if (!activePhase.camera) return;

        const targetPos = new THREE.Vector3(...activePhase.camera.position);
        const targetRot = new THREE.Euler(
            activePhase.camera.rotation[0] * (Math.PI / 180),
            activePhase.camera.rotation[1] * (Math.PI / 180),
            activePhase.camera.rotation[2] * (Math.PI / 180)
        );

        if (isAnimating) {
            const isSlow = (activePhase.id === 5 && prevPhase.id === 4.5) || (activePhase.id === 4.5 && prevPhase.id === 5);
            const isFast = (activePhase.id === 4 && prevPhase.id !== 4.5);

            const lerpFactor = isSlow ? 0.03 : (isFast ? 0.25 : 0.04);
            camera.position.lerp(targetPos, lerpFactor);
            camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRot.x, lerpFactor);
            camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRot.y, lerpFactor);
            camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRot.z, lerpFactor);
            camera.updateProjectionMatrix();
        }

        frameCount.current++;
        if (frameCount.current % 5 === 0) {
            onUpdate({
                pos: {
                    x: parseFloat(camera.position.x.toFixed(2)),
                    y: parseFloat(camera.position.y.toFixed(2)),
                    z: parseFloat(camera.position.z.toFixed(2))
                },
                rot: {
                    x: parseFloat((camera.rotation.x * 180 / Math.PI).toFixed(1)),
                    y: parseFloat((camera.rotation.y * 180 / Math.PI).toFixed(1)),
                    z: parseFloat((camera.rotation.z * 180 / Math.PI).toFixed(1))
                }
            });
        }
    });

    return null;
}

function Model(props: any) {
    const { scene } = useGLTF('/model/BATMAN.glb')
    return (
        <group {...props} dispose={null}>
            <primitive object={scene} rotation={[0, Math.PI / 2, 0]} />
        </group>
    )
}

useGLTF.preload('/model/BATMAN.glb')

function getRoundedCornerPath(start: { x: number, y: number }, mid: { x: number, y: number }, end: { x: number, y: number }, curve: number) {
    const p1x = mid.x + (start.x - mid.x) * curve;
    const p1y = mid.y + (start.y - mid.y) * curve;
    const p2x = mid.x + (end.x - mid.x) * curve;
    const p2y = mid.y + (end.y - mid.y) * curve;
    return `M ${start.x} ${start.y} L ${p1x} ${p1y} Q ${mid.x} ${mid.y} ${p2x} ${p2y} L ${end.x} ${end.y}`;
}
