"use client";

import { useState } from "react";
import { Flashcard } from "components/library/flashcard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "components/ui/dialog";
import { Button } from "components/ui/button";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { Flashcard as FlashcardType } from "db/types/models.types";

interface ExploreFlashcardGridProps {
  flashcards: FlashcardType[];
}

export default function ExploreFlashcardGrid({
  flashcards,
}: ExploreFlashcardGridProps) {
  const [showFullContentDialog, setShowFullContentDialog] = useState(false);
  const [fullContentTitle, setFullContentTitle] = useState("");
  const [fullContent, setFullContent] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 6;

  const handleShowFullContent = (title: string, content: string) => {
    setFullContentTitle(title);
    setFullContent(content);
    setShowFullContentDialog(true);
  };

  const totalPages = Math.ceil(flashcards?.length / cardsPerPage);

  const currentCards = flashcards?.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        {currentCards?.map((flashcard) => (
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

      {flashcards?.length > cardsPerPage && (
        <div className="flex justify-between items-center pt-4 border-t mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <p className="text-sm text-muted-foreground">
            Page {currentPage + 1} of {totalPages}
          </p>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages - 1}
            className="flex items-center gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      <Dialog
        open={showFullContentDialog}
        onOpenChange={setShowFullContentDialog}
      >
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
