
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ 
        transform: `translateX(-${100 - (value || 0)}%)`,
        boxShadow: value && value > 0 ? "0 0 10px 1px currentColor" : "none"
      }}
    >
      {/* Add subtle pulse animation within the progress bar */}
      {value && value > 0 && (
        <div
          className="absolute inset-0 opacity-30"
          style={{
            animation: "pulse 2s infinite",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            width: "50%",
            transform: "translateX(-100%)"
          }}
        />
      )}
    </ProgressPrimitive.Indicator>
    
    {/* Add keyframes for the pulse animation */}
    <style jsx>{`
      @keyframes pulse {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(200%);
        }
      }
    `}</style>
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
