"use client";

import { Button } from "@ui/button";
import dynamic from "next/dynamic";
import { ComponentProps, ReactNode, useState } from "react";

const SubscriptionPopup = dynamic(() =>
  import("./subscription-popup").then((m) => m.SubscriptionPopup)
);

type BetaCtaButtonProps = Omit<ComponentProps<typeof Button>, "onClick"> & {
  children: ReactNode;
};

export const BetaCtaButton = ({ children, ...props }: BetaCtaButtonProps) => {
  const [showSubscriptionPopup, setShowSubscriptionPopup] = useState(false);

  return (
    <>
      {showSubscriptionPopup && (
        <SubscriptionPopup
          open={showSubscriptionPopup}
          setOpen={setShowSubscriptionPopup}
        />
      )}
      <Button {...props} onClick={() => setShowSubscriptionPopup(true)}>
        {children}
      </Button>
    </>
  );
};
