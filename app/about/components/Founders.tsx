"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";

const founders = [
  {
    name: "Vinayak Tsalla",
    title: "Founder CEO, Tsalla Aerospace",
    image: "https://cdn.sanity.io/images/z5s3oquj/production/78d747ddeab5c063e283e85381da7cef706eb213-769x769.png?auto=format&fit=max&w=640&q=90",
    bio: "Sven Kruck is a visionary leader with expertise in autonomous defense systems and strategic operations. He has over a decade of experience leading innovation in the aerospace sector."
  },
  {
    name: "Dr Narayana T S S",
    title: "Co-Founder Director, Tsalla Aerospace",
    image: "https://cdn.sanity.io/images/z5s3oquj/production/223a0edc1498e64cd384117ef20d1c02cbfb7e4d-769x769.png?auto=format&fit=max&w=640&q=90",
    bio: "Florian Seibel brings deep technical knowledge and a relentless drive for innovation. He is the engineering force behind numerous UAV advancements in Europe."
  },
];

export default function Founders() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20 text-black">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="uppercase tracking-tight transition-all duration-700 transform font-clash text-5xl font-semibold text-center mb-12">
          Meet Our Founders
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {founders.map((founder, index) => (
            <div key={index} className="border-b border-black/20 pb-8">
              <div className="flex flex-col items-center">
                <div className="w-72 h-72 relative overflow-hidden mb-6">
                  <Image src={founder.image} alt={founder.name} fill className="object-cover" />
                </div>
                <h3 className="text-2xl font-clash font-semibold mb-2">{founder.name}</h3>
                <p className="text-gray-600 mb-4 text-center font-clash">{founder.title}</p>
                <button
                  onClick={() => toggleOpen(index)}
                  className="text-black flex items-center space-x-1 hover:text-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-clash">{openIndex === index ? "Hide Info" : "More Info"}</span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out mt-4 text-center text-gray-600 max-w-md mx-auto ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p>{founder.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
