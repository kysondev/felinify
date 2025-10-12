import { StudyLoadingScreen } from "components/study";

export default function QuizLoading() {
  return (
    <StudyLoadingScreen
      title="Preparing Your Quiz"
      message="Loading your flashcards..."
      progress={0}
      isSaving={false}
    />
  );
}
