'use client';

import React, { useState, useEffect, useRef } from 'react';

// Custom hook for the count-up animation
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isVisible = useIntersectionObserver(ref);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const endValue = end;
      // if duration is 0, just set the value
      if (duration === 0) {
        setCount(endValue);
        return;
      }

      const startTime = Date.now();

      const frame = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const current = Math.floor(progress * (endValue - start) + start);
        setCount(current);

        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
            setCount(endValue); // Ensure it ends on the exact number
        }
      };

      requestAnimationFrame(frame);
    }
  }, [isVisible, end, duration]);

  return { count, ref };
};

// Custom hook to detect if an element is in the viewport
const useIntersectionObserver = (ref: React.RefObject<HTMLElement>) => {
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIntersecting(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if(ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref]);

    return isIntersecting;
};


// StatItem component to display each statistic
const StatItem = ({ value, label, hasPlus = true }: { value: number; label: string; hasPlus?: boolean }) => {
  const { count, ref } = useCountUp(value, 2000);

  return (
    <div ref={ref} className="text-center">
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-clash font-bold text-white">
        {count}
        {hasPlus && '+'}
      </h2>
      <p className="text-base font-clash md:text-lg text-gray-400 mt-2">{label}</p>
    </div>
  );
};

// Main component for the stats section
const StatsSection = () => {
  const stats = [
    { value: 120, label: 'Total Flight Hours', hasPlus: true },
    { value: 25, label: 'Flight Hours Per Drone', hasPlus: true },
    { value: 20, label: 'Products Made', hasPlus: true },
    { value: 30, label: 'People Employed', hasPlus: false },
  ];

  return (
    // MODIFIED: This container is now full-screen and centers its content.
    <div className="bg-black h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-x-8 lg:gap-x-16">
          {stats.map((stat, index) => (
            <StatItem key={index} value={stat.value} label={stat.label} hasPlus={stat.hasPlus} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
