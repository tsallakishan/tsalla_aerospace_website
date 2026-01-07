"use client";

import { useEffect } from "react";

export default function MaverickHero(): JSX.Element {
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
          px-4 sm:px-6 md:px-8 pb-12 sm:pb-16 md:pb-20
          lg:flex-row lg:justify-between lg:items-end
          lg:px-20 lg:pb-20
        "
      >
        {/* Left Side */}
        <div className="max-w-full lg:max-w-2xl text-left mb-8 lg:mb-0">
          <h1
            className="font-bold text-[2rem] sm:text-[2.75rem] md:text-[3.75rem] lg:text-[4.5rem] leading-tight tracking-tight mb-4"
            style={{ letterSpacing: "-0.03em" }}
          >
            MAVERICK
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl font-normal tracking-wide text-balance"
            style={{ letterSpacing: "0.01em" }}
          >
            Leading-edge detection and smart decision-making
          </p>
        </div>

        {/* Right Side */}
        <div className="max-w-full lg:max-w-md text-left text-white/80 text-sm sm:text-base md:text-lg font-light leading-relaxed tracking-wide text-balance">
          Where perception meets precision, machines act with human-like
          judgment at machine speed. This is autonomous command that
          redefines what’s possible.
        </div>
      </div>
    </section>
  );
}
