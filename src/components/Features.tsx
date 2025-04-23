
import { Clock, Bell, Activity, Headset } from "lucide-react";

const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode, 
  title: string, 
  description: string 
}) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center transform hover:scale-105 transition duration-300">
      <div className="flex justify-center mb-4 text-[#1EAEDB]">{icon}</div>
      <h3 className="text-xl font-semibold mb-4 text-[#1A1F2C]">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features = () => {
  return (
    <div id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-vehicle-primary animate-fade-in">
          ENHANCE YOUR VEHICLE OWNERSHIP JOURNEY
        </h2>
        <p className="text-xl text-center text-vehicle-accent mb-12 animate-fade-in">
          Transformative Solutions for Every Vehicle Owner
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Clock className="h-12 w-12" />}
            title="Detailed Service Histories"
            description="Effortlessly access your vehicle's entire service documentation, ensuring you maintain an informed approach to your vehicle's upkeep."
          />
          <FeatureCard
            icon={<Bell className="h-12 w-12" />}
            title="Automated Maintenance Alerts"
            description="Stay proactive with automated reminders for scheduled services, ensuring your vehicle functions at its best without surprises."
          />
          <FeatureCard
            icon={<Activity className="h-12 w-12" />}
            title="Customizable User Dashboard"
            description="Enjoy a tailored interface designed to manage your vehicle data seamlessly, bringing convenience to your fingertips."
          />
          <FeatureCard
            icon={<Headset className="h-12 w-12" />}
            title="Reliable Customer Assistance"
            description="Our dedicated support team is here to provide you with prompt assistance for any queries, enhancing your experience with our system."
          />
        </div>
        
        <div className="text-center mt-16 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md animate-fade-in">
          <p className="text-gray-700">
            Optimize your vehicle management with Tosh Automobile's cutting-edge web-based system. Our 
            platform empowers you to track service histories, schedule maintenance, and access vital vehicle 
            information, making ownership simpler and more effective.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
