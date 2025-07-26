import Image from "next/image";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
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
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer = ({
  logo = {
    alt: "Logo",
    title: "Lumix",
    url: "#",
  },
  tagline = "Smarter studying starts here.",
  menuItems = [
    {
      title: "Product",
      links: [
        { text: "Features", url: "#features" },
        { text: "Pricing", url: "#pricing" },
        { text: "AI Flashcards", url: "#" },
        { text: "Spaced Repetition", url: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About Us", url: "#" },
        { text: "Careers", url: "#" },
        { text: "Press", url: "#" },
        { text: "Contact", url: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { text: "Help Center", url: "#" },
        { text: "FAQ", url: "#faq" },
        { text: "Community", url: "#" },
      ],
    },
    {
      title: "Follow Us",
      links: [
        { text: "Twitter", url: "#" },
        { text: "Instagram", url: "#" },
        { text: "YouTube", url: "#" },
      ],
    },
  ],
  copyright = "© 2025 Lumix. All rights reserved.",
  bottomLinks = [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
}: FooterProps) => {
  return (
    <section className="py-16 border-t border-border mt-16">
      <div className="px-4 max-w-[1200px] mx-auto">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Image src="/lumix.png" alt="Lumix" width={30} height={30} />
                <p className="text-xl font-semibold text-primary">{logo.title}</p>
              </div>
              <p className="mt-4 text-muted-foreground">{tagline}</p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold text-sm text-primary">{section.title}</h3>
                <ul className="space-y-3 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      <a href={link.url}>{link.text}</a>
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
                <li key={linkIdx} className="hover:text-primary transition-colors">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer };
