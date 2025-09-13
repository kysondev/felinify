"use client";

import { useState } from "react";
import { Card, CardContent } from "components/ui/card";
import { Badge } from "components/ui/badge";
import { Button } from "components/ui/button";
import { FlashcardImage } from "components/ui/flashcard-image";
import { ArrowRight, Edit2, Eye, FileUp } from "lucide-react";

interface FlashcardProps {
  id: string;
  question: string;
  answer: string;
  questionImageUrl?: string | null;
  onEdit?: (flashcard: {
    id: string;
    question: string;
    answer: string;
    questionImageUrl?: string | null;
  }) => void;
  onShowFullContent?: (title: string, content: string) => void;
  isPreview?: boolean;
  defaultFlipped?: boolean;
}

export const Flashcard = ({
  id,
  question,
  answer,
  questionImageUrl,
  onEdit,
  onShowFullContent,
  isPreview = false,
  defaultFlipped = false,
}: FlashcardProps) => {
  const [isFlipped, setIsFlipped] = useState(defaultFlipped);

  const isTextOverflowing = (text: string) => {
    return text.length > 120;
  };

  const truncateText = (text: string) => {
    if (isTextOverflowing(text)) {
      return text.slice(0, 120) + "...";
    }
    return text;
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Card
      className={`overflow-hidden h-full flex flex-col group border-primary/10 ${
        isFlipped
          ? "bg-gradient-to-br from-accent/5 to-transparent border-primary/20"
          : "hover:border-primary/30"
      }`}
      onClick={handleFlip}
    >
      <CardContent className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-3">
          <Badge
            variant={isFlipped ? "secondary" : "outline"}
            className={`px-2.5 py-0.5 ${isFlipped ? "bg-primary/10 text-primary" : ""}`}
          >
            {isFlipped ? "Answer" : "Question"}
          </Badge>
          {isPreview && (
            <Button
              variant="ghost"
              size="icon"
              title="Edit flashcard"
              className="h-8 w-8 rounded-full hover:bg-accent/20"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.({
                  id,
                  question,
                  answer,
                  questionImageUrl,
                });
              }}
            >
              <Edit2 className="h-4 w-4 text-muted-foreground" />
            </Button>
          )}
        </div>

        <div className="flex-grow flex flex-col justify-center min-h-[100px] my-2">
          <div className="flex gap-3 items-start">
            {!isFlipped && questionImageUrl && (
              <div className="flex-shrink-0 w-16 h-16">
                <FlashcardImage
                  src={questionImageUrl}
                  alt="Question image"
                  className="w-full h-full"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              {isFlipped ? (
                <p className="text-muted-foreground break-words">
                  {truncateText(answer)}
                </p>
              ) : (
                <p className="break-words font-medium">{truncateText(question)}</p>
              )}
            </div>
          </div>
        </div>

        {((isFlipped && isTextOverflowing(answer)) ||
          (!isFlipped && isTextOverflowing(question))) && (
          <Button
            variant="link"
            size="sm"
            className="p-0 mt-2 h-auto w-fit self-end text-primary"
            onClick={(e) => {
              e.stopPropagation();
              onShowFullContent?.(
                isFlipped ? "Answer" : "Question",
                isFlipped ? answer : question
              );
            }}
          >
            <Eye className="h-3 w-3 mr-1" />
            Show all
          </Button>
        )}

        <div className="flex justify-between items-center border-t mt-4 pt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <FileUp className="h-3 w-3 text-primary/70" />
            Click to {isFlipped ? "see question" : "reveal answer"}
          </div>
          <ArrowRight className="h-3 w-3 text-primary/70" />
        </div>
      </CardContent>
    </Card>
  );
};
