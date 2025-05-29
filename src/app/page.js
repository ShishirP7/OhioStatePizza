import Image from "next/image";
import Car from "./components/Carousel";
import Specials from "./components/Specials";
import TodaysSpecial from "./components/TodaysSpecial";
import MenuSection from "./components/Menu";
import DeliveryReward from "./components/Reward";
import Testimonial from "./components/Testimonial";
import BurgerGallery from "./components/Gallery";
import Footer from "./components/Footer";
import BurgerHero from "./components/HeroPromo";
export default function Home() {

  const Navbar = () => {
  return (
    <div className="w-full fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-center items-center px-4">
        <img
          src="https://ohiostatepizzas.com/wp-content/uploads/2025/05/Ohio-state-pizza-logo.webp"
          alt="Ohio State Pizza Logo"
          className="h-32 w-auto object-contain rounded-sm"
        />
      </div>
    </div>
  );
};

  return (
    <div className="">
      {/* <Navbar/> */}
      <Car />

      {/* <BurgerHero/> */}
      <Specials />
      <TodaysSpecial />
      <MenuSection />
      <DeliveryReward />
      <Testimonial />
      <BurgerGallery />
    </div>
  );
}
