import React from "react";
import { Button } from "components/ui/button";
import { Award, Clock, Save } from "lucide-react";
import { formatTime } from "@common/utils/date.utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "components/ui/alert-dialog";
import { Progress } from "components/ui/progress";
import { CardsIcon } from "@phosphor-icons/react/dist/ssr";

interface SessionHeaderProps {
  deck: {
    name: string;
    description?: string | null;
  };
  currentRound?: number;
  numOfRounds?: number;
  studyTime: number;
  totalProgress: number;
  handleEndSession: () => void;
  correctAnswers: number;
  currentIndex: number;
  totalCards: number;
  newMastery: number;
  initialMastery: number;
  isSaving: boolean;
}

/*
 * The session header displays the current round, total rounds, study time, and progress.
 * It also provides options to end the session or navigate through cards.
 */

export const SessionHeader = ({
  deck,
  currentRound,
  numOfRounds,
  studyTime,
  totalProgress,
  handleEndSession,
  correctAnswers,
  currentIndex,
  totalCards,
  newMastery,
  initialMastery,
  isSaving,
}: SessionHeaderProps) => (
  <>
    {currentRound && numOfRounds ? (
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-1 px-2 md:px-3 py-1 md:py-2 h-8 md:h-10 text-primary border-primary/30 hover:bg-primary/10"
            >
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">End Session</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>End Quiz Session?</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-1">
                Your progress will be saved.
                <span>You&apos;ve studied for {formatTime(studyTime)}.</span>
                <span className="text-primary font-medium">
                  Current score: {correctAnswers} /{" "}
                  {(currentRound ? currentRound - 1 : 0) * totalCards +
                    currentIndex +
                    1}
                </span>
                <span className="text-primary font-medium">
                  You&apos;ll gain {newMastery - initialMastery}% mastery from
                  this session.
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Continue Studying</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleEndSession}
                disabled={isSaving}
                className="bg-primary hover:bg-primary/90"
              >
                {isSaving ? "Saving..." : "Save & End Session"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 md:gap-2 bg-secondary/30 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
            <Award className="h-3 w-3 md:h-4 md:w-4 text-primary" />
            <span>
              Round {currentRound}/{numOfRounds}
            </span>
          </div>
          <div className="flex items-center gap-1 md:gap-2 bg-primary/10 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
            <Clock className="h-3 w-3 md:h-4 md:w-4 text-primary" />
            <span>{formatTime(studyTime)}</span>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-1 px-2 md:px-3 py-1 md:py-2 h-8 md:h-10 text-primary border-primary/30 hover:bg-primary/10"
            >
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">End Session</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>End Study Session?</AlertDialogTitle>
              <AlertDialogDescription className="flex flex-col gap-1">
                Your progress will be saved.
                <span>You&apos;ve studied for {formatTime(studyTime)}.</span>
                <span className="text-primary font-medium">
                  Current score: {correctAnswers} / {currentIndex + 1}
                </span>
                <span className="text-primary font-medium">
                  You&apos;ll gain {newMastery - initialMastery}% mastery from
                  this session.
                </span>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Continue Studying</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleEndSession}
                disabled={isSaving}
                className="bg-primary hover:bg-primary/90"
              >
                {isSaving ? "Saving..." : "Save & End Session"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 md:gap-2 bg-secondary/30 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
            <CardsIcon size={12} className="text-primary" />
            <span>
              {currentIndex + 1}/{totalCards}
            </span>
          </div>
          <div className="flex items-center gap-1 md:gap-2 bg-primary/10 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
            <Clock className="h-3 w-3 md:h-4 md:w-4 text-primary" />
            <span>{formatTime(studyTime)}</span>
          </div>
        </div>
      </div>
    )}

    <div className="flex items-center justify-between mb-4">
      <div>
        <h1 className="text-xl md:text-2xl font-bold truncate">{deck.name}</h1>
        <p className="text-muted-foreground text-sm md:text-base line-clamp-1">
          {deck.description || "No description"}
        </p>
      </div>
    </div>

    <Progress
      value={totalProgress}
      className="w-full h-2 rounded-full overflow-hidden mb-6 md:mb-8"
    />
  </>
);
