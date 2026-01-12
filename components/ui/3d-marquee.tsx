"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

export const ThreeDMarquee = ({
    items,
    className,
}: {
    items: { image: string; title: string }[];
    className?: string;
}) => {
    const [cols, setCols] = React.useState(6);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setCols(3);
            } else {
                setCols(6);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Split the items array into dynamic number of equal parts
    const chunkSize = Math.ceil(items.length / cols);
    const chunks = Array.from({ length: cols }, (_, colIndex) => {
        const start = colIndex * chunkSize;
        return items.slice(start, start + chunkSize);
    });

    return (
        <div
            className={cn(
                "mx-auto block h-[450px] md:h-[600px] lg:h-[900px] overflow-hidden rounded-2xl relative bg-neutral-100/50",
                className,
            )}
        >
            <div className="flex size-full items-center justify-center overflow-hidden">
                {/* 3D Wrapper */}
                <div
                    className="relative shrink-0 w-[160%] md:w-[140%] lg:w-[190%] aspect-square"
                    style={{
                        perspective: "1500px",
                    }}
                >
                    <div
                        style={{
                            transform: cols === 3
                                ? "rotateX(50deg) rotateY(0deg) rotateZ(-35deg) scale(0.9)"
                                : "rotateX(55deg) rotateY(0deg) rotateZ(-45deg) scale(1.1)",
                            transformStyle: "preserve-3d",
                        }}
                        className={cn(
                            "grid gap-3 lg:gap-6 w-full h-full p-4 lg:p-12",
                            cols === 3 ? "grid-cols-3" : "grid-cols-6"
                        )}
                    >
                        {chunks.map((subarray, colIndex) => (
                            <motion.div
                                animate={{
                                    y: colIndex % 2 === 0 ? [0, -150, 0] : [-150, 0, -150]
                                }}
                                transition={{
                                    duration: 25,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                key={colIndex + "marquee" + cols}
                                className="flex flex-col gap-3 lg:gap-6"
                            >
                                {subarray.map((item, itemIndex) => (
                                    <div
                                        className="relative group/news"
                                        key={itemIndex + item.image}
                                        style={{ transformStyle: "preserve-3d" }}
                                    >
                                        <motion.div
                                            whileHover={{
                                                translateZ: 20,
                                                scale: 1.02
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                ease: "easeInOut",
                                            }}
                                            className="aspect-[4/3] rounded-lg lg:rounded-xl overflow-hidden relative border border-gray-200/20 shadow-lg bg-zinc-900"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover/news:opacity-100 transition-opacity"
                                            />
                                            {/* Text Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-2 lg:p-3 flex flex-col justify-end">
                                                <p className="text-white text-[9px] lg:text-xs font-bold leading-tight font-orbit opacity-90 line-clamp-2">
                                                    {item.title}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subtle Vignette Overlay to hide edges */}
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.2)] rounded-2xl" />
        </div>
    );
};
