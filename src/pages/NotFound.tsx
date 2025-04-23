
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold mb-4 text-[#1A1F2C]">404</h1>
          <p className="text-2xl text-gray-600 mb-8">Oops! Page not found</p>
          <Link to="/">
            <Button className="bg-[#ea584c] hover:bg-[#d24c42] text-white px-6">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
