
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const stories = [
  {
    id: 1,
    title: "The Evolution of Automobiles",
    image: "/lovable-uploads/24883be9-cf8f-49f0-8933-2d799df85a80.png",
    content: "From the first horseless carriages to modern electric vehicles, the evolution of automobiles has been a fascinating journey of innovation and engineering excellence. The first practical automobile was built in 1885 by Karl Benz, and since then, automotive technology has continuously evolved to create safer, more efficient, and more environmentally friendly vehicles.",
    year: "1885-Present"
  },
  {
    id: 2,
    title: "The Rise of Electric Vehicles",
    image: "/lovable-uploads/8b6ce849-525d-4a9a-b2f1-4cecd55c6e93.png",
    content: "Electric vehicles are revolutionizing the automotive industry with zero-emission transportation. From early experiments to Tesla's breakthrough models and now widespread adoption by traditional manufacturers, electric cars represent a significant shift in how we think about mobility and its environmental impact.",
    year: "2008-Present"
  },
  {
    id: 3,
    title: "Off-Road Adventures",
    image: "/lovable-uploads/c2ec45d3-8a23-4c5b-9de4-74571e8373fd.png",
    content: "For those who seek adventure beyond paved roads, specialized off-road vehicles have been developed to conquer the most challenging terrains. These rugged machines combine powerful engines, specialized suspension systems, and durable components to provide reliable performance in extreme conditions.",
    year: "1941-Present"
  }
];

const VehicleStory = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const nextStory = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (contentRef.current) {
      contentRef.current.classList.add("opacity-0", "translate-y-4");
      contentRef.current.classList.remove("opacity-100", "translate-y-0");
      
      setTimeout(() => {
        setCurrentStory((prev) => (prev + 1) % stories.length);
        
        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.classList.add("opacity-100", "translate-y-0");
            contentRef.current.classList.remove("opacity-0", "translate-y-4");
            setIsAnimating(false);
          }
        }, 50);
      }, 300);
    }
  };
  
  const prevStory = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (contentRef.current) {
      contentRef.current.classList.add("opacity-0", "translate-y-4");
      contentRef.current.classList.remove("opacity-100", "translate-y-0");
      
      setTimeout(() => {
        setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
        
        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.classList.add("opacity-100", "translate-y-0");
            contentRef.current.classList.remove("opacity-0", "translate-y-4");
            setIsAnimating(false);
          }
        }, 50);
      }, 300);
    }
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextStory();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [currentStory, isAnimating]);
  
  return (
    <div className="py-20 bg-vehicle-primary text-white">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Fascinating Vehicle Stories
          </h2>
        </ScrollReveal>
        
        <ScrollReveal delay={200}>
          <div className="max-w-5xl mx-auto">
            <div className="relative bg-vehicle-dark rounded-xl p-6 md:p-10 shadow-xl">
              <div 
                ref={contentRef}
                className="flex flex-col md:flex-row items-center gap-8 opacity-100 translate-y-0 transition-all duration-300"
              >
                <div className="md:w-1/2">
                  <div className="rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src={stories[currentStory].image} 
                      alt={stories[currentStory].title}
                      className="w-full h-64 md:h-80 object-cover transform hover:scale-105 transition duration-700"
                    />
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-2">{stories[currentStory].title}</h3>
                  <p className="text-sm text-blue-300 mb-4">{stories[currentStory].year}</p>
                  <p className="text-gray-300 mb-6">{stories[currentStory].content}</p>
                  <Button className="bg-vehicle-accent hover:bg-opacity-90 text-white transition-all duration-300 transform hover:scale-105">
                    Read Full Story
                  </Button>
                </div>
              </div>
              
              <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-5 md:-translate-x-6">
                <button 
                  onClick={prevStory}
                  className="bg-white text-vehicle-primary p-2 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-110 duration-200"
                  aria-label="Previous story"
                  disabled={isAnimating}
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              </div>
              
              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-5 md:translate-x-6">
                <button 
                  onClick={nextStory}
                  className="bg-white text-vehicle-primary p-2 rounded-full shadow-lg hover:bg-gray-100 transition transform hover:scale-110 duration-200"
                  aria-label="Next story"
                  disabled={isAnimating}
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mt-6 flex justify-center space-x-2">
                {stories.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-8 rounded-full transition-all duration-300 ${
                      currentStory === index ? "bg-vehicle-accent w-10" : "bg-gray-500 w-8"
                    }`}
                    onClick={() => {
                      if (isAnimating) return;
                      setCurrentStory(index);
                    }}
                    aria-label={`Go to story ${index + 1}`}
                    disabled={isAnimating}
                  />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default VehicleStory;
