import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import PropertyMarketplaceEnhanced from "@/components/property-marketplace-enhanced";
import { config } from "@/lib/config";
import { Property } from "@/lib/types";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { generatePropertyUrl } from "@/lib/utils";

const Home: React.FC = () => {
  const [isHeaderSolid, setIsHeaderSolid] = useState(false);
  const [, setLocation] = useLocation();

  const handlePropertyClick = (property: Property) => {
    // Navegar a la URL SEO-friendly de la propiedad
    const propertyUrl = generatePropertyUrl(property.id, property.title);
    setLocation(propertyUrl);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSolid(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Usar hero original (estático) y marketplace mejorado (con backend)
  const HeroComponent = HeroSection;
  const MarketplaceComponent = PropertyMarketplaceEnhanced;

  return (
    <div className="min-h-screen flex flex-col">
      <Header isHeaderSolid={isHeaderSolid} />
      <HeroComponent />
      <MarketplaceComponent onPropertyClick={handlePropertyClick} />
      <Footer />
    </div>
  );
};

export default Home;
