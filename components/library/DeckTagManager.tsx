"use client";

import { useState, useTransition } from "react";
import { Tag } from "db/types/models.types";
import { Button } from "components/ui/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "components/ui/Card";
import { addTagToDeckAction, removeTagFromDeckAction } from "@deck/actions/deck.action";
import { toast } from "react-hot-toast";
import { Tag as TagIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { PREDEFINED_TAGS } from "@explore/config/tags.config";

interface DeckTagManagerProps {
  deckId: string;
  userId: string;
  tags?: Tag[];
}

export const DeckTagManager = ({
  deckId,
  userId,
  tags = [],
}: DeckTagManagerProps) => {
  const [isLoading, startTransition] = useTransition();
  const [currentTags, setCurrentTags] = useState<Tag[]>(tags);
  const router = useRouter();

  const handleTagToggle = async (tagName: string) => {
    const existingTag = currentTags.find(tag => tag.name.toLowerCase() === tagName.toLowerCase());
    
    startTransition(async () => {
      try {
        if (existingTag) {
          const result = await removeTagFromDeckAction(existingTag.id, deckId, userId);
          if (result.success) {
            setCurrentTags([]);
            router.refresh();
            toast.success("Tag removed successfully");
            fetch(`/api/revalidate?path=/workspace/deck/edit/${deckId}`);
            fetch(`/api/revalidate?path=/workspace/explore`);
          } else {
            toast.error(result.message || "Failed to remove tag");
          }
        } else {
          if (currentTags.length > 0) {
            const removeResult = await removeTagFromDeckAction(currentTags[0].id, deckId, userId);
            if (!removeResult.success) {
              toast.error("Failed to remove existing tag");
              return;
            }
          }

          const result = await addTagToDeckAction(deckId, tagName, userId);
          if (result.success) {
            setCurrentTags([result.data as Tag]);
            router.refresh();
            toast.success("Tag added successfully");
            fetch(`/api/revalidate?path=/workspace/deck/edit/${deckId}`);
            fetch(`/api/revalidate?path=/workspace/explore`);
          } else {
            toast.error(result.message || "Failed to add tag");
          }
        }
      } catch (error) {
        toast.error("An error occurred while updating the tag");
        console.error(error);
      }
    });
  };

  const isTagSelected = (tagName: string) => {
    return currentTags.some(tag => tag.name.toLowerCase() === tagName.toLowerCase());
  };

  return (
    <Card className="border-muted-foreground/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <TagIcon className="h-5 w-5 text-primary" />
          Tag
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Select a category tag for your deck
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">Available tags:</p>
          <div className="flex flex-wrap gap-2">
            {PREDEFINED_TAGS.map((tag) => {
              const selected = isTagSelected(tag);
              return (
                <Button
                  key={tag}
                  variant={selected ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleTagToggle(tag)}
                  disabled={isLoading}
                  className={`text-xs h-8 px-3 ${
                    selected 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "hover:bg-muted"
                  }`}
                >
                  {tag}
                </Button>
              );
            })}
          </div>
        </div>

        {currentTags.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No tag selected. Choose a tag to categorize your deck.
          </p>
        )}
      </CardContent>
    </Card>
  );
}; 