
import { useRef, useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";

interface TimelineItemProps {
  year: string;
  description: string;
  isLast?: boolean;
  index: number;
  active: boolean;
  onClick: () => void;
}

const TimelineItem = ({ 
  year, 
  description, 
  isLast = false, 
  index,
  active,
  onClick
}: TimelineItemProps) => {
  return (
    <div className="flex flex-col items-center" onClick={onClick}>
      <div 
        className={`text-center cursor-pointer transition-all duration-300 ${
          active ? "scale-110" : "scale-100 hover:scale-105"
        }`}
      >
        <div className={`text-2xl font-bold ${active ? "text-vehicle-accent" : "text-vehicle-secondary"}`}>
          {year}
        </div>
        <div 
          className={`mt-2 p-4 ${
            active 
              ? "bg-white shadow-lg rounded-lg border-l-4 border-vehicle-accent" 
              : "bg-white shadow-md rounded-lg"
          } max-w-xs transition-all duration-300`}
        >
          {description}
        </div>
      </div>
      {!isLast && (
        <div className="hidden md:block w-full h-0.5 bg-blue-400 mt-4"></div>
      )}
    </div>
  );
};

const StorySection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const timeline = [
    {
      year: "2015",
      description: "Founded with a small team of automotive enthusiasts"
    },
    {
      year: "2018",
      description: "Launched our first vehicle management platform"
    },
    {
      year: "2020",
      description: "Expanded services to include nationwide support"
    },
    {
      year: "2023",
      description: "Introduced AI-powered maintenance predictions"
    },
    {
      year: "2025",
      description: "Serving over 50,000 satisfied customers"
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % timeline.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [timeline.length]);

  return (
    <div className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-vehicle-primary">
            Our Story
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
          <div className="mb-10 text-center max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700">
              Tosh Automobile was founded with a passion for vehicles and a commitment to making vehicle ownership simpler and more enjoyable. Our journey began with a simple idea: to create a platform that would help vehicle owners manage their cars as effectively as possible.
            </p>
          </div>
        </ScrollReveal>
        
        <div 
          ref={timelineRef}
          className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-0 mt-16"
        >
          {timeline.map((item, index) => (
            <TimelineItem 
              key={index}
              year={item.year} 
              description={item.description}
              isLast={index === timeline.length - 1}
              index={index}
              active={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        
        {/* Timeline dots for mobile */}
        <div className="flex justify-center space-x-2 mt-8 md:hidden">
          {timeline.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                index === activeIndex ? "bg-vehicle-accent" : "bg-gray-300"
              }`}
              aria-label={`Go to timeline item ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorySection;
