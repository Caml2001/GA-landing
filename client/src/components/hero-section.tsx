import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection: React.FC = () => {
  const scrollToProperties = () => {
    const propertiesSection = document.getElementById("properties");
    if (propertiesSection) {
      window.scrollTo({
        top: propertiesSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
          alt="Modern luxury home exterior"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="container mx-auto px-4 z-20 text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-4 leading-tight">
          Construido con propósito.<br />Diseñado para perdurar.
        </h1>
        <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Construimos con un entendimiento del contexto, un enfoque en la funcionalidad y un compromiso con la claridad arquitectónica.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            className="rounded-full bg-white text-primary hover:bg-secondary hover:text-white border border-transparent transition-all duration-300 h-12 px-8 py-3 text-base"
            asChild
          >
            <a href="https://wa.me/524491102428?text=Me%20interesa%20saber%20de%20sus%20servicios" target="_blank" rel="noopener noreferrer">
              Contáctanos <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button 
            className="hidden sm:inline-flex rounded-full text-white border-white hover:bg-white hover:text-primary bg-transparent border transition-all duration-300 h-12 px-8 py-3 text-base"
          >
            Conocer más
          </Button>
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-400 pt-6 text-white">
            <p className="hidden md:block text-white text-sm md:text-base max-w-md mb-4 md:mb-0">
              Diseñamos espacios que responden a necesidades reales y entornos auténticos, con un enfoque en la claridad, propósito y valor.
            </p>
            <div className="grid grid-cols-3 gap-16">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold">10+</p>
                <p className="text-sm md:text-base text-gray-300">Años de Experiencia</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold">50+</p>
                <p className="text-sm md:text-base text-gray-300">Proyectos Completados</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold">200+</p>
                <p className="text-sm md:text-base text-gray-300">Conceptos Refinados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
