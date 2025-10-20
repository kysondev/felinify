"use client";

import { Button } from "@ui/button";
import { Save } from "lucide-react";
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
} from "@ui/alert-dialog";
import { formatTime } from "@common/utils/date.utils";

interface StudyEndDialogProps {
  openButtonLabel?: string;
  dialogTitle?: string;
  studyTime: number;
  masteryGainText?: string | null;
  extraDescription?: React.ReactNode;
  onConfirm: () => void;
  isSaving?: boolean;
}

/**
 * The StudyEndDialog component displays a confirmation dialog when the user wants to end their study session.
 * It shows the total study time and allows the user to confirm or cancel ending the session.
 */
export function StudyEndDialog({
  openButtonLabel = "End Session",
  dialogTitle = "End Study Session?",
  studyTime,
  masteryGainText,
  extraDescription,
  onConfirm,
  isSaving = false,
}: StudyEndDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-1 px-2 md:px-3 py-1 md:py-2 h-8 md:h-10 text-primary border-primary/30 hover:bg-primary/10"
        >
          <Save className="h-4 w-4" />
          <span className="hidden sm:inline">{openButtonLabel}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription className="flex flex-col gap-1">
            Your progress will be saved. You&apos;ve studied for{" "}
            {formatTime(studyTime)}.
            {masteryGainText && (
              <span className="text-primary font-medium">
                {masteryGainText}
              </span>
            )}
            {extraDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Continue Studying</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90"
          >
            {isSaving ? "Saving..." : "Save & End Session"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
