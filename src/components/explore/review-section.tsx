"use client";

import { useState } from "react";
import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { PenTool, MessageSquare, Star, Trash2 } from "lucide-react";
import { Review } from "db/types/models.types";
import { CreateReviewDialog } from "./create-review-dialog";
import { deleteReviewAction } from "@review/actions/review.action";
import { LoginDialog } from "@components/auth/login-dialog";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { revalidateDeckPaths } from "@common/utils/revalidation.utils";

interface ReviewSectionProps {
  reviews: Review[] | undefined;
  deckId: number;
  currentUserId?: string;
  deckOwnerId: string;
}

export const ReviewSection = ({
  reviews,
  deckId,
  currentUserId,
  deckOwnerId
}: ReviewSectionProps) => {
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const router = useRouter();

  // Check if current user has already left a review
  const userHasReviewed = reviews?.some(
    (review) => review.userId === currentUserId
  );

  const isDeckOwner = deckOwnerId === currentUserId;

  const handleDeleteReview = async (reviewId: string) => {
    setIsDeleting(reviewId);
    try {
      const result = await deleteReviewAction(reviewId);
      if (result.success) {
        toast.success("Review deleted successfully");
        await revalidateDeckPaths(deckId);
        router.refresh();
      } else {
        toast.error(result.message || "Failed to delete review");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the review");
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <>
      <div className="space-y-4">
        {!userHasReviewed && !isDeckOwner && (
          <div className="flex justify-center sm:justify-end">
            <Button
              variant="outline"
              className="flex items-center gap-2 w-full sm:w-auto"
              onClick={() => {
                if (!currentUserId) {
                  setShowLoginDialog(true);
                } else {
                  setShowReviewDialog(true);
                }
              }}
            >
              <PenTool className="h-4 w-4" />
              Write a Review
            </Button>
          </div>
        )}

        {!reviews || reviews.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="p-4 sm:p-6 lg:p-8 text-center flex flex-col items-center">
              <div className="relative inline-block mb-4">
                <div className="p-3 sm:p-4 bg-muted/50 rounded-full">
                  <MessageSquare className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-muted-foreground/50" />
                </div>
                <div className="absolute -top-1 -right-1 p-1 sm:p-1.5 bg-primary/10 rounded-full">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                </div>
              </div>

              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                No reviews yet
              </h3>

              <p className="text-muted-foreground text-xs sm:text-sm max-w-md leading-relaxed mb-4 sm:mb-6 px-4 sm:px-0">
                This deck hasn't received any reviews yet. Be the first to share
                your experience and help other learners discover great content!
              </p>

              <div className="mt-4 sm:mt-6 lg:mt-8 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 lg:gap-8 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3 w-3 text-muted-foreground/30"
                      />
                    ))}
                  </div>
                  <span>Rate this deck</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <span>Share your thoughts</span>
                <span className="hidden sm:inline">•</span>
                <span>Help others learn</span>
              </div>
            </CardContent>
          </Card>
        ) : (
          reviews?.map((review: Review) => (
            <Card key={review.id}>
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
                      <AvatarImage src={review?.user?.image || ""} />
                      <AvatarFallback>
                        {review?.user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm sm:text-base">{review?.user?.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-2">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 sm:h-4 sm:w-4 ${
                              i < review.rating
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {currentUserId && review.userId === currentUserId && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteReview(review.id)}
                        disabled={isDeleting === review.id}
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                {review.description && (
                  <p className="mt-2 text-xs sm:text-sm">{review.description}</p>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <CreateReviewDialog
        open={showReviewDialog}
        onOpenChange={setShowReviewDialog}
        deckId={deckId}
      />
      
      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        title="Sign in to write a review"
        description="You need to be signed in to write reviews and help other learners."
      />
    </>
  );
};
