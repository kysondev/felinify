"use client";

import { Deck } from "db/types/models.types";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/Card";
import { Calendar, Clock, Dices, BarChart2, Trophy, Brain, Activity, CreditCard } from "lucide-react";
import { formatDate, formatDateTime } from "utils/date.utils";
import { Progress } from "components/ui/Progress";

export const DeckStats = ({ deck }: { deck: Deck }) => {

  const daysSinceCreation = deck.createdAt 
    ? Math.floor((new Date().getTime() - new Date(deck.createdAt).getTime()) / (1000 * 3600 * 24))
    : 0;
    
  const daysSinceLastStudy = deck.progress?.lastStudied
    ? Math.floor((new Date().getTime() - new Date(deck.progress.lastStudied).getTime()) / (1000 * 3600 * 24))
    : null;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-900 border shadow-sm p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-primary" />
          Performance Overview
        </h3>
        
        <div className="mt-4 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-1">Mastery Progress</div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">{deck.progress?.mastery.toFixed(1) || 0}%</span>
              <span className="text-sm text-muted-foreground mb-1">complete</span>
            </div>
            <Progress
  value={deck.progress?.mastery || 0}
  className="w-full h-3 mt-2 rounded-full overflow-hidden"
/>
          </div>
          
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-1">Study Sessions</div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">{deck.progress?.completedSessions || 0}</span>
              <span className="text-sm text-muted-foreground mb-1">completed</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
              <Brain className="h-4 w-4" />
              <span>
                {deck.progress?.completedSessions ? 
                  `Last session: ${formatDate(deck.progress?.lastStudied)}` : 
                  "No study sessions yet"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <Card className="overflow-hidden border-muted-foreground/20">
          <div className="bg-muted/40 px-3 py-1.5">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-primary rotate-180" />
              Flashcards
            </CardTitle>
          </div>
          <CardContent className="pt-3 pb-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">{deck.flashcards?.length || 0}</span>
              <span className="text-sm text-muted-foreground">cards</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {deck.flashcards?.length ? `Added over time` : "No cards added yet"}
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-muted-foreground/20">
          <div className="bg-muted/40 px-3 py-1.5">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Created
            </CardTitle>
          </div>
          <CardContent className="pt-3 pb-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">{formatDate(deck.createdAt)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {daysSinceCreation} {daysSinceCreation === 1 ? 'day' : 'days'} ago
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-muted-foreground/20">
          <div className="bg-muted/40 px-3 py-1.5">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Last Studied
            </CardTitle>
          </div>
          <CardContent className="pt-3 pb-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold">{formatDate(deck.progress?.lastStudied)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {daysSinceLastStudy !== null 
                ? `${daysSinceLastStudy} ${daysSinceLastStudy === 1 ? 'day' : 'days'} ago` 
                : "Start studying to track progress"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-muted-foreground/20">
        <CardHeader className="pb-2 pt-3 px-4">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 py-2">
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="bg-muted/50 p-1.5 rounded-full mt-0.5">
                <Calendar className="h-3 w-3 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Deck Created</p>
                <p className="text-xs text-muted-foreground">{formatDateTime(deck.createdAt)}</p>
              </div>
            </div>
            
            {deck.progress?.lastStudied && (
              <div className="flex items-start gap-2">
                <div className="bg-muted/50 p-1.5 rounded-full mt-0.5">
                  <Brain className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Last Study Session</p>
                  <p className="text-xs text-muted-foreground">{formatDateTime(deck.progress.lastStudied)}</p>
                </div>
              </div>
            )}
            
            {deck.updatedAt && deck.updatedAt !== deck.createdAt && (
              <div className="flex items-start gap-2">
                <div className="bg-muted/50 p-1.5 rounded-full mt-0.5">
                  <Dices className="h-3 w-3 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-xs text-muted-foreground">{formatDateTime(deck.updatedAt)}</p>
                </div>
              </div>
            )}
            
            {!deck.progress?.lastStudied && (
              <div className="flex items-start gap-2">
                <div className="bg-muted/50 p-1.5 rounded-full mt-0.5">
                  <Trophy className="h-3 w-3 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">First Study Session</p>
                  <p className="text-xs text-muted-foreground">Not yet started</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 