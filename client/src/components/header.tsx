import React, { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  isHeaderSolid: boolean;
}

const Header: React.FC<HeaderProps> = ({ isHeaderSolid }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
    closeMobileMenu();
  };

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${isHeaderSolid ? 'header-solid' : 'header-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className={`font-serif text-2xl font-medium ${isHeaderSolid ? 'text-primary' : 'text-white'}`}>
              Vista
            </div>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection("hero")}
              className={`${isHeaderSolid ? 'text-primary' : 'text-white'} hover:text-secondary transition-colors duration-300`}
            >
              PROJECT
            </button>
            <button 
              onClick={() => scrollToSection("properties")}
              className={`${isHeaderSolid ? 'text-primary' : 'text-white'} hover:text-secondary transition-colors duration-300`}
            >
              STUDIO
            </button>
            <button 
              className={`${isHeaderSolid ? 'text-primary' : 'text-white'} hover:text-secondary transition-colors duration-300`}
            >
              AWARDS
            </button>
            <button 
              className={`${isHeaderSolid ? 'text-primary' : 'text-white'} hover:text-secondary transition-colors duration-300`}
            >
              ABOUT
            </button>
          </nav>
          <div className="hidden md:flex">
            <Button variant="hero" size="lg" className="rounded-full">
              Contact Us
            </Button>
          </div>
          <button 
            className="md:hidden text-white focus:outline-none" 
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu className={`h-6 w-6 ${isHeaderSolid ? 'text-primary' : 'text-white'}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-primary bg-opacity-95 z-40 flex flex-col justify-center items-center">
          <button 
            className="absolute top-4 right-4 text-white focus:outline-none"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
          <nav className="flex flex-col space-y-6 text-center">
            <button 
              onClick={() => scrollToSection("hero")} 
              className="text-white text-xl hover:text-secondary transition-colors duration-300"
            >
              PROJECT
            </button>
            <button 
              onClick={() => scrollToSection("properties")} 
              className="text-white text-xl hover:text-secondary transition-colors duration-300"
            >
              STUDIO
            </button>
            <button 
              className="text-white text-xl hover:text-secondary transition-colors duration-300"
            >
              AWARDS
            </button>
            <button 
              className="text-white text-xl hover:text-secondary transition-colors duration-300"
            >
              ABOUT
            </button>
            <Button variant="hero" size="lg" className="mt-4 rounded-full">
              Contact Us
            </Button>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
