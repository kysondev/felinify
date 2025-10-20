"use client";

import { Card, CardContent } from "@ui/card";
import { Badge } from "@ui/badge";
import { Brain, Zap } from "lucide-react";

interface AIGenerationCardProps {
  progress: number;
  status: string;
  estimatedTime?: string;
  isActive?: boolean;
}

export function AIGenerationCard({
  progress,
  status,
  estimatedTime = "30 seconds",
  isActive = true,
}: AIGenerationCardProps) {
  return (
    <Card className="overflow-hidden border-primary/20 shadow-2xl">
      <CardContent className="p-6 flex flex-col flex-grow h-full">
        <div className="flex justify-between items-center mb-4">
          <Badge variant="secondary" className="px-3 py-1">
            <Brain className="h-4 w-4 mr-1.5" />
            AI Generating
          </Badge>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-xs text-muted-foreground">
              {isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
        
        <div className="flex-grow flex flex-col justify-center">
          <div className="space-y-5">
            <div className="flex items-center justify-center gap-2">
              <div className="h-3 w-3 bg-primary rounded-full animate-bounce"></div>
              <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
              <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
            </div>
            
            <div className="space-y-3 px-4">
              <div className="h-5 bg-gradient-to-r from-muted via-primary/20 to-muted rounded animate-pulse"></div>
              <div className="h-5 bg-gradient-to-r from-muted via-primary/20 to-muted rounded animate-pulse w-11/12" style={{ animationDelay: '150ms' }}></div>
              <div className="h-5 bg-gradient-to-r from-muted via-primary/20 to-muted rounded animate-pulse w-4/5" style={{ animationDelay: '300ms' }}></div>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-foreground">
                  {status}
                </p>
                <span className="text-sm font-bold text-primary">{progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center border-t border-border pt-4 mt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Zap className="h-4 w-4 text-primary" />
            <span>Powered by AI</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Est. {estimatedTime}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
