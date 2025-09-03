"use client";

import { Button } from "components/ui/button";
import { Card, CardContent } from "components/ui/card";
import { Deck } from "db/types/models.types";
import { TrendingUp, Edit3, Play, Target } from "lucide-react";
import { CardsIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Progress } from "components/ui/progress";
import { Badge } from "components/ui/badge";
import { formatDate } from "@common/utils/date.utils";
import { StudyModeDialog } from "components/study";

export const DeckCard = ({ deck }: { deck: Deck }) => {
  const [showStudyModeDialog, setShowStudyModeDialog] =
    useState<boolean>(false);

  const router = useRouter();

  const handleStudyModeSelect = (mode: string) => {
    if (mode === "flip") {
      router.push(`/workspace/study/flip?deckId=${deck.id}`);
    }
    if (mode === "challenge") {
      router.push(`/workspace/study/challenge?deckId=${deck.id}`);
    }
    if (mode === "quiz") {
      router.push(`/workspace/study/quiz?deckId=${deck.id}`);
    }
  };


  return (
    <Card>
      <CardContent className="p-6 cursor-default">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3
                className="font-semibold text-xl text-foreground line-clamp-1 hover:text-primary transition-colors duration-300 cursor-pointer"
                onClick={() => router.push(`/workspace/deck/edit/${deck.id}`)}
              >
                {deck.name}
              </h3>
              <Badge
                variant={deck.visibility === "public" ? "default" : "secondary"}
                className="text-xs font-semibold px-2 py-1 rounded-full"
              >
                {deck.visibility === "public" ? "Public" : "Private"}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed min-h-[45.5px]">
              {deck.description || "No description available"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 border border-border/30">
            <div className="p-2 rounded-lg bg-muted">
              <CardsIcon size={16} className="text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-foreground">
                {deck.flashcards?.length || 0}
              </p>
              <p className="text-xs text-muted-foreground font-medium">Cards</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 border border-border/30">
            <div className="p-2 rounded-lg bg-muted">
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <div className="min-w-0">
              <p className="text-lg font-bold text-foreground">
                {deck.progress?.completedSessions || 0}
              </p>
              <p className="text-xs text-muted-foreground font-medium">
                Sessions
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-muted/40 via-muted/20 to-transparent border border-border/40 mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/10">
                <Target className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-bold text-foreground">
                Mastery Progress
              </span>
            </div>
            <div className="text-right">
              <span className={`text-xl font-bold text-primary`}>
                {deck.progress?.mastery || 0}%
              </span>
              <p className="text-xs text-muted-foreground font-medium">
                {deck.progress?.lastStudied
                  ? formatDate(deck.progress.lastStudied)
                  : "Never"}
              </p>
            </div>
          </div>

          <Progress
            value={deck.progress?.mastery || 0}
            className="w-full h-2 rounded-full"
          />
        </div>

        <div className="flex gap-3">
          <Link
            href={`/workspace/deck/edit/${deck.id}`}
            passHref
            className="flex-1"
          >
            <Button
              variant="outline"
              size="sm"
              className="w-full font-semibold rounded-xl border hover:bg-muted transition-all duration-300"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>

          <StudyModeDialog
            open={showStudyModeDialog}
            onOpenChange={setShowStudyModeDialog}
            onStudyModeSelect={handleStudyModeSelect}
            triggerText="Study"
            triggerIcon={<Play className="h-4 w-4 mr-2" />}
            className="flex-1 font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
          />
        </div>
      </CardContent>



    </Card>
  );
};
