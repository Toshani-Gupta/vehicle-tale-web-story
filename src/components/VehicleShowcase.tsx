
import { useEffect, useRef } from "react";

interface VehicleCardProps {
  image: string;
  title: string;
  description: string;
  delay: number;
}

const VehicleCard = ({ image, title, description, delay }: VehicleCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }, delay);
        }
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);
  
  return (
    <div 
      ref={cardRef} 
      className="overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition duration-500 opacity-0 translate-y-8"
    >
      <div className="h-64 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-vehicle-primary">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

const VehicleShowcase = () => {
  const vehicles = [
    {
      image: "/lovable-uploads/b38d8360-631e-4d70-baa1-1674944d7c68.png",
      title: "Modern SUVs",
      description: "Powerful, spacious, and versatile vehicles for all your adventures."
    },
    {
      image: "/lovable-uploads/8b6ce849-525d-4a9a-b2f1-4cecd55c6e93.png",
      title: "Electric Vehicles",
      description: "Eco-friendly transportation with cutting-edge technology."
    },
    {
      image: "/lovable-uploads/ab577f46-d2ff-4e2a-b933-8cf060b02a44.png",
      title: "Luxury Sedans",
      description: "Elegant, comfortable, and sophisticated driving experience."
    },
    {
      image: "/lovable-uploads/3fc746c0-77a0-41db-8d3b-3af3f6fce0f8.png",
      title: "Classic Cars",
      description: "Timeless designs that capture the essence of automotive history."
    },
    {
      image: "/lovable-uploads/a6ae0f9d-887a-4b26-a52d-b3b231a98702.png",
      title: "Sports Cars",
      description: "High-performance vehicles designed for speed and driving pleasure."
    },
    {
      image: "/lovable-uploads/c2ec45d3-8a23-4c5b-9de4-74571e8373fd.png",
      title: "Off-road Vehicles",
      description: "Rugged and capable vehicles for exploring beyond the pavement."
    }
  ];

  return (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-vehicle-primary animate-fade-in">
          Explore Our Vehicle Gallery
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in">
          Discover our diverse collection of vehicles that blend performance, comfort, and innovation
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map((vehicle, index) => (
            <VehicleCard 
              key={index}
              image={vehicle.image}
              title={vehicle.title}
              description={vehicle.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleShowcase;
