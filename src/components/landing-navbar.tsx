"use client";

import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const LandingNavbar = ({
  logo = {
    url: "#",
    alt: "logo",
    title: "Felinify",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "Explore", url: "/explore" },
    {
      title: "Pricing",
      url: "/pricing",
    },
  ],
  auth = {
    login: { title: "Login", url: "/auth/login" },
    signup: { title: "Sign up", url: "/auth/signup" },
  },
}: Navbar1Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (title: string) => {
    setOpenAccordion((prev) => (prev === title ? null : title));
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <section className="absolute inset-x-0 top-0 z-50 p-2 flex justify-center">
      <div className="w-full max-w-7xl mx-auto">
        <div className="bg-background/95 backdrop-blur-lg border border-border rounded-full shadow-lg transition-shadow duration-300 px-3 sm:px-6 py-2 sm:py-3">
          {/* Desktop Menu */}
          <nav className="hidden justify-between w-full lg:flex">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <Link href={logo.url} className="flex items-center gap-2">
                <Image
                  src="/felinify.png"
                  alt="Felinify"
                  width={25}
                  height={25}
                />
                <span className="text-lg font-semibold tracking-tighter text-primary">
                  {logo.title}
                </span>
              </Link>
              <div className="flex items-center gap-2">
                {menu.map((item) => (
                  <DesktopMenuItem key={item.title} item={item} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={auth.login.url}
                className="rounded-full px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                {auth.login.title}
              </Link>
              <Link
                href={auth.signup.url}
                className="rounded-full px-4 py-2 text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </nav>

          {/* Mobile Menu */}
          <div className="block lg:hidden">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href={logo.url} className="flex items-center gap-2">
                <Image
                  src="/felinify.png"
                  alt="Felinify"
                  width={25}
                  height={25}
                />
                <span className="text-lg font-semibold tracking-tighter text-primary">
                  {logo.title}
                </span>
              </Link>
              <Button
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                variant="outline"
              >
                <Menu className="size-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div
          className={`fixed inset-0 z-40 bg-background/60 backdrop-blur-sm transition-opacity duration-150 ${
            mobileOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={closeMobile}
          aria-hidden={!mobileOpen}
        />
        <div
          className={`fixed left-0 right-0 top-14 z-50 px-2 transition-all duration-200 ${
            mobileOpen
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "-translate-y-4 opacity-0 pointer-events-none"
          }`}
          aria-hidden={!mobileOpen}
        >
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src="/felinify.png"
                  alt="Felinify"
                  width={22}
                  height={22}
                />
                <span className="text-base font-semibold tracking-tight text-primary">
                  {logo.title}
                </span>
              </div>
              <Button
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground hover:bg-muted transition-colors"
                onClick={closeMobile}
                variant="outline"
              >
                <X className="size-4" />
              </Button>
            </div>

            <div className="p-4 flex flex-col gap-2 max-h-[70vh] overflow-y-auto">
              {menu.map((item) =>
                item.items ? (
                  <div
                    key={item.title}
                    className="rounded-lg border border-border bg-muted/20"
                  >
                    <Button
                      className="w-full px-3 py-3 flex items-center justify-between text-left text-sm font-semibold"
                      onClick={() => toggleAccordion(item.title)}
                    >
                      <span>{item.title}</span>
                      <ChevronDown
                        className={`size-4 text-muted-foreground transition-transform ${
                          openAccordion === item.title ? "rotate-180" : ""
                        }`}
                      />
                    </Button>
                    {openAccordion === item.title && (
                      <div className="border-t border-border">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.url}
                            className="block px-4 py-3 hover:bg-muted text-sm"
                            onClick={closeMobile}
                          >
                            <div className="font-medium">{subItem.title}</div>
                            {subItem.description && (
                              <p className="text-xs text-muted-foreground">
                                {subItem.description}
                              </p>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.title}
                    href={item.url}
                    className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-muted"
                    onClick={closeMobile}
                  >
                    {item.title}
                  </Link>
                )
              )}
            </div>

            <div className="flex flex-col gap-3 px-4 pb-4">
              <Link
                href={auth.login.url}
                className="rounded-full px-4 py-2 text-center text-sm font-medium text-foreground border border-border hover:bg-muted transition-colors"
                onClick={closeMobile}
              >
                {auth.login.title}
              </Link>
              <Link
                href={auth.signup.url}
                className="rounded-full px-4 py-2 text-center text-sm font-semibold bg-primary text-primary-foreground hover:opacity-90 transition-colors"
                onClick={closeMobile}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const DesktopMenuItem = ({ item }: { item: MenuItem }) => {
  if (item.items) {
    return (
      <div className="relative group">
        <Button className="inline-flex h-10 items-center rounded-md px-4 text-sm font-medium hover:bg-muted transition-colors">
          {item.title}
        </Button>
        <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute left-0 top-full mt-2 w-72 rounded-lg border border-border bg-popover shadow-lg">
          <div className="py-2">
            {item.items.map((subItem) => (
              <Link
                key={subItem.title}
                href={subItem.url}
                className="flex gap-3 px-4 py-3 hover:bg-muted transition-colors"
              >
                <div className="text-foreground">{subItem.icon}</div>
                <div>
                  <div className="text-sm font-semibold">{subItem.title}</div>
                  {subItem.description && (
                    <p className="text-xs text-muted-foreground">
                      {subItem.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={item.url}
      className="inline-flex h-10 items-center rounded-md px-4 text-sm font-medium hover:bg-muted transition-colors"
    >
      {item.title}
    </Link>
  );
};

export { LandingNavbar };
