import { Cta } from "components/Cta";
import { FAQ } from "components/FAQ";
import { Feature } from "components/Feature";
import { Footer } from "components/Footer";
import { Hero } from "components/Hero";
import { HowItWorks } from "components/HowItWorks";
import { LandingNavbar } from "components/LandingNavbar";
import { Pricing } from "components/Pricing";
import { Stats } from "components/Stats";
import { Testimonials } from "components/Testimonials";
import { SubscriptionPopup } from "components/SubscriptionPopup";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <SubscriptionPopup />
      <div className="px-4 max-w-[1200px] mx-auto">
        <LandingNavbar />
        <Hero />
      </div>
      <Stats />
      <div className="px-4 max-w-[1200px] mx-auto">
        <Feature />
      </div>
      <HowItWorks />
      <div className="px-4 max-w-[1200px] mx-auto">
        <Testimonials />
      </div>
      <div className="px-4 max-w-[1200px] mx-auto">
        <Pricing />
      </div>
      <FAQ />
      <div className="px-4 max-w-[1200px] mx-auto">
        <Cta />
        <Footer />
      </div>
    </div>
  );
}
