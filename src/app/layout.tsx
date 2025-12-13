import type { Metadata } from "next";
import "@styles/globals.css";
import { Toaster } from "react-hot-toast";
import { DM_Sans } from "next/font/google";
import { TopProgressBar } from "@components/ui/top-progress-bar";
import { Suspense } from "react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Felinify | AI Flashcards For Focused, Fast Learning",
  description:
    "Create flashcards from notes, study with smart quizzes, and track mastery. Built for students who want to stop wasting time.",
  keywords: [
    "flashcards",
    "AI learning",
    "study app",
    "smart quizzes",
    "education",
    "student tools",
  ],
  authors: [{ name: "Shi Jun(Kyson) W." }],
  creator: "Felinify",
  publisher: "Felinify",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://felinify.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Felinify | AI Flashcards For Focused, Fast Learning",
    description:
      "Create flashcards from notes, study with smart quizzes, and track mastery. Built for students who want to stop wasting time.",
    url: "https://felinify.com",
    siteName: "Felinify",
    images: [
      {
        url: "https://res.cloudinary.com/dyu7ogoqc/image/upload/v1763237407/New_Project_3_uij9md.png",
        width: 1200,
        height: 630,
        alt: "Felinify - AI Flashcards For Focused, Fast Learning",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Felinify | AI Flashcards For Focused, Fast Learning",
    description:
      "Create flashcards from notes, study with smart quizzes, and track mastery. Built for students who want to stop wasting time.",
    images: [
      "https://res.cloudinary.com/dyu7ogoqc/image/upload/v1763237407/New_Project_3_uij9md.png",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable}`}>
      <body className={`antialiased font-sans`} suppressHydrationWarning>
        <Suspense fallback={null}>
          <TopProgressBar />
        </Suspense>
        <div>
          <Toaster
            toastOptions={{
              style: {
                background: "#ffffff",
                color: "#000000",
                border: "1px solid #E2E2E2",
                padding: "12px 16px",
                fontSize: "14px",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              },
              success: {
                iconTheme: {
                  primary: "#C96442",
                  secondary: "#ffffff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#C96442",
                  secondary: "#ffffff",
                },
              },
            }}
          />
        </div>
        {children}
      </body>
    </html>
  );
}
