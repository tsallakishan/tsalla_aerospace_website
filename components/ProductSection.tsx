"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Activity, ChevronRight } from "lucide-react";
import Link from "next/link";

const PONTANO_SANS = "'Pontano Sans', 'Inter', sans-serif";

// --- Types ---
interface Product {
    id: number;
    tag: string;
    title: string;
    description: string;
    imageUrl: string;
    isWide?: boolean;
    features?: string[];
    animationType?: string;
    glitchEffect?: boolean;
    href: string;
}

// --- Static Data ---
const STATIC_PRODUCTS: Product[] = [
    {
        id: 1,
        tag: "Outdoor Overwatch",
        title: "DEXTER",
        description: "Multi-Role Single Solution",
        imageUrl: "/images/drone/dexter.png",
        isWide: false,
        // animationType: "float",
        glitchEffect: false,
        features: [],
        href: "/uncrewedsystems/dexter"
    },
    {
        id: 2,
        tag: "Drone As First Responder",
        title: "FENIX",
        description: "Fast Entry Navigational Intrusion eXplorer",
        imageUrl: "/images/drone/fenix.png",
        isWide: false,
        animationType: "scan",
        glitchEffect: true,
        features: [],
        href: "/uncrewedsystems/fenix"
    },
    {
        id: 3,
        tag: "Indoor Tactical",
        title: "BAT",
        description: "Battlefield Aerial Tactical UAS",
        imageUrl: "/images/drone/bat.png",
        isWide: false,
        // animationType: "float",
        glitchEffect: true,
        features: [],
        href: "/uncrewedsystems/bat"
    },
    {
        id: 4,
        tag: "Crisis Communications",
        title: "STORM",
        description: "Smart Transport Operations for Rugged Missions",
        imageUrl: "/images/drone/storm.png",
        isWide: false,
        animationType: "pulse",
        glitchEffect: false,
        features: [],
        href: "/uncrewedsystems/storm"
    },
    {
        id: 5,
        tag: "Drone Management Software",
        title: "liveOps",
        description: "Unified Drone Operations",
        imageUrl: "/images/drone/controller.png",
        isWide: true,
        animationType: "hud",
        glitchEffect: false,
        features: [
            "Teleoperations",
            "Livestreaming",
            "2-way Comms",
            "Evidence Management",
            "Manage Teams & Devices",
            "API integrations"
        ],
        href: "/maverick"
    }
];

// --- Sub-components ---

const HUDLines = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-blue-500/40" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-blue-500/40" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-blue-500/40" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-blue-500/40" />
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-blue-500/10" />
        <div className="absolute left-1/2 top-0 w-[1px] h-full bg-blue-500/10" />
    </div>
);

const GlitchOverlay = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.2, 0, 0.1, 0] }}
        transition={{ repeat: Infinity, duration: 2, times: [0, 0.1, 0.2, 0.3, 1] }}
        className="absolute inset-0 bg-blue-500/5 z-10 pointer-events-none mix-blend-overlay"
    />
);

function ProductCard({ product, index }: { product: Product; index: number }) {
    const isWide = product.isWide;

    if (isWide) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: false, amount: 0.2 }}
                className="col-span-1 md:col-span-2 relative group overflow-hidden rounded-xl bg-[#0a0a0a] border border-white/20 hover:border-blue-500/50 transition-all duration-500 shadow-2xl shadow-[inset_0_0_30px_rgba(255,255,255,0.05)]"
            >
                <HUDLines />
                <AnimatePresence>
                    {product.glitchEffect && <GlitchOverlay />}
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 pointer-events-none" />


                <div className="relative z-30 p-4 h-full min-h-[180px] flex flex-col">
                    <div className="flex justify-start mb-2">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold bg-white/5 backdrop-blur-xl border border-white/10 text-white/80"
                        >
                            <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                            {product.tag}
                        </motion.div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full items-center">
                            <div className="lg:col-span-3 flex flex-col gap-3">
                                {product.features?.slice(0, 3).map((feature, i) => (
                                    <motion.div key={i} whileHover={{ x: 10 }} className="flex items-center gap-4 group/item cursor-default">
                                        <div className="h-[1px] w-8 bg-blue-500/30 group-hover/item:w-12 transition-all" />
                                        <span className="text-sm font-medium text-gray-400 group-hover/item:text-white transition-colors uppercase tracking-wider">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="lg:col-span-6 relative flex justify-center">
                                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm shadow-2xl group-hover:border-blue-500/50 transition-colors">
                                    <img src={product.imageUrl} className="w-full h-full object-cover opacity-80" alt="Live View" />
                                    <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
                                    <div className="absolute top-2 left-2 flex gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                        <span className="text-[8px] text-white/50 uppercase font-bold">Live Stream 04</span>
                                    </div>
                                </div>
                                <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" viewBox="0 0 100 100">
                                    <path d="M 25 30 L 10 30" stroke="currentColor" fill="transparent" strokeWidth="0.5" className="text-blue-500/20" />
                                    <path d="M 25 50 L 10 50" stroke="currentColor" fill="transparent" strokeWidth="0.5" className="text-blue-500/20" />
                                    <path d="M 25 70 L 10 70" stroke="currentColor" fill="transparent" strokeWidth="0.5" className="text-blue-500/20" />
                                    <path d="M 75 30 L 90 30" stroke="currentColor" fill="transparent" strokeWidth="0.5" className="text-blue-500/20" />
                                    <path d="M 75 50 L 90 50" stroke="currentColor" fill="transparent" strokeWidth="0.5" className="text-blue-500/20" />
                                    <path d="M 75 70 L 90 70" stroke="currentColor" fill="transparent" strokeWidth="0.5" className="text-blue-500/20" />
                                </svg>
                            </div>

                            <div className="lg:col-span-3 flex flex-col gap-3 items-end">
                                {product.features?.slice(3).map((feature, i) => (
                                    <motion.div key={i} whileHover={{ x: -10 }} className="flex items-center gap-4 group/item cursor-default text-right">
                                        <span className="text-sm font-medium text-gray-400 group-hover/item:text-white transition-colors uppercase tracking-wider">{feature}</span>
                                        <div className="h-[1px] w-8 bg-blue-500/30 group-hover/item:w-12 transition-all" />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-2 flex flex-col md:flex-row justify-end items-end gap-4">
                        <Link href={product.href}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-4 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                            >
                                Explore System
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: false, amount: 0.2 }}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-[#0a0a0a] border border-white/20 hover:border-white/40 transition-all duration-500 shadow-[inset_0_0_30px_rgba(255,255,255,0.05)]"
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
            <motion.img
                src={product.imageUrl}
                alt={product.title}
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                animate={product.animationType === 'float' ? { y: [0, -15, 0] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative z-20 p-8 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/40 border border-white/10 text-white backdrop-blur-md">
                        {product.tag}
                    </span>
                    {product.glitchEffect && <Zap className="w-4 h-4 text-blue-500 animate-pulse" />}
                </div>
                <div className="flex justify-between items-end">
                    <div>
                        <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter" style={{ fontFamily: PONTANO_SANS }}>
                            {product.title}
                        </h3>
                        <p className="text-sm text-gray-400 font-medium line-clamp-2" style={{ fontFamily: PONTANO_SANS }}>
                            {product.description}
                        </p>
                    </div>
                    <Link href={product.href}>
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                borderColor: "rgba(59, 130, 246, 0.5)",
                                color: "#3b82f6"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#111] border border-white/10 text-white/90 text-[11px] font-bold uppercase tracking-widest transition-all shadow-2xl group/btn"
                            style={{ fontFamily: PONTANO_SANS }}
                        >
                            Inspect
                            <ChevronRight className="w-4 h-4 opacity-70 transition-colors group-hover/btn:text-blue-400" />
                        </motion.button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

// --- Main Section Component ---

export default function ProductSection() {
    return (
        <section className="bg-[#050505] text-white selection:bg-blue-500/30">
            <div className="max-w-5xl mx-auto px-6 py-24">

                {/* Header Section */}
                <div className="text-center mb-8 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[9px] uppercase tracking-[0.3em] font-black"
                        style={{ fontFamily: PONTANO_SANS }}
                    >
                        <Activity className="w-3 h-3" />
                        Active Operations
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-[0.9] italic"
                        style={{ fontFamily: PONTANO_SANS }}
                    >
                        <span className="text-blue-500">Autonomy</span> Without<br />
                        Limits<span className="text-blue-500">.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-sm text-gray-400 max-w-2xl mx-auto font-medium"
                        style={{ fontFamily: PONTANO_SANS }}
                    >
                        Intelligent aerial platforms designed to think, adapt, and execute across the full spectrum of modern operations.
                    </motion.p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {STATIC_PRODUCTS.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

