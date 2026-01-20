"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, OrbitControls } from "@react-three/drei";

const PHASES = [
    {
        number: "01",
        title: "LRV TRANSITIONS TO VERTICAL POSITION",
        description: "The Launch Recovery Vehicle (LRV) prepares for departure by tilting to the optimal vertical launch angle.",
        drone: { pos: { left: 20, top: 28 }, rotateX: 4, rotateY: -32, rotateZ: -7, size: 1190 },
        panelPosition: { bottom: "300px", left: "60px" },
        numberPosition: { top: "-48px", left: "-6px" },
        allowInteraction: false,
        camera: { position: [0.1, 1.41, 4.29], rotation: [-18.3, 1.2, 0.4], fov: 45 }
    },
    {
        number: "02",
        title: "LRV LAUNCHES X-BAT STRAIGHT UP",
        description: "Cold-launch technology propels the X-BAT into the air, minimizing thermal signature and footprint.",
        drone: { pos: { left: 12, top: 30 }, rotateX: 0, rotateY: 0, rotateZ: -2, size: 290 },
        panelPosition: { top: "250px", left: "60px" },
        numberPosition: { top: "-48px", left: "-6px" },
        showPath: "vertical-launch",
        showGhost: true,
        ghosts: [
            {
                pos: { left: 19, top: 80 },
                rotateX: 0, rotateY: 0, rotateZ: -2,
                size: 290,
                opacity: 0.3
            }
        ],
        waypoints: [
            { left: 18.8, top: 75 },
            // { left: 31.8, top: 71.5 },
            { left: 18.8, top: 51.5 },
        ],
        lineConfig: {
            strokeWidth: 0.2,
            strokeDasharray: "0.4,0.4",
            opacity: 0.3
        },
        waypointConfig: {
            size: 0.4,
            opacity: 0.8
        },
        allowInteraction: false
    },
    {
        number: "03",
        title: "X-BAT TRANSITIONS TO HORIZONTAL POSITION",
        description: "Aerodynamic surfaces adjust to transition from vertical thrust to horizontal flight path.",
        drone: { pos: { left: 30, top: 2 }, rotateX: 0, rotateY: -20, rotateZ: -88, size: 290 },
        panelPosition: { top: "320px", left: "650px" },
        numberPosition: { top: "-48px", left: "-4px" },
        showPath: "transition-curve",
        showGhost: true,
        ghosts: [
            {
                pos: { left: 19, top: 80 }, // Phase 1
                rotateX: 0, rotateY: 0, rotateZ: -2,
                size: 290,
                opacity: 0.4
            },
            {
                pos: { left: 19, top: 41.56 }, // Phase 2
                rotateX: 0, rotateY: 0, rotateZ: -2,
                size: 290,
                opacity: 0.4
            }
        ],
        waypoints: [
            { left: 31, top: 15 },
            // { left: 32, top: 30 },
            { left: 18.9, top: 37 },
        ],
        lineConfig: {
            strokeWidth: 0.2,
            strokeDasharray: "0.4,0.4",
            opacity: 0.2
        },
        waypointConfig: {
            size: 0.4,
            opacity: 0.8
        },
        extraPaths: [
            {
                waypoints: [{ left: 18.9, top: 75 }, { left: 18.9, top: 51.5 }],
                lineConfig: { strokeWidth: 0.2, strokeDasharray: "0.4,0.4", opacity: 0.4 },
                waypointConfig: { size: 0.4, opacity: 0.4 }
            }
        ],
        allowInteraction: false
    },
    {
        number: "04",
        title: "DECELERATES AND TRANSITIONS TO VERTICAL FLIGHT",
        description: "Approaching landing zone, the system transitions back to vertical orientation for precision recovery.",
        drone: { pos: { left: 80, top: 30 }, rotateX: 0, rotateY: 0, rotateZ: 0, size: 100 },
        panelPosition: { top: "120px", right: "50px", textAlign: "right" as const },
        numberPosition: { top: "-48px", left: "-16px" },
        showPath: "recovery-curve",
        waypoints: [
            { left: 35, top: 55 },
            { left: 60, top: 45 },
            { left: 80, top: 30 },
        ],
        allowInteraction: false
    },
    {
        number: "05",
        title: "MAINTAINS CONTROLLED DESCENT TOWARD FLIGHT DECK",
        description: "Precision altitude control ensures a steady approach towards the mobile recovery platform.",
        drone: { pos: { left: 85, top: 55 }, rotateX: 0, rotateY: 0, rotateZ: -15, size: 120 },
        panelPosition: { top: "50%", right: "50px", transform: "translateY(-50%)", textAlign: "right" as const },
        numberPosition: { top: "-48px", left: "-16px" },
        showPath: "descent-path",
        waypoints: [
            { left: 80, top: 30 },
            { left: 82.5, top: 42.5 },
            { left: 85, top: 55 },
        ],
        allowInteraction: false
    },
    {
        number: "06",
        title: "CONTACTS LRV AND ENGAGES LATCH",
        description: "Final latching mechanism secures the UAS to the LRV for safe recovery and transport.",
        drone: { pos: { left: 20, top: 80 }, rotateX: 0, rotateY: 0, rotateZ: -35, size: 160 },
        panelPosition: { bottom: "80px", right: "50px", textAlign: "right" as const },
        numberPosition: { top: "-48px", left: "-16px" },
        showPath: "landing-approach",
        waypoints: [
            { left: 85, top: 55 },
            { left: 52.5, top: 67.5 },
            { left: 20, top: 80 },
        ],
        allowInteraction: false
    },
    {
        number: "",
        title: "From Road to Air in Minutes",
        description: "Rapid deployment and recovery capabilities for modern battlefield tactical advantage.",
        drone: { pos: { left: 50, top: 50 }, rotateX: 0, rotateY: 0, rotateZ: 0, rotate: 0, size: 0 },
        panelPosition: { bottom: "80px", left: "50px" },
        numberPosition: { top: "-48px", left: "-16px" },
        isSummary: true,
        allowInteraction: true
    },
];

export default function BatLaunchSequence() {
    const [currentPhase, setCurrentPhase] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Debug state
    const [overrides, setOverrides] = useState<any>(null);
    const [cameraStats, setCameraStats] = useState({ pos: { x: 0, y: 0, z: 5 }, rot: { x: 0, y: 0, z: 0 } });

    // Sync overrides when phase changes
    useEffect(() => {
        setOverrides(null);
    }, [currentPhase]);

    // Handle scroll to advance phases
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Prevent actual page scrolling when inside this component
            if (containerRef.current) {
                e.preventDefault();
            }

            if (isAnimating) return;

            if (e.deltaY > 20) {
                if (currentPhase < PHASES.length - 1) {
                    goToPhase(currentPhase + 1);
                }
            } else if (e.deltaY < -20) {
                if (currentPhase > 0) {
                    goToPhase(currentPhase - 1);
                }
            }
        };

        const goToPhase = (index: number) => {
            setIsAnimating(true);
            setCurrentPhase(index);
            setTimeout(() => setIsAnimating(false), 800);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("wheel", handleWheel, { passive: false });
        }
        return () => {
            if (container) {
                container.removeEventListener("wheel", handleWheel);
            }
        }
    }, [currentPhase, isAnimating]);

    const activePhase = PHASES[currentPhase];

    // Determine current drone props (either phase default or overridden)
    const currentDrone = overrides || {
        left: activePhase.drone.pos.left,
        top: activePhase.drone.pos.top,
        size: activePhase.drone.size,
        rotateX: activePhase.drone.rotateX || 0,
        rotateY: activePhase.drone.rotateY || 0,
        rotateZ: activePhase.drone.rotateZ || 0,
    };

    const handleOverrideChange = (key: string, value: number) => {
        setOverrides((prev: any) => ({
            ...currentDrone, // Ensure we start with complete current state
            [key]: value
        }));
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen bg-black overflow-hidden font-mono text-white select-none"
        >
            {/* SVG Flight Paths */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-1" viewBox="0 0 100 100" preserveAspectRatio="none">
                <AnimatePresence>
                    {/* Render Main Path */}
                    {activePhase.waypoints && (
                        <motion.path
                            key={`path-${currentPhase}`}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: activePhase.lineConfig?.opacity || 0.5 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            d={generatePath(activePhase.waypoints)}
                            stroke="#4a5568"
                            strokeWidth={activePhase.lineConfig?.strokeWidth || 0.2}
                            strokeDasharray={activePhase.lineConfig?.strokeDasharray || "0.5,0.5"}
                            fill="none"
                        />
                    )}

                    {/* Render Extra Persistent Paths */}
                    {activePhase.extraPaths?.map((path, pIdx) => (
                        <motion.path
                            key={`extra-path-${currentPhase}-${pIdx}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: path.lineConfig?.opacity || 0.2 }}
                            exit={{ opacity: 0 }}
                            d={generatePath(path.waypoints)}
                            stroke="#4a5568"
                            strokeWidth={path.lineConfig?.strokeWidth || 0.2}
                            strokeDasharray={path.lineConfig?.strokeDasharray || "0.5,0.5"}
                            fill="none"
                        />
                    ))}

                    {/* Vertical Launch Line for Phase 2 */}
                    {currentPhase === 1 && (
                        <motion.line
                            initial={{ scaleY: 0, opacity: 0 }}
                            animate={{ scaleY: 1, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            x1="50" y1="35" x2="50" y2="70"
                            stroke="url(#grad1)"
                            strokeWidth="0.2"
                        />
                    )}
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: "white", stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: "white", stopOpacity: 0 }} />
                        </linearGradient>
                    </defs>
                </AnimatePresence>

                {/* Main Waypoint Markers */}
                {activePhase.waypoints?.map((wp, i) => (
                    <circle
                        key={`wp-${i}`}
                        cx={wp.left}
                        cy={wp.top}
                        r={activePhase.waypointConfig?.size || 0.4}
                        fill="white"
                        fillOpacity={activePhase.waypointConfig?.opacity || 0.8}
                    />
                ))}

                {/* Extra Waypoint Markers */}
                {activePhase.extraPaths?.map((path, pIdx) =>
                    path.waypoints.map((wp, i) => (
                        <circle
                            key={`extra-wp-${pIdx}-${i}`}
                            cx={wp.left}
                            cy={wp.top}
                            r={path.waypointConfig?.size || 0.4}
                            fill="white"
                            fillOpacity={path.waypointConfig?.opacity || 0.8}
                        />
                    ))
                )}
            </svg>

            {/* 01..06 Indicator (Top Left) */}
            <div className="absolute top-[30px] left-[50px] z-10 flex gap-[20px] tracking-[5px] text-[10px]">
                {PHASES.slice(0, 6).map((p, i) => (
                    <span
                        key={i}
                        className={`transition-opacity duration-300 ${currentPhase === i ? "opacity-100" : "opacity-30 text-[#666]"}`}
                    >
                        {p.number}
                    </span>
                ))}
            </div>

            {/* Ghost Drones (Persistent Previews) */}
            {activePhase.showGhost && activePhase.ghosts?.map((ghost, idx) => (
                <motion.div
                    key={`ghost-${currentPhase}-${idx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: ghost.opacity }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute z-4 pointer-events-none grayscale"
                    style={{
                        left: `${ghost.pos.left}%`,
                        top: `${ghost.pos.top}%`,
                        transform: `translate(-50%, -50%) rotateX(${ghost.rotateX || 0}deg) rotateY(${ghost.rotateY || 0}deg) rotateZ(${ghost.rotateZ || 0}deg)`,
                        width: `${ghost.size}px`,
                    }}
                >
                    <img
                        src="/images/Bat/Bat.png"
                        alt="Ghost Drone"
                        className="w-full h-auto"
                    />
                </motion.div>
            ))}

            {/* Drone Component */}
            {!activePhase.isSummary && (
                <motion.div
                    layoutId="drone"
                    className="absolute z-5"
                    animate={{
                        left: `${currentDrone.left}%`,
                        top: `${currentDrone.top}%`,
                        rotateX: currentDrone.rotateX,
                        rotateY: currentDrone.rotateY,
                        rotateZ: currentDrone.rotateZ,
                        x: "-50%",
                        y: "-50%",
                        width: currentDrone.size,
                        height: currentDrone.size,
                    }}
                    transition={overrides ? { duration: 0 } : { duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                >
                    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <Environment preset="city" />
                        <Suspense fallback={null}>
                            <Model scale={[0.8, 0.8, 0.8]} />
                        </Suspense>
                        <OrbitControls
                            enabled={activePhase.allowInteraction}
                            enableZoom={activePhase.allowInteraction}
                            enablePan={activePhase.allowInteraction}
                            enableRotate={activePhase.allowInteraction}
                        />
                        <CameraController
                            activePhase={activePhase}
                            onUpdate={setCameraStats}
                        />
                    </Canvas>
                </motion.div>
            )}

            {/* Summary View (Phase 7) */}
            <AnimatePresence>
                {activePhase.isSummary && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-5 flex items-center justify-center bg-black"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-center z-10">From Road to Air in Minutes</h1>

                        {/* Thumbnails arranged around */}
                        {PHASES.slice(0, 6).map((p, i) => {
                            const positions = [
                                { left: '15%', top: '75%' }, // P1
                                { left: '15%', top: '25%' }, // P2
                                { left: '35%', top: '20%' }, // P3
                                { left: '65%', top: '20%' }, // P4
                                { left: '85%', top: '25%' }, // P5
                                { left: '85%', top: '75%' }, // P6
                            ];
                            return (
                                <div key={i} className="absolute flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity" style={positions[i]}>
                                    <div className="text-[11px] text-[#666] uppercase text-center max-w-[120px] leading-tight mb-2">
                                        {p.number} <br /> {p.title}
                                    </div>
                                    <img
                                        src="/images/Bat/Bat.png"
                                        style={{ width: '80px', transform: `rotate(${p.drone.rotate}deg)` }}
                                        alt=""
                                    />
                                </div>
                            )
                        })}

                        <div className="absolute bottom-10 text-gray-400 text-sm animate-pulse">
                            Scroll to explore phases
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Phase Info Panel (Bottom Left) */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPhase}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    style={activePhase.panelPosition}
                    className="absolute z-10 max-w-[400px]"
                >
                    <div className="relative">
                        {activePhase.number && (
                            <div
                                className="text-[40px] font-bold opacity-20 absolute pointer-events-none"
                                style={activePhase.numberPosition || { top: "-48px", left: "-16px" }}
                            >
                                {activePhase.number}
                            </div>
                        )}
                        <h2 className="text-[16px] font-bold leading-[1.6] tracking-wider mb-4">
                            {activePhase.title}
                        </h2>
                        <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                            {activePhase.description}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Progress Bars (Bottom Right) */}
            <div className="absolute bottom-[30px] right-[50px] z-10 flex flex-col items-end gap-4">
                <div className="flex gap-[3px]">
                    {PHASES.map((_, i) => (
                        <div
                            key={i}
                            className={`w-[30px] h-[2px] transition-colors duration-300 ${currentPhase === i ? "bg-white" : "bg-[#333]"}`}
                        />
                    ))}
                </div>
                <div className="text-[12px] text-[#666]">Scroll to continue</div>
            </div>

            {/* DEBUG PANEL - Position/Rotation/Size Editor */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-black/80 border border-gray-800 p-4 rounded-lg z-50 flex gap-6 text-[10px] items-end backdrop-blur-md">
                <div className="flex flex-col gap-2">
                    <div className="text-cyan-400 font-bold mb-1">POSITION (x: left%, y: top%)</div>
                    <label className="flex items-center gap-2">
                        <span className="w-4">X</span>
                        <input type="range" min="0" max="100" step="0.5" value={currentDrone.left} onChange={(e) => handleOverrideChange("left", parseFloat(e.target.value))} className="w-24 accent-white" />
                        <span className="w-8 text-right font-mono">{currentDrone.left}</span>
                    </label>
                    <label className="flex items-center gap-2">
                        <span className="w-4">Y</span>
                        <input type="range" min="0" max="100" step="0.5" value={currentDrone.top} onChange={(e) => handleOverrideChange("top", parseFloat(e.target.value))} className="w-24 accent-white" />
                        <span className="w-8 text-right font-mono">{currentDrone.top}</span>
                    </label>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="text-cyan-400 font-bold mb-1">ROTATION (deg)</div>
                    <label className="flex items-center gap-2">
                        <span className="w-4">X</span>
                        <input type="range" min="-180" max="180" step="1" value={currentDrone.rotateX} onChange={(e) => handleOverrideChange("rotateX", parseFloat(e.target.value))} className="w-24 accent-white" />
                        <input type="number" value={currentDrone.rotateX} onChange={(e) => handleOverrideChange("rotateX", parseFloat(e.target.value))} className="w-12 bg-transparent border-b border-gray-600 font-mono text-right" />
                    </label>
                    <label className="flex items-center gap-2">
                        <span className="w-4">Y</span>
                        <input type="range" min="-180" max="180" step="1" value={currentDrone.rotateY} onChange={(e) => handleOverrideChange("rotateY", parseFloat(e.target.value))} className="w-24 accent-white" />
                        <input type="number" value={currentDrone.rotateY} onChange={(e) => handleOverrideChange("rotateY", parseFloat(e.target.value))} className="w-12 bg-transparent border-b border-gray-600 font-mono text-right" />
                    </label>
                    <label className="flex items-center gap-2">
                        <span className="w-4">Z</span>
                        <input type="range" min="-180" max="180" step="1" value={currentDrone.rotateZ} onChange={(e) => handleOverrideChange("rotateZ", parseFloat(e.target.value))} className="w-24 accent-white" />
                        <input type="number" value={currentDrone.rotateZ} onChange={(e) => handleOverrideChange("rotateZ", parseFloat(e.target.value))} className="w-12 bg-transparent border-b border-gray-600 font-mono text-right" />
                    </label>
                </div>

                <div className="flex flex-col gap-2">
                    <div className="text-cyan-400 font-bold mb-1">SIZE (px)</div>
                    <label className="flex items-center gap-2">
                        <span className="w-8">Size</span>
                        <input type="range" min="50" max="1500" step="10" value={currentDrone.size} onChange={(e) => handleOverrideChange("size", parseFloat(e.target.value))} className="w-24 accent-white" />
                        <input type="number" value={currentDrone.size} onChange={(e) => handleOverrideChange("size", parseFloat(e.target.value))} className="w-12 bg-transparent border-b border-gray-600 font-mono text-right" />
                    </label>
                </div>

                {/* NEW CAMERA STATS SECTION */}
                <div className="flex flex-col gap-1 border-l border-gray-700 pl-4 ml-2">
                    <div className="text-yellow-400 font-bold mb-1">CAMERA VIEW</div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-gray-400">
                        <span>P.X: {cameraStats.pos.x}</span>
                        <span>R.X: {cameraStats.rot.x}°</span>

                        <span>P.Y: {cameraStats.pos.y}</span>
                        <span>R.Y: {cameraStats.rot.y}°</span>

                        <span>P.Z: {cameraStats.pos.z}</span>
                        <span>R.Z: {cameraStats.rot.z}°</span>
                    </div>
                </div>

                <div className="h-full flex items-end pb-1 text-xs text-gray-500">
                    Phase {currentPhase + 1}
                </div>
            </div>
        </div >
    );
}

// Helper to control and log camera
function CameraController({ activePhase, onUpdate }: { activePhase: any, onUpdate: (stats: any) => void }) {
    const { camera } = useThree();
    const frameCount = useRef(0);

    // Update camera position if phase provides a specific camera config
    useEffect(() => {
        if (activePhase.camera && activePhase.camera.position) {
            camera.position.set(
                activePhase.camera.position[0],
                activePhase.camera.position[1],
                activePhase.camera.position[2]
            );
            camera.updateProjectionMatrix();
        } else {
            // Default view if no specific camera config
            camera.position.set(0, 0, 5);
            camera.rotation.set(0, 0, 0);
            camera.updateProjectionMatrix();
        }
    }, [activePhase, camera]); // Update when phase changes

    useFrame(() => {
        frameCount.current++;
        if (frameCount.current % 10 === 0) {
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

// Model component from user, path fixed and simplified to avoid node name mismatches
export function Model(props: any) {
    const { scene } = useGLTF('/model/BATMAN.glb')
    return (
        <group {...props} dispose={null}>
            {/* Applying the rotation to show side view (90 deg Y-rotation) instead of bottom view */}
            <primitive object={scene} rotation={[0, Math.PI / 2, 0]} />
        </group>
    )
}

useGLTF.preload('/model/BATMAN.glb')

// Helper to generate SVG path string from waypoints using 0-100 coordinates
function generatePath(waypoints: { left: number, top: number }[]) {
    if (!waypoints || waypoints.length < 2) return "";

    let d = `M ${waypoints[0].left} ${waypoints[0].top}`;

    for (let i = 1; i < waypoints.length; i++) {
        const prev = waypoints[i - 1];
        const curr = waypoints[i];

        // Smooth transition curve
        const cx = i === 1 ? curr.left : prev.left;
        const cy = i === 1 ? prev.top : curr.top;

        d += ` Q ${cx} ${cy} ${curr.left} ${curr.top}`;
    }

    return d;
}
