"use client";

import { Card, CardContent, CardFooter, CardHeader } from "components/ui/Card";
import { Badge } from "components/ui/Badge";
import { Button } from "components/ui/Button";
import { ArrowRight, Edit2, Eye } from "lucide-react";

interface FlashcardProps {
  id: string;
  question: string;
  answer: string;
  isFlipped: boolean;
  onFlip: (id: string) => void;
  onEdit: (flashcard: { id: string; question: string; answer: string }) => void;
  onShowFullContent: (title: string, content: string) => void;
}

export const Flashcard = ({
  id,
  question,
  answer,
  isFlipped,
  onFlip,
  onEdit,
  onShowFullContent,
}: FlashcardProps) => {

  const isTextOverflowing = (text: string) => {
    return text.length > 120;
  };

  const truncateText = (text: string) => {
    if (isTextOverflowing(text)) {
      return text.slice(0, 120) + "...";
    }
    return text;
  };

  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-md max-h-[221px] cursor-pointer"
      onClick={() => onFlip(id)}
    >
      <CardHeader className="pb-0 flex flex-row justify-between items-center">
        <div>
          <Badge variant={isFlipped ? "secondary" : "default"}>
            {isFlipped ? "Answer" : "Question"}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          title="Edit flashcard"
          className="h-8 w-8"
          onClick={(e) => {
            e.stopPropagation();
            onEdit({
              id,
              question,
              answer,
            });
          }}
        >
          <Edit2 className="h-4 w-4 text-muted-foreground" />
        </Button>
      </CardHeader>
      <CardContent className="pb-4 relative">
        <div className="min-h-[100px] flex flex-col justify-center">
          {isFlipped ? (
            <>
              <p className="text-muted-foreground break-words overflow-hidden">
                {truncateText(answer)}
              </p>
              {isTextOverflowing(answer) && (
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 mt-2 h-auto w-fit absolute bottom-4 right-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    onShowFullContent("Answer", answer);
                  }}
                >
                  <Eye className="h-3 w-3" />
                  Show all
                </Button>
              )}
            </>
          ) : (
            <>
              <p className="break-words overflow-hidden">{truncateText(question)}</p>
              {isTextOverflowing(question) && (
                <Button
                  variant="link"
                  size="sm"
                  className="p-0 mt-2 h-auto w-fit absolute bottom-4 right-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    onShowFullContent("Question", question);
                  }}
                >
                  <Eye className="h-3 w-3" />
                  Show all
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center border-t p-3 bg-muted/30">
        <div className="text-xs text-muted-foreground">
          Click to {isFlipped ? "see question" : "reveal answer"}
        </div>
        <ArrowRight className="h-4 w-4 text-muted-foreground" />
      </CardFooter>
    </Card>
  );
};
