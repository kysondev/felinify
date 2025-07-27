"use client";

import { useState } from "react";
import { Flashcard } from "components/library/Flashcard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "components/ui/Dialog";
import { Button } from "components/ui/Button";
import { Eye } from "lucide-react";
import { Flashcard as FlashcardType } from "db/types/models.types";

interface ExploreFlashcardGridProps {
  flashcards: FlashcardType[];
}

export default function ExploreFlashcardGrid({ flashcards }: ExploreFlashcardGridProps) {
  const [showFullContentDialog, setShowFullContentDialog] = useState(false);
  const [fullContentTitle, setFullContentTitle] = useState("");
  const [fullContent, setFullContent] = useState("");

  const handleShowFullContent = (title: string, content: string) => {
    setFullContentTitle(title);
    setFullContent(content);
    setShowFullContentDialog(true);
  };

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        {flashcards?.map((flashcard) => (
          <Flashcard
            key={String(flashcard.id)}
            id={String(flashcard.id)}
            question={String(flashcard.question)}
            answer={String(flashcard.answer)}
            onShowFullContent={handleShowFullContent}
            isPreview={false}
          />
        ))}
      </div>

      <Dialog open={showFullContentDialog} onOpenChange={setShowFullContentDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              {fullContentTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="pt-4 max-h-[60vh] overflow-y-auto">
            <p className="whitespace-pre-wrap break-words">{fullContent}</p>
          </div>
          <DialogFooter className="mt-6 pt-4 border-t">
            <Button
              type="button"
              onClick={() => setShowFullContentDialog(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
} 