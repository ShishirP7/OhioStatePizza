"use client";

import { useRef } from "react";
import ScrollFade from "./components/ScrollFade";
import Car from "./components/Carousel";
import Specials from "./components/Specials";
import TodaysSpecial from "./components/TodaysSpecial";
import MenuSection from "./components/Menu";
import DeliveryReward from "./components/Reward";
import Testimonial from "./components/Testimonial";
import BurgerGallery from "./components/Gallery";
import CartDrawer from "./components/CartDraw";

export default function Home() {
  const menuRef = useRef(null);

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
    </div>
  );
}
