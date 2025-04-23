
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";

const Services = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Header />
    <main className="flex-1">
      <ServicesSection />
      <PricingSection />
    </main>
    <Footer />
  </div>
);

export default Services;
