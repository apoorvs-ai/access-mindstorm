
import { useState, useEffect, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, XCircle, AlertCircle, Shield, Cpu, Database } from "lucide-react";

interface LogLine {
  message: string;
  status?: "success" | "warning" | "error" | "info" | "pending";
  timestamp: Date | string;
}

type TaskState = "waiting" | "in_progress" | "complete";

interface AIAgentProgressBarProps {
  progress: number;
  isComplete: boolean;
  currentAction?: string;
  // New structured data props
  data?: {
    currentStage?: string;
    progressPercentage?: number;
    statusText?: string;
    logLines?: string[];
    taskStates?: {
      "Data Synchronization"?: TaskState;
      "Access Analysis"?: TaskState;
      "Security Assessment"?: TaskState;
    };
  };
}

const AIAgentProgressBar = ({ progress, isComplete, currentAction, data }: AIAgentProgressBarProps) => {
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(true);
  const [currentTypingMessage, setCurrentTypingMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);
  
  // Use either the provided data or fallback to the original implementation
  const currentProgress = data?.progressPercentage ?? progress;
  const currentStage = data?.currentStage ?? "";
  const currentStatusText = data?.statusText ?? currentAction;
  const taskStates = data?.taskStates ?? {
    "Data Synchronization": currentProgress < 30 ? "in_progress" : "complete",
    "Access Analysis": currentProgress >= 30 && currentProgress < 70 ? "in_progress" : 
                         currentProgress >= 70 ? "complete" : "waiting",
    "Security Assessment": currentProgress >= 70 ? "in_progress" : 
                             currentProgress >= 100 ? "complete" : "waiting"
  };

  // Terminal log entries based on progress
  const terminalLogs = [
    { progress: 5, message: "Connecting to HR data source...", status: "success" },
    { progress: 10, message: "Retrieving user records (345 total)...", status: "info" },
    { progress: 15, message: "Scanning access logs from Active Directory...", status: "info" },
    { progress: 25, message: "Cross-checking user roles with system permissions...", status: "info" },
    { progress: 35, message: "Detecting orphaned accounts...", status: "warning", extra: "2 flagged" },
    { progress: 45, message: "Assessing least privilege violations...", status: "info" },
    { progress: 55, message: "Running anomaly detection on high-risk access...", status: "info" },
    { progress: 65, message: "Examining user login patterns...", status: "info" },
    { progress: 70, message: "Checking dormant accounts...", status: "warning", extra: "3 accounts inactive > 90 days" },
    { progress: 75, message: "Validating separation of duties...", status: "success" },
    { progress: 80, message: "Flagging excessive privileges...", status: "warning", extra: "5 users with unnecessary admin rights" },
    { progress: 85, message: "Generating risk scores for each user...", status: "info" },
    { progress: 90, message: "Creating security compliance report...", status: "info" },
    { progress: 95, message: "Finalizing access recommendations...", status: "info" },
    { progress: 100, message: "Analysis complete. Review recommendations below.", status: "success" }
  ];

  // Process structured log lines from props if available
  useEffect(() => {
    if (data?.logLines && data.logLines.length > 0) {
      const newLogs = data.logLines.map(logLine => {
        // Parse status from the log line (look for indicators like ✅, ⚠️, ❌)
        let status: "success" | "warning" | "error" | "info" | "pending" = "info";
        if (logLine.includes("✅")) status = "success";
        else if (logLine.includes("⚠️")) status = "warning"; 
        else if (logLine.includes("❌")) status = "error";
        
        return {
          message: logLine,
          status,
          timestamp: new Date()
        };
      });
      
      // Add new logs with typing animation
      if (newLogs.length > 0 && !isTyping) {
        setIsTyping(true);
        let typingTimeout: NodeJS.Timeout;
        let currentText = "";
        const fullMessage = newLogs[0].message;
        
        const typeNextCharacter = (index: number) => {
          if (index < fullMessage.length) {
            currentText += fullMessage[index];
            setCurrentTypingMessage(currentText);
            
            typingTimeout = setTimeout(() => {
              typeNextCharacter(index + 1);
            }, 30);
          } else {
            // Typing complete, add to logs
            setLogs(prev => [...prev, newLogs[0]]);
            setCurrentTypingMessage("");
            setIsTyping(false);
            
            // Handle remaining logs sequentially
            if (newLogs.length > 1) {
              setTimeout(() => {
                const remainingLogs = newLogs.slice(1);
                setLogs(prev => [...prev, ...remainingLogs]);
              }, 300);
            }
          }
        };
        
        typeNextCharacter(0);
        
        return () => {
          clearTimeout(typingTimeout);
        };
      }
    } else {
      // Use original implementation with hardcoded logs
      if (isComplete) {
        // Ensure the complete message is added
        const finalLog = terminalLogs[terminalLogs.length - 1];
        if (!logs.some(log => log.message === finalLog.message)) {
          setLogs(prev => [...prev, {
            message: finalLog.message,
            status: finalLog.status as any,
            timestamp: new Date()
          }]);
        }
        return;
      }

      const matchingLogs = terminalLogs.filter(log => {
        return log.progress <= currentProgress && !logs.some(existingLog => existingLog.message === log.message);
      });

      if (matchingLogs.length > 0 && !isTyping) {
        // Add one log at a time with a typing animation
        const nextLog = matchingLogs[0];
        setIsTyping(true);
        
        let typingTimeout: NodeJS.Timeout;
        let currentText = "";
        const fullMessage = nextLog.extra 
          ? `${nextLog.message} ${nextLog.extra}`
          : nextLog.message;
        
        const typeNextCharacter = (index: number) => {
          if (index < fullMessage.length) {
            currentText += fullMessage[index];
            setCurrentTypingMessage(currentText);
            
            typingTimeout = setTimeout(() => {
              typeNextCharacter(index + 1);
            }, 30);
          } else {
            // Typing complete, add to logs
            setLogs(prev => [...prev, {
              message: fullMessage,
              status: nextLog.status as any,
              timestamp: new Date()
            }]);
            setCurrentTypingMessage("");
            setIsTyping(false);
          }
        };
        
        typeNextCharacter(0);
        
        return () => {
          clearTimeout(typingTimeout);
        };
      }
    }
  }, [currentProgress, logs, isComplete, data?.logLines, isTyping]);

  // Auto-scroll to bottom of logs
  useEffect(() => {
    if (logEndRef.current && !isTyping) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, isTyping]);

  // Get a color style based on progress
  const getProgressColor = () => {
    if (isComplete) return "bg-gradient-to-r from-green-400 to-green-500";
    if (currentProgress < 30) return "bg-gradient-to-r from-blue-400 to-blue-500";
    if (currentProgress < 70) return "bg-gradient-to-r from-blue-400 via-amber-400 to-amber-500";
    return "bg-gradient-to-r from-amber-400 to-green-500";
  };

  // Get log entry status icon
  const getStatusIcon = (status?: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500 mr-2 flex-shrink-0" />;
      case "info":
      default:
        return <Cpu className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />;
    }
  };

  // Format timestamp for logs
  const formatTime = (date: Date | string) => {
    if (typeof date === 'string') {
      // Check if the string already contains a formatted time
      if (date.match(/\[\d{2}:\d{2}:\d{2}/)) {
        return date.match(/\[([^\]]+)\]/)?.[1] || date;
      }
      return date;
    }
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  // Get task components based on progress and stage data
  const getTaskComponents = () => {
    const tasks = [
      { name: "Data Synchronization", icon: Database, threshold: 15, logIndex: 0 },
      { name: "Access Analysis", icon: Cpu, threshold: 40, logIndex: 4 },
      { name: "Security Assessment", icon: Shield, threshold: 70, logIndex: 8 }
    ];

    return tasks.map((task, index) => {
      const taskState = taskStates[task.name as keyof typeof taskStates] || "waiting";
      const isActive = taskState === "in_progress";
      const isComplete = taskState === "complete";
      const TaskIcon = task.icon;
      
      // Get current log for this task
      let currentLog = "";
      if (isActive && logs.length > task.logIndex) {
        const activeLogIndex = Math.min(
          logs.length - 1,
          task.logIndex + Math.floor((currentProgress - task.threshold) / 5)
        );
        currentLog = logs[activeLogIndex]?.message || "";
      }
      
      return (
        <div key={task.name} className={`flex items-center p-2 rounded-md border ${
          isComplete ? 'border-green-200 bg-green-50' : 
          isActive ? 'border-blue-200 bg-blue-50 animate-pulse' : 
          'border-gray-200 bg-gray-50'
        }`}>
          <div className={`rounded-full p-1.5 mr-2 ${
            isComplete ? 'bg-green-100' : 
            isActive ? 'bg-blue-100' : 
            'bg-gray-100'
          }`}>
            <TaskIcon className={`h-4 w-4 ${
              isComplete ? 'text-green-500' : 
              isActive ? 'text-blue-500' : 
              'text-gray-400'
            }`} />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-xs font-medium">{task.name}</span>
            {isActive && !isComplete && currentLog && (
              <div className="text-xs text-gray-700 truncate">{"> "}{currentLog}</div>
            )}
            <div className="text-xs text-gray-500">
              {isComplete ? 'Complete' : isActive ? 'In progress...' : 'Waiting...'}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Progress percentage and bar */}
      <div className="relative w-full mb-6 mt-2">
        <div className="text-sm font-medium text-center mb-1">System Analysis Progress</div>
        
        {/* Progress bar */}
        <div className="relative w-full h-2.5 mb-4">
          {/* Particles overlay */}
          <div className="absolute inset-0 overflow-hidden">
            {currentProgress > 0 && !isComplete && Array.from({ length: 5 }).map((_, i) => (
              <span 
                key={i}
                className="absolute animate-ping opacity-75"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.min(currentProgress, 100) * Math.random()}%`,
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
                width: `${currentProgress}%`,
                boxShadow: `0 0 8px ${isComplete ? 'rgba(52, 211, 153, 0.5)' : 'rgba(59, 130, 246, 0.5)'}` 
              }}
            />
          </div>
          
          {/* Progress percentage */}
          <div className="absolute right-0 -top-6 text-xs font-medium">{currentProgress}%</div>
        </div>

        {/* Current Status Text */}
        {currentStatusText && (
          <div className="text-sm text-center text-gray-700 mb-2">{currentStatusText}</div>
        )}

        {/* Terminal Log Section */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium">System Log</div>
          <button 
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="text-xs text-blue-600 hover:text-blue-800"
          >
            {showTechnicalDetails ? "Hide Technical Details" : "Show Technical Details"}
          </button>
        </div>

        {showTechnicalDetails && (
          <div className="w-full bg-gray-900 rounded-md border border-gray-800 mb-4 overflow-hidden shadow-inner">
            <div className="px-2 py-1 bg-gray-800 border-b border-gray-700 flex items-center">
              <div className="flex space-x-1.5 mr-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-xs text-gray-400">system_access_analysis.sh</div>
            </div>
            
            <ScrollArea className="h-36 p-2 font-mono text-xs text-green-400">
              <div className="space-y-1 pr-4">
                {logs.map((log, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-gray-500 mr-2">[{formatTime(log.timestamp)}]</span>
                    <div className="flex items-start">
                      {getStatusIcon(log.status)}
                      <span className={`whitespace-pre-wrap ${
                        log.status === "success" ? "text-green-400" :
                        log.status === "warning" ? "text-amber-400" :
                        log.status === "error" ? "text-red-400" :
                        "text-blue-400"
                      }`}>
                        {log.message}
                      </span>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-start">
                    <span className="text-gray-500 mr-2">[{formatTime(new Date())}]</span>
                    <div className="flex items-start">
                      <Cpu className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                      <span className="text-blue-400">
                        {currentTypingMessage}
                        <span className="animate-pulse">_</span>
                      </span>
                    </div>
                  </div>
                )}
                
                <div ref={logEndRef} />
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {/* Task steps with status indicators */}
      {currentProgress > 5 && (
        <div className="w-full mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
          {getTaskComponents()}
        </div>
      )}
    </div>
  );
};

export default AIAgentProgressBar;
