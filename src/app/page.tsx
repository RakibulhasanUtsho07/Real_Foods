import Image from "next/image";
import RealFoodsNavbar from "../components/shared/Navbar";
import HeroSection from "../components/shared/HeroSection";
import Footer from "../components/shared/Footer";
import FeaturedSection from "@/components/shared/FeaturedSection";
import AboutSection from "@/components/shared/AboutSection";
import SpecialOffersSection from "@/components/shared/SpecialOffersSection";


export default function Home() {
  return (
    <div>
      <RealFoodsNavbar/>
      <HeroSection/>

      <h2>Hello</h2>
      <FeaturedSection/>
      <AboutSection/>
      <SpecialOffersSection/>
      <Footer/>
    </div>
  );
}
