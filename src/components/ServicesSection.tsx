
import { Car, ClipboardCheck, DollarSign, Fuel, Wrench, Shield } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const ServiceCard = ({ icon, title, description, index }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string,
  index: number
}) => {
  return (
    <ScrollReveal delay={index * 100}>
      <div className="bg-white p-8 rounded-lg shadow-md transform hover:shadow-lg hover:scale-105 transition duration-300">
        <div className="mb-4 text-vehicle-secondary">{icon}</div>
        <h3 className="text-xl font-semibold mb-3 text-vehicle-primary">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </ScrollReveal>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: <Car className="h-10 w-10" />,
      title: "Vehicle Maintenance Tracking",
      description: "Keep detailed records of all your vehicle's service history, repairs, and maintenance activities."
    },
    {
      icon: <ClipboardCheck className="h-10 w-10" />,
      title: "Scheduled Maintenance Alerts",
      description: "Never miss an oil change or inspection with our automated reminder system."
    },
    {
      icon: <DollarSign className="h-10 w-10" />,
      title: "Expense Tracking",
      description: "Monitor all vehicle-related expenses to better manage your automotive budget."
    },
    {
      icon: <Fuel className="h-10 w-10" />,
      title: "Fuel Efficiency Monitoring",
      description: "Track your fuel consumption and identify ways to improve mileage."
    },
    {
      icon: <Wrench className="h-10 w-10" />,
      title: "Service Provider Network",
      description: "Access our network of trusted service centers and mechanics."
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Warranty & Recall Tracking",
      description: "Stay informed about active warranties and manufacturer recalls."
    }
  ];

  return (
    <div id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-vehicle-primary">Our Services</h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Comprehensive solutions for all your vehicle management needs
          </p>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
