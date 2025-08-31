"use client";

import Image from "next/image";
import { useState } from "react";
import { SubscriptionPopup } from "./subscription-popup";

interface FooterLink {
  text: string;
  url: string;
  action?: () => void;
}

interface MenuItem {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: {
    url: string;
    alt: string;
    title: string;
  };
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: FooterLink[];
}

const Footer = (props: FooterProps) => {
  const [showSubscribe, setShowSubscribe] = useState(false);

  function handleNewsletterClick() {
    setShowSubscribe(true);
  }

  const {
    logo = {
      alt: "Logo",
      title: "Felinify",
      url: "#",
    },
    tagline = "Smarter studying starts here.",
    menuItems = [
      {
        title: "Product",
        links: [
          { text: "Features", url: "#features" },
          { text: "Pricing", url: "#pricing" },
          { text: "AI Study Tools", url: "/workspace/study/challenge" },
          { text: "Explore Decks", url: "/workspace/explore" },
        ],
      },
      {
        title: "Account",
        links: [
          { text: "Login", url: "/auth/login" },
          { text: "Sign Up", url: "/auth/signup" },
          { text: "Library", url: "/workspace/library" },
          { text: "Settings", url: "/workspace/settings" },
        ],
      },
      {
        title: "Support",
        links: [
          { text: "FAQ", url: "#faq" },
          { text: "Newsletter", url: "#", action: handleNewsletterClick },
        ],
      },
      {
        title: "Connect",
        links: [
          { text: "Email", url: "mailto:contact@felinify.com" },
          { text: "GitHub", url: "https://github.com/kysondev/felinify" },
        ],
      },
    ],
    copyright = "© 2025 Felinify.com. All rights reserved.",
    bottomLinks = [
      { text: "Terms of Service", url: "/terms" },
      { text: "Privacy Policy", url: "/privacy" },
    ],
  } = props;
  return (
    <>
      <SubscriptionPopup open={showSubscribe} setOpen={setShowSubscribe} />
      <section className="py-16 border-t border-border mt-16">
        <div className="px-4 max-w-[1200px] mx-auto">
          <footer>
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
              <div className="col-span-2 mb-8 lg:mb-0">
                <div className="flex items-center gap-2 lg:justify-start">
                  <Image
                    src="/felinify.png"
                    alt="Felinify"
                    width={30}
                    height={30}
                  />
                  <p className="text-xl font-semibold text-primary">
                    {logo.title}
                  </p>
                </div>
                <p className="mt-4 text-muted-foreground">{tagline}</p>
              </div>
              {menuItems.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <h3 className="mb-4 font-bold text-sm text-primary">
                    {section.title}
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    {section.links.map((link, linkIdx) => (
                      <li
                        key={linkIdx}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {link.action ? (
                          <button
                            onClick={link.action}
                            className="cursor-pointer"
                          >
                            {link.text}
                          </button>
                        ) : (
                          <a href={link.url}>{link.text}</a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-16 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
              <p>{copyright}</p>
              <ul className="flex gap-6">
                {bottomLinks.map((link, linkIdx) => (
                  <li
                    key={linkIdx}
                    className="hover:text-primary transition-colors"
                  >
                    <a href={link.url}>{link.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          </footer>
        </div>
      </section>
    </>
  );
};

export { Footer };
