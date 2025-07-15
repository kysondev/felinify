import React from "react";
import { Button } from "components/ui/Button";

interface ErrorStateProps {
  title: string;
  message: string;
  buttonText: string;
  buttonAction: () => void;
}

export const ErrorState = ({
  title,
  message,
  buttonText,
  buttonAction,
}: ErrorStateProps) => (
  <div className="container max-w-3xl mx-auto py-8 px-4 mt-16">
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6">{message}</p>
      <Button onClick={buttonAction}>{buttonText}</Button>
    </div>
  </div>
); 