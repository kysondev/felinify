"use client";

import { Button } from "components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/Card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/Dialog";
import { Deck } from "db/types/models.types";
import { BookOpen, Clock, FlipHorizontal, Brain, Award } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const DeckCard = ({ deck }: { deck: Deck }) => {
  const [studyQuestions, setStudyQuestions] = useState<number>(10);
  const router = useRouter();

  const handleStudyModeSelect = (mode: string) => {
    if (mode === "flip") {
      router.push(`/workspace/study/flip?deckId=${deck.id}`);
    } else {
      router.push(
        `/workspace/study/${mode}?deckId=${deck.id}&questions=${studyQuestions}`
      );
    }
  };

  const handleChallengeMode = () => {
    handleStudyModeSelect("challenge");
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle>{deck.name}</CardTitle>
        <CardDescription className="truncate">
          {deck.description || "No description"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {deck.flashcards?.length} cards
          </span>
          <span className="text-muted-foreground flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {deck.progress?.lastStudied
              ? new Date(deck.progress.lastStudied as Date).toLocaleDateString()
              : "Never"}
          </span>
        </div>
        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full rounded-full"
            style={{ width: `${deck.progress?.mastery || 0}%` }}
          ></div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {deck.progress?.mastery || 0}% mastery
        </p>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Link href={`/workspace/deck/${deck.id}`} passHref>
          <Button variant="outline" size="sm">
            Edit
          </Button>
        </Link>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm">Study Now</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Choose Study Mode</DialogTitle>
              <DialogDescription>
                Select how you want to study this deck
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div
                className="flex hover:border-primary items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-accent/10 transition-colors"
                onClick={() => handleStudyModeSelect("flip")}
              >
                <div className="p-2 bg-primary/10 rounded-full">
                  <FlipHorizontal className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Classic Flip</h3>
                  <p className="text-sm text-muted-foreground">
                    Simple flashcard flipping for quick review
                  </p>
                </div>
              </div>

              <div
                className="flex hover:border-primary items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-accent/10 transition-colors"
                onClick={handleChallengeMode}
              >
                <div className="p-2 bg-primary/10 rounded-full">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Challenge Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Test your knowledge with quizzes
                  </p>
                </div>
                <div className="ml-auto">
                  <select
                    value={studyQuestions}
                    onChange={(e) => setStudyQuestions(Number(e.target.value))}
                    onClick={(e) => e.stopPropagation()}
                    className="px-3 py-1 border rounded-md text-sm"
                  >
                    <option value="5">5 Questions</option>
                    <option value="10">10 Questions</option>
                    <option value="20">20 Questions</option>
                  </select>
                </div>
              </div>

              <div
                className="flex hover:border-primary items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-accent/10 transition-colors"
                onClick={() => handleStudyModeSelect("smart")}
              >
                <div className="p-2 bg-primary/10 rounded-full">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Smart Review Mode</h3>
                  <p className="text-sm text-muted-foreground">
                    Focused on cards you need to practice based on performance
                  </p>
                </div>
                <div className="ml-auto">
                  <select
                    value={studyQuestions}
                    onChange={(e) => setStudyQuestions(Number(e.target.value))}
                    onClick={(e) => e.stopPropagation()}
                    className="px-3 py-1 border rounded-md text-sm"
                  >
                    <option value="5">5 Questions</option>
                    <option value="10">10 Questions</option>
                    <option value="20">20 Questions</option>
                  </select>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
