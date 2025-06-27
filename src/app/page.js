"use client";

import { useEffect, useRef, useState } from "react";
import ScrollFade from "./components/ScrollFade";
import Car from "./components/Carousel";
import Specials from "./components/Specials";
import TodaysSpecial from "./components/TodaysSpecial";
import MenuSection from "./components/Menu";
import DeliveryReward from "./components/Reward";
import Testimonial from "./components/Testimonial";
import BurgerGallery from "./components/Gallery";
import CartDrawer from "./components/CartDraw";
import LocationSelector from "./components/LocationSelector";
import Footer from "./components/Footer";

export default function Home() {
  const menuRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 👈 for animation delay

  useEffect(() => {
    // Simulate hydration delay with a small timeout
    setTimeout(() => {
      const savedZip = localStorage.getItem("userLocationZip");
      if (savedZip) {
        setUserLocation(savedZip);
      }
      setIsLoading(false); // ⏳ stop loading after check
    }, 800); // Feel free to adjust this
  }, []);

  const handleLocationSelected = (zip) => {
    setUserLocation(zip);
    localStorage.setItem("userLocationZip", zip);
  };

  // ⏳ Show loader while checking
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  // 📍 If no location set, show selector

  if (!userLocation) {
    return <LocationSelector onLocationSelected={handleLocationSelected} />;
  }

  const scrollToMenu = () => {
    setTimeout(() => {
      if (menuRef.current) {
        menuRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div>
      <ScrollFade>
        <Car onOrderNowClick={scrollToMenu} />
      </ScrollFade>
      <Specials />
      <TodaysSpecial />
      <div ref={menuRef}>
        <MenuSection />
      </div>
      <DeliveryReward />
      <Testimonial />
      <BurgerGallery />
      <CartDrawer />
      <Footer />
    </div>
  );
}
