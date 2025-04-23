
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-vehicle-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-bold mb-4">Tosh Automobile</h3>
            <p className="text-gray-300 mb-6">
              Enhance and organize vehicle ownership history and service management with Tosh Automobile's 
              advanced web-based system. Your trusted partner in automotive services.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-gray-400" />
                <span>+91 999XXXXXXX</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-gray-400" />
                <span>info@toshautomobile.com</span>
              </li>
              <li className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-gray-400" />
                <span>Manipal Uni Japur</span>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-gray-400" />
                <span>Available Daily: 7am - 10pm</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition">About Us</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition">Services</Link></li>
              <li><Link to="/features" className="text-gray-300 hover:text-white transition">Features</Link></li>
              <li><Link to="/faqs" className="text-gray-300 hover:text-white transition">FAQs</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition">Contact Us</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition">Blog</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-10 pt-6 text-center">
          <p className="text-gray-400">© {currentYear} Tosh Automobile. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
