
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useState } from "react";

interface PricingPlanProps {
  title: string;
  price: string;
  features: string[];
  popular?: boolean;
  buttonText?: string;
  index: number;
}

const PricingPlan = ({ 
  title, 
  price, 
  features, 
  popular = false,
  buttonText = "Get Started",
  index
}: PricingPlanProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <ScrollReveal delay={index * 200}>
      <div 
        className={`bg-white p-8 rounded-lg ${
          popular 
            ? 'shadow-xl border-2 border-blue-400 transform scale-105 md:scale-110 z-10 relative' 
            : 'shadow-md hover:shadow-lg'
        } transition-all duration-300`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {popular && (
          <div className="bg-blue-500 text-white text-center py-1 px-4 rounded-full text-sm font-medium mb-4 w-max mx-auto">
            Most Popular
          </div>
        )}
        <h3 className="text-2xl font-bold text-center mb-4 text-vehicle-primary">
          {title}
        </h3>
        <div className={`text-3xl font-bold text-center text-vehicle-accent mb-6 transition-transform duration-300 ${
          isHovered ? "scale-110" : "scale-100"
        }`}>
          {price}
        </div>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="text-center">
          <Button className={`${
            popular 
              ? "bg-vehicle-accent hover:bg-opacity-90" 
              : "bg-vehicle-secondary hover:bg-opacity-90"
          } text-white px-6 transform transition duration-300 ${
            isHovered ? "scale-105" : "scale-100"
          }`}>
            {buttonText}
          </Button>
        </div>
      </div>
    </ScrollReveal>
  );
};

const PricingSection = () => {
  const plans = [
    {
      title: "Basic",
      price: "₹499/month",
      features: [
        "Vehicle Maintenance Tracking",
        "Scheduled Alerts",
        "Basic Reporting"
      ],
      buttonText: "Get Started",
      popular: false
    },
    {
      title: "Premium",
      price: "₹999/month",
      features: [
        "All Basic Features",
        "Expense Tracking",
        "Fuel Efficiency Monitoring",
        "Service Provider Network"
      ],
      buttonText: "Get Started",
      popular: true
    },
    {
      title: "Enterprise",
      price: "Custom Pricing",
      features: [
        "All Premium Features",
        "Multi-User Access",
        "Advanced Analytics",
        "Priority Support"
      ],
      buttonText: "Contact Us",
      popular: false
    }
  ];

  return (
    <div className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-vehicle-secondary opacity-5"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-vehicle-accent opacity-5"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-vehicle-primary">
            Pricing Plans
          </h2>
        </ScrollReveal>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {plans.map((plan, index) => (
            <PricingPlan 
              key={index}
              title={plan.title}
              price={plan.price}
              features={plan.features}
              buttonText={plan.buttonText}
              popular={plan.popular}
              index={index}
            />
          ))}
        </div>
        
        <ScrollReveal delay={600}>
          <div className="mt-16 text-center">
            <p className="text-gray-600">
              All plans include a 14-day free trial. No credit card required.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default PricingSection;
