import * as React from "react";

import { cn } from "src/lib/cn";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "peer flex w-full min-h-[96px] rounded-xl border border-input/70 bg-white px-4 py-3 text-base text-foreground ring-1 ring-transparent placeholder:text-muted-foreground/70 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-1 focus-visible:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 data-[error=true]:border-destructive/70 data-[error=true]:ring-2 data-[error=true]:ring-destructive/40",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
