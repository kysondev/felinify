"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createDeckAction } from "@deck/actions/deck.action";
import { hasEnoughEnergy } from "@user/actions/user.action";
import { Alert, AlertTitle } from "@ui/alert";
import { Button } from "@ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/form";
import { Input } from "@ui/Input";
import { Switch } from "@ui/switch";
import { Textarea } from "@ui/text-area";
import { Deck, Subscription, User } from "db/types/models.types";
import { hasReachedMaxDeck } from "@subscription/utils/limits";
import {
  CreateDeckSchema,
  createDeckSchema,
  createDeckWithAISchema,
  CreateDeckWithAISchema,
} from "@deck/validations/deck.schema";
import {
  Eye,
  EyeOff,
  PenSquare,
  Sparkles,
  SparklesIcon,
  Upload,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loading } from "../ui/loading";
import { AIGenerationCard } from "../ui/ai-generation-card";
import {
  addGeneratedFlashcardsToDeckAction,
  generateFlashcardsAction,
} from "@ai/actions/generate-cards.action";
import { revalidateLibrary } from "@common/utils/revalidation.utils";
import { cn } from "src/lib/cn";

export function CreateDeckForm({
  user,
  subscription,
  decks,
  onSuccess,
  onClose,
}: {
  user: User;
  subscription: Subscription;
  decks: Deck[];
  onSuccess?: () => void;
  onClose?: () => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generationStatus, setGenerationStatus] = useState(
    "Analyzing your content..."
  );
  const [estimatedTime, setEstimatedTime] = useState("30 seconds");
  const [mode, setMode] = useState<"manual" | "ai">("manual");

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
        onClose?.();
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
    setGenerationStatus("Checking energy levels...");
    setEstimatedTime("45 seconds");

    const result = await hasEnoughEnergy(user.id, 1);
    if (!result.success) {
      toast.error("You don't have enough energy to generate flashcards.");
      setIsGenerating(false);
      return;
    }

    try {
      setProgress(25);
      setGenerationStatus("Creating your deck...");
      setEstimatedTime("35 seconds");

      const deckResult = await createDeckAction(
        user.id,
        data.name,
        "AI generated deck",
        data.visibility
      );
      if (!deckResult.success || !deckResult.data?.id) {
        toast.error(deckResult.message || "Failed to create deck.");
        return;
      }

      setProgress(55);
      setGenerationStatus("Generating flashcards...");
      setEstimatedTime("25 seconds");

      const generationResult = await generateFlashcardsAction(
        data.name,
        data.notes,
        data.visibility
      );

      if (!generationResult.success || !generationResult.flashcards?.length) {
        toast.error(
          generationResult.message || "Failed to generate flashcards."
        );
        return;
      }

      setProgress(80);
      setGenerationStatus("Saving flashcards to your deck...");
      setEstimatedTime("10 seconds");

      const addResult = await addGeneratedFlashcardsToDeckAction(
        user.id,
        deckResult.data.id,
        generationResult.flashcards
      );

      if (!addResult.success) {
        toast.error(addResult.message || "Failed to add flashcards to deck.");
        return;
      }

      setProgress(100);
      setGenerationStatus("Deck ready!");
      setEstimatedTime("Done");

      revalidateLibrary();
      onClose?.();
      router.refresh();
      toast.success("Deck generated successfully");
      aiForm.reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error generating flashcards:", error);
      toast.error("An error occurred while generating flashcards.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
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
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setMode("manual")}
          className={cn(
            "group flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all",
            "hover:border-primary/60 hover:shadow-sm",
            mode === "manual"
              ? "border-primary bg-primary/5 shadow-sm"
              : "border-border bg-white"
          )}
          aria-pressed={mode === "manual"}
        >
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
              mode === "manual"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground"
            )}
          >
            <PenSquare className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold">Manual build</p>
            <p className="text-xs text-muted-foreground">
              Write your own deck details and control visibility.
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setMode("ai")}
          className={cn(
            "group flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-all",
            "hover:border-primary/60 hover:shadow-sm",
            mode === "ai"
              ? "border-primary bg-primary/5 shadow-sm"
              : "border-border bg-white"
          )}
          aria-pressed={mode === "ai"}
        >
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
              mode === "ai"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground"
            )}
          >
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold">AI assist</p>
            <p className="text-xs text-muted-foreground">
              Paste notes and let AI generate flashcards (1 energy).
            </p>
          </div>
        </button>
      </div>

      <div className="space-y-8">
        {mode === "manual" && (
          <div className="space-y-5">
            <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b px-5 py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <PenSquare className="h-4 w-4 text-primary" />
                    Manual deck builder
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Add details and control visibility before you publish.
                  </p>
                </div>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-5 px-5 py-5"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    disabled={!user.emailVerified}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deck Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter deck name"
                            className="bg-white"
                            {...field}
                          />
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
                            className="min-h-[140px] resize-none rounded-xl text-sm"
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
                        <div className="flex items-center justify-between rounded-lg border bg-white p-3">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                              {field.value === "public" ? (
                                <Eye className="h-4 w-4 text-green-500" />
                              ) : (
                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className="text-sm font-medium">
                                {field.value === "public"
                                  ? "Public"
                                  : "Private"}
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

                  <div className="flex justify-end">
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
                  </div>
                </form>
              </Form>
            </div>
          </div>
        )}

        {mode === "ai" && (
          <div className="space-y-5">
            <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b px-5 py-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <SparklesIcon className="h-4 w-4 text-primary" />
                    AI deck builder
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Paste notes and we create the deck plus flashcards
                    automatically.
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-white px-3 py-1.5 text-xs font-semibold text-primary">
                  <Zap className="h-4 w-4" />1 Energy
                </div>
              </div>

              <Form {...aiForm}>
                <form
                  onSubmit={aiForm.handleSubmit(onGenerateFlashcards)}
                  className="space-y-5 px-5 py-5"
                >
                  <div className="grid gap-3 md:grid-cols-2">
                    <FormField
                      control={aiForm.control}
                      name="name"
                      disabled={!user.emailVerified}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="flex items-center justify-between">
                            <span>Deck name</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Exam cram: Cognitive Psychology"
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
                      name="visibility"
                      disabled={!user.emailVerified}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Visibility</FormLabel>
                          <div className="flex items-center justify-between rounded-lg border bg-white p-3">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-2">
                                {field.value === "public" ? (
                                  <Eye className="h-4 w-4 text-green-500" />
                                ) : (
                                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                                )}
                                <span className="text-sm font-medium">
                                  {field.value === "public"
                                    ? "Public"
                                    : "Private"}
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
                  </div>

                  <FormField
                    control={aiForm.control}
                    name="notes"
                    disabled={!user.emailVerified}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center justify-between">
                          <span>Source notes</span>
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste lecture notes, bullet points, or a mini outline. The clearer the structure, the sharper the cards."
                            className="min-h-[220px] resize-none rounded-xl text-sm"
                            disabled={isGenerating}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        type="button"
                        className="flex items-center gap-2"
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
                        Upload notes
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
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
                  </div>
                </form>
              </Form>
            </div>

            {isGenerating && (
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-3 shadow-sm">
                <AIGenerationCard
                  progress={progress}
                  status={generationStatus}
                  estimatedTime={estimatedTime}
                  isActive={isGenerating}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
