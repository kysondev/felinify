"use client";

import Image from "next/image";
import { useState } from "react";
import { SubscriptionPopup } from "./subscription-popup";
import { useRouter } from "next/navigation";

const Footer = () => {
  const [showSubscribe, setShowSubscribe] = useState(false);
  const router = useRouter();

  function handleNewsletterClick() {
    setShowSubscribe(true);
  }

  const handleWorkspaceClick = (url: string) => {
    const isBetaMode = process.env.NEXT_PUBLIC_BETA_MODE === "true";

    if (isBetaMode) {
      setShowSubscribe(true);
    } else {
      router.push(url);
    }
  };

  const menuItems = [
    {
      title: "Product",
      links: [
        { text: "Features", url: "#features" },
        { text: "Pricing", url: "/pricing" },
        {
          text: "Explore Decks",
          url: "/explore",
        },
      ],
    },
    {
      title: "Account",
      links: [
        { text: "Login", url: "/auth/login" },
        { text: "Sign Up", url: "/auth/signup" },
        {
          text: "Library",
          url: "/library",
          action: () => handleWorkspaceClick("/library"),
        },
        {
          text: "Settings",
          url: "/settings",
          action: () => handleWorkspaceClick("/settings"),
        },
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
  ];

  const bottomLinks = [
    { text: "Terms of Service", url: "/terms" },
    { text: "Privacy Policy", url: "/privacy" },
  ];
  return (
    <>
      <SubscriptionPopup open={showSubscribe} setOpen={setShowSubscribe} />
      <section className="py-16 border-t border-border mt-16">
        <div className="px-4 max-w-[1200px] mx-auto">
          <footer>
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
              {/* Brand section */}
              <div className="col-span-2 mb-8 lg:mb-0">
                <div className="flex items-center gap-2 lg:justify-start">
                  <Image
                    src="/felinify.png"
                    alt="Felinify"
                    width={30}
                    height={30}
                  />
                  <p className="text-xl font-semibold text-primary">Felinify</p>
                </div>
                <p className="mt-4 text-muted-foreground">
                  Smarter studying starts here.
                </p>
              </div>

              {/* Menu sections */}
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

            {/* Bottom section */}
            <div className="mt-16 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
              <p>© 2025 Felinify.com. All rights reserved.</p>
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
