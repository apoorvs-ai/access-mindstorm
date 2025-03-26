
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { 
  Zap, 
  Plus, 
  User, 
  BarChart, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Clock, 
  FileSearch, 
  Shield, 
  Cpu, 
  Database, 
  Brain,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  Search
} from "lucide-react";
import { toast } from "sonner";
import AITaskProgressBar from "@/components/AITaskProgressBar";

const Index = () => {
  const [isReviewStarted, setIsReviewStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentAction, setCurrentAction] = useState("");
  const [usersReviewed, setUsersReviewed] = useState<string[]>([]);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const loadingMessages = [
    "Scanning user permission matrices...",
    "Analyzing access patterns across resources...",
    "Evaluating least privilege compliance...",
    "Detecting anomalous access behaviors...",
    "Checking dormant account activity...",
    "Comparing against security best practices...",
    "Generating risk assessment scores...",
    "Formulating access recommendations..."
  ];

  const handleStartReview = () => {
    setIsReviewStarted(true);
    setIsLoading(true);
    setProgress(0);
    setCurrentAction(loadingMessages[0]);
    setUsersReviewed([]);
    setAnalysisComplete(false);

    toast.info("AI Access Review initiated", {
      description: "Beginning comprehensive access pattern analysis"
    });

    const simulateProgress = () => {
      let currentProgress = 0;
      let messageIndex = 0;

      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 5) + 1;
        
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(interval);
          setIsLoading(false);
          setAnalysisComplete(true);
          toast.success("AI Agent Analysis complete", {
            description: "All agents have completed their tasks and generated recommendations"
          });
        } else if (currentProgress > (messageIndex + 1) * 12 && messageIndex < loadingMessages.length - 1) {
          messageIndex++;
          setCurrentAction(loadingMessages[messageIndex]);
        }
        
        setProgress(currentProgress);

        if (currentProgress > 25 && !usersReviewed.includes("Alice Smith")) {
          setUsersReviewed(prev => [...prev, "Alice Smith"]);
        }
        if (currentProgress > 55 && !usersReviewed.includes("Bob Johnson")) {
          setUsersReviewed(prev => [...prev, "Bob Johnson"]);
        }
        if (currentProgress > 85 && !usersReviewed.includes("Carol Williams")) {
          setUsersReviewed(prev => [...prev, "Carol Williams"]);
        }
      }, 300);
    };

    simulateProgress();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-100 px-6 py-3 text-sm text-gray-600">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="hover:text-gray-800">Security</Link> / 
          <Link to="/" className="hover:text-gray-800"> User Access Review</Link> / 
          <Link to="/" className="hover:text-gray-800"> Access Review</Link> /
          <span className="font-semibold text-gray-800"> System Review For Jira</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* System Review Header */}
        <h1 className="text-2xl font-bold mb-4">System Review For Jira</h1>
        
        {/* System Info Card */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
            {/* Logo and System Info */}
            <div className="md:col-span-2 flex items-center justify-center md:justify-start">
              <div className="bg-blue-50 p-3 rounded-md">
                <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 0L15 25L27.5 37.5L65 0H40Z" fill="#2684FF"/>
                  <path d="M26.5 25L39 37.5L52.5 25L40 12.5L26.5 25Z" fill="#2684FF"/>
                  <path d="M40 25L52.5 37.5L65 25L52.5 12.5L40 25Z" fill="#2684FF"/>
                </svg>
              </div>
            </div>
            
            {/* System Details */}
            <div className="md:col-span-2">
              <h3 className="font-bold">Jira</h3>
              <p className="text-sm text-gray-600">Service Management</p>
              <p className="text-sm text-gray-600">And CRM</p>
            </div>
            
            {/* Progress */}
            <div className="md:col-span-2">
              <p className="text-sm font-medium mb-1">Progress</p>
              <div className="h-2.5 bg-gray-200 rounded-full w-full">
                <div className="h-2.5 bg-blue-400 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <p className="text-right text-xs text-gray-600 mt-1">0/0</p>
            </div>
            
            {/* Reviewer */}
            <div className="md:col-span-2">
              <p className="text-sm font-medium">Reviewer</p>
              <p className="text-gray-600">N/A</p>
              
              <p className="text-sm font-medium mt-3">Created Date</p>
              <p className="text-gray-600">03/24/2025</p>
            </div>
            
            {/* Modified Permissions */}
            <div className="md:col-span-2">
              <p className="text-sm font-medium">Modified Permissions</p>
              <p className="text-gray-600">N/A</p>
              
              <p className="text-sm font-medium mt-3">Due Date</p>
              <p className="text-gray-600">03/30/2025</p>
            </div>
            
            {/* Removed Permissions & Status */}
            <div className="md:col-span-2">
              <p className="text-sm font-medium">Removed Permissions</p>
              <p className="text-gray-600">N/A</p>
              
              <p className="text-sm font-medium mt-3">Status</p>
              <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100">Incomplete</Badge>
            </div>
          </div>
        </Card>
        
        {/* Review Actions */}
        {isReviewStarted && (
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle>AI Access Review Progress</CardTitle>
              <CardDescription>
                {isLoading ? "Processing access patterns and detecting anomalies..." : "AI analysis complete"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100 mb-4">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
                        <Brain className="h-8 w-8 text-indigo-500" />
                      </div>
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full border-4 border-indigo-400 border-t-transparent animate-spin"></div>
                      </div>
                    </div>
                  </div>
                  
                  <AITaskProgressBar 
                    progress={progress}
                    isComplete={analysisComplete}
                  />
                </div>
              )}
              
              {analysisComplete && (
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {usersReviewed.includes("Alice Smith") ? (
                  <UserCard 
                    name="Alice Smith" 
                    role="DevOps Engineer" 
                    accessType="Admin" 
                    lastLogin="2 days ago" 
                    recommendation="approve"
                  />
                ) : isLoading && (
                  <UserCardSkeleton />
                )}
                
                {usersReviewed.includes("Bob Johnson") ? (
                  <UserCard 
                    name="Bob Johnson" 
                    role="Junior Developer" 
                    accessType="ReadOnly" 
                    lastLogin="45 days ago" 
                    recommendation="revoke"
                  />
                ) : isLoading && progress > 30 && (
                  <UserCardSkeleton />
                )}
                
                {usersReviewed.includes("Carol Williams") ? (
                  <UserCard 
                    name="Carol Williams" 
                    role="Project Manager" 
                    accessType="Editor" 
                    lastLogin="12 days ago" 
                    recommendation="modify"
                  />
                ) : isLoading && progress > 60 && (
                  <UserCardSkeleton />
                )}
              </div>
              
              {analysisComplete && (
                <Button 
                  className="w-full mt-4"
                  onClick={() => toast.success("Recommendations applied successfully")}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Apply AI Recommendations
                </Button>
              )}
            </CardContent>
          </Card>
        )}
        
        {!isReviewStarted && (
          <Card className="mb-6">
            <CardContent className="p-6 flex justify-center">
              <Button 
                className="w-full max-w-md" 
                onClick={handleStartReview}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Cpu className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Initiate AI Access Review
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Footer */}
      <div className="bg-white py-4 border-t mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-sm text-gray-500">
          <div>© 2025 Akitra. All rights reserved. <Link to="/" className="text-blue-500">EULA</Link> & <Link to="/" className="text-blue-500">Privacy Policy</Link>.</div>
          <div>v23.13.1</div>
        </div>
      </div>
    </div>
  );
};

const UserCard = ({ 
  name, 
  role, 
  accessType, 
  lastLogin, 
  recommendation 
}: { 
  name: string; 
  role: string; 
  accessType: string; 
  lastLogin: string; 
  recommendation: "approve" | "revoke" | "modify"; 
}) => {
  const recommendationConfig = {
    approve: { 
      icon: CheckCircle, 
      color: "text-green-600", 
      bg: "bg-green-50", 
      border: "border-green-100",
      badge: "bg-green-500"
    },
    revoke: { 
      icon: XCircle, 
      color: "text-red-600", 
      bg: "bg-red-50", 
      border: "border-red-100",
      badge: "bg-red-500" 
    },
    modify: { 
      icon: Edit, 
      color: "text-orange-600", 
      bg: "bg-orange-50", 
      border: "border-orange-100",
      badge: "bg-orange-500" 
    }
  };
  
  const config = recommendationConfig[recommendation];
  const RecommendationIcon = config.icon;
  
  return (
    <Card className={`overflow-hidden border ${config.border} animate-fade-in`}>
      <div className={`h-2 ${config.badge.replace('bg-', 'bg-')}`}></div>
      <CardContent className="p-4 pt-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                <User className="h-6 w-6 text-indigo-500" />
              </div>
            </div>
            <div className="ml-3">
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-gray-600">{role}</p>
            </div>
          </div>
          
          <Badge className={config.badge}>
            {recommendation.charAt(0).toUpperCase() + recommendation.slice(1)}
          </Badge>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500 block text-xs">Access Level</span>
            <span className="font-medium">{accessType}</span>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <span className="text-gray-500 block text-xs">Last Login</span>
            <span className="font-medium">{lastLogin}</span>
          </div>
        </div>
        
        <div className={`mt-4 flex items-center ${config.color} p-2 rounded ${config.bg}`}>
          <RecommendationIcon className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">
            {recommendation === "approve" ? "Maintain current permissions" : 
             recommendation === "revoke" ? "Revoke access privileges" : "Modify access rights"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

const UserCardSkeleton = () => {
  return (
    <Card className="overflow-hidden border animate-pulse">
      <div className="h-2 bg-gray-200"></div>
      <CardContent className="p-4 pt-5">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="ml-3">
              <Skeleton className="h-5 w-32 mb-1" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Skeleton className="h-14 rounded" />
          <Skeleton className="h-14 rounded" />
        </div>
        
        <Skeleton className="mt-4 h-10 rounded" />
      </CardContent>
    </Card>
  );
};

export default Index;
