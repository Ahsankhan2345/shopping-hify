import HeroSection from "../components/HeroSection";
import AboutUsSection from "../components/AboutUsSection";
import MissionSection from "../components/MissionSection";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <AboutUsSection />
      <MissionSection />

    </div>
  );
};

export default Home;
