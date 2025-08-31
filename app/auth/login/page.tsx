import { LoginForm } from "components/auth/login-form";
import { Metadata } from "next";
import JsonLd from "components/SEO/json-ld";

export const metadata: Metadata = {
  title: "Log In | Felinify",
  description:
    "Log in to your Felinify account to access your flashcards and continue your learning journey.",
  keywords: ["login", "sign in", "account access", "flashcard app"],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Log In | Felinify",
    description:
      "Log in to your Felinify account to access your flashcards and continue your learning journey.",
    url: "https://felinify.com/auth/login",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/dyu7ogoqc/image/upload/v1756332486/New_Project_1_v4ukje.png",
        width: 1200,
        height: 630,
        alt: "Felinify Login",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Log In | Felinify",
    description:
      "Log in to your Felinify account to access your flashcards and continue your learning journey.",
    images: [
      "https://res.cloudinary.com/dyu7ogoqc/image/upload/v1756332486/New_Project_1_v4ukje.png",
    ],
  },
};

export default function Page() {
  const loginPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Log In | Felinify",
    description:
      "Log in to your Felinify account to access your flashcards and continue your learning journey.",
    url: "https://felinify.com/auth/login",
    isPartOf: {
      "@type": "WebSite",
      name: "Felinify",
      url: "https://felinify.com",
    },
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
