'use client';

import React, { useEffect, useRef, useState } from "react";
import { Linkedin, Mail, MapPin, Calendar, Users, Award } from "lucide-react";

// Assuming you are in a Next.js environment for the Image component
// If not, you can replace <Image> with a standard <img> tag.
import Image from "next/image";

// Main App Component
const App = () => {
  // URL for the background image.
  const backgroundImageUrl = 'https://i.imgur.com/VQLV32s.jpeg';

  // State and Refs for the Team Section
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const sectionRef = useRef<HTMLDivElement>(null);

  // Effect for the intersection observer to trigger animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Animate only once
        }
      },
      { threshold: 0.1 } // Start animation when 10% is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Data for the team section
  const departments = ["All", "Engineering", "AI Research", "Operations", "Business"];

  const teamMembers = [
    { name: "Dr. Emily Watson", title: "Lead AI Engineer", department: "AI Research", image: "https://placehold.co/400x400/1a1a1a/ffffff?text=EW", location: "San Francisco, CA", joinDate: "2019", bio: "Specializes in machine learning algorithms for autonomous navigation systems.", expertise: ["Machine Learning", "Computer Vision", "Neural Networks"], social: { linkedin: "#", email: "emily@tsallaaerospace.com" } },
    { name: "Michael Chang", title: "Senior Hardware Engineer", department: "Engineering", image: "https://placehold.co/400x400/1a1a1a/ffffff?text=MC", location: "Austin, TX", joinDate: "2020", bio: "Expert in ruggedized electronics and embedded systems for aerospace applications.", expertise: ["Embedded Systems", "Circuit Design", "Testing"], social: { linkedin: "#", email: "michael@tsallaaerospace.com" } },
    { name: "Sarah Johnson", title: "Operations Director", department: "Operations", image: "https://placehold.co/400x400/1a1a1a/ffffff?text=SJ", location: "Denver, CO", joinDate: "2018", bio: "Oversees global operations and ensures seamless project delivery.", expertise: ["Project Management", "Operations", "Strategy"], social: { linkedin: "#", email: "sarah@tsallaaerospace.com" } },
    { name: "Dr. Alex Rivera", title: "Quantum Computing Researcher", department: "AI Research", image: "https://placehold.co/400x400/1a1a1a/ffffff?text=AR", location: "Boston, MA", joinDate: "2021", bio: "Pioneering quantum algorithms for next-generation autonomous systems.", expertise: ["Quantum Computing", "Algorithms", "Research"], social: { linkedin: "#", email: "alex@tsallaaerospace.com" } },
    { name: "Lisa Park", title: "Business Development Lead", department: "Business", image: "https://placehold.co/400x400/1a1a1a/ffffff?text=LP", location: "New York, NY", joinDate: "2019", bio: "Drives strategic partnerships and business growth initiatives.", expertise: ["Business Strategy", "Partnerships", "Growth"], social: { linkedin: "#", email: "lisa@tsallaaerospace.com" } },
    { name: "David Kim", title: "Senior Software Engineer", department: "Engineering", image: "https://placehold.co/400x400/1a1a1a/ffffff?text=DK", location: "Seattle, WA", joinDate: "2020", bio: "Develops mission-critical software for autonomous system control.", expertise: ["Software Development", "Real-time Systems", "C++"], social: { linkedin: "#", email: "david@tsallaaerospace.com" } },
  ];

  const filteredMembers =
    selectedDepartment === "All"
      ? teamMembers
      : teamMembers.filter((member) => member.department === selectedDepartment);

  const teamStats = [
    { icon: Users, label: "Team Members", value: "50+", description: "Across all departments" },
    { icon: MapPin, label: "Global Offices", value: "8", description: "Cities worldwide" },
    { icon: Award, label: "Industry Awards", value: "25+", description: "Team achievements" },
    { icon: Calendar, label: "Average Tenure", value: "4.2", description: "Years with company" },
  ];

  return (
    // Main container using the 'Chakra Petch' font
    <main className="font-chakra bg-black">
      {/* --- Hero Section --- */}
      <div className="relative w-full h-screen text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
          aria-hidden="true"
        ></div>
        <div className="absolute inset-0 bg-black opacity-30" aria-hidden="true"></div>
        <div className="relative z-10 flex h-full items-end justify-center pb-20 sm:pb-24 md:pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-6xl w-full px-6 lg:px-8">
            <div className="text-center md:text-left">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none">
                WORK WITH
                <br />
                PURPOSE
              </h1>
            </div>
            <div className="text-center md:text-left max-w-md mx-auto md:mx-0">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Be Part Of Something Bigger.
              </h2>
              <p className="text-base sm:text-lg leading-relaxed opacity-90">
                At Tsella Aerospace, We're Building Technology That Pushes Boundaries And Inspires Impact. We're Not Just Innovating—We're Shaping The Future.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- Team Members Section --- */}
      <section ref={sectionRef} className="py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Meet Our Team</h2>
            <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600 max-w-3xl mx-auto">
              The brilliant minds behind our innovations. Our diverse team of engineers, researchers, and visionaries work
              together to push the boundaries of autonomous systems technology.
            </p>
          </div>

          <div className={`grid md:grid-cols-4 gap-6 mb-16 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {teamStats.map((stat) => (
              <div key={stat.label} className="bg-gray-950 p-6 rounded-xl border border-gray-800 hover:border-purple-500 transition-all duration-300 text-center group">
                <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-4 group-hover:text-purple-300 transition-colors" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="font-semibold mb-1">{stat.label}</div>
                <div className="text-gray-400 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>

          <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${selectedDepartment === dept ? "bg-purple-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"}`}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member, index) => (
              <div
                key={member.name}
                className={`bg-gray-950 rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500 transition-all duration-500 group ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${(index + 6) * 100}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image src={member.image} alt={member.name} layout="fill" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-purple-600 bg-opacity-90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {member.department}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">{member.name}</h3>
                  <p className="text-purple-400 font-semibold mb-4">{member.title}</p>
                  <p className="text-lg md:text-xl font-light leading-relaxed text-neutral-600 mb-4">{member.bio}</p>
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {member.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Since {member.joinDate}
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill) => (
                        <span key={skill} className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <a href={member.social.linkedin} className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-300">
                      <Linkedin className="w-4 h-4 text-gray-300 hover:text-white" />
                    </a>
                    <a href={`mailto:${member.social.email}`} className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300">
                      <Mail className="w-4 h-4 text-gray-300 hover:text-white" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-16 text-center transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 p-12 rounded-2xl">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Amazing Team</h3>
              <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
                We're always looking for talented individuals who share our passion for innovation and excellence.
                Discover opportunities to work on cutting-edge autonomous systems that shape the future.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                  View Open Positions
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300">
                  Learn About Our Culture
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;
