import Navbar from "@/components/landing/Navbar";
import LandingCarousel from "@/components/landing/LandingCarousel";
import TrustedPartners from "@/components/landing/TrustedPartners";

const HomePage = async () => {
  return (
    <div className="relative">
      <Navbar />
      <LandingCarousel />
      <TrustedPartners />
    </div>
  );
};

export default HomePage;
