"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "components/ui/dialog";
import { Button } from "components/ui/button";
import { Badge } from "components/ui/badge";
import {
  FlipHorizontal,
  Award,
  Brain,
  ChevronRight,
  Zap,
  Play,
  Info,
} from "lucide-react";

interface StudyModeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStudyModeSelect: (mode: string) => void;
  triggerText?: string;
  triggerIcon?: React.ReactNode;
  className?: string;
}

export const StudyModeDialog = ({
  open,
  onOpenChange,
  onStudyModeSelect,
  triggerText = "Study",
  triggerIcon = <Play className="h-4 w-4 mr-2" />,
  className = "",
}: StudyModeDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className={className}>
          {triggerIcon}
          {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] rounded-xl">
        <DialogHeader className="space-y-2 pb-4">
          <DialogTitle className="text-xl font-bold">
            Choose Study Mode
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Select your preferred study method
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div
            className="group/mode flex items-center gap-3 p-3 border border-border/50 rounded-lg cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all duration-200"
            onClick={() => onStudyModeSelect("flip")}
          >
            <div className="p-2.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover/mode:scale-105 transition-transform duration-200">
              <FlipHorizontal className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base text-foreground mb-1">
                Classic Flip
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Simple flashcard flipping for quick review
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover/mode:text-primary group-hover/mode:translate-x-0.5 transition-all duration-200" />
          </div>

          <div
            className="group/mode flex items-center gap-3 p-3 border border-border/50 rounded-lg cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all duration-200"
            onClick={() => onStudyModeSelect("challenge")}
          >
            <div className="p-2.5 bg-orange-100 dark:bg-orange-900/30 rounded-lg group-hover/mode:scale-105 transition-transform duration-200">
              <Award className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base text-foreground mb-1">
                Challenge Mode
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Multiple choice challenges to test knowledge
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover/mode:text-primary group-hover/mode:translate-x-0.5 transition-all duration-200" />
          </div>

          <div
            className="group/mode flex items-center gap-3 p-3 border border-border/50 rounded-lg cursor-pointer hover:border-primary/60 hover:bg-primary/5 transition-all duration-200"
            onClick={() => onStudyModeSelect("quiz")}
          >
            <div className="p-2.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover/mode:scale-105 transition-transform duration-200">
              <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-base text-foreground">
                  Adaptive Quiz
                </h3>
                <Badge className="bg-primary text-primary-foreground text-xs px-2 py-0.5 font-medium rounded-full">
                  <Zap className="h-3 w-3 mr-1" />
                  AI
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Smart quizzes that adapt to your progress
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover/mode:text-primary group-hover/mode:translate-x-0.5 transition-all duration-200" />
          </div>

          <div className="mt-4 p-3 bg-muted/40 rounded-lg border border-border/30">
            <h4 className="text-xs font-semibold flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-primary/10 rounded-md">
                <Info className="h-3 w-3 text-primary" />
              </div>
              Quiz Requirements
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1 ml-8">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                Complete Challenge Mode 3+ times
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                Achieve 10%+ mastery in this deck
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                Have at least 1 energy available
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
