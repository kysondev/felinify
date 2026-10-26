import { Button } from "@components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CtaButton } from "./cta-button";

const PricingCTA = () => {
  return (
    <>
      <section
        aria-label="Get started"
        className="rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-6 py-8 sm:px-10 sm:py-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
            Ready to see how fast you can learn?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
            Create your first deck in minutes. Start free, keep your progress,
            and upgrade only if Felinify actually helps you study better.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <CtaButton className="w-full sm:w-auto"
            href="/library">
            Get started free
            <ArrowRight className="ml-2 h-4 w-4" />
          </CtaButton>
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto border-dashed"
          >
            <Link href="/explore">Browse public decks</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default PricingCTA;
