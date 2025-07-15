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
import {
  BookOpen,
  Clock,
  FlipHorizontal,
  Brain,
  Award,
  Timer,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "components/ui/Radio-group";
import { Label } from "components/ui/Label";
import { Switch } from "components/ui/Switch";

export const DeckCard = ({ deck }: { deck: Deck }) => {
  const [numOfRounds, setNumOfRounds] = useState<number>(3);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [showStudyModeDialog, setShowStudyModeDialog] = useState<boolean>(false);
  const [selectedMode, setSelectedMode] = useState<string>("");
  const [isTimed, setIsTimed] = useState<boolean>(false);
  const router = useRouter();

  const handleStudyModeSelect = (mode: string) => {
    if (mode === "flip") {
      router.push(`/workspace/study/flip?deckId=${deck.id}`);
    } else {
      setSelectedMode(mode);
      setShowStudyModeDialog(false);
      setShowSettings(true);
    }
  };

  const handleStartStudy = () => {
    router.push(
      `/workspace/study/${selectedMode}?deckId=${deck.id}&numOfRounds=${numOfRounds}&timed=${isTimed}`
    );
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
        <Dialog open={showStudyModeDialog} onOpenChange={setShowStudyModeDialog}>
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
                onClick={() => handleStudyModeSelect("challenge")}
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
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Study Settings</DialogTitle>
              <DialogDescription>
                Configure your{" "}
                {selectedMode === "challenge" ? "Challenge" : "Smart Review"}{" "}
                session
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="space-y-4">
                <h3 className="font-medium">Number of Rounds</h3>
                <RadioGroup
                  defaultValue="3"
                  value={numOfRounds.toString()}
                  onValueChange={(value) => setNumOfRounds(parseInt(value))}
                  className="grid grid-cols-3 gap-2"
                >
                  <div>
                    <RadioGroupItem
                      value="1"
                      id="r1"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="r1"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span>1</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="3"
                      id="r2"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="r2"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span>3</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="5"
                      id="r3"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="r3"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <span>5</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="timed-mode">Timed Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Limited time to answer questions
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="timed-mode"
                    checked={isTimed}
                    onCheckedChange={setIsTimed}
                  />
                  <Timer
                    className={`h-4 w-4 ${isTimed ? "text-primary" : "text-muted-foreground"}`}
                  />
                </div>
              </div>

              <Button onClick={handleStartStudy} className="w-full">
                Start Study Session
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
