
import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Brain, Database, Fingerprint, Shield, Sparkles } from "lucide-react";

type Agent = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  specialty: string;
  messages: string[];
};

interface AIAgentProgressBarProps {
  progress: number;
  isComplete: boolean;
}

const AIAgentProgressBar = ({ progress, isComplete }: AIAgentProgressBarProps) => {
  const [currentAgent, setCurrentAgent] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [isMessageTransitioning, setIsMessageTransitioning] = useState(false);
  const [displayedMessage, setDisplayedMessage] = useState("");
  
  // Define our AI agents
  const agents: Agent[] = [
    {
      name: "Nova",
      icon: Database,
      color: "text-blue-500",
      specialty: "Data gathering & audit logging",
      messages: [
        "fetching system access logs...",
        "analyzing user login patterns...",
        "indexing 3,452 access entries...",
        "compiling access history report..."
      ]
    },
    {
      name: "Orion",
      icon: AlertCircle,
      color: "text-amber-500",
      specialty: "Access behavior analysis",
      messages: [
        "detecting anomalies in login behavior...",
        "correlating access patterns...",
        "flagging high-risk users for review...",
        "calculating behavior risk scores..."
      ]
    },
    {
      name: "Vega",
      icon: Shield,
      color: "text-green-500",
      specialty: "Policy & recommendations",
      messages: [
        "reviewing permissions against compliance rules...",
        "preparing role-based access recommendations...",
        "validating access decisions with policy alignment...",
        "generating permission optimization plan..."
      ]
    },
    {
      name: "Nexus",
      icon: Brain,
      color: "text-purple-500",
      specialty: "AI coordination",
      messages: [
        "finalizing AI consensus on risk scoring...",
        "synchronizing agent findings...",
        "cross-validating security recommendations...",
        "preparing comprehensive review report..."
      ]
    }
  ];

  // Get the current agent and message 
  const agent = agents[currentAgent];
  
  // Rotate through agents and messages
  useEffect(() => {
    if (isComplete) return;

    const messageInterval = setInterval(() => {
      setIsMessageTransitioning(true);
      
      setTimeout(() => {
        // Determine whether to advance to next agent or next message
        if (currentMessage >= agent.messages.length - 1) {
          setCurrentAgent((prev) => (prev + 1) % agents.length);
          setCurrentMessage(0);
        } else {
          setCurrentMessage((prev) => prev + 1);
        }
        setIsMessageTransitioning(false);
      }, 500); // 500ms for fade out/in transition
      
    }, 3000); // Change message every 3 seconds
    
    return () => clearInterval(messageInterval);
  }, [currentAgent, currentMessage, agent.messages.length, isComplete]);

  // Update displayed message for typing effect
  useEffect(() => {
    if (isComplete) {
      setDisplayedMessage("Analysis complete. Review recommendations below.");
      return;
    }
    
    if (isMessageTransitioning) return;
    
    const fullMessage = agent.messages[currentMessage];
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
  }, [currentAgent, currentMessage, isMessageTransitioning, isComplete, agent.messages]);

  // Get a color style based on progress
  const getProgressColor = () => {
    if (isComplete) return "bg-gradient-to-r from-green-400 to-green-500";
    if (progress < 30) return "bg-gradient-to-r from-blue-400 to-blue-500";
    if (progress < 70) return "bg-gradient-to-r from-blue-400 via-amber-400 to-amber-500";
    return "bg-gradient-to-r from-amber-400 to-green-500";
  };

  const AgentIcon = agent.icon;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Agent info and message */}
      <div className={`flex items-center mb-2 transition-opacity duration-500 ${isMessageTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        <div className={`rounded-full p-1.5 mr-2 ${agent.color.replace('text-', 'bg-').split('-')[0] + '-100'}`}>
          <AgentIcon className={`h-4 w-4 ${agent.color}`} />
        </div>
        <div className="flex items-center">
          <span className={`font-semibold ${agent.color}`}>Agent {agent.name}</span>
          <span className="mx-1 text-sm text-gray-600">is</span>
          <span className="text-sm text-gray-600">{displayedMessage}</span>
        </div>
      </div>

      {/* Progress bar container */}
      <div className="relative w-[70%] mb-4">
        {/* Particles overlay */}
        <div className="absolute inset-0 overflow-hidden">
          {progress > 0 && !isComplete && Array.from({ length: 5 }).map((_, i) => (
            <span 
              key={i}
              className="absolute animate-ping opacity-75"
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
              boxShadow: `0 0 8px ${isComplete ? 'rgba(52, 211, 153, 0.5)' : 'rgba(59, 130, 246, 0.5)'}` 
            }}
          />
        </div>
        
        {/* Progress percentage */}
        <div className="absolute -right-8 top-0 text-xs text-gray-500">{progress}%</div>
      </div>

      {/* Agent badges for completed work */}
      {progress > 25 && (
        <div className="flex flex-wrap justify-center gap-2 mt-1">
          {agents.map((a, idx) => {
            // Only show badges for agents that have "contributed" based on progress
            const agentProgress = (progress - 10) / agents.length * (idx + 1);
            if (agentProgress <= 0) return null;
            
            const AgentBadgeIcon = a.icon;
            return (
              <Badge 
                key={a.name} 
                variant="outline" 
                className={`text-xs ${agentProgress > 15 ? a.color : 'text-gray-400'} border-${a.color.split('-')[1]}-${agentProgress > 15 ? '200' : '100'} animate-fade-in`}
              >
                <AgentBadgeIcon className="h-3 w-3 mr-1" /> 
                {a.name} {Math.min(Math.floor(agentProgress), 100)}%
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AIAgentProgressBar;
