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
            x: 15, y: 85, rotateX: 0, rotateY: 90, rotateZ: 0, size: 770,
            cardX: 22.8, cardY: 60.8,
            ghostX: 12.5, ghostY: 82, ghostSize: 250, ghostOpacity: 0.25,
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
            x: 20, y: 42, rotateX: 0, rotateY: 90, rotateZ: 0, size: 770,
            cardX: 2, cardY: 27,
            ghostX: 20, ghostY: 47.5, ghostSize: 360, ghostOpacity: 0.25,
            lineStartX: 13.5, lineStartY: 46,
            lineMidX: 7, lineMidY: 46,
            lineEndX: 7, lineEndY: 35,
            pathStartX: 16, pathStartY: 81,
            pathMidX: 20, pathMidY: 81,
            pathEndX: 20, pathEndY: 52.7,
            pathOpacity: 0.4,
            pathCurve: 0.55
        },
        camera: { position: [0, 4.96, 0.65], rotation: [-82.5, 0, 0], fov: 45 }
    },
    {
        id: 3,
        title: "BAT TRANSITIONS TO HORIZONTAL POSITION",
        subtitle: "Level flight configuration engaged",
        drone: {
            x: 22, y: 18, rotateX: 0, rotateY: 90, rotateZ: 0, size: 770,
            cardX: 26, cardY: 20,
            ghostX: 20, ghostY: 14, ghostSize: 320, ghostOpacity: 0.25,
            lineStartX: 22.4, lineStartY: 13,
            lineMidX: 32.6, lineMidY: 13,
            lineEndX: 32.6, lineEndY: 24,
            pathStartX: 19.8, pathStartY: 41,
            pathEndX: 19.8, pathEndY: 17,
            pathOpacity: 0.4
        },
        camera: { position: [4.73, 1.62, 0.05], rotation: [-88.4, 71.1, 88.3], fov: 45 }
    },
    {
        id: 4,
        title: "CRUISE SPEED OPTIMIZATION",
        subtitle: "Adjusting for maximum aerodynamic efficiency",
        drone: {
            x: 50, y: 18, rotateX: 0, rotateY: 90, rotateZ: 0, size: 770,
            cardX: 53.7, cardY: 21,
            ghostX: 50, ghostY: 14, ghostSize: 320, ghostOpacity: 0.25,
            lineStartX: 53, lineStartY: 27,
            lineMidX: 48, lineMidY: 27,
            lineEndX: 48, lineEndY: 17,
            pathStartX: 22.7, pathStartY: 12.5,
            pathEndX: 44.9, pathEndY: 12.5,
            pathOpacity: 0.4
        },
        camera: { position: [4.73, 1.62, 0.05], rotation: [-88.4, 71.1, 88.3], fov: 45 }
    },
    {
        id: 5,
        title: "DECELERATES AND TRANSITIONS TO VERTICAL FLIGHT",
        subtitle: "Re-entry and landing preparation",
        drone: {
            x: 83, y: 7.8, rotateX: 0, rotateY: 90, rotateZ: 0, size: 770,
            cardX: 59, cardY: 21.7,
            ghostX: 83.3, ghostY: 13, ghostSize: 360, ghostOpacity: 0.25,
            lineStartX: 83, lineStartY: 19.8,
            lineMidX: 83, lineMidY: 28,
            lineEndX: 76, lineEndY: 28,
            pathStartX: 53, pathStartY: 12.5,
            pathEndX: 76.5, pathEndY: 12.5,
            pathOpacity: 0.4
        },
        camera: { position: [0, 5.0, 0.01], rotation: [-90, 0, -0.6], fov: 45 }
    },
    {
        id: 6,
        title: "MAINTAINS CONTROLLED DESCENT",
        subtitle: "Toward flight deck target landing zone",
        drone: {
            x: 83, y: 42, rotateX: 0, rotateY: 90,
            rotateZ: 0, size: 770,
            cardX: 63.5, cardY: 27,
            ghostX: 83.2, ghostY: 48.3, ghostSize: 360, ghostOpacity: 0.25,
            lineStartX: 76.5, lineStartY: 46,
            lineMidX: 69, lineMidY: 46,
            lineEndX: 69, lineEndY: 35,
            pathStartX: 83, pathStartY: 17.8,
            pathEndX: 83, pathEndY: 41.8,
            pathOpacity: 0.4
        },
        camera: { position: [0, 5.0, 0.01], rotation: [-90, 0, 0], fov: 45 }
    },
    {
        id: 7,
        title: "CONTACTS LRV AND ENGAGES LATCH",
        subtitle: "Secure recovery sequence completed",
        drone: {
            x: 83, y: 77.7, rotateX: 0, rotateY: 90, rotateZ: 0, size: 770,
            cardX: 60, cardY: 60,
            lineStartX: 76.5, lineStartY: 82,
            lineMidX: 65.5, lineMidY: 82,
            lineEndX: 65.5, lineEndY: 68,
            pathStartX: 82.9, pathStartY: 53,
            pathEndX: 83, pathEndY: 77.7,
            pathOpacity: 0.4
        },
        camera: { position: [0, 5.0, 0.01], rotation: [-90, 0, 0], fov: 45 }
    }
];

export default function Bat3DSequence() {
    const [currentPhase, setCurrentPhase] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isManualMode, setIsManualMode] = useState(false);
    const [scrollTicks, setScrollTicks] = useState(0);
    const lastScrollTime = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Single source of truth for drone and card properties
    const [liveDrone, setLiveDrone] = useState(PHASES[0].drone);
    const [cameraStats, setCameraStats] = useState({ pos: { x: 0, y: 0, z: 5 }, rot: { x: 0, y: 0, z: 0 } });

    // Dedicated state for ghosts so they can be adjusted globally
    const [ghostConfigs, setGhostConfigs] = useState<{ [key: number]: any }>({
        1: {
            x: PHASES[0].drone.ghostX ?? 12.5,
            y: PHASES[0].drone.ghostY ?? 82,
            size: PHASES[0].drone.ghostSize ?? 250,
            opacity: PHASES[0].drone.ghostOpacity ?? 0.35
        },
        2: {
            x: PHASES[1].drone.ghostX ?? 20,
            y: PHASES[1].drone.ghostY ?? 47.5,
            size: PHASES[1].drone.ghostSize ?? 360,
            opacity: PHASES[1].drone.ghostOpacity ?? 0.35
        },
        3: {
            x: PHASES[2].drone.ghostX ?? 23,
            y: PHASES[2].drone.ghostY ?? 18,
            size: PHASES[2].drone.ghostSize ?? 770,
            opacity: PHASES[2].drone.ghostOpacity ?? 0.35
        },
        4: {
            x: PHASES[3].drone.ghostX ?? 50,
            y: PHASES[3].drone.ghostY ?? 18,
            size: PHASES[3].drone.ghostSize ?? 770,
            opacity: PHASES[3].drone.ghostOpacity ?? 0.35
        },
        5: {
            x: PHASES[4].drone.ghostX ?? 83,
            y: PHASES[4].drone.ghostY ?? 7.8,
            size: PHASES[4].drone.ghostSize ?? 320,
            opacity: PHASES[4].drone.ghostOpacity ?? 0.35
        },
        6: {
            x: PHASES[5].drone.ghostX ?? 83,
            y: PHASES[5].drone.ghostY ?? 42,
            size: PHASES[5].drone.ghostSize ?? 320,
            opacity: PHASES[5].drone.ghostOpacity ?? 0.35
        }
    });

    // Sync state with code configuration when not in manual mode
    useEffect(() => {
        if (!isManualMode) {
            setLiveDrone({ ...PHASES[currentPhase].drone });
            setGhostConfigs({
                1: { x: PHASES[0].drone.ghostX ?? 12.5, y: PHASES[0].drone.ghostY ?? 82, size: PHASES[0].drone.ghostSize ?? 250, opacity: PHASES[0].drone.ghostOpacity ?? 0.35 },
                2: { x: PHASES[1].drone.ghostX ?? 20, y: PHASES[1].drone.ghostY ?? 47.5, size: PHASES[1].drone.ghostSize ?? 360, opacity: PHASES[1].drone.ghostOpacity ?? 0.35 },
                3: { x: PHASES[2].drone.ghostX ?? 20, y: PHASES[2].drone.ghostY ?? 14, size: PHASES[2].drone.ghostSize ?? 320, opacity: PHASES[2].drone.ghostOpacity ?? 0.35 },
                4: { x: PHASES[3].drone.ghostX ?? 50, y: PHASES[3].drone.ghostY ?? 14, size: PHASES[3].drone.ghostSize ?? 320, opacity: PHASES[3].drone.ghostOpacity ?? 0.35 },
                5: { x: PHASES[4].drone.ghostX ?? 83, y: PHASES[4].drone.ghostY ?? 7.8, size: PHASES[4].drone.ghostSize ?? 320, opacity: PHASES[4].drone.ghostOpacity ?? 0.35 },
                6: { x: PHASES[5].drone.ghostX ?? 83, y: PHASES[5].drone.ghostY ?? 42, size: PHASES[5].drone.ghostSize ?? 320, opacity: PHASES[5].drone.ghostOpacity ?? 0.35 }
            });
        }
    }, [isManualMode, currentPhase,
        // Track the JSON of the drone data to force a re-sync when the file is edited
        JSON.stringify(PHASES.map(p => p.drone))
    ]);

    // Handle phase change
    const handlePhaseChange = (index: number) => {
        if (isAnimating) return;

        // Reset scroll ticks whenever phase changes (scrolling or button click)
        setScrollTicks(0);

        // Transition durations synced for premium, slower feel
        const isFastPhase = (currentPhase === 3 && index === 4) || (currentPhase === 4 && index === 3);
        const duration = isFastPhase ? 800 : 2500; // Increased to 2.5s for epic pacing

        setIsAnimating(true);
        setIsManualMode(false);
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
    const isFastTransition = (currentPhase === 3 && isAnimating) || (currentPhase === 4 && isAnimating);

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
                    {PHASES.map((p, i) => (
                        <button
                            key={i}
                            onClick={() => handlePhaseChange(i)}
                            className={`text-[12px] text-left transition-all ${currentPhase === i ? "text-black font-bold translate-x-1" : "text-gray-300 hover:text-gray-400"}`}
                        >
                            0{p.id}
                        </button>
                    ))}
                </div>
            </div>

            {/* 3D Canvas */}
            <div className="absolute inset-0 z-5">
                {/* Multi-Ghost Previews */}
                <AnimatePresence>
                    {[1, 2, 3, 4, 5, 6].map(id => (
                        currentPhase >= id && ghostConfigs[id] && (
                            <motion.div
                                key={`ghost-${id}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: ghostConfigs[id].opacity }}
                                exit={{ opacity: 0 }}
                                className="absolute pointer-events-none"
                                style={{
                                    left: `${ghostConfigs[id].x}%`,
                                    top: `${ghostConfigs[id].y}%`,
                                    width: ghostConfigs[id].size,
                                    height: ghostConfigs[id].size,
                                    x: "-50%",
                                    y: "-50%",
                                }}
                            >
                                <img
                                    src={`/images/Bat/phases/phase-${id}.png`}
                                    alt={`Phase ${id} Ghost`}
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
                        strokeWidth="0.11"
                        strokeDasharray="0.1 0.1"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: (currentPhase === 1 ? liveDrone.pathOpacity : PHASES[1].drone.pathOpacity) ?? 0.4 }}
                        transition={{ duration: 1.7, delay: 0.8, ease: "easeOut" }}
                        strokeLinecap="butt"
                    />
                )}

                {/* Additional 2-Point Paths for Phases 3, 4, 5, 6, 7 */}
                {[2, 3, 4, 5, 6].map(phaseIdx => {
                    const phaseId = phaseIdx + 1; // 3, 4, 5, 6, 7
                    if (currentPhase < phaseIdx) return null;

                    const pConfig = currentPhase === phaseIdx ? liveDrone : PHASES[phaseIdx].drone;
                    // Fallback to PHASES if liveDrone doesn't have the props yet (during transition)
                    const startX = pConfig.pathStartX ?? PHASES[phaseIdx].drone.pathStartX;
                    const startY = pConfig.pathStartY ?? PHASES[phaseIdx].drone.pathStartY;
                    const endX = pConfig.pathEndX ?? PHASES[phaseIdx].drone.pathEndX;
                    const endY = pConfig.pathEndY ?? PHASES[phaseIdx].drone.pathEndY;
                    const opacity = pConfig.pathOpacity ?? 0.4;

                    if (startX === undefined) return null;

                    return (
                        <motion.path
                            key={`path-${phaseId}`}
                            d={`M ${startX} ${startY} L ${endX} ${endY}`}
                            fill="none"
                            stroke="#A0A0A0"
                            strokeWidth="0.11"
                            strokeDasharray="0.1 0.1"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: opacity }}
                            transition={{ duration: 2.0, delay: 0.8, ease: "easeOut" }}
                            strokeLinecap="butt"
                        />
                    );
                })}
            </svg>

            {/* Dotted Line for Phases 1-6 */}
            <AnimatePresence>
                {[1, 2, 3, 4, 5, 6, 7].includes(activePhase.id) && (
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
                            0{activePhase.id}
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
            </AnimatePresence>

            {/* Manual Adjust Controls */}
            <AnimatePresence>
                {false && currentPhase !== 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        drag
                        dragMomentum={false}
                        className="absolute bottom-6 left-[5%] bg-white/95 border border-gray-200 p-4 pt-7 rounded-xl shadow-xl z-50 flex gap-5 text-[10px] items-start backdrop-blur-md text-black cursor-default scale-90 origin-bottom-left"
                    >
                        {/* Drag Handle */}
                        <div className="absolute top-0 left-0 right-0 h-5 flex items-center justify-center cursor-grab active:cursor-grabbing hover:bg-gray-50/50 rounded-t-xl border-b border-gray-100">
                            <div className="w-8 h-1 bg-gray-200 rounded-full" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="text-blue-600 font-bold mb-0.5 border-b border-blue-50 pb-0.5 uppercase tracking-wide">Drone</div>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                                <label className="flex flex-col gap-0.5">
                                    <span className="text-gray-400 text-[9px]">Model X %</span>
                                    <input type="number" step="0.5" value={liveDrone.x} onChange={(e) => handleOverrideChange("x", parseFloat(e.target.value))} className="w-16 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded focus:outline-blue-500" />
                                </label>
                                <label className="flex flex-col gap-0.5">
                                    <span className="text-gray-400 text-[9px]">Model Y %</span>
                                    <input type="number" step="0.5" value={liveDrone.y} onChange={(e) => handleOverrideChange("y", parseFloat(e.target.value))} className="w-16 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded" />
                                </label>
                                <label className="flex flex-col gap-0.5 col-span-2">
                                    <span className="text-gray-400 text-[9px]">Size px</span>
                                    <input type="number" step="10" value={liveDrone.size} onChange={(e) => handleOverrideChange("size", parseFloat(e.target.value))} className="w-full bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded" />
                                </label>
                            </div>

                            {/* Ghost 5 Controls */}
                            <div className="text-gray-500 font-bold mt-2 mb-0.5 border-b border-gray-50 pb-0.5 uppercase tracking-wide">Ghost 5</div>
                            <div className="grid grid-cols-2 gap-2">
                                <label className="flex flex-col gap-0.5">
                                    <span className="text-gray-400 text-[9px]">G5 X %</span>
                                    <input type="number" step="0.5" value={ghostConfigs[5]?.x} onChange={(e) => handleOverrideChange("ghost5X", parseFloat(e.target.value))} className="w-16 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded focus:outline-blue-500" />
                                </label>
                                <label className="flex flex-col gap-0.5">
                                    <span className="text-gray-400 text-[9px]">G5 Y %</span>
                                    <input type="number" step="0.5" value={ghostConfigs[5]?.y} onChange={(e) => handleOverrideChange("ghost5Y", parseFloat(e.target.value))} className="w-16 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded" />
                                </label>
                                <label className="flex flex-col gap-0.5">
                                    <span className="text-gray-400 text-[9px]">G5 Size</span>
                                    <input type="number" step="10" value={ghostConfigs[5]?.size} onChange={(e) => handleOverrideChange("ghost5Size", parseFloat(e.target.value))} className="w-16 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded" />
                                </label>
                            </div>

                            {/* Ghost 6 Controls */}
                            <div className="text-gray-500 font-bold mt-1 mb-0.5 border-b border-gray-50 pb-0.5 uppercase tracking-wide">Ghost 6</div>
                            <div className="grid grid-cols-2 gap-2">
                                <label className="flex flex-col gap-0.5">
                                    <span className="text-gray-400 text-[9px]">G6 X %</span>
                                    <input type="number" step="0.5" value={ghostConfigs[6]?.x} onChange={(e) => handleOverrideChange("ghost6X", parseFloat(e.target.value))} className="w-16 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded" />
                                </label>
                                <label className="flex flex-col gap-0.5">
                                    <span className="text-gray-400 text-[9px]">G6 Y %</span>
                                    <input type="number" step="0.5" value={ghostConfigs[6]?.y} onChange={(e) => handleOverrideChange("ghost6Y", parseFloat(e.target.value))} className="w-16 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded" />
                                </label>
                                <label className="flex flex-col gap-0.5">
                                    <span className="text-gray-400 text-[9px]">G6 Size</span>
                                    <input type="number" step="10" value={ghostConfigs[6]?.size} onChange={(e) => handleOverrideChange("ghost6Size", parseFloat(e.target.value))} className="w-16 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded" />
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="text-purple-600 font-bold mb-0.5 border-b border-purple-50 pb-0.5 uppercase tracking-wide">Card</div>
                            <div className="grid grid-cols-2 gap-2">
                                <label className="flex flex-col gap-0.5">
                                    <span className="text-gray-400 text-[9px]">Card X %</span>
                                    <input type="number" step="0.5" value={liveDrone.cardX} onChange={(e) => handleOverrideChange("cardX", parseFloat(e.target.value))} className="w-16 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded" />
                                </label>
                                <label className="flex flex-col gap-0.5">
                                    <span className="text-gray-400 text-[9px]">Card Y %</span>
                                    <input type="number" step="0.5" value={liveDrone.cardY} onChange={(e) => handleOverrideChange("cardY", parseFloat(e.target.value))} className="w-16 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded" />
                                </label>
                            </div>

                            <div className="text-blue-600 font-bold mt-1 mb-0.5 border-b border-blue-50 pb-0.5 uppercase tracking-wide">Line Points</div>
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                                <label className="flex flex-col gap-0.5">
                                    <span className="text-gray-400 text-[8px]">Start X/Y</span>
                                    <div className="flex gap-1">
                                        <input type="number" step="0.5" value={liveDrone.lineStartX ?? liveDrone.x} onChange={(e) => handleOverrideChange("lineStartX", parseFloat(e.target.value))} className="w-10 bg-gray-50 border border-gray-200 px-1 py-0.5 rounded" />
                                        <input type="number" step="0.5" value={liveDrone.lineStartY ?? liveDrone.y} onChange={(e) => handleOverrideChange("lineStartY", parseFloat(e.target.value))} className="w-10 bg-gray-50 border border-gray-200 px-1 py-0.5 rounded" />
                                    </div>
                                </label>
                                <label className="flex flex-col gap-0.5">
                                    <span className="text-gray-400 text-[8px]">Mid X/Y</span>
                                    <div className="flex gap-1">
                                        <input type="number" step="0.5" value={liveDrone.lineMidX ?? 50} onChange={(e) => handleOverrideChange("lineMidX", parseFloat(e.target.value))} className="w-10 bg-gray-50 border border-gray-200 px-1 py-0.5 rounded" />
                                        <input type="number" step="0.5" value={liveDrone.lineMidY ?? 50} onChange={(e) => handleOverrideChange("lineMidY", parseFloat(e.target.value))} className="w-10 bg-gray-50 border border-gray-200 px-1 py-0.5 rounded" />
                                    </div>
                                </label>
                                <label className="flex flex-col gap-0.5">
                                    <span className="text-gray-400 text-[8px]">End X/Y</span>
                                    <div className="flex gap-1">
                                        <input type="number" step="0.5" value={liveDrone.lineEndX ?? liveDrone.cardX} onChange={(e) => handleOverrideChange("lineEndX", parseFloat(e.target.value))} className="w-10 bg-gray-50 border border-gray-200 px-1 py-0.5 rounded" />
                                        <input type="number" step="0.5" value={liveDrone.lineEndY ?? liveDrone.cardY} onChange={(e) => handleOverrideChange("lineEndY", parseFloat(e.target.value))} className="w-10 bg-gray-50 border border-gray-200 px-1 py-0.5 rounded" />
                                    </div>
                                </label>
                            </div>

                            {/* Path Points Controls (Phase 2 Only) */}
                            {currentPhase === 1 && (
                                <>
                                    <div className="text-gray-500 font-bold mt-1 mb-0.5 border-b border-gray-50 pb-0.5 uppercase tracking-wide">Path Points</div>
                                    <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                                        <label className="flex flex-col gap-0.5">
                                            <span className="text-gray-400 text-[8px]">Start X/Y</span>
                                            <div className="flex gap-1">
                                                <input type="number" step="0.5" value={liveDrone.pathStartX ?? 0} onChange={(e) => handleOverrideChange("pathStartX", parseFloat(e.target.value))} className="w-10 bg-gray-50 border border-gray-200 px-1 py-0.5 rounded" />
                                                <input type="number" step="0.5" value={liveDrone.pathStartY ?? 0} onChange={(e) => handleOverrideChange("pathStartY", parseFloat(e.target.value))} className="w-10 bg-gray-50 border border-gray-200 px-1 py-0.5 rounded" />
                                            </div>
                                        </label>
                                        <label className="flex flex-col gap-0.5">
                                            <span className="text-gray-400 text-[8px]">Mid X/Y</span>
                                            <div className="flex gap-1">
                                                <input type="number" step="0.5" value={liveDrone.pathMidX ?? 0} onChange={(e) => handleOverrideChange("pathMidX", parseFloat(e.target.value))} className="w-10 bg-gray-50 border border-gray-200 px-1 py-0.5 rounded" />
                                                <input type="number" step="0.5" value={liveDrone.pathMidY ?? 0} onChange={(e) => handleOverrideChange("pathMidY", parseFloat(e.target.value))} className="w-10 bg-gray-50 border border-gray-200 px-1 py-0.5 rounded" />
                                            </div>
                                        </label>
                                        <label className="flex flex-col gap-0.5">
                                            <span className="text-gray-400 text-[8px]">End X/Y</span>
                                            <div className="flex gap-1">
                                                <input type="number" step="0.5" value={liveDrone.pathEndX ?? 0} onChange={(e) => handleOverrideChange("pathEndX", parseFloat(e.target.value))} className="w-10 bg-gray-50 border border-gray-200 px-1 py-0.5 rounded" />
                                                <input type="number" step="0.5" value={liveDrone.pathEndY ?? 0} onChange={(e) => handleOverrideChange("pathEndY", parseFloat(e.target.value))} className="w-10 bg-gray-50 border border-gray-200 px-1 py-0.5 rounded" />
                                            </div>
                                        </label>
                                        <label className="flex flex-col gap-0.5">
                                            <span className="text-gray-400 text-[8px]">Opacity</span>
                                            <input type="number" step="0.1" value={liveDrone.pathOpacity ?? 0.4} onChange={(e) => handleOverrideChange("pathOpacity", parseFloat(e.target.value))} className="w-12 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded" />
                                        </label>
                                        <label className="flex flex-col gap-0.5">
                                            <span className="text-gray-400 text-[8px]">Curve</span>
                                            <input type="number" step="0.05" value={liveDrone.pathCurve ?? 0.1} onChange={(e) => handleOverrideChange("pathCurve", parseFloat(e.target.value))} className="w-12 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded" />
                                        </label>
                                    </div>
                                </>
                            )}

                            {/* 2-Point Path Controls (Phases 3,4,5,6,7) */}
                            {currentPhase >= 2 && currentPhase <= 6 && (
                                <>
                                    <div className="text-gray-500 font-bold mt-1 mb-0.5 border-b border-gray-50 pb-0.5 uppercase tracking-wide">Path Points</div>
                                    <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                                        <label className="flex flex-col gap-0.5">
                                            <span className="text-gray-400 text-[8px]">Start X/Y</span>
                                            <div className="flex gap-1">
                                                <input type="number" step="0.5" value={liveDrone.pathStartX ?? 0} onChange={(e) => handleOverrideChange("pathStartX", parseFloat(e.target.value))} className="w-10 bg-gray-50 border border-gray-200 px-1 py-0.5 rounded" />
                                                <input type="number" step="0.5" value={liveDrone.pathStartY ?? 0} onChange={(e) => handleOverrideChange("pathStartY", parseFloat(e.target.value))} className="w-10 bg-gray-50 border border-gray-200 px-1 py-0.5 rounded" />
                                            </div>
                                        </label>
                                        <label className="flex flex-col gap-0.5">
                                            <span className="text-gray-400 text-[8px]">End X/Y</span>
                                            <div className="flex gap-1">
                                                <input type="number" step="0.5" value={liveDrone.pathEndX ?? 0} onChange={(e) => handleOverrideChange("pathEndX", parseFloat(e.target.value))} className="w-10 bg-gray-50 border border-gray-200 px-1 py-0.5 rounded" />
                                                <input type="number" step="0.5" value={liveDrone.pathEndY ?? 0} onChange={(e) => handleOverrideChange("pathEndY", parseFloat(e.target.value))} className="w-10 bg-gray-50 border border-gray-200 px-1 py-0.5 rounded" />
                                            </div>
                                        </label>
                                        <label className="flex flex-col gap-0.5">
                                            <span className="text-gray-400 text-[8px]">Opacity</span>
                                            <input type="number" step="0.1" value={liveDrone.pathOpacity ?? 0.4} onChange={(e) => handleOverrideChange("pathOpacity", parseFloat(e.target.value))} className="w-12 bg-gray-50 border border-gray-200 px-1.5 py-0.5 rounded" />
                                        </label>
                                    </div>
                                </>
                            )}

                            <div className="text-blue-600 font-bold mt-1 mb-0.5 border-b border-blue-50 pb-0.5 uppercase tracking-wide">Rotation</div>
                            <div className="grid grid-cols-3 gap-1.5">
                                <label className="flex flex-col gap-0.5">
                                    <span className="text-gray-400 text-[8px]">X</span>
                                    <input type="number" step="1" value={liveDrone.rotateX} onChange={(e) => handleOverrideChange("rotateX", parseFloat(e.target.value))} className="w-12 bg-gray-50 border border-gray-200 px-1 py-0.5 rounded" />
                                </label>
                                <label className="flex flex-col gap-0.5">
                                    <span className="text-gray-400 text-[8px]">Y</span>
                                    <input type="number" step="1" value={liveDrone.rotateY} onChange={(e) => handleOverrideChange("rotateY", parseFloat(e.target.value))} className="w-12 bg-gray-50 border border-gray-200 px-1 py-0.5 rounded" />
                                </label>
                                <label className="flex flex-col gap-0.5">
                                    <span className="text-gray-400 text-[8px]">Z</span>
                                    <input type="number" step="1" value={liveDrone.rotateZ} onChange={(e) => handleOverrideChange("rotateZ", parseFloat(e.target.value))} className="w-12 bg-gray-50 border border-gray-200 px-1 py-0.5 rounded" />
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 border-l border-gray-100 pl-4 min-w-[130px]">
                            <div className="text-orange-600 font-bold mb-0.5 border-b border-orange-50 pb-0.5 uppercase tracking-wide">Camera</div>
                            <div className="grid grid-cols-2 gap-x-3 gap-y-1 font-mono text-gray-500 text-[9px]">
                                <div className="flex flex-col">
                                    <span className="text-[7px] text-gray-400">PX</span>
                                    <span className="font-bold">{cameraStats.pos.x}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[7px] text-gray-400">RX</span>
                                    <span className="font-bold">{cameraStats.rot.x}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[7px] text-gray-400">PY</span>
                                    <span className="font-bold">{cameraStats.pos.y}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[7px] text-gray-400">RY</span>
                                    <span className="font-bold">{cameraStats.rot.y}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[7px] text-gray-400">PZ</span>
                                    <span className="font-bold">{cameraStats.pos.z}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[7px] text-gray-400">RZ</span>
                                    <span className="font-bold">{cameraStats.rot.z}</span>
                                </div>
                            </div>

                            <div className="mt-auto pt-2 flex flex-col gap-2">
                                <div className="bg-black text-white px-2 py-0.5 rounded text-[8px] font-bold text-center">
                                    PHASE {currentPhase + 1}
                                </div>
                                <button
                                    onClick={() => {
                                        console.log('Stats:', {
                                            drone: liveDrone,
                                            camera: {
                                                position: [cameraStats.pos.x, cameraStats.pos.y, cameraStats.pos.z],
                                                rotation: [cameraStats.rot.x, cameraStats.rot.y, cameraStats.rot.z]
                                            }
                                        });
                                        alert('Stats logged.');
                                    }}
                                    className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors text-[9px] font-bold"
                                >
                                    Log Stats
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
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
function CameraController({ activePhase, onUpdate, isManualMode, isAnimating }: { activePhase: any, onUpdate: (stats: any) => void, isManualMode: boolean, isAnimating: boolean }) {
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
            const isFast = (activePhase.id === 5 || activePhase.id === 4);
            const lerpFactor = isFast ? 0.25 : 0.06; // Weighted camera movement for slower speed
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
