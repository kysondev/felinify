"use client";

import React from "react";
import { Button } from "components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/Card";
import { CheckCircle2, XCircle, Award, Clock } from "lucide-react";
import { Progress } from "components/ui/Progress";
import { formatTime } from "@common/utils/date.utils";

interface RoundResultsCardProps {
  currentRound: number;
  numOfRounds: number;
  roundCorrectAnswers: number;
  roundIncorrectAnswers: number;
  correctAnswers: number;
  incorrectAnswers: number;
  studyTime: number;
  masteryChangeText: string;
  onStartNextRound: () => void;
}

/**
 * The RoundResultsCard component displays the results of the current round in a card format.
 * It shows the number of correct and incorrect answers, mastery change, and total study time.
 * It also provides a button to start the next round.
 */
export function RoundResultsCard({
  currentRound,
  numOfRounds,
  roundCorrectAnswers,
  roundIncorrectAnswers,
  correctAnswers,
  incorrectAnswers,
  studyTime,
  masteryChangeText,
  onStartNextRound,
}: RoundResultsCardProps) {
  return (
    <div className="container max-w-3xl mx-auto py-6 md:py-8 px-3 md:px-4 mt-14 md:mt-16">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            Round {currentRound} Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
              <p className="text-lg font-medium">{roundCorrectAnswers}</p>
              <p className="text-sm text-muted-foreground">Correct</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <XCircle className="h-12 w-12 text-red-500" />
              </div>
              <p className="text-lg font-medium">{roundIncorrectAnswers}</p>
              <p className="text-sm text-muted-foreground">Incorrect</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Award className="h-12 w-12 text-primary" />
              </div>
              <p className="text-lg font-medium">{masteryChangeText}</p>
              <p className="text-sm text-muted-foreground">Mastery Change</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Clock className="h-12 w-12 text-blue-500" />
              </div>
              <p className="text-lg font-medium">{formatTime(studyTime)}</p>
              <p className="text-sm text-muted-foreground">Time</p>
            </div>
          </div>

          <div className="bg-secondary/30 rounded-lg p-4">
            <p className="text-center">
              <span className="font-medium">
                Round {currentRound} of {numOfRounds} complete.{" "}
              </span>
              <span className="text-muted-foreground">
                {correctAnswers} correct and {incorrectAnswers} incorrect
                answers so far.
              </span>
            </p>
          </div>

          <Progress
            value={(currentRound / numOfRounds) * 100}
            className="w-full h-2 rounded-full overflow-hidden"
          />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={onStartNextRound} className="min-w-[200px]">
            Start Round {currentRound + 1}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
