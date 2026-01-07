import { useState, useEffect, useCallback } from "react";
import { FaQuoteRight } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechCorp Solutions",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    text: "Working with this team has been an absolute game-changer for our business. Their innovative solutions and dedication to excellence have helped us achieve remarkable results.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO",
    company: "InnovateX",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    text: "The level of professionalism and expertise demonstrated by the team is outstanding. They've consistently delivered beyond our expectations.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "Digital Dynamics",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    text: "I'm incredibly impressed with the attention to detail and commitment to quality. Our project was delivered on time and exceeded all requirements.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Lee",
    role: "Lead Developer",
    company: "CodeCrafters Inc.",
    image: "https://images.unsplash.com/photo-1603415526960-f7e0328f7b63",
    text: "Their ability to understand our vision and execute with precision is unmatched. A reliable and talented team.",
    rating: 5,
  },
  {
    id: 5,
    name: "Ava Patel",
    role: "UX Designer",
    company: "DesignFlow",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    text: "From concept to completion, the attention to user experience was remarkable. The results speak for themselves.",
    rating: 4,
  },
  {
    id: 6,
    name: "Carlos Mendoza",
    role: "Operations Manager",
    company: "NextGen Logistics",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    text: "We’ve seen incredible improvements in efficiency thanks to their custom-built solutions. Highly recommended.",
    rating: 5,
  },
  {
    id: 7,
    name: "Isabella Nguyen",
    role: "CTO",
    company: "SkyNet Systems",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    text: "They brought new ideas to the table and executed everything flawlessly. One of the best teams we’ve worked with.",
    rating: 5,
  },
  {
    id: 8,
    name: "Liam Thompson",
    role: "Founder",
    company: "StartSmart Ventures",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a",
    text: "Outstanding communication and flawless delivery. Their support even after deployment has been exceptional.",
    rating: 5,
  },
  {
    id: 9,
    name: "Liam Thompson",
    role: "Founder",
    company: "StartSmart Ventures",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a",
    text: "Outstanding communication and flawless delivery. Their support even after deployment has been exceptional.",
    rating: 5,
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesToShow = typeof window !== "undefined" && window.innerWidth >= 1024 ? 3 : 1;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex + slidesToShow >= testimonials.length ? 0 : prevIndex + slidesToShow
    );
  }, [slidesToShow]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="w-full px-6 md:px-12 xl:px-24 max-w-[90rem] mx-auto py-16">
  {/* Heading */}
  <div className="text-left mb-10">
<p className="text-gray-400 uppercase tracking-widest mb-6 font-sans text-2xl font-light">
  TESTIMONIALS
</p>
<h2
  className="text-white font-medium text-left"
  style={{
    fontFamily: "Pontano Sans, sans-serif",
    fontSize: "clamp(20px, 4vw, 40px)",
    lineHeight: 1.4,
  }}
>
  Don’t just take our word for it, discover how we’ve made a difference.
</h2>
  </div>


  {/* Slider */}
<div
  className="relative h-[31.25rem] overflow-hidden rounded-2xl shadow-xl"
  style={{ backgroundColor: "#eaeaea" }}
>
  <div
    className="absolute w-full h-full transition-transform duration-500 ease-in-out flex"
    style={{ transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)` }}
  >
    {testimonials.map((testimonial) => (
      <div
        key={testimonial.id}
        className="w-full lg:w-1/3 h-full flex-shrink-0"
        style={{ flex: `0 0 ${100 / slidesToShow}%` }}
      >
        <div className="flex flex-col items-center justify-center h-full px-4 md:px-8 text-center font-['Inter'] text-black">
          <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mb-6">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-full h-full object-cover rounded-full shadow-lg"
              loading="lazy"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb";
              }}
            />
            <div className="absolute -bottom-3 -right-3 bg-white p-2 rounded-full shadow-lg">
              <FaQuoteRight className="text-black text-xl" />
            </div>
          </div>

          <p className="text-black/90 text-sm md:text-base lg:text-[0.9375rem] mb-4 italic font-light">
            {testimonial.text}
          </p>

          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(testimonial.rating)].map((_, i) => (
              <AiFillStar key={i} className="text-yellow-400 text-lg" />
            ))}
          </div>

          <h3 className="text-[1.0625rem] md:text-xl text-black mb-1 font-['Inter'] font-medium">
            {testimonial.name}
          </h3>

          <p className="text-black/80 font-light text-sm md:text-[0.9375rem] font-['Inter']">
            {testimonial.role} at {testimonial.company}
          </p>
        </div>
      </div>
    ))}
        </div>

       {/* Pagination Dots */}
<div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 font-['Inter']">
  {Array.from({ length: Math.ceil(testimonials.length / slidesToShow) }).map(
    (_, index) => (
      <button
        key={index}
        onClick={() => setCurrentIndex(index * slidesToShow)}
        className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black ${
          Math.floor(currentIndex / slidesToShow) === index
            ? "bg-black w-6"
            : "bg-gray-300 hover:bg-gray-400"
        }`}
        aria-label={`Go to testimonial group ${index + 1}`}
      />
    )
  )}
</div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
