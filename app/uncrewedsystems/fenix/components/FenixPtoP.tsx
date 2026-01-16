"use client"

import React from "react"
import { motion } from "framer-motion"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"

export default function FenixPtoP(): React.JSX.Element {
    return (
        <section className="w-full bg-white text-black py-12 md:py-24 overflow-hidden">
            <div className="flex flex-col overflow-hidden">
                <ContainerScroll
                    titleComponent={
                        <div className="max-w-4xl mx-auto pb-8">
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight mb-8 leading-tight text-center"
                            >
                                Autonomous <br />
                                <span style={{ color: '#5ce1e6' }}>Point-to-Point</span> <br />
                                Navigation
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="text-lg md:text-xl text-neutral-600 font-light leading-relaxed max-w-2xl mx-auto text-center px-4"
                            >
                                Self-directed movement between mission-critical waypoints — adapts to dynamic environments with precision routing and obstacle avoidance.
                            </motion.p>
                        </div>
                    }
                >
                    <div className="relative w-full h-full">
                        <video
                            src="/images/Fenix/ptop.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        >
                            Your browser does not support the video tag.
                        </video>
                        {/* Dramatic inner glow/shadow */}
                        <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.3)] pointer-events-none" />
                    </div>
                </ContainerScroll>
            </div>
        </section>
    )
}
