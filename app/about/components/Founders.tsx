"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [activeFounder, setActiveFounder] = useState<number | null>(null);

  return (
    <section className="bg-white py-24 text-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold  tracking-tight mb-4 uppercase text-black">
            Meet Our <span className="text-black">Founders</span>
          </h2>
          <div className="w-24 h-1 bg-[#5ce1e6] mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative z-10 bg-gray-50 rounded-3xl p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-[#5ce1e6]/10 border border-gray-100">
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                  {/* Image with 3D-like hover */}
                  <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0 group-hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 bg-[#5ce1e6] rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-10" />
                    <div className="absolute inset-0 bg-gray-200 rounded-2xl overflow-hidden shadow-xl">
                      <Image
                        src={founder.image}
                        alt={founder.name}
                        fill
                        className="object-cover"
                        sizes="(max-w-768px) 192px, 224px"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-4 pt-4">
                    <div>
                      <h3 className="text-3xl font-clash font-bold text-gray-900 mb-1">
                        {founder.name}
                      </h3>
                      <p className="text-[#5ce1e6] font-medium font-clash uppercase tracking-wider text-sm">
                        {founder.title}
                      </p>
                    </div>

                    <p className="text-gray-600 leading-relaxed text-lg italic">
                      &quot;{founder.bio.split(". ")[0]}.&quot;
                    </p>

                    <button
                      onClick={() => setActiveFounder(activeFounder === index ? null : index)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full font-clash font-medium hover:bg-[#5ce1e6] transition-all duration-300 shadow-lg hover:shadow-[#5ce1e6]/40"
                    >
                      {activeFounder === index ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      {activeFounder === index ? "Close Bio" : "Read Full Bio"}
                    </button>
                  </div>
                </div>

                {/* Animated Bio Overlay */}
                <AnimatePresence>
                  {activeFounder === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-8 pt-8 border-t border-gray-200">
                        <p className="text-gray-700 text-lg leading-relaxed font-light">
                          {founder.bio}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Background Accent */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#5ce1e6]/5 rounded-full blur-3xl group-hover:bg-[#5ce1e6]/10 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
