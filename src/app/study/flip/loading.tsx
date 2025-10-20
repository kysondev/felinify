import { StudyLoadingScreen } from "@components/study";

export default function Loading() {
  return (
    <StudyLoadingScreen
      title="Preparing Your Study Session"
      message="Loading your flashcards..."
      progress={0}
      isSaving={false}
    />
  );
}
