
import { useEffect, useRef } from "react";

interface ResourceCardProps {
  image: string;
  title: string;
  description: string;
  delay: number;
}

const ResourceCard = ({ image, title, description, delay }: ResourceCardProps) => {
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

const resources = [
  {
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&q=80",
    title: "Digital Ownership Records",
    description: "Manage all your vehicle documentation online with our secure system."
  },
  {
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    title: "Maintenance Guides",
    description: "Comprehensive guides for caring and servicing your vehicles of all types."
  },
  {
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80",
    title: "User Knowledge Base",
    description: "Learn with educational resources and FAQs curated by Tosh Automobile."
  },
  {
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&q=80",
    title: "Technology Insights",
    description: "Get the latest trends and technology insights in the automotive industry."
  },
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    title: "Community Resources",
    description: "Join a vibrant community sharing experiences and vehicle tips."
  },
];

const ResourceGallery = () => {
  useEffect(() => {
    // preload images
    resources.forEach((resource) => {
      const img = new window.Image();
      img.src = resource.image;
    });
  }, []);

  return (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-vehicle-primary animate-fade-in">
          Resources & Guides
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in">
          Explore our curated collection of resources that help you stay organized, informed, and empowered as a vehicle owner.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <ResourceCard
              key={index}
              image={resource.image}
              title={resource.title}
              description={resource.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceGallery;
