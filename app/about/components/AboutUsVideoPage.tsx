"use client";

import React from "react";
import { HeroParallax } from "@/components/ui/hero-parallax";

export const products = [
  {
    title: "Company Culture",
    link: "/about",
    thumbnail: "/images/culture/culture1.webp",
  },
  {
    title: "Innovation Lab",
    link: "/about",
    thumbnail: "/images/culture/culture2.jpg",
  },
  {
    title: "Team Collaboration",
    link: "/about",
    thumbnail: "/images/culture/culture3.jpg",
  },
  {
    title: "Our Workspace",
    link: "/about",
    thumbnail: "/images/culture/culture4.jpg",
  },
  {
    title: "Engineering Excellence",
    link: "/about",
    thumbnail: "/images/culture/culture5.jpg",
  },
  {
    title: "Future of Aerospace",
    link: "/about",
    thumbnail: "/images/culture/culture6.webp",
  },
  {
    title: "Design Process",
    link: "/about",
    thumbnail: "/images/culture/culture7.png",
  },
  {
    title: "Product Development",
    link: "/about",
    thumbnail: "/images/culture/culture8.webp",
  },
  {
    title: "Aerial Testing",
    link: "/about",
    thumbnail: "/images/culture/culture9.webp",
  },
  {
    title: "Manufacturing",
    link: "/about",
    thumbnail: "/images/culture/culture10.jpg",
  },
  {
    title: "Fenix Systems",
    link: "/fenix",
    thumbnail: "/images/Fenix/CounterTerrorism.jpg",
  },
  {
    title: "Search & Rescue",
    link: "/fenix",
    thumbnail: "/images/Fenix/Search_Rescue.jpg",
  },
  {
    title: "Warehouse Logistics",
    link: "/fenix",
    thumbnail: "/images/Fenix/WarehouseManagement.jpeg",
  },
  {
    title: "Mission Excellence",
    link: "/fenix",
    thumbnail: "/images/Fenix/CounterInversion.webp",
  },
  {
    title: "Advanced Navigation",
    link: "/fenix",
    thumbnail: "/images/Fenix/ptop.jpg",
  },
];

export default function AboutUsVideoPage() {
  return (
    <div className="bg-white">
      <HeroParallax
        products={products}
        title={
          <>
            ABOUT <span className="text-[#5ce1e6]">US</span>
          </>
        }
        description="Discover who we are, what drives us, and the vision that guides our journey beyond the horizon."
      />
    </div>
  );
}
