import { Button } from "@ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@ui/dialog";
import { Label } from "@ui/label";
import { Switch } from "@ui/switch";
import { Timer } from "lucide-react";

interface ChallengeSettingsProps {
  showChallengeSettings: boolean;
  setShowChallengeSettings: (open: boolean) => void;
  handleStartStudy: () => void;
  isTimed: boolean;
  setIsTimed: (checked: boolean) => void;
}

const ChallengeSettings = ({
  showChallengeSettings,
  setShowChallengeSettings,
  handleStartStudy,
  isTimed,
  setIsTimed,
}: ChallengeSettingsProps) => {
  return (
    <Dialog
      open={showChallengeSettings}
      onOpenChange={setShowChallengeSettings}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Challenge Mode Settings</DialogTitle>
          <DialogDescription>
            Configure your Challenge Mode session
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="timed-mode">Timed Mode</Label>
              <p className="text-sm text-muted-foreground">
                Limited time to answer questions
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="timed-mode"
                checked={isTimed}
                onCheckedChange={setIsTimed}
              />
              <Timer
                className={`h-4 w-4 ${isTimed ? "text-primary" : "text-muted-foreground"}`}
              />
            </div>
          </div>

          <Button onClick={handleStartStudy} className="w-full">
            Start Challenge Session
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ChallengeSettings;
