
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface AITaskProgressBarProps {
  progress: number;
  isComplete: boolean;
}

const AITaskProgressBar = ({ progress, isComplete }: AITaskProgressBarProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-indigo-600 font-medium">
          {isComplete ? "Analysis Complete" : "Analyzing Data..."}
        </span>
        <span className="font-medium">{progress}%</span>
      </div>
      <Progress 
        value={progress} 
        className={cn(
          "h-2", 
          isComplete ? "bg-green-100" : "bg-indigo-100",
          isComplete ? "[&>div]:bg-green-500" : "[&>div]:bg-indigo-500"
        )} 
      />
      <div className="text-xs text-gray-500 italic">
        {isComplete 
          ? "AI has completed analysis and generated recommendations" 
          : "AI is analyzing access patterns and security configurations"}
      </div>
    </div>
  );
};

export default AITaskProgressBar;
