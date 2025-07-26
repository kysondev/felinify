import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Lumix",
  description: "AI powered flashcards for focused, fast learning",
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
