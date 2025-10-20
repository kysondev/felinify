import { Loader2 } from "lucide-react";
import { Progress } from "@ui/progress";

interface StudyLoadingScreenProps {
  title: string;
  message: string;
  progress: number;
  isSaving?: boolean;
}

export function StudyLoadingScreen({ title, message, progress, isSaving = false }: StudyLoadingScreenProps) {
  return (
    <div className="h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="flex flex-col items-center max-w-md text-center px-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-6" />
        
        <h2 className="text-xl font-medium mb-2">{title}</h2>
        
        {!isSaving && (
          <div className="w-full mb-3">
            <Progress value={progress} className="h-1.5" />
          </div>
        )}
        
        <p className="text-sm text-muted-foreground">{message}</p>
        {!isSaving && (
          <span className="text-xs text-muted-foreground mt-1">
            This may take a moment, please don't refresh the page.
          </span>
        )}
      </div>
    </div>
  );
}
