"use client"

import React from "react"
import { ContentWrapper } from "@/components/ContentWrapper"
import { motion } from "framer-motion"

export default function FenixFloorMap(): React.JSX.Element {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden bg-black">
            {/* Background Video */}
            <video
                src="/images/Fenix/floormap.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                Your browser does not support the video tag.
            </video>

            {/* Dark Overlay for Text Readability */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

            {/* Content */}
            <div className="relative z-20 w-full">
                <ContentWrapper>
                    <div className="flex flex-col items-start justify-center min-h-screen max-w-4xl pb-32">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 text-white" style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}>
                                <span style={{ color: '#5ce1e6' }}>Floor Map</span> Generation
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600 max-w-2xl">
                                Real-time mapping for mission planning and situational awareness — creates detailed floor layouts to support navigation, coordination, and post-op analysis.
                            </p>
                        </motion.div>
                    </div>
                </ContentWrapper>
            </div>
        </section>
    )
}
