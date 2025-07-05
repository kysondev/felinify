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
        { text: "Features", url: "#" },
        { text: "Pricing", url: "#" },
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
        { text: "FAQ", url: "#" },
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
  copyright = "© 2025 Kyson W. All rights reserved.",
  bottomLinks = [
    { text: "Terms and Conditions", url: "#" },
    { text: "Privacy Policy", url: "#" },
  ],
}: FooterProps) => {
  return (
    <section className="mt-20 mb-8">
      <div className="container">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <p className="text-xl font-semibold">{logo.title}</p>
              </div>
              <p className="mt-4 font-medium">{tagline}</p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:text-primary">
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
