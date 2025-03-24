
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";

interface AITaskProgressBarProps {
  progress: number;
  isComplete: boolean;
}

const AITaskProgressBar = ({ progress, isComplete }: AITaskProgressBarProps) => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isMessageTransitioning, setIsMessageTransitioning] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [currentCategory, setCurrentCategory] = useState("Data Collection");
  
  // Define our AI tasks messages with categories
  const taskCategories = [
    {
      category: "Data Collection",
      messages: [
        "Collecting user account and permission data...",
        "Parsing user roles and group assignments..."
      ]
    },
    {
      category: "Analysis",
      messages: [
        "Analyzing login activity across systems...",
        "Identifying unused or stale user accounts...",
        "Detecting anomalous access behaviors..."
      ]
    },
    {
      category: "Evaluation",
      messages: [
        "Evaluating access privileges against organizational policies...",
        "Checking access alignment with employment status...",
        "Reviewing service and shared account permissions..."
      ]
    },
    {
      category: "Recommendations",
      messages: [
        "Flagging elevated access without justification...",
        "Correlating user access with job responsibilities...",
        "Compiling revocation and modification recommendations...",
        "Finalizing access review report for summary..."
      ]
    }
  ];
  
  // Flatten messages for easier access
  const taskMessages = taskCategories.flatMap(category => category.messages);
  
  // Rotate through messages
  useEffect(() => {
    if (isComplete) return;

    const messageInterval = setInterval(() => {
      setIsMessageTransitioning(true);
      
      setTimeout(() => {
        // Calculate next message index
        const nextMessageIndex = (currentMessage + 1) % taskMessages.length;
        setCurrentMessage(nextMessageIndex);
        
        // Find category for the new message
        let messageCount = 0;
        for (const category of taskCategories) {
          messageCount += category.messages.length;
          if (nextMessageIndex < messageCount) {
            setCurrentCategory(category.category);
            break;
          }
        }
        
        setIsMessageTransitioning(false);
      }, 500); // 500ms for fade out/in transition
      
    }, 3500); // Change message every 3.5 seconds
    
    return () => clearInterval(messageInterval);
  }, [currentMessage, isComplete, taskMessages.length]);

  // Update displayed message for typing effect
  useEffect(() => {
    if (isComplete) {
      setDisplayedMessage("Analysis complete. Review recommendations below.");
      return;
    }
    
    if (isMessageTransitioning) return;
    
    const fullMessage = taskMessages[currentMessage];
    let currentIndex = 0;
    setDisplayedMessage("");
    
    const typingInterval = setInterval(() => {
      if (currentIndex < fullMessage.length) {
        setDisplayedMessage(prev => prev + fullMessage[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30);
    
    return () => clearInterval(typingInterval);
  }, [currentMessage, isMessageTransitioning, isComplete, taskMessages]);

  // Get a color style based on progress
  const getProgressColor = () => {
    if (isComplete) return "bg-gradient-to-r from-green-400 to-[#2CA058]";
    if (progress < 30) return "bg-gradient-to-r from-blue-400 to-[#40A9FF]";
    if (progress < 70) return "bg-gradient-to-r from-[#40A9FF] via-amber-400 to-[#FCA311]";
    return "bg-gradient-to-r from-[#FCA311] to-[#2CA058]";
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Category and Task message */}
      <div className={`mb-2 transition-opacity duration-500 ${isMessageTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs font-medium text-gray-500 mb-1">
            {!isComplete ? `CATEGORY: ${currentCategory}` : "COMPLETE"}
          </span>
          <span className="text-sm text-gray-600">{displayedMessage}</span>
        </div>
      </div>

      {/* Progress bar container */}
      <div className="relative w-[70%] mb-4">
        {/* Particles overlay */}
        <div className="absolute inset-0 overflow-hidden">
          {progress > 0 && !isComplete && Array.from({ length: 8 }).map((_, i) => (
            <span 
              key={i}
              className="absolute animate-pulse-ping opacity-75"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.min(progress, 100) * Math.random()}%`,
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                backgroundColor: i % 2 === 0 ? '#FCA311' : '#40A9FF',
                animationDuration: `${0.5 + Math.random() * 1}s`,
                animationDelay: `${Math.random() * 1}s`
              }}
            />
          ))}
        </div>
        
        {/* Actual progress bar */}
        <div className="h-2.5 w-full rounded-full bg-gray-200 overflow-hidden shadow-inner">
          <div 
            className={`h-full transition-all duration-500 ease-out ${getProgressColor()}`} 
            style={{ 
              width: `${progress}%`,
              boxShadow: `0 0 8px ${isComplete ? 'rgba(44, 160, 88, 0.5)' : 'rgba(64, 169, 255, 0.5)'}` 
            }}
          />
        </div>
        
        {/* Progress percentage */}
        <div className="absolute -right-8 top-0 text-xs text-gray-500">{progress}%</div>
      </div>
      
      {/* Category badges */}
      {progress > 25 && (
        <div className="flex flex-wrap justify-center gap-2 mt-1">
          {taskCategories.map((category, index) => {
            // Only show categories that have "started" based on progress
            const categoryThreshold = (index / taskCategories.length) * 100;
            if (progress < categoryThreshold) return null;
            
            const isActive = currentCategory === category.category && !isComplete;
            const isCurrent = currentCategory === category.category;
            
            return (
              <div 
                key={category.category} 
                className={`px-2 py-1 rounded-full text-xs ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                    : isCurrent && isComplete
                    ? 'bg-green-100 text-green-700 border border-green-200'
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                } transition-all duration-300`}
              >
                {category.category}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AITaskProgressBar;
