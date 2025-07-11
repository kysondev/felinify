import { Button } from "components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/Card";
import { Deck } from "db/types/models.types";
import { BookOpen, Clock } from "lucide-react";
import Link from "next/link";

export const DeckCard = ({ deck }: { deck: Deck }) => {
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
        <Button size="sm">Study Now</Button>
      </CardFooter>
    </Card>
  );
};
