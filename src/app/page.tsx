import Image from "next/image";
import RealFoodsNavbar from "../components/shared/Navbar";
import HeroSection from "../components/shared/HeroSection";
import Footer from "../components/shared/Footer";

export default function Home() {
  return (
    <div>
      <RealFoodsNavbar/>
      <HeroSection/>
      <h2>Hello</h2>
      <Footer/>
    </div>
  );
}
