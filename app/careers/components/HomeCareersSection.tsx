'use client';

import React from 'react';

const App = () => {
  const backgroundImageUrl =
    'https://omo-oss-image.thefastimg.com/portal-saas/pg2025022816311880534/cms/image/08b50f4f-79c5-4ae5-b5bf-fa2fcfb0b544.jpg';

  return (
    <main className="font-clash bg-black">
      <section className="relative w-full h-screen text-white overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          aria-hidden="true"
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 z-0" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end h-full px-4 sm:px-6 md:px-12 lg:px-20 pb-12 sm:pb-16 md:pb-24 lg:pb-28">
          <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-end gap-10 max-w-7xl mx-auto">
            {/* Left: Headline */}
            <div className="text-left w-full md:w-1/2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-tight tracking-tight font-semibold py-0 my-0 px-0 mx-0">
                WORK WITH
                <br />
                PURPOSE
              </h1>
            </div>

            {/* Right: Subtext */}
            <div className="text-left w-full md:w-1/2 max-w-md md:max-w-none my-10">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3">
                Be Part Of Something Bigger.
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed">
                At Tsalla Aerospace, we're building technology that pushes
                boundaries and inspires impact. We’re not just innovating—we’re
                shaping the future.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;
