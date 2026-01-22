"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";

export default function CompanyTimeline() {
  const data = [
    {
      title: "2021",
      content: (
        <div>
          <h3 className="text-xl md:text-2xl font-clash font-bold text-black mb-4">
            Commercial Launch
          </h3>
          <p className="mb-6 text-lg md:text-xl font-light text-neutral-600 leading-relaxed">
            Tsalla Aerospace launched its flagship commercial drone systems targeting defense, agriculture, and industrial sectors across India.
          </p>
          <ul className="mb-6 space-y-2 text-lg md:text-xl font-light text-neutral-600">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>First commercial orders secured from government agencies</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Manufacturing facility expanded in Bangalore</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Strategic partnerships with defense contractors established</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>International market research and expansion planning began</span>
            </li>
          </ul>
          <div className="w-full h-64 md:h-80 relative rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=500&fit=crop"
              alt="2021 - Acceleration Year"
              fill
              className="object-cover"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div>
          <h3 className="text-xl md:text-2xl font-clash font-bold text-black mb-4">
            Market Leadership
          </h3>
          <p className="mb-6 text-lg md:text-xl font-light text-neutral-600 leading-relaxed">
            Established Tsalla as a leading indigenous drone manufacturer in India with production scaling and multi-sector presence.
          </p>
          <ul className="mb-6 space-y-2 text-lg md:text-xl font-light text-neutral-600">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Production capacity increased 5-fold to meet market demand</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Awards and recognition from Indian aerospace associations</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Expanded applications in agriculture, disaster management, and infrastructure</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>International collaborations with global aerospace partners</span>
            </li>
          </ul>
          <div className="w-full h-64 md:h-80 relative rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop"
              alt="2022 - Scaling Year"
              fill
              className="object-cover"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <h3 className="text-xl md:text-2xl font-clash font-bold text-black mb-4">
            Innovation Expansion
          </h3>
          <p className="mb-6 text-lg md:text-xl font-light text-neutral-600 leading-relaxed">
            Expanded research and development capabilities with AI/ML integration and sustainability focus.
          </p>
          <ul className="mb-6 space-y-2 text-lg md:text-xl font-light text-neutral-600">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Integrated AI and machine learning for autonomous flight capabilities</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Opened dedicated R&D center in Bangalore for advanced systems</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Focus on sustainable and eco-friendly drone technologies</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Collaborated with IITs for advanced research initiatives</span>
            </li>
          </ul>
          <div className="w-full h-64 md:h-80 relative rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop"
              alt="2023 - Innovation Year"
              fill
              className="object-cover"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <h3 className="text-xl md:text-2xl font-clash font-bold text-black mb-4">
            Global Expansion
          </h3>
          <p className="mb-6 text-lg md:text-xl font-light text-neutral-600 leading-relaxed">
            Extended reach beyond India with international offices and strategic global partnerships.
          </p>
          <ul className="mb-6 space-y-2 text-lg md:text-xl font-light text-neutral-600">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Opened offices in Southeast Asia and Middle East regions</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Strategic partnerships with global aerospace companies</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Team expansion to 500+ engineers and specialists</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Major government contracts and defense collaborations</span>
            </li>
          </ul>
          <div className="w-full h-64 md:h-80 relative rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop"
              alt="2024 - Growth Year"
              fill
              className="object-cover"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div>
          <h3 className="text-xl md:text-2xl font-clash font-bold text-black mb-4">
            Future Vision
          </h3>
          <p className="mb-6 text-lg md:text-xl font-light text-neutral-600 leading-relaxed">
            Leading the evolution of autonomous aerial and space systems with hybrid-electric platforms.
          </p>
          <ul className="mb-6 space-y-2 text-lg md:text-xl font-light text-neutral-600">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Launch hybrid-electric drone platforms for sustainable operations</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Integration with space systems and satellite technology</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Established as global leader in autonomous aerospace solutions</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <span>Positioned for next-generation intelligent systems and AI integration</span>
            </li>
          </ul>
          <div className="w-full h-64 md:h-80 relative rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=500&fit=crop"
              alt="2025 - Future Vision"
              fill
              className="object-cover"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
