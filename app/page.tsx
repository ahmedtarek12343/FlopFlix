import Navbar from "@/components/landing/Navbar";
import LandingCarousel from "@/components/landing/LandingCarousel";
import TrustedPartners from "@/components/landing/TrustedPartners";
import AboutUs from "@/components/landing/AboutUs";
import Footer from "@/components/landing/Footer";

const HomePage = async () => {
  return (
    <div className="relative">
      <Navbar />
      <LandingCarousel />
      <TrustedPartners />
      <AboutUs />
      <Footer />
    </div>
  );
};

export default HomePage;
