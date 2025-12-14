import * as React from "react";

import { cn } from "src/lib/cn";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "peer flex w-full min-h-[44px] rounded-xl border border-input/70 bg-white px-4 py-2.5 text-base text-foreground ring-1 ring-transparent file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground/70 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-1 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 data-[error=true]:border-destructive/70 data-[error=true]:ring-2 data-[error=true]:ring-destructive/40",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
