import { Cta } from "components/landing/call-to-action";
import { FAQ } from "components/landing/faq";
import { Feature } from "components/landing/feature";
import { Footer } from "components/landing/footer";
import { Hero } from "components/landing/hero";
import { HowItWorks } from "components/landing/how-it-works";
import { LandingNavbar } from "components/landing-navbar";
import { Pricing } from "components/landing/pricing";
import { Stats } from "components/landing/stats";
import { Testimonials } from "components/landing/testimonials";
import { SubscriptionPopup } from "components/landing/subscription-popup";
import { Metadata } from "next";
import JsonLd from "components/SEO/json-ld";

export const metadata: Metadata = {
  title: "Felinify | AI Flashcards For Focused, Fast Learning",
  description:
    "Create flashcards from notes, study with smart quizzes, and track mastery. Built for students who want to stop wasting time.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Felinify",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Create flashcards from notes, study with smart quizzes, and track mastery. Built for students who want to stop wasting time.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "120",
    },
    screenshot:
      "https://res.cloudinary.com/dyu7ogoqc/image/upload/v1756332486/New_Project_1_v4ukje.png",
    featureList:
      "AI-powered flashcard creation, Smart quizzes, Mastery tracking, Study analytics",
    applicationSubCategory: "Learning Tools",
    author: {
      "@type": "Person",
      name: "Shi Jun(Kyson) W.",
    },
    publisher: {
      "@type": "Person",
      name: "Shi Jun(Kyson) W.",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://felinify.com/",
    name: "Felinify",
    description: "AI Flashcards For Focused, Fast Learning",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://felinify.com/workspace/explore?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Felinify",
    url: "https://felinify.com",
    logo: "https://felinify.com/felinify.png",
    sameAs: [],
    founder: {
      "@type": "Person",
      name: "Shi Jun(Kyson) W.",
    },
  };

  return (
    <div className="overflow-x-hidden">
      <JsonLd data={softwareAppSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
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
