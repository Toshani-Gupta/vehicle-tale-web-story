
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, Home, User, FileText, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-vehicle-primary bg-opacity-95 py-2 shadow-md" 
          : "bg-vehicle-primary py-4"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className={`font-bold transition-all duration-300 ${
            scrolled ? "text-xl" : "text-2xl"
          }`}>Tosh Automobile</h1>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            <Link to="/" className="flex items-center hover:text-vehicle-secondary transition duration-200">
              <Home className="mr-1 h-4 w-4" />
              <span>HOME</span>
            </Link>
            <Link to="/about" className="flex items-center hover:text-vehicle-secondary transition duration-200">
              <User className="mr-1 h-4 w-4" />
              <span>ABOUT US</span>
            </Link>
            <Link to="/services" className="flex items-center hover:text-vehicle-secondary transition duration-200">
              <FileText className="mr-1 h-4 w-4" />
              <span>SERVICES</span>
            </Link>
            <Link to="/resources" className="flex items-center hover:text-vehicle-secondary transition duration-200">
              <Bookmark className="mr-1 h-4 w-4" />
              <span>RESOURCES</span>
            </Link>
            <Link to="/account" className="flex items-center hover:text-vehicle-secondary transition duration-200">
              <User className="mr-1 h-4 w-4" />
              <span>ACCOUNT</span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center">
          <Button className="bg-vehicle-accent hover:bg-opacity-90 text-white rounded-md transition duration-200">
            GET STARTED
          </Button>
          <button 
            className="ml-4 md:hidden" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-vehicle-primary py-4 px-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center hover:text-vehicle-secondary transition duration-200">
              <Home className="mr-2 h-4 w-4" />
              <span>HOME</span>
            </Link>
            <Link to="/about" className="flex items-center hover:text-vehicle-secondary transition duration-200">
              <User className="mr-2 h-4 w-4" />
              <span>ABOUT US</span>
            </Link>
            <Link to="/services" className="flex items-center hover:text-vehicle-secondary transition duration-200">
              <FileText className="mr-2 h-4 w-4" />
              <span>SERVICES</span>
            </Link>
            <Link to="/resources" className="flex items-center hover:text-vehicle-secondary transition duration-200">
              <Bookmark className="mr-2 h-4 w-4" />
              <span>RESOURCES</span>
            </Link>
            <Link to="/account" className="flex items-center hover:text-vehicle-secondary transition duration-200">
              <User className="mr-2 h-4 w-4" />
              <span>ACCOUNT</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
