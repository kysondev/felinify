"use client";

import { useState, useTransition } from "react";
import { Deck } from "db/types/models.types";
import { Button } from "components/ui/Button";
import { Switch } from "components/ui/Switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "components/ui/Card";
import { updateDeckAction } from "actions/deck.action";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Globe, Lock } from "lucide-react";
import { Badge } from "components/ui/Badge";

export const DeckVisibilityToggle = ({
  deck,
  userId,
}: {
  deck: Deck;
  userId: string;
}) => {
  const [isLoading, startTransition] = useTransition();
  const [isPublic, setIsPublic] = useState(deck.visibility === "public");
  const router = useRouter();

  const handleVisibilityToggle = async (checked: boolean) => {
    const newVisibility = checked ? "public" : "private";
    
    startTransition(async () => {
      try {
        const result = await updateDeckAction({
          id: deck.id,
          userId,
          visibility: newVisibility,
        });

        if (result.success) {
          setIsPublic(checked);
          router.refresh();
          toast.success(
            `Deck is now ${checked ? "public" : "private"}`
          );
          fetch(`/api/revalidate?path=/workspace/library`);
          fetch(`/api/revalidate?path=/workspace/explore`);
          fetch(`/api/revalidate?path=/workspace/deck/edit/${deck.id}`);
          fetch(`/api/revalidate?path=/workspace/explore/deck/${deck.id}`);
        } else {
          toast.error(result.message || "Failed to update deck visibility");
        }
      } catch (error) {
        toast.error("An error occurred while updating deck visibility");
        console.error(error);
      }
    });
  };

  return (
    <Card className="border-muted-foreground/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          {isPublic ? (
            <Globe className="h-5 w-5 text-primary" />
          ) : (
            <Lock className="h-5 w-5 text-primary" />
          )}
          Deck Visibility
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          Control who can see and access your deck
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {isPublic ? (
                <Eye className="h-4 w-4 text-green-500" />
              ) : (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="text-sm font-medium">
                {isPublic ? "Public" : "Private"}
              </span>
            </div>
            <Badge variant={isPublic ? "default" : "secondary"}>
              {isPublic ? "Anyone can view" : "Only you can view"}
            </Badge>
          </div>
          <Switch
            checked={isPublic}
            onCheckedChange={handleVisibilityToggle}
            disabled={isLoading}
          />
        </div>
        
        <div className="text-xs text-muted-foreground space-y-1">
          {isPublic ? (
            <p>
              • Your deck will appear in the explore section for other users
            </p>
          ) : (
            <p>
              • Your deck is only visible to you in your library
            </p>
          )}
          <p>
            • You can change this setting at any time
          </p>
        </div>
      </CardContent>
    </Card>
  );
}; 