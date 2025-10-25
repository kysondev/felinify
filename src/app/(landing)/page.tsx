import { Cta } from "@components/landing/call-to-action";
import { FAQ } from "@components/landing/faq";
import { FeatureShowcase } from "@components/landing/feature-showcase";
import { Footer } from "@components/landing/footer";
import { Hero } from "@components/landing/hero";
import { HowItWorks } from "@components/landing/how-it-works";
import { LandingNavbar } from "@components/landing-navbar";
import { Pricing } from "@components/landing/pricing";
import { FlashcardShowcase } from "@components/landing/flashcard-showcase";
import { Testimonials } from "@components/landing/testimonials";
import { Metadata } from "next";
import JsonLd from "@components/SEO/json-ld";

export const metadata: Metadata = {
  title: "Felinify | AI Flashcards For Focused, Fast Learning",
  description:
    "Create flashcards from notes, study with smart quizzes, and track mastery. Built for students who want to stop wasting time.",
  keywords: [
    "flashcards",
    "AI flashcards",
    "study app",
    "learning",
    "education",
    "spaced repetition",
    "quiz",
    "study tools",
    "academic success",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Felinify | AI Flashcards For Focused, Fast Learning",
    description: "Create flashcards from notes, study with smart quizzes, and track mastery. Built for students who want to stop wasting time.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/felinify.png",
        width: 1200,
        height: 630,
        alt: "Felinify - AI Flashcards For Focused, Fast Learning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Felinify | AI Flashcards For Focused, Fast Learning",
    description: "Create flashcards from notes, study with smart quizzes, and track mastery. Built for students who want to stop wasting time.",
    images: ["/felinify.png"],
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
      target: "https://felinify.com/explore?q={search_term_string}",
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

      <div className="relative">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:48px_48px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.8)_0%,transparent_70%)]"></div>
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>
        </div>
        <LandingNavbar />
        <div className="px-4 max-w-[1200px] mx-auto">
          <Hero />
        </div>
      </div>
      <div className="px-4 max-w-[1200px] mx-auto">
      <FeatureShowcase />
      </div>
      <div className="px-4 max-w-[1200px] mx-auto">
      <FlashcardShowcase />
      </div>
      <HowItWorks />
      <div className="px-4 max-w-[1200px] mx-auto">
        <Testimonials />
      </div>
      <div className="px-4 max-w-[1200px] mx-auto">
        <Pricing />
      </div>
      <div className="px-4 max-w-[1200px] mx-auto">
      <FAQ />
      </div>
      <div className="px-4 max-w-[1200px] mx-auto">
        <Cta />
        <Footer />
      </div>
    </div>
  );
}
