import { Button } from "components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "components/ui/dialog";
import { Label } from "components/ui/label";
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group";
import { Switch } from "components/ui/switch";
import { Timer } from "lucide-react";

interface ChallengeSettingsProps {
  showChallengeSettings: boolean;
  setShowChallengeSettings: (open: boolean) => void;
  handleStartStudy: () => void;
  numOfRounds: number;
  setNumOfRounds: (rounds: number) => void;
  isTimed: boolean;
  setIsTimed: (checked: boolean) => void;
}

const ChallengeSettings = ({
  showChallengeSettings,
  setShowChallengeSettings,
  handleStartStudy,
  numOfRounds,
  setNumOfRounds,
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
          <DialogTitle>Study Settings</DialogTitle>
          <DialogDescription>
            Configure your Challenge Mode session
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <h3 className="font-medium">Number of Rounds</h3>
            <RadioGroup
              defaultValue="3"
              value={numOfRounds.toString()}
              onValueChange={(value) => setNumOfRounds(parseInt(value))}
              className="grid grid-cols-3 gap-2"
            >
              <div>
                <RadioGroupItem value="1" id="r1" className="peer sr-only" />
                <Label
                  htmlFor="r1"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>1</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="3" id="r2" className="peer sr-only" />
                <Label
                  htmlFor="r2"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>3</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="5" id="r3" className="peer sr-only" />
                <Label
                  htmlFor="r3"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <span>5</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

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
            Start Study Session
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ChallengeSettings;
