"use client";

import { useState } from "react";
import { Deck } from "db/types/models.types";
import { Button } from "components/ui/Button";
import { Card, CardContent } from "components/ui/Card";
import {
  addFlashcardAction,
  deleteFlashcardAction,
  updateFlashcardAction,
} from "actions/deck.action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlashcardSchema, flashcardSchema } from "lib/validations/deck.schema";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "components/ui/Dialog";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Eye,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "components/ui/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/Form";
import { Textarea } from "components/ui/Textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "components/ui/Alert-dialog";
import { Flashcard } from "./Flashcard";

export const FlashcardList = ({
  deck,
  userId,
}: {
  deck: Deck;
  userId: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isFullViewDialogOpen, setIsFullViewDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [flashcardToDelete, setFlashcardToDelete] = useState<string | null>(
    null
  );
  const [currentFlashcard, setCurrentFlashcard] = useState<{
    id: string;
    question: string;
    answer: string;
  } | null>(null);
  const [fullViewContent, setFullViewContent] = useState<{
    title: string;
    content: string;
  } | null>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 6;

  const router = useRouter();

  const addForm = useForm<FlashcardSchema>({
    resolver: zodResolver(flashcardSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const editForm = useForm<FlashcardSchema>({
    resolver: zodResolver(flashcardSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const onSubmitAdd = async (data: FlashcardSchema) => {
    setIsLoading(true);
    try {
      const result = await addFlashcardAction(
        deck.id,
        userId,
        data.question,
        data.answer
      );
      fetch(`/api/revalidate?path=/workspace/library`);
      fetch(`/api/revalidate?path=/workspace/explore`);
      fetch(`/api/revalidate?path=/workspace/deck/${deck.id}`);
      fetch(`/api/revalidate?path=/workspace/explore/deck/${deck.id}`);

      if (result.success) {
        toast.success("Flashcard added successfully");
        addForm.reset();
        setIsAddDialogOpen(false);
        router.refresh();
      } else {
        toast.error(result.message || "Failed to add flashcard");
      }
    } catch (error) {
      toast.error("An error occurred while adding the flashcard");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitEdit = async (data: FlashcardSchema) => {
    if (!currentFlashcard) return;

    setIsLoading(true);
    try {
      const updateResult = await updateFlashcardAction(
        currentFlashcard.id,
        data
      );

      if (updateResult.success) {
        toast.success("Flashcard updated successfully");
        editForm.reset();
        setIsEditDialogOpen(false);
        setCurrentFlashcard(null);
        fetch(`/api/revalidate?path=/workspace/library`);
        fetch(`/api/revalidate?path=/workspace/explore`);
        fetch(`/api/revalidate?path=/workspace/deck/${deck.id}`);
        fetch(`/api/revalidate?path=/workspace/explore/deck/${deck.id}`);
        router.refresh();
      } else {
        toast.error(updateResult.message || "Failed to update flashcard");
      }
    } catch (error) {
      toast.error("An error occurred while updating the flashcard");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = (flashcardId: string) => {
    setFlashcardToDelete(flashcardId);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!flashcardToDelete) return;

    setIsDeleting(true);
    try {
      const result = await deleteFlashcardAction(flashcardToDelete, userId);

      if (result.success) {
        toast.success("Flashcard deleted successfully");
        fetch(`/api/revalidate?path=/workspace/library`);
        fetch(`/api/revalidate?path=/workspace/explore`);
        fetch(`/api/revalidate?path=/workspace/deck/${deck.id}`);
        fetch(`/api/revalidate?path=/workspace/explore/deck/${deck.id}`);
        router.refresh();
        setDeleteDialogOpen(false);
        setFlashcardToDelete(null);
      } else {
        toast.error(result.message || "Failed to delete flashcard");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the flashcard");
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (flashcard: {
    id: string;
    question: string;
    answer: string;
  }) => {
    setCurrentFlashcard(flashcard);
    editForm.reset({
      question: flashcard.question,
      answer: flashcard.answer,
    });
    setIsEditDialogOpen(true);
  };

  const showFullContent = (title: string, content: string) => {
    setFullViewContent({ title, content });
    setIsFullViewDialogOpen(true);
  };

  const filteredFlashcards = deck.flashcards?.filter(
    (card) =>
      card.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalFilteredCards = filteredFlashcards?.length || 0;
  const totalPages = Math.ceil(totalFilteredCards / cardsPerPage);

  const currentCards = filteredFlashcards?.slice(
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold">Manage Flashcards</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="shrink-0">
              <Plus className="h-4 w-4 mr-1" />
              Add Flashcard
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Add New Flashcard</DialogTitle>
            </DialogHeader>
            <Form {...addForm}>
              <div className="space-y-6 pt-4">
                <FormField
                  control={addForm.control}
                  name="question"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter the question"
                          className="resize-none"
                          rows={3}
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={addForm.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Answer</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter the answer"
                          className="resize-none"
                          rows={3}
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={addForm.handleSubmit(onSubmitAdd)}
                  disabled={isLoading}
                >
                  {isLoading ? "Adding..." : "Add Flashcard"}
                </Button>
              </DialogFooter>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search flashcards..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(0);
          }}
        />
      </div>

      {deck.flashcards && deck.flashcards.length > 0 ? (
        <>
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <p>
              {searchTerm
                ? `${totalFilteredCards} results`
                : `${deck.flashcards.length} total flashcards`}
            </p>
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setCurrentPage(0);
                }}
                className="p-0 m-0 h-4 hover:bg-transparent"
              >
                Clear search
              </Button>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {currentCards?.map((flashcard) => (
              <Flashcard
                key={flashcard.id.toString()}
                id={flashcard.id.toString()}
                question={flashcard.question}
                answer={flashcard.answer}
                onEdit={handleEdit}
                onShowFullContent={showFullContent}
                isPreview={true}
              />
            ))}
          </div>
          {totalFilteredCards > cardsPerPage && (
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
        </>
      ) : (
        <Card className="border-dashed">
          <CardContent className="py-12 flex flex-col items-center justify-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-medium mb-1">No flashcards yet</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Add your first flashcard to start building your deck and begin
              studying.
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add First Flashcard
            </Button>
          </CardContent>
        </Card>
      )}

      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => !isDeleting && setDeleteDialogOpen(open)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              flashcard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-2">
              <Edit2 className="h-5 w-5 text-primary" />
              Edit Flashcard
            </DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <div className="space-y-6 pt-4">
              <FormField
                control={editForm.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Question
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the question"
                        className="resize-none"
                        rows={3}
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Answer
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter the answer"
                        className="resize-none"
                        rows={3}
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-6 flex flex-row justify-between pt-4 border-t">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => {
                  if (currentFlashcard) {
                    confirmDelete(currentFlashcard.id);
                    setIsEditDialogOpen(false);
                  }
                }}
                disabled={isLoading}
                className="p-3 mr-auto w-fit"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <div className="flex gap-2 w-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  disabled={isLoading}
                  className="flex-1 sm:flex-none"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={editForm.handleSubmit(onSubmitEdit)}
                  disabled={isLoading}
                  className="flex-1 sm:flex-none"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </DialogFooter>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isFullViewDialogOpen}
        onOpenChange={setIsFullViewDialogOpen}
      >
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              {fullViewContent?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="pt-4 max-h-[60vh] overflow-y-auto">
            <p className="whitespace-pre-wrap break-words">
              {fullViewContent?.content}
            </p>
          </div>
          <DialogFooter className="mt-6 pt-4 border-t">
            <Button
              type="button"
              onClick={() => setIsFullViewDialogOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
