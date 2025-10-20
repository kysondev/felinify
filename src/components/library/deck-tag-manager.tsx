"use client";

import { useState, useTransition } from "react";
import { Tag } from "db/types/models.types";
import { Button } from "@ui/button";
import { toast } from "react-hot-toast";
import { Tag as TagIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { PREDEFINED_TAGS } from "@explore/config/tags.config";
import {
  addTagToDeckAction,
  removeTagFromDeckAction,
} from "@deck/actions/tags.action";
import { revalidateDeckPaths } from "@common/utils/revalidation.utils";

interface DeckTagManagerProps {
  deckId: number;
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
    const existingTag = currentTags.find(
      (tag) => tag.name.toLowerCase() === tagName.toLowerCase()
    );

    startTransition(async () => {
      try {
        if (existingTag) {
          const result = await removeTagFromDeckAction(
            existingTag.id,
            deckId,
            userId
          );
          if (result.success) {
            setCurrentTags([]);
            router.refresh();
            toast.success("Tag removed successfully");
            await revalidateDeckPaths(deckId);
          } else {
            toast.error(result.message || "Failed to remove tag");
          }
        } else {
          if (currentTags.length > 0) {
            const removeResult = await removeTagFromDeckAction(
              currentTags[0].id,
              deckId,
              userId
            );
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
            await revalidateDeckPaths(deckId);
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
    return currentTags.some(
      (tag) => tag.name.toLowerCase() === tagName.toLowerCase()
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900 border rounded-lg">
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <TagIcon className="h-5 w-5 text-primary" />
            Tags
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Select a category tag for your deck
          </p>
        </div>
        <div className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">
            Available tags:
          </p>
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
        </div>
      </div>
    </div>
  );
};
