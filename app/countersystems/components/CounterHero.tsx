"use client";

import React, { useEffect } from "react";

export default function CounterHero() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Clash+Grotesk:wght@400;500;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <section
      className="relative h-screen w-full text-white overflow-hidden"
      style={{ fontFamily: "'Clash Grotesk', Arial, sans-serif" }}
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"
      >
        <source
          src="https://shield.ai/wp-content/uploads/2025/03/v-bat-hero-3.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div
        className="
          relative z-20 w-full h-full
          flex flex-col justify-end
          px-4 sm:px-6 md:px-8
          pb-24 sm:pb-24 md:pb-28
          lg:px-20 lg:pb-32
        "
      >
        {/* SHIFTED UP: ~2 lines on mobile, ~1 line on tablet, stays until desktop */}
        <div className="relative -top-16 md:-top-8 max-w-full lg:max-w-4xl text-left my-3">
          <h1
            className="font-bold text-[2rem] sm:text-[2.75rem] md:text-[3.75rem] lg:text-[4.5rem] leading-tight tracking-tight mb-4 whitespace-nowrap"
            style={{ letterSpacing: "-0.03em" }}
          >
            COUNTER SYSTEMS
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl font-normal tracking-wide text-balance"
            style={{ letterSpacing: "0.01em" }}
          >
            Leading-edge detection and smart decision-making
          </p>
        </div>
      </div>
    </section>
  );
}
