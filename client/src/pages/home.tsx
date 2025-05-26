import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero-section";
import PropertyMarketplaceEnhanced from "@/components/property-marketplace-enhanced";
import { config } from "@/lib/config";
import PropertyDetail from "@/components/property-detail";
import { Property } from "@/lib/types";
import { useState, useEffect } from "react";

const Home: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isHeaderSolid, setIsHeaderSolid] = useState(false);

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property);
    setIsDetailOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
    document.body.style.overflow = "auto";
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
      {selectedProperty && (
        <PropertyDetail
          property={selectedProperty}
          isOpen={isDetailOpen}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default Home;
