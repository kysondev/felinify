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
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clami | AI Flashcards For Focused, Fast Learning",
  description: "Create flashcards from notes, study with smart quizzes, and track mastery. Built for students who want to stop wasting time.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Clami",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "Create flashcards from notes, study with smart quizzes, and track mastery. Built for students who want to stop wasting time.",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "120"
            }
          })
        }}
      />
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
