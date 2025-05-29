import ScrollReveal from "./components/ScrollReveal";
import Car from "./components/Carousel";
import Specials from "./components/Specials";
import TodaysSpecial from "./components/TodaysSpecial";
import MenuSection from "./components/Menu";
import DeliveryReward from "./components/Reward";
import Testimonial from "./components/Testimonial";
import BurgerGallery from "./components/Gallery";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDraw";
import ScrollFade from "./components/ScrollFade";

export default function Home() {
  return (
    <div>
      <ScrollFade>
        <Car />
      </ScrollFade>
      <Specials />
      <TodaysSpecial />
      <MenuSection />
      <DeliveryReward />
      <Testimonial />
      <BurgerGallery />
      <CartDrawer />
    </div>
  );
}
