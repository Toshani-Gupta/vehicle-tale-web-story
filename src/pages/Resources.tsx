
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResourceGallery from "@/components/ResourceGallery";

const Resources = () => (
  <div className="min-h-screen flex flex-col bg-white">
    <Header />
    <main className="flex-1">
      <ResourceGallery />
    </main>
    <Footer />
  </div>
);

export default Resources;
