import Navbar from "./_components/shared-components/Navbar";
import HeroSection from "./_components/landing-page-components/HeroSection";
import FeatureSection from "./_components/landing-page-components/FeatureSection";
import FaqsSection from "./_components/landing-page-components/FaqsSection";


const Page = () => {

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">


      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-orange-500/20 blur-3xl z-0"></div>
      <div className="absolute top-96 right-40 h-[600px] w-[600px] rounded-full bg-orange-400/20 blur-3xl z-0"></div>
      <div className="absolute bottom-0 left-40 h-[400px] w-[400px] rounded-full bg-orange-300/20 blur-3xl z-0"></div>


      <div className="relative z-10 container mx-auto px-6">

        <Navbar />

        <HeroSection />

        <FeatureSection />

        <FaqsSection />

      </div>

    </div>
  );
};


export default Page;