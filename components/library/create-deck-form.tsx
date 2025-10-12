"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createDeckAction } from "@deck/actions/deck.action";
import { hasEnoughEnergy } from "@user/actions/user.action";
import { Alert, AlertTitle } from "components/ui/alert";
import { Button } from "components/ui/button";
import { DialogFooter, useDialog } from "components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import { Input } from "components/ui/Input";
import { Progress } from "components/ui/progress";
import { Switch } from "components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { Textarea } from "components/ui/text-area";
import { Deck, Subscription, User } from "db/types/models.types";
import { hasReachedMaxDeck } from "@subscription/utils/limits";
import {
  CreateDeckSchema,
  createDeckSchema,
  createDeckWithAISchema,
  CreateDeckWithAISchema,
} from "@deck/validations/deck.schema";
import { Brain, Eye, EyeOff, Sparkles, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loading } from "../ui/loading";
import {
  addGeneratedFlashcardsToDeckAction,
  generateFlashcardsAction,
} from "@ai/actions/generate-cards.action";
import { revalidateLibrary } from "@common/utils/revalidation.utils";

export function CreateDeckForm({
  user,
  subscription,
  decks,
  onSuccess,
}: {
  user: User;
  subscription: Subscription;
  decks: Deck[];
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const { setOpen } = useDialog();

  const userSubscription =
    subscription !== undefined
      ? subscription.plan.replace(/-yearly/g, "")
      : "starter";

  const form = useForm<CreateDeckSchema>({
    resolver: zodResolver(createDeckSchema),
    defaultValues: {
      name: "",
      description: "",
      visibility: "public",
    },
  });

  const aiForm = useForm<CreateDeckWithAISchema>({
    resolver: zodResolver(createDeckWithAISchema),
    defaultValues: {
      name: "",
      notes: "",
      visibility: "public",
    },
  });

  const onSubmit = async (data: CreateDeckSchema) => {
    startTransition(async () => {
      const result = await createDeckAction(
        user.id,
        data.name,
        data.description,
        data.visibility
      );
      if (result.success) {
        revalidateLibrary();
        setOpen(false);
        router.refresh();
        toast.success("Deck created successfully");
        form.reset();
        if (onSuccess) onSuccess();
      } else {
        toast.error(result.message || "Something went wrong");
      }
    });
  };

  const onGenerateFlashcards = async (data: CreateDeckWithAISchema) => {
    setIsGenerating(true);
    setProgress(10);
    const result = await hasEnoughEnergy(user.id, 1);
    if (!result.success) {
      toast.error("You don't have enough energy to generate flashcards");
      setIsGenerating(false);
      return;
    }

    try {
      setProgress(30);
      const deckResult = await createDeckAction(
        user.id,
        data.name,
        "AI generated deck",
        data.visibility
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
        data.notes,
        data.visibility
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
      revalidateLibrary();
      setTimeout(() => {
        setIsGenerating(false);
        setOpen(false);
        toast.success(`Deck created with ${addResult.addedCount} flashcards`);
        aiForm.reset();
        router.push(`/decks/${deckId}`);
        router.refresh();
        if (onSuccess) onSuccess();
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
      <Alert
        variant="destructive"
        className={`mb-2 ${
          hasReachedMaxDeck(
            userSubscription as "starter" | "pro" | "ultra",
            decks
          )
            ? ""
            : "hidden"
        }`}
      >
        <AlertTitle>
          Warning: You have reached your maximum number of decks
        </AlertTitle>
      </Alert>
      <TabsList className="grid w-full grid-cols-2 mb-3">
        <TabsTrigger value="manual" className="flex items-center gap-2 text-sm">
          Manual Creation
        </TabsTrigger>
        <TabsTrigger value="ai" className="flex items-center gap-2 text-sm">
          <Sparkles className="h-4 w-4" />
          AI Generation
        </TabsTrigger>
      </TabsList>

      <TabsContent value="manual" className="space-y-3 py-1">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                      className="min-h-[80px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="visibility"
              disabled={!user.emailVerified}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deck Visibility</FormLabel>
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-white">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        {field.value === "public" ? (
                          <Eye className="h-4 w-4 text-green-500" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="text-sm font-medium">
                          {field.value === "public" ? "Public" : "Private"}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {field.value === "public"
                          ? "Anyone can view"
                          : "Only you can view"}
                      </span>
                    </div>
                    <Switch
                      checked={field.value === "public"}
                      onCheckedChange={(checked) =>
                        field.onChange(checked ? "public" : "private")
                      }
                      disabled={!user.emailVerified}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button
                type="submit"
                disabled={
                  isPending ||
                  !user.emailVerified ||
                  hasReachedMaxDeck(
                    userSubscription as "starter" | "pro" | "ultra",
                    decks
                  )
                }
              >
                {isPending ? <Loading isWhite /> : "Create Deck"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </TabsContent>

      <TabsContent value="ai" className="space-y-3 py-1">
        <div className="bg-secondary/50 rounded-lg p-3 border border-border">
          <h3 className="text-base font-medium flex items-center gap-2 mb-2">
            <Brain className="h-4 w-4 text-primary" />
            AI Flashcard Generation
            <span className="text-xs text-muted-foreground">(1 energy)</span>
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
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
              className="space-y-3"
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
                        className="min-h-[80px] text-sm resize-none"
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
                name="visibility"
                disabled={!user.emailVerified}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deck Visibility</FormLabel>
                    <div className="flex items-center justify-between p-3 border rounded-lg bg-white">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          {field.value === "public" ? (
                            <Eye className="h-4 w-4 text-green-500" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className="text-sm font-medium">
                            {field.value === "public" ? "Public" : "Private"}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {field.value === "public"
                            ? "Anyone can view"
                            : "Only you can view"}
                        </span>
                      </div>
                      <Switch
                        checked={field.value === "public"}
                        onCheckedChange={(checked) =>
                          field.onChange(checked ? "public" : "private")
                        }
                        disabled={!user.emailVerified || isGenerating}
                      />
                    </div>
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
                  disabled={
                    isGenerating ||
                    !user.emailVerified ||
                    hasReachedMaxDeck(
                      userSubscription as "starter" | "pro" | "ultra",
                      decks
                    )
                  }
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
                  disabled={
                    isGenerating ||
                    !user.emailVerified ||
                    hasReachedMaxDeck(
                      userSubscription as "starter" | "pro" | "ultra",
                      decks
                    )
                  }
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
