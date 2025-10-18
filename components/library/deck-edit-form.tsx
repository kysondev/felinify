"use client";

import { useState, useTransition } from "react";
import { Deck } from "db/types/models.types";
import { Button } from "components/ui/button";
import { Input } from "components/ui/Input";
import { Textarea } from "components/ui/text-area";
import { deleteDeckAction, updateDeckAction } from "@deck/actions/deck.action";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateDeckSchema,
  updateDeckSchema,
} from "@deck/validations/deck.schema";
import { toast } from "react-hot-toast";
import { Pencil, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { revalidateDeckPaths } from "@common/utils/revalidation.utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "components/ui/alert-dialog";

export const DeckEditForm = ({
  deck,
  userId,
}: {
  deck: Deck;
  userId: string;
}) => {
  const [isLoading, startTransition] = useTransition();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const form = useForm<UpdateDeckSchema>({
    resolver: zodResolver(updateDeckSchema),
    defaultValues: {
      name: deck.name,
      description: deck.description || "",
    },
  });

  const nameValue = form.watch("name") || "";
  const descriptionValue = form.watch("description") || "";
  const isDirty = form.formState.isDirty;

  const onSubmit = async (data: UpdateDeckSchema) => {
    startTransition(async () => {
      if (!isDirty) {
        toast.error("No changes to save");
        return;
      }
      try {
        const result = await updateDeckAction({
          id: deck.id,
          userId,
          name: data.name,
          description: data.description,
        });

        if (result.success) {
          form.reset({
            name: data.name,
            description: data.description || "",
          });
          router.refresh();
          toast.success("Deck updated successfully");
          await revalidateDeckPaths(deck.id);
        } else {
          toast.error(result.message || "Failed to update deck");
        }
      } catch (error) {
        toast.error("An error occurred while updating the deck");
        console.error(error);
      }
    });
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteDeckAction(deck.id, userId);

      if (result.success) {
        toast.success("Deck deleted successfully");
        router.refresh();
        setDeleteDialogOpen(false);
        await revalidateDeckPaths(deck.id);
      } else {
        toast.error(result.message || "Failed to delete deck");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the deck");
      console.error(error);
    } finally {
      setIsDeleting(false);
      router.push("/library");
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-900 border rounded-lg">
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Pencil className="h-5 w-5 text-primary" />
              Deck Information
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Update your deck details
            </p>
          </div>
          <Form {...form}>
            <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel className="text-sm font-medium">
                      Deck Name
                    </FormLabel>
                    <span className="text-xs text-muted-foreground">
                      {nameValue.length}/50
                    </span>
                  </div>
                  <FormControl>
                    <Input
                      placeholder="Enter a name for your deck"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  {!form.formState.errors.name && (
                    <FormDescription>
                      Choose a clear, concise name that describes the content of
                      your deck.
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between">
                    <FormLabel className="text-sm font-medium">
                      Description (Optional)
                    </FormLabel>
                    <span className="text-xs text-muted-foreground">
                      {descriptionValue.length} characters
                    </span>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Add a description for your deck"
                      rows={4}
                      className="resize-none"
                      disabled={isLoading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Provide additional context about what this deck covers.
                  </FormDescription>
                </FormItem>
              )}
            />
            </div>
            <div className="border-t pt-4 flex justify-between items-center mt-6">
              <Button
                type="submit"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isLoading || !isDirty}
                className={`${!isDirty ? "opacity-50" : ""}`}
              >
                <Save className="h-4 w-4" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => {
                  setDeleteDialogOpen(true);
                }}
                disabled={isLoading}
                className="p-3 w-fit"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <AlertDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => !isDeleting && setDeleteDialogOpen(open)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              deck.
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
    </>
  );
};
