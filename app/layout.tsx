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
              style: { background: "#ffffff", color: "#000000" },
            }}
          />
        </div>
        {children}
      </body>
    </html>
  );
}
