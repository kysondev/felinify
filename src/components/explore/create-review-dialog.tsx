"use client";

import { useState, useTransition } from "react";
import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@ui/dialog";
import { Textarea } from "@ui/text-area";
import { Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { createReviewAction } from "@review/actions/review.action";
import {
  CreateReviewSchema,
  createReviewSchema,
} from "@review/validations/review.schema";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { revalidateDeckPaths } from "@common/utils/revalidation.utils";

interface CreateReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deckId: number;
}

export const CreateReviewDialog = ({
  open,
  onOpenChange,
  deckId,
}: CreateReviewDialogProps) => {
  const [isLoading, startTransition] = useTransition();
  const [hoveredRating, setHoveredRating] = useState(0);

  // Reset form when dialog opens
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      form.reset();
    }
    onOpenChange(newOpen);
  };
  const router = useRouter();

  const form = useForm<CreateReviewSchema>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      rating: 0,
      description: "",
    },
  });

  const watchedRating = form.watch("rating");

  const onSubmit = async (data: CreateReviewSchema) => {
    if (data.rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    startTransition(async () => {
      try {
        const result = await createReviewAction(
          deckId,
          data.rating,
          data.description || null
        );

        if (result.success) {
          toast.success("Review submitted successfully");
          form.reset();
          onOpenChange(false);
          await revalidateDeckPaths(deckId);
          router.refresh();
        } else {
          toast.error(result.message || "Failed to submit review");
        }
      } catch (error) {
        toast.error("An error occurred while submitting the review");
        console.error(error);
      }
    });
  };

  const handleStarClick = (rating: number) => {
    form.setValue("rating", rating);
  };

  const handleStarHover = (rating: number) => {
    setHoveredRating(rating);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isFilled =
                          star <= (hoveredRating || watchedRating);
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleStarClick(star)}
                            onMouseEnter={() => handleStarHover(star)}
                            onMouseLeave={handleStarLeave}
                            className="transition-colors hover:scale-110"
                          >
                            <Star
                              className={`h-8 w-8 ${
                                isFilled
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your thoughts about this deck..."
                      className="min-h-[120px] resize-none"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading || watchedRating === 0}>
                {isLoading ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
