
import { useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import StorySection from "@/components/StorySection";
import ServicesSection from "@/components/ServicesSection";
import VehicleShowcase from "@/components/VehicleShowcase";
import VehicleStory from "@/components/VehicleStory";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

const ScrollToTopButton = () => {
  useEffect(() => {
    const handleScroll = () => {
      const button = document.getElementById("scroll-to-top");
      if (button) {
        if (window.scrollY > 500) {
          button.classList.remove("opacity-0", "invisible");
          button.classList.add("opacity-100", "visible");
        } else {
          button.classList.add("opacity-0", "invisible");
          button.classList.remove("opacity-100", "visible");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      id="scroll-to-top"
      className="fixed bottom-6 right-6 bg-vehicle-accent text-white p-3 rounded-full shadow-lg opacity-0 invisible transition-all duration-300 z-50 hover:bg-opacity-90"
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

const Index = () => {
  useEffect(() => {
    // Preload images
    const imageUrls = [
      "/lovable-uploads/b38d8360-631e-4d70-baa1-1674944d7c68.png",
      "/lovable-uploads/8b6ce849-525d-4a9a-b2f1-4cecd55c6e93.png",
      "/lovable-uploads/ab577f46-d2ff-4e2a-b933-8cf060b02a44.png",
      "/lovable-uploads/3fc746c0-77a0-41db-8d3b-3af3f6fce0f8.png",
      "/lovable-uploads/a6ae0f9d-887a-4b26-a52d-b3b231a98702.png",
      "/lovable-uploads/c2ec45d3-8a23-4c5b-9de4-74571e8373fd.png",
      "/lovable-uploads/24883be9-cf8f-49f0-8933-2d799df85a80.png"
    ];
    
    imageUrls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Features />
        <VehicleShowcase />
        <VehicleStory />
        <StorySection />
        <ServicesSection />
        <PricingSection />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
