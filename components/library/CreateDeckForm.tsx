"use client";

import { Button } from "components/ui/Button";
import { DialogFooter, useDialog } from "components/ui/Dialog";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
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
import { CreateDeckSchema, createDeckSchema } from "lib/validations/deck.schema";

export function CreateDeckForm({ userId }: { userId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { setOpen } = useDialog();

  const form = useForm<CreateDeckSchema>({
    resolver: zodResolver(createDeckSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: CreateDeckSchema) => {
    startTransition(async () => {
      const result = await createDeckAction(userId, data.name, data.description);
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

  return (
    <Tabs defaultValue="manual" className="w-full">
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deck Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter deck name" 
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
              <Button type="submit" disabled={isPending}>
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

          <div className="space-y-4">
            <div>
              <Label htmlFor="deck-name-ai">Deck Name</Label>
              <Input
                id="deck-name-ai"
                placeholder="Enter deck name"
                className="mt-1 bg-white"
                disabled
              />
            </div>

            <div>
              <Label htmlFor="notes" className="mb-1 block">
                Study Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Paste your study notes here..."
                className="min-h-[200px] text-sm resize-none"
                disabled
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                type="button"
                className="flex items-center gap-2 sm:hidden"
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                type="button"
                className="hidden items-center gap-2 sm:flex"
              >
                <Upload className="h-4 w-4" />
                Upload Document
              </Button>

              <Button
                type="button"
                className="flex items-center gap-2 sm:hidden"
              >
                <Sparkles className="h-4 w-4" />
                Generate
              </Button>
              <Button
                type="button"
                className="hidden items-center gap-2 sm:flex"
              >
                <Sparkles className="h-4 w-4" />
                Generate Flashcards
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}