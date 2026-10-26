"use client";

import dynamic from "next/dynamic";

const BetaSubscribeForm = dynamic(() =>
  import("./beta-subscribe-form").then((m) => m.BetaSubscribeForm)
);

export const BetaSubscribeSlot = () => <BetaSubscribeForm />;
