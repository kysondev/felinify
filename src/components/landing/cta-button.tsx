import { IS_BETA_MODE } from "@common/config/app.config";
import { Button } from "@ui/button";
import Link from "next/link";
import { ComponentProps, ReactNode } from "react";
import { BetaCtaButton } from "./beta-cta-button";

type CtaButtonProps = ComponentProps<typeof Button> & {
  href: string;
  children: ReactNode;
};

export const CtaButton = ({ href, children, ...props }: CtaButtonProps) => {
  if (IS_BETA_MODE) {
    return <BetaCtaButton {...props}>{children}</BetaCtaButton>;
  }

  return (
    <Button asChild {...props}>
      <Link href={href}>{children}</Link>
    </Button>
  );
};
