import { Cta } from "components/Cta";
import { Feature } from "components/Feature";
import { Footer } from "components/Footer";
import { Hero } from "components/Hero";
import { LandingNavbar } from "components/LandingNavbar";
import { Pricing } from "components/Pricing";

export default function Home() {
  return (
    <div className="px-4 max-w-[1080px] mx-auto">
      <LandingNavbar />
      <Hero />
      <Feature />
      <Pricing />
      <Cta />
      <Footer />
    </div>
  );
}
