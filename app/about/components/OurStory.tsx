"use client";

import { FeatureSteps } from "@/components/ui/feature-section";

// Updated data for OurStory using the FeatureSteps component
const storyContent = [
  {
    step: "Chapter 1",
    title: "Innovation Takes Flight",
    content: "Our journey began with a vision to redefine autonomous systems. From humble beginnings in Bangalore, we assembled a team of passionate aerospace engineers dedicated to revolutionizing the industry.",
    image: "https://img.freepik.com/premium-photo/man-operating-drone-with-remote-control-silhouette-against-colorful-sunset_2379-1187.jpg?w=2000",
  },
  {
    step: "Chapter 2",
    title: "From Concept to Reality",
    content: "We built with precision, transforming bold ideas into cutting-edge autonomous systems. Our commitment to excellence and innovation pushed boundaries in aerospace technology, setting new standards for the industry.",
    image: "https://img.freepik.com/premium-photo/man-holding-drone-preparing-take-off_2379-1083.jpg?w=2000",
  },
  {
    step: "Chapter 3",
    title: "Empowering Missions",
    content: "Our solutions empower missions beyond the horizon, ensuring safety and success in every endeavor. From surveillance to disaster management, we provide reliable platforms that make a real difference.",
    image: "https://img.freepik.com/premium-photo/beautiful-gloomy-sunset-drone-view-kathmandu-nepal_1048944-10741804.jpg?w=2000",
  },
  {
    step: "Chapter 4",
    title: "Collaboration Fuels Progress",
    content: "We believe in the power of diverse minds working towards a shared future. Our team's collaborative spirit and cross-functional expertise drive continuous innovation and excellence.",
    image: "https://img.freepik.com/free-vector/corporate-meeting-employees-cartoon-characters-discussing-business-strategy-planning-further-actions-brainstorming-formal-communication-seminar-concept-illustration_335657-2035.jpg?t=st=1751623585~exp=1751627185~hmac=9adbc3a31eafdaa4ccfe150e",
  },
  {
    step: "Chapter 5",
    title: "Building a Legacy",
    content: "Together, we forge partnerships that transcend limits, building a legacy of trust and innovation. Our vision is to be the global leader in autonomous aerospace solutions, trusted by nations and enterprises worldwide.",
    image: "https://img.freepik.com/free-photo/business-people-partnership-support-team-urban-scene-concept_53876-144834.jpg?t=st=1751623951~exp=1751627551~hmac=0679a514ae05840410419afa7b9539791be111194981eed85d96070113f80d12&w=2000",
  },
];

export default function OurStorySlider() {
  return (
    <section className="relative w-full bg-white pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Our Story</h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover the journey of Tsalla Aerospace Private Limited, from inception to becoming a leader in autonomous aerospace solutions.
          </p>
        </div>
      </div>
      <FeatureSteps
        features={storyContent}
        title=""
        autoPlayInterval={5000}
        imageHeight="h-[500px] md:h-[800px]"
        className="bg-white"
        imageContainerClassName="-mt-32 md:-mt-48"
      />
    </section>
  );
}


