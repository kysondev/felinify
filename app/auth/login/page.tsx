import { LoginForm } from "components/auth/LoginForm";
import { Metadata } from "next";
import JsonLd from "components/SEO/JsonLd";

export const metadata: Metadata = {
  title: "Log In | Clami",
  description: "Log in to your Clami account to access your flashcards and continue your learning journey.",
  keywords: ["login", "sign in", "account access", "flashcard app"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Log In | Clami",
    description: "Log in to your Clami account to access your flashcards and continue your learning journey.",
    url: "https://clami.app/auth/login",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dyu7ogoqc/image/upload/v1754105180/Screenshot_2025-08-01_232455_n6m6gj.png",
        width: 1200,
        height: 630,
        alt: "Clami Login",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Log In | Clami",
    description: "Log in to your Clami account to access your flashcards and continue your learning journey.",
    images: ["https://res.cloudinary.com/dyu7ogoqc/image/upload/v1754105180/Screenshot_2025-08-01_232455_n6m6gj.png"],
  },
};

export default function Page() {
  const loginPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Log In | Clami",
    "description": "Log in to your Clami account to access your flashcards and continue your learning journey.",
    "url": "https://clami.app/auth/login",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Clami",
      "url": "https://clami.app"
    }
  };

  return (
    <div className="min-h-svh bg-gradient-to-b from-background to-muted flex flex-col items-center justify-center p-4 md:p-8">
      <JsonLd data={loginPageSchema} />
      <div className="w-full max-w-sm mx-auto">
        <LoginForm />
      </div>
    </div>
  );
}
