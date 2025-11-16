"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubscriptionPopup } from "./subscription-popup";
import { Button } from "@components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const PricingCTA = () => {
  const router = useRouter();
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);

  const handleWorkspaceClick = () => {
    const isBetaMode = process.env.NEXT_PUBLIC_BETA_MODE === "true";

    if (isBetaMode) {
      setShowSubscriptionPopup(true);
    } else {
      router.push("/library");
    }
  };
  return (
    <>
      <SubscriptionPopup
        open={showSubscriptionPopup}
        setOpen={setShowSubscriptionPopup}
      />
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
          <Button className="w-full sm:w-auto" onClick={handleWorkspaceClick}>
            Get started free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
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
