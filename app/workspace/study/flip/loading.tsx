export default function Loading() {
  return (
    <div className="container max-w-3xl mx-auto py-8 px-4 mt-16">
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-muted-foreground">Loading flashcards...</p>
      </div>
    </div>
  );
}
