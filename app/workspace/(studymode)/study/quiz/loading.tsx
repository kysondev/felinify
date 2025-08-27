import { Card } from "components/ui/Card";
import { Progress } from "components/ui/Progress";
import { Loader2 } from "lucide-react";

export default function QuizLoading() {
  return (
    <div className="container max-w-3xl mx-auto py-8 px-4 mt-16">
      <Card className="p-8">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-6">
            Preparing Your Adaptive Quiz
          </h2>
          
          <div className="w-full max-w-md mb-8">
            <Progress value={0} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
              <span>Loading quiz session</span>
              <span>Generating questions</span>
              <span>Displaying questions</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
          
          <p className="text-center text-muted-foreground">
            Loading quiz session...
          </p>
        </div>
      </Card>
    </div>
  );
} 