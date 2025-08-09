import type { Metadata } from "next";
import "@styles/globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Clami | AI Flashcards For Focused, Fast Learning",
  description: "Create flashcards from notes, study with smart quizzes, and track mastery. Built for students who want to stop wasting time.",
  keywords: ["flashcards", "AI learning", "study app", "smart quizzes", "education", "student tools"],
  authors: [{ name: "Shi Jun(Kyson) W." }],
  creator: "Shi Jun(Kyson) W.",
  publisher: "Shi Jun(Kyson) W.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://clami.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Clami | AI Flashcards For Focused, Fast Learning",
    description: "Create flashcards from notes, study with smart quizzes, and track mastery. Built for students who want to stop wasting time.",
    url: "https://clami.app",
    siteName: "Clami",
    images: [
      {
        url: "https://res.cloudinary.com/dyu7ogoqc/image/upload/v1754105180/Screenshot_2025-08-01_232455_n6m6gj.png",
        width: 1200,
        height: 630,
        alt: "Clami - AI Flashcards For Focused, Fast Learning",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clami | AI Flashcards For Focused, Fast Learning",
    description: "Create flashcards from notes, study with smart quizzes, and track mastery. Built for students who want to stop wasting time.",
    images: ["https://res.cloudinary.com/dyu7ogoqc/image/upload/v1754105180/Screenshot_2025-08-01_232455_n6m6gj.png"],
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
    <html lang="en">
      <body className={`antialiased`} suppressHydrationWarning>
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
