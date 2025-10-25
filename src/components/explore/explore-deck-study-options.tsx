"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StudyModeDialog } from "@components/study";
import { Play, Copy } from "lucide-react";
import { Button } from "@ui/button";
import { cloneDeckAction } from "@deck/actions/deck.action";
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
import { LoginDialog } from "@components/auth/login-dialog";
import toast from "react-hot-toast";
import { revalidateDeckPaths } from "@common/utils/revalidation.utils";

interface ExploreDeckStudyOptionsProps {
  deckId: number;
  isAuthenticated?: boolean;
}

export default function ExploreDeckStudyOptions({
  deckId,
  isAuthenticated = true,
}: ExploreDeckStudyOptionsProps) {
  const router = useRouter();
  const [showStudyModeDialog, setShowStudyModeDialog] =
    useState<boolean>(false);
  const [isCloning, setIsCloning] = useState<boolean>(false);
  const [showCloneDialog, setShowCloneDialog] = useState<boolean>(false);
  const [showLoginDialog, setShowLoginDialog] = useState<boolean>(false);

  const handleStudyModeSelect = (mode: string) => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }

    if (mode === "flip") {
      router.push(`/study/flip?deckId=${deckId}`);
    }
    if (mode === "challenge") {
      router.push(`/study/challenge?deckId=${deckId}`);
    }
    if (mode === "quiz") {
      router.push(`/study/quiz?deckId=${deckId}`);
    }
  };

  const handleCloneDeck = async () => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }

    setIsCloning(true);
    setShowCloneDialog(false);
    try {
      const result = await cloneDeckAction(deckId);
      if (result.success) {
        toast.success("Deck cloned successfully! Check your library.");
        await revalidateDeckPaths(deckId);
        router.push("/library");
      } else {
        toast.error(result.message || "Failed to clone deck");
      }
    } catch (error) {
      console.error("Error cloning deck:", error);
      toast.error("An error occurred while cloning the deck");
    } finally {
      setIsCloning(false);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        <StudyModeDialog
          open={showStudyModeDialog}
          onOpenChange={setShowStudyModeDialog}
          onStudyModeSelect={handleStudyModeSelect}
          triggerText="Study Deck"
          triggerIcon={<Play className="h-4 w-4 mr-2" />}
          className="flex-1"
        />
        <AlertDialog open={showCloneDialog} onOpenChange={setShowCloneDialog}>
          <AlertDialogTrigger asChild>
            <Button
              disabled={isCloning}
              variant="outline"
              size="sm"
              className="px-3 h-9"
              title={isCloning ? "Cloning..." : "Clone Deck"}
              onClick={() => !isAuthenticated && setShowLoginDialog(true)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clone this deck?</AlertDialogTitle>
              <AlertDialogDescription>
                This will create a copy of this deck in your library. The cloned
                deck will be private and you can modify it as needed.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleCloneDeck} disabled={isCloning}>
                {isCloning ? "Cloning..." : "Clone Deck"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        title="Sign in to continue"
        description="You need to be signed in to study decks or clone them to your library."
      />
    </>
  );
}
