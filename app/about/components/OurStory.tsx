"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";

// Updated images array to include inspiring words for each slide
const slideContent = [
  {
    src: "https://img.freepik.com/premium-photo/man-operating-drone-with-remote-control-silhouette-against-colorful-sunset_2379-1187.jpg?w=2000",
    text: "Innovation takes flight. Our journey began with a vision to redefine autonomous systems.",
  },
  {
    src: "https://img.freepik.com/premium-photo/man-holding-drone-preparing-take-off_2379-1083.jpg?w=2000",
    text: "From concept to reality, we build with precision, pushing boundaries in aerospace technology.",
  },
  {
    src: "https://img.freepik.com/premium-photo/beautiful-gloomy-sunset-drone-view-kathmandu-nepal_1048944-10741804.jpg?w=2000",
    text: "Our solutions empower missions beyond the horizon, ensuring safety and success in every endeavor.",
  },
  {
    src: "https://img.freepik.com/free-vector/corporate-meeting-employees-cartoon-characters-discussing-business-strategy-planning-further-actions-brainstorming-formal-communication-seminar-concept-illustration_335657-2035.jpg?t=st=1751623585~exp=1751627185~hmac=9adbc3a31eafdaa4ccfe150e",
    text: "Collaboration fuels our progress. We believe in the power of diverse minds working towards a shared future.",
  },
  {
    src: "https://img.freepik.com/free-photo/business-people-partnership-support-team-urban-scene-concept_53876-144834.jpg?t=st=1751623951~exp=1751627551~hmac=0679a514ae05840410419afa7b9539791be111194981eed85d96070113f80d12&w=2000",
    text: "Together, we forge partnerships that transcend limits, building a legacy of trust and innovation.",
  },
];

export default function OurStorySlider() {
  const [current, setCurrent] = useState(0);
  // Removed `flip` state as it's no longer used for the new animation

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slideContent.length);
  };

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slideContent.length) % slideContent.length);
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Image Slider Container */}
      {/* This div holds all images side-by-side and translates horizontally */}
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slideContent.map((slide, index) => (
          <div key={index} className="relative w-full h-full flex-shrink-0">
            <Image
              src={slide.src}
              alt={`Our Story Slide ${index + 1}`}
              fill
              className="object-cover"
            />
            {/* Overlay for image */}
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
        ))}
      </div>

      {/* Inspiring Words Overlay - Always displays the text for the current slide */}
     <div className="absolute inset-0 flex items-center justify-center text-center px-8 z-10">
  <p className="text-white text-2xl md:text-4xl font-semibold max-w-3xl leading-snug font-Inter">
    {slideContent[current].text}
  </p>
</div>

      {/* "OUR STORY" Heading - Positioned at bottom-left */}
      <div className="absolute bottom-8 left-8 z-20">
      <h1 className="text-white text-4xl md:text-6xl font-semibold font-Inter tracking-tight">
  OUR STORY
</h1>
      </div>


      {/* Arrows */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-6 md:px-12">
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="bg-white bg-opacity-20 hover:bg-opacity-40 p-3 rounded-full transition"
        >
          <ChevronLeft className="text-white w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="bg-white bg-opacity-20 hover:bg-opacity-40 p-3 rounded-full transition"
        >
          <ChevronRight className="text-white w-6 h-6" />
        </button>
      </div>
    </section>
  );
}
