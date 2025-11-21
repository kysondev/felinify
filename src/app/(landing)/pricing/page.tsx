import { Footer } from "@components/landing/footer";
import { PricingPagePlans } from "@components/landing/pricing-page-plans";
import { Metadata } from "next";
import PricingCTA from "@components/landing/pricing-cta";

export const metadata: Metadata = {
  title: "Pricing | Felinify",
  description:
    "Simple, transparent pricing for Felinify. Choose the plan that fits your study style and unlock AI-powered flashcards for faster learning.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <>
      <main className="px-4 max-w-[1200px] mx-auto py-16 space-y-16">
        <section className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
            Pick the Felinify plan that fits you
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Start on the free Starter plan, then move to Pro or Ultra only when
            you need more decks, more Energy, and more AI help for tough topics.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            No long-term contracts. Upgrade, downgrade, or cancel whenever your
            study load changes.
          </p>
        </section>

        <section aria-label="Pricing plans">
          <PricingPagePlans />
        </section>

        <section aria-label="Plan recommendations" className="hidden">
          <div className="rounded-xl border border-border bg-card/60 p-6 text-left">
            <h2 className="text-lg font-semibold mb-2 text-foreground">
              Starter – for trying Felinify
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Great if you&apos;re just testing the workflow or using Felinify
              as a side helper alongside your existing system.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Up to 15 decks</li>
              <li>• Enough Energy for light daily use</li>
              <li>• Core AI flashcard generation</li>
            </ul>
          </div>
          <div className="rounded-xl border border-primary/40 bg-primary/5 p-6 text-left">
            <h2 className="text-lg font-semibold mb-2 text-foreground">
              Pro – for focused students
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Designed for students who rely on Felinify several times a week
              and want room to grow without thinking about limits.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• More decks for multiple classes</li>
              <li>• Higher daily Energy for AI</li>
              <li>• Extended access to Felinify AI</li>
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-6 text-left">
            <h2 className="text-lg font-semibold mb-2 text-foreground">
              Ultra – for heavy users
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Best if you run many courses, share decks, or use Felinify as your
              primary study hub every single day.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Maximum decks and Energy</li>
              <li>• Full access to Felinify AI</li>
              <li>• Ideal for power users</li>
            </ul>
          </div>
        </section>

        <section aria-label="Compare plans" className="hidden">
          <h2 className="text-xl font-semibold text-foreground text-center">
            Compare what you get in each plan
          </h2>
          <p className="text-sm text-muted-foreground text-center max-w-2xl mx-auto">
            The home page gives a quick overview. Here you can see exactly how
            Starter, Pro, and Ultra differ.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm border-collapse">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="py-3 px-3 text-left text-xs font-semibold text-muted-foreground">
                    Feature
                  </th>
                  <th className="py-3 px-3 text-center text-xs font-semibold text-muted-foreground">
                    Starter
                  </th>
                  <th className="py-3 px-3 text-center text-xs font-semibold text-muted-foreground">
                    Pro
                  </th>
                  <th className="py-3 px-3 text-center text-xs font-semibold text-muted-foreground">
                    Ultra
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/20">
                  <td className="py-3 px-3 text-xs text-muted-foreground">
                    Max flashcard decks
                  </td>
                  <td className="py-3 px-3 text-center text-sm text-foreground">
                    15
                  </td>
                  <td className="py-3 px-3 text-center text-sm text-foreground">
                    30
                  </td>
                  <td className="py-3 px-3 text-center text-sm text-foreground">
                    80
                  </td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="py-3 px-3 text-xs text-muted-foreground">
                    Daily Energy
                  </td>
                  <td className="py-3 px-3 text-center text-sm text-foreground">
                    10
                  </td>
                  <td className="py-3 px-3 text-center text-sm text-foreground">
                    50
                  </td>
                  <td className="py-3 px-3 text-center text-sm text-foreground">
                    100
                  </td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="py-3 px-3 text-xs text-muted-foreground">
                    Felinify AI access
                  </td>
                  <td className="py-3 px-3 text-center text-sm text-foreground">
                    Limited
                  </td>
                  <td className="py-3 px-3 text-center text-sm text-foreground">
                    Extended
                  </td>
                  <td className="py-3 px-3 text-center text-sm text-foreground">
                    Full
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <PricingCTA />
      </main>

      <div className="px-4 max-w-[1200px] mx-auto">
        <Footer />
      </div>
    </>
  );
}
