"use client";

import { useState, type FormEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Button } from "@ui/button";
import { Badge } from "@ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@ui/alert-dialog";
import { ArrowRight, NotebookPen, Send, Sparkles, Wand2 } from "lucide-react";

const assistantSuggestions = [
  "Turn my class notes into flashcards",
  "List key points about photosynthesis",
  "Summarize and generate flashcards for this PDF",
  "Create a deck to prep for my midterm this week",
];

const quickActions = [
  { label: "Quiz my last deck", icon: Wand2 },
  { label: "Turn notes into cards", icon: NotebookPen },
  { label: "Make a 3-day study plan", icon: Sparkles },
  { label: "Explain this topic simply", icon: ArrowRight },
];

export function AskFelinCard() {
  const [showUnavailable, setShowUnavailable] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowUnavailable(true);
  };

  return (
    <>
      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="flex flex-row items-center gap-2">
          <CardTitle className="text-lg font-semibold">Ask Felin</CardTitle>
          <Badge className="!mt-0">
            <Sparkles className="h-4 w-4" />
            AI
          </Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-[1.35fr,1fr]">
            <div className="space-y-3">
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative">
                  <textarea
                    name="prompt"
                    rows={5}
                    placeholder="Paste notes, drop a topic, or ask for a quiz/summary..."
                    className="w-full rounded-lg border border-border bg-card p-4 pr-32 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                    autoComplete="off"
                  />
                  <Button
                    type="submit"
                    className="absolute right-3 bottom-3 h-11 px-5 gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send
                  </Button>
                </div>
              </form>
              <div className="flex flex-wrap gap-2">
                {assistantSuggestions.map((prompt) => (
                  <Button
                    key={prompt}
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowUnavailable(true)}
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-dashed border-border/70 bg-muted/40 p-3 space-y-2">
              <p className="text-xs font-semibold text-foreground/80">
                Quick actions
              </p>
              <div className="flex flex-col gap-2">
                {quickActions.map(({ label, icon: Icon }) => (
                  <Button
                    key={label}
                    variant="ghost"
                    size="sm"
                    className="justify-start gap-2"
                    onClick={() => setShowUnavailable(true)}
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {label}
                  </Button>
                ))}
              </div>
              <div className="text-[11px] text-muted-foreground">
                Tip: paste notes or a URL and ask for flashcards, summaries, or
                a timed quiz. Press Ctrl + Enter to send.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={showUnavailable} onOpenChange={setShowUnavailable}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Feature unavailable</AlertDialogTitle>
            <AlertDialogDescription>
              This feature is currently unavailable. Check back soon!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Got it</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
