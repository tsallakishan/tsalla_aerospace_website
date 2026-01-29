"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function InitialLoader() {
    const [isLoading, setIsLoading] = useState(true)
    const [shouldRender, setShouldRender] = useState(false)

    useEffect(() => {
        const hasLoaded = sessionStorage.getItem("tsalla_initial_load")
        if (hasLoaded) {
            setIsLoading(false)
            setShouldRender(false)
            return
        }
        setShouldRender(true)

        const timer = setTimeout(() => {
            setIsLoading(false)
            sessionStorage.setItem("tsalla_initial_load", "true")
        }, 4500)

        return () => clearTimeout(timer)
    }, [])

    if (!shouldRender && !isLoading) return null;

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[100] bg-black"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                >
                    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden">
                        <div className="relative w-full h-full flex items-center justify-center">
                            <img
                                src="/logo2.svg"
                                alt="Tsalla Aerospace Logo"
                                className="w-32 h-32 md:w-[12rem] md:h-[12rem] filter drop-shadow-lg absolute"
                                style={{
                                    animation: "planeFlyDown 2.5s ease-in-out forwards, logoMoveLeft 1s ease-in-out 2.5s forwards",
                                }}
                            />

                            <div
                                className="absolute text-left ml-[4.5rem] md:ml-[5.4rem] lg:ml-[5.8rem]"
                                style={{
                                    animation: "textRevealRight 1s ease-out 2.5s forwards",
                                    opacity: 0,
                                }}
                            >
                                <img
                                    src="/svgmaker-editor.svg"
                                    alt="TSALLA AEROSPACE"
                                    className="h-16 md:h-24 w-auto"
                                />
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
