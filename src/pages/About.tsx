
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StorySection from "@/components/StorySection";

const About = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Header />
    <main className="flex-1">
      <section className="pt-16 pb-10 bg-vehicle-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Learn about our journey and passion behind Tosh Automobile.
          </p>
        </div>
      </section>
      <StorySection />
    </main>
    <Footer />
  </div>
);

export default About;
