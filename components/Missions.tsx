"use client";

import React, { useRef, useEffect, useState } from "react";

export default function Missions() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Import for the 'Pontano Sans' font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pontano+Sans&display=swap');
      `}</style>

      <section
        ref={sectionRef}
        className="relative w-full h-[80vh] flex items-center justify-start bg-black text-white overflow-hidden"
      >
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/design-mode/mission.png"
            alt="Mission Background"
            className="w-full h-full object-cover object-right"
          />
        </div>
        {/* Content */}
        <div className="relative z-10 px-8 sm:px-16 md:px-24 lg:px-32 text-left max-w-5xl">
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-light text-black mb-6 font-sans transition-all duration-700 ease-out transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
            style={{ fontFamily: "'ClashGrotesk Bold (.eot)', sans-serif" }}
          >
            The Mantle Behind the Mission
          </h2>
          <div className="w-full">
            <p
              className={`text-lg md:text-xl font-light leading-relaxed text-neutral-600 tracking-wide font-sans transition-all duration-700 ease-out transform ${isVisible ? "opacity-90 translate-y-0" : "opacity-0 translate-y-12"
                }`}
              style={{
                fontFamily: "'Pontano Sans', 'Inter', sans-serif",
                transitionDelay: "150ms",
            
              }}
            >
              By turning algorithms into fearless pilots, we empower manned and unmanned systems to fly, fight, and decide on their own, bringing order to chaos and mission-critical support where humans and satellites can't. our adversaries are evolving. and so must we.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
