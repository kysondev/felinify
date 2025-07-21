"use client";

import { Button } from "components/ui/Button";
import { DialogFooter, useDialog } from "components/ui/Dialog";
import { Input } from "components/ui/Input";
import { Textarea } from "components/ui/Textarea";
import { Sparkles, Brain, Upload } from "lucide-react";
import { useTransition } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/Tabs";
import { useRouter } from "next/navigation";
import { Loading } from "../ui/Loading";
import { createDeckAction } from "actions/deck.action";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/Form";
import {
  CreateDeckSchema,
  createDeckSchema,
  createDeckWithAISchema,
  CreateDeckWithAISchema,
} from "lib/validations/deck.schema";
import {
  generateFlashcardsAction,
  addGeneratedFlashcardsToDeckAction,
} from "actions/ai-study.actions";
import { useState } from "react";
import { Progress } from "components/ui/Progress";
import { Alert, AlertDescription, AlertTitle } from "components/ui/Alert";
import { User } from "db/types/models.types";

export function CreateDeckForm({ user }: { user: User }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const { setOpen } = useDialog();

  const form = useForm<CreateDeckSchema>({
    resolver: zodResolver(createDeckSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const aiForm = useForm<CreateDeckWithAISchema>({
    resolver: zodResolver(createDeckWithAISchema),
    defaultValues: {
      name: "",
      notes: "",
    },
  });

  const onSubmit = async (data: CreateDeckSchema) => {
    startTransition(async () => {
      const result = await createDeckAction(
        user.id,
        data.name,
        data.description
      );
      if (result.success) {
        setOpen(false);
        router.refresh();
        toast.success("Deck created successfully");
        form.reset();
      } else {
        toast.error(result.message || "Something went wrong");
      }
    });
  };

  const onGenerateFlashcards = async (data: CreateDeckWithAISchema) => {
    setIsGenerating(true);
    setProgress(10);

    try {
      setProgress(30);
      const deckResult = await createDeckAction(
        user.id,
        data.name,
        "AI generated deck"
      );

      if (!deckResult.success) {
        toast.error(deckResult.message || "Failed to create deck");
        setIsGenerating(false);
        return;
      }

      const deckId = deckResult.data?.id;
      if (!deckId) {
        toast.error("Failed to get deck ID");
        setIsGenerating(false);
        return;
      }

      setProgress(50);

      const flashcardsResult = await generateFlashcardsAction(
        data.name,
        data.notes
      );
      setProgress(70);

      if (!flashcardsResult.success) {
        toast.error(
          flashcardsResult.message || "Failed to generate flashcards"
        );
        setIsGenerating(false);
        return;
      }

      setProgress(85);
      const addResult = await addGeneratedFlashcardsToDeckAction(
        user.id,
        deckId,
        flashcardsResult.flashcards
      );

      setProgress(100);

      if (!addResult.success) {
        toast.error(addResult.message || "Failed to add flashcards to deck");
        setIsGenerating(false);
        return;
      }

      setTimeout(() => {
        setIsGenerating(false);
        setOpen(false);
        router.refresh();
        toast.success(`Deck created with ${addResult.addedCount} flashcards`);
        aiForm.reset();
        router.push(`/workspace/deck/${deckId}`);
      }, 500);
    } catch (error) {
      console.error("Error in AI flashcard generation:", error);
      toast.error("Something went wrong during flashcard generation");
      setIsGenerating(false);
    }
  };

  return (
    <Tabs defaultValue="manual" className="w-full">
      <Alert
        variant="destructive"
        className={`mb-2 ${user.emailVerified ? "hidden" : ""}`}
      >
        <AlertTitle>
          Warning: Email verification is required to create a deck
        </AlertTitle>
      </Alert>
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="manual" className="flex items-center gap-2">
          Manual Creation
        </TabsTrigger>
        <TabsTrigger value="ai" className="flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          AI Generation
        </TabsTrigger>
      </TabsList>

      <TabsContent value="manual" className="space-y-4 py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              disabled={!user.emailVerified}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deck Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter deck name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              disabled={!user.emailVerified}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a description for your deck..."
                      className="min-h-[100px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="submit" disabled={isPending || !user.emailVerified}>
                {isPending ? <Loading isWhite /> : "Create Deck"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="ai" className="space-y-4 py-2">
        <div className="bg-secondary/50 rounded-lg p-4 border border-border">
          <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
            <Brain className="h-5 w-5 text-primary" />
            AI Flashcard Generation
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Paste your study notes or upload a document, and our AI will
            automatically create a deck with flashcards for you.
          </p>

          {isGenerating && (
            <div className="mb-4">
              <Progress value={progress} />
              <p className="text-xs text-muted-foreground mt-1 text-center">
                {progress < 30 && "Preparing..."}
                {progress >= 30 && progress < 50 && "Creating deck..."}
                {progress >= 50 && progress < 70 && "Generating flashcards..."}
                {progress >= 70 && progress < 85 && "Processing flashcards..."}
                {progress >= 85 && "Adding flashcards to deck..."}
              </p>
            </div>
          )}

          <Form {...aiForm}>
            <form
              onSubmit={aiForm.handleSubmit(onGenerateFlashcards)}
              className="space-y-4"
            >
              <FormField
                control={aiForm.control}
                name="name"
                disabled={!user.emailVerified}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deck Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter deck name"
                        className="bg-white"
                        disabled={isGenerating}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={aiForm.control}
                name="notes"
                disabled={!user.emailVerified}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Study Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your study notes here..."
                        className="min-h-[100px] text-sm resize-none"
                        disabled={isGenerating}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <span className="text-xs text-muted-foreground">
                Note: AI can make mistakes, so please check the flashcards
                before using them.
              </span>
              <div className="flex items-center justify-between pt-2">
                <Button
                  variant="outline"
                  type="button"
                  className="flex items-center gap-2 sm:hidden"
                  disabled={isGenerating || !user.emailVerified}
                >
                  <Upload className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="hidden items-center gap-2 sm:flex"
                  disabled={isGenerating || !user.emailVerified}
                >
                  <Upload className="h-4 w-4" />
                  Upload Document
                </Button>

                <Button
                  type="submit"
                  className="flex items-center gap-2 sm:hidden"
                  disabled={isGenerating || !user.emailVerified}
                >
                  {isGenerating ? (
                    <Loading isWhite />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {isGenerating ? "" : "Generate"}
                </Button>
                <Button
                  type="submit"
                  className="hidden items-center gap-2 sm:flex"
                  disabled={isGenerating || !user.emailVerified}
                >
                  {isGenerating ? (
                    <Loading isWhite />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {isGenerating ? "Generating..." : "Generate Flashcards"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </TabsContent>
    </Tabs>
  );
}
