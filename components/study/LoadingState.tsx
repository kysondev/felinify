import React from "react";

interface LoadingStateProps {
  isSaving: boolean;
}

export const LoadingState = ({ isSaving }: LoadingStateProps) => (
  <div className="container max-w-3xl mx-auto py-8 px-4 mt-16">
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-muted-foreground">
        {isSaving ? "Saving Progress..." : "Loading flashcards..."}
      </p>
    </div>
  </div>
); 