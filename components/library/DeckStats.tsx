"use client";

import { Deck } from "db/types/models.types";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/Card";
import { BookOpen, Calendar, Clock, Dices, BarChart2, Trophy, Brain, Activity } from "lucide-react";
import { formatDate, formatDateTime } from "utils/date.utils";

export const DeckStats = ({ deck }: { deck: Deck }) => {

  const daysSinceCreation = deck.createdAt 
    ? Math.floor((new Date().getTime() - new Date(deck.createdAt).getTime()) / (1000 * 3600 * 24))
    : 0;
    
  const daysSinceLastStudy = deck.progress?.lastStudied
    ? Math.floor((new Date().getTime() - new Date(deck.progress.lastStudied).getTime()) / (1000 * 3600 * 24))
    : null;

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 border shadow-sm p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-primary" />
          Performance Overview
        </h2>
        
        <div className="mt-4 flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-1">Mastery Progress</div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">{deck.progress?.mastery.toFixed(1) || 0}%</span>
              <span className="text-sm text-muted-foreground mb-1">complete</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden mt-2">
              <div
                className="bg-gray-500 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${deck.progress?.mastery || 0}%` }}
              ></div>
            </div>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="overflow-hidden">
          <div className="bg-gray-100 px-4 py-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              Flashcards
            </CardTitle>
          </div>
          <CardContent className="pt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">{deck.flashcards?.length || 0}</span>
              <span className="text-sm text-muted-foreground">cards</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {deck.flashcards?.length ? `Added over time` : "No cards added yet"}
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="bg-gray-100 px-4 py-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Created
            </CardTitle>
          </div>
          <CardContent className="pt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">{formatDate(deck.createdAt)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {daysSinceCreation} {daysSinceCreation === 1 ? 'day' : 'days'} ago
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <div className="bg-gray-100 px-4 py-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Last Studied
            </CardTitle>
          </div>
          <CardContent className="pt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">{formatDate(deck.progress?.lastStudied)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {daysSinceLastStudy !== null 
                ? `${daysSinceLastStudy} ${daysSinceLastStudy === 1 ? 'day' : 'days'} ago` 
                : "Start studying to track progress"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-full mt-0.5">
                <Calendar className="h-3.5 w-3.5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Deck Created</p>
                <p className="text-xs text-muted-foreground">{formatDateTime(deck.createdAt)}</p>
              </div>
            </div>
            
            {deck.progress?.lastStudied && (
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-full mt-0.5">
                  <Brain className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Last Study Session</p>
                  <p className="text-xs text-muted-foreground">{formatDateTime(deck.progress.lastStudied)}</p>
                </div>
              </div>
            )}
            
            {deck.updatedAt && deck.updatedAt !== deck.createdAt && (
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-full mt-0.5">
                  <Dices className="h-3.5 w-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Last Updated</p>
                  <p className="text-xs text-muted-foreground">{formatDateTime(deck.updatedAt)}</p>
                </div>
              </div>
            )}
            
            {!deck.progress?.lastStudied && (
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 dark:bg-gray-800 p-1.5 rounded-full mt-0.5">
                  <Trophy className="h-3.5 w-3.5 text-gray-400" />
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