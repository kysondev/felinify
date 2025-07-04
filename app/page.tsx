import { Cta } from "components/cta";
import { Feature } from "components/feature";
import { Footer } from "components/footer";
import { Hero } from "components/hero";
import { Navbar } from "components/navbar";
import { Pricing } from "components/pricing";
import Image from "next/image";

export default function Home() {
  return (
    <div className="px-4 max-w-[1080px] mx-auto">
      <Navbar />
      <Hero />
      <Feature />
      <Pricing />
      <Cta />
      <Footer />
    </div>
  );
}
