
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Brain, Package, Shield, Search, Puzzle } from "lucide-react";

interface AITaskProgressBarProps {
  progress: number;
  isComplete: boolean;
}

type AgentType = {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  segment: [number, number]; // Start and end percentage of the progress bar
  tasks: string[];
};

const AITaskProgressBar = ({ progress, isComplete }: AITaskProgressBarProps) => {
  const [currentTask, setCurrentTask] = useState(0);
  const [isMessageTransitioning, setIsMessageTransitioning] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState("");
  const [activeAgent, setActiveAgent] = useState<string>("data-collection");
  
  // Define our AI agents with their respective tasks and segments
  const agents: AgentType[] = [
    {
      id: "data-collection",
      name: "Data Collection Agent",
      icon: Puzzle,
      color: "text-blue-500",
      segment: [0, 20], // This agent works from 0% to 20% of the progress
      tasks: [
        "Collecting user account and permission data...",
        "Parsing user roles and group assignments..."
      ]
    },
    {
      id: "behavior-analysis",
      name: "Behavior Analysis Agent",
      icon: Search,
      color: "text-purple-500",
      segment: [20, 40],
      tasks: [
        "Analyzing login activity across systems...",
        "Identifying unused or stale user accounts...",
        "Detecting anomalous access behaviors..."
      ]
    },
    {
      id: "policy-enforcement",
      name: "Policy Enforcement Agent",
      icon: Shield,
      color: "text-amber-500",
      segment: [40, 60],
      tasks: [
        "Evaluating access privileges against organizational policies...",
        "Checking access alignment with employment status...",
        "Reviewing service and shared account permissions..."
      ]
    },
    {
      id: "decision-engine",
      name: "Decision Engine Agent",
      icon: Brain,
      color: "text-indigo-500",
      segment: [60, 80],
      tasks: [
        "Flagging elevated access without justification...",
        "Correlating user access with job responsibilities..."
      ]
    },
    {
      id: "packaging",
      name: "Packaging Agent",
      icon: Package,
      color: "text-green-500",
      segment: [80, 100],
      tasks: [
        "Compiling revocation and modification recommendations...",
        "Finalizing access review report for summary..."
      ]
    }
  ];
  
  // Find the currently active agent based on progress
  useEffect(() => {
    if (isComplete) return;
    
    for (const agent of agents) {
      const [start, end] = agent.segment;
      if (progress >= start && progress < end) {
        setActiveAgent(agent.id);
        break;
      }
    }
  }, [progress, isComplete]);
  
  // Get current agent
  const currentAgent = agents.find(agent => agent.id === activeAgent) || agents[0];
  
  // Get all tasks from the current agent
  const currentAgentTasks = currentAgent.tasks;
  
  // Rotate through agent tasks
  useEffect(() => {
    if (isComplete) return;

    const messageInterval = setInterval(() => {
      setIsMessageTransitioning(true);
      
      setTimeout(() => {
        // Calculate next task index within the current agent's tasks
        const nextTaskIndex = (currentTask + 1) % currentAgentTasks.length;
        setCurrentTask(nextTaskIndex);
        setIsMessageTransitioning(false);
      }, 500); // 500ms for fade out/in transition
      
    }, 3500); // Change message every 3.5 seconds
    
    return () => clearInterval(messageInterval);
  }, [currentTask, isComplete, currentAgentTasks.length]);

  // Update displayed message for typing effect
  useEffect(() => {
    if (isComplete) {
      setDisplayedMessage("Analysis complete. Review recommendations below.");
      return;
    }
    
    if (isMessageTransitioning) return;
    
    const fullMessage = currentAgentTasks[currentTask];
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
  }, [currentTask, isMessageTransitioning, isComplete, currentAgentTasks]);

  // Get a color style based on progress
  const getProgressColor = () => {
    if (isComplete) return "bg-gradient-to-r from-green-400 to-[#2CA058]";
    if (progress < 30) return "bg-gradient-to-r from-blue-400 to-[#40A9FF]";
    if (progress < 70) return "bg-gradient-to-r from-[#40A9FF] via-amber-400 to-[#FCA311]";
    return "bg-gradient-to-r from-[#FCA311] to-[#2CA058]";
  };

  // Calculate which segments are active and completed
  const getSegmentStatus = (agent: AgentType) => {
    const [start, end] = agent.segment;
    
    if (progress >= end) return "completed"; // Segment is fully completed
    if (progress >= start && progress < end) return "active"; // Segment is currently active
    return "pending"; // Segment hasn't started yet
  };

  const AgentIcon = currentAgent.icon;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Agent and Task message */}
      <div className={`mb-2 transition-opacity duration-500 ${isMessageTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className="flex flex-col items-center justify-center">
          <span className="text-xs font-medium flex items-center gap-1">
            {!isComplete ? (
              <>
                <AgentIcon className={`h-3.5 w-3.5 ${currentAgent.color}`} />
                <span className={`${currentAgent.color}`}>{currentAgent.name}</span>
              </>
            ) : (
              <span className="text-green-500">PROCESS COMPLETE</span>
            )}
          </span>
          <span className="text-sm text-gray-600 mt-1">{displayedMessage}</span>
        </div>
      </div>

      {/* Segmented progress bar */}
      <div className="relative w-[70%] mb-4 mt-2">
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

        {/* Segmented progress bar */}
        <div className="w-full h-2.5 rounded-full bg-gray-200 overflow-hidden shadow-inner flex">
          {agents.map((agent, index) => {
            const [start, end] = agent.segment;
            const segmentWidth = end - start;
            const status = getSegmentStatus(agent);
            
            // Calculate the fill percentage for this segment
            let fillPercentage = 0;
            if (status === "completed") {
              fillPercentage = 100;
            } else if (status === "active") {
              fillPercentage = ((progress - start) / segmentWidth) * 100;
            }
            
            return (
              <div 
                key={agent.id}
                className="h-full relative overflow-hidden"
                style={{ width: `${segmentWidth}%` }}
              >
                {/* Segment divider (except for first segment) */}
                {index > 0 && (
                  <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-white z-10"></div>
                )}
                
                {/* Segment fill */}
                <div 
                  className={`h-full transition-all duration-500 ease-out ${getProgressColor()}`}
                  style={{ 
                    width: `${fillPercentage}%`,
                    boxShadow: status === "active" ? 
                      `0 0 8px ${isComplete ? 'rgba(44, 160, 88, 0.5)' : 'rgba(64, 169, 255, 0.5)'}` : 'none'
                  }}
                />
              </div>
            );
          })}
        </div>
        
        {/* Progress percentage */}
        <div className="absolute -right-8 top-0 text-xs text-gray-500">{progress}%</div>
      </div>
      
      {/* Agent segment labels */}
      <div className="flex justify-between w-[70%] mt-1 mb-3">
        {agents.map((agent) => {
          const AgentSegmentIcon = agent.icon;
          const status = getSegmentStatus(agent);
          
          return (
            <div 
              key={agent.id} 
              className="flex flex-col items-center"
              style={{ width: `${(agent.segment[1] - agent.segment[0])}%` }}
            >
              <div 
                className={`
                  flex items-center justify-center rounded-full p-1
                  ${status === "completed" ? "bg-green-100" : 
                    status === "active" ? `${agent.color.replace('text-', 'bg-').split('-')[0]}-100` : 
                    "bg-gray-100"}
                `}
              >
                <AgentSegmentIcon 
                  className={`h-3 w-3 
                    ${status === "completed" ? "text-green-500" : 
                      status === "active" ? agent.color : 
                      "text-gray-400"}
                  `} 
                />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Agent status badges */}
      {progress > 10 && (
        <div className="flex flex-wrap justify-center gap-2 mt-1">
          {agents.map((agent) => {
            const status = getSegmentStatus(agent);
            // Only show badges for agents that have started or completed
            if (status === "pending") return null;
            
            const AgentBadgeIcon = agent.icon;
            return (
              <Badge 
                key={agent.id} 
                variant="outline" 
                className={`
                  text-xs flex items-center gap-1
                  ${status === "completed" ? "text-green-600 border-green-200" : 
                    status === "active" ? `${agent.color} border-${agent.color.split('-')[1]}-200` : 
                    "text-gray-400 border-gray-200"}
                  transition-all duration-300
                `}
              >
                <AgentBadgeIcon className="h-3 w-3" /> 
                {agent.name}
                {status === "completed" && " ✓"}
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AITaskProgressBar;
