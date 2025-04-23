
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const scrollToContent = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-vehicle-primary text-white pt-32 pb-24 relative overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-vehicle-primary to-vehicle-dark opacity-90"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <h1 
          className={`text-4xl md:text-6xl font-bold mb-6 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Story of Vehicles
        </h1>
        
        <p 
          className={`text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-200 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Explore the rich history and evolution of automotive technology through our passionate lens of
          vehicle ownership and service.
        </p>
        
        <Button 
          className={`bg-vehicle-accent hover:bg-opacity-90 text-white px-8 py-6 rounded-md text-lg transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          LEARN MORE
        </Button>
        
        <div 
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          onClick={scrollToContent}
        >
          <ChevronDown className="h-10 w-10 text-white" />
        </div>
      </div>
      
      {/* Animated shapes */}
      <div className="absolute top-1/4 left-5 md:left-20 w-16 h-16 rounded-full bg-vehicle-secondary opacity-10 animate-pulse"></div>
      <div className="absolute top-1/3 right-10 md:right-32 w-32 h-32 rounded-full bg-vehicle-accent opacity-5 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/3 w-24 h-24 rounded-full bg-vehicle-secondary opacity-5 animate-pulse"></div>
    </div>
  );
};

export default Hero;
