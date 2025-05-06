import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? "bg-hv-dark/90 backdrop-blur-md shadow-md" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <a href="/" className="flex items-center">
            <span className="text-xl font-semibold text-hv-white tracking-tighter">
              High Value
            </span>
          </a>

          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-hv-white hover:text-hv-turquoise transition-colors duration-200 text-sm font-medium">
              Accueil
            </a>
            <a href="/business" className="text-hv-white hover:text-hv-turquoise transition-colors duration-200 text-sm font-medium">
              Business
            </a>
            <a href="/mental" className="text-hv-white hover:text-hv-turquoise transition-colors duration-200 text-sm font-medium">
              Mental
            </a>
            <a href="/story" className="text-hv-white hover:text-hv-turquoise transition-colors duration-200 text-sm font-medium">
              Story
            </a>
            <a href="/societe" className="text-hv-white hover:text-hv-turquoise transition-colors duration-200 text-sm font-medium">
              Société
            </a>
            <a href="/emission" className="text-hv-white hover:text-hv-turquoise transition-colors duration-200 text-sm font-medium">
              Émission
            </a>
          </div>

          <div className="hidden md:block">
            <a href="/contact" className="px-5 py-2 bg-gradient-to-r from-hv-blue to-hv-turquoise text-hv-dark font-semibold rounded hover:opacity-90 transition-opacity">
              Tourner avec nous
            </a>
          </div>

          <button
            className="md:hidden text-hv-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-hv-dark/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-4 space-y-3">
              <a href="/" className="block py-2 px-4 text-hv-white hover:text-hv-turquoise transition-colors duration-200">
                Accueil
              </a>
              <a href="/business" className="block py-2 px-4 text-hv-white hover:text-hv-turquoise transition-colors duration-200">
                Business
              </a>
              <a href="/mental" className="block py-2 px-4 text-hv-white hover:text-hv-turquoise transition-colors duration-200">
                Mental
              </a>
              <a href="/story" className="block py-2 px-4 text-hv-white hover:text-hv-turquoise transition-colors duration-200">
                Story
              </a>
              <a href="/societe" className="block py-2 px-4 text-hv-white hover:text-hv-turquoise transition-colors duration-200">
                Société
              </a>
              <a href="/emission" className="block py-2 px-4 text-hv-white hover:text-hv-turquoise transition-colors duration-200">
                Émission
              </a>
              <a href="/contact" className="block py-2 px-4 mt-4 bg-gradient-to-r from-hv-blue to-hv-turquoise text-hv-dark font-semibold rounded text-center">
                Tourner avec nous
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}