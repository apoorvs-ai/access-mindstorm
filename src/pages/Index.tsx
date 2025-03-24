import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
  Brain 
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">AWS System Overview</h1>
        <p className="text-gray-500">Access Management and Review Dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>System Details</CardTitle>
            <CardDescription>AWS Environment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Owner</p>
                <p className="text-sm text-gray-500">John Doe</p>
              </div>
              <div>
                <p className="text-sm font-medium">Last Review</p>
                <p className="text-sm text-gray-500">May 15, 2023</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge className="bg-green-500">Synced</Badge>
              </div>
              <Button 
                className="w-full mt-6" 
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
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">User Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">
                      <User className="h-10 w-10 text-indigo-500" />
                    </div>
                  </div>
                  <div className="ml-6 space-y-1">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-sm">Active: 85%</p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gray-300 mr-2"></div>
                      <p className="text-sm">Inactive: 15%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Access Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-40 flex items-center justify-center">
                  <BarChart className="h-32 w-32 text-indigo-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <CardTitle>Access Reviews</CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-1" /> Add Review
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="active">
                <TabsList className="mb-4">
                  <TabsTrigger value="past">Past</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="mt-0">
                  {isReviewStarted ? (
                    <div className="space-y-4">
                      <div className="bg-indigo-50 p-4 rounded-md border border-indigo-100">
                        <h3 className="font-medium text-indigo-800 mb-3 flex items-center">
                          {isLoading ? (
                            <>
                              <FileSearch className="h-5 w-5 mr-2 text-indigo-600" />
                              AI Access Review In Progress
                            </>
                          ) : (
                            <>
                              <Shield className="h-5 w-5 mr-2 text-indigo-600" />
                              AI Access Review Complete
                            </>
                          )}
                        </h3>
                        
                        {isLoading && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-center mb-1 relative">
                              <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-1 animate-pulse">
                                <Brain className="h-8 w-8 text-indigo-500" />
                              </div>
                              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full border-4 border-indigo-400 border-t-transparent animate-spin"></div>
                              </div>
                            </div>
                            
                            <AITaskProgressBar 
                              progress={progress}
                              isComplete={analysisComplete}
                            />
                          </div>
                        )}
                        
                        {analysisComplete && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-center mb-1">
                              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                                <Brain className="h-8 w-8 text-green-500" />
                              </div>
                            </div>
                            <p className="text-sm text-center text-indigo-600 font-medium">Analysis complete. Review recommendations below.</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-4">
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
                          className="w-full mt-2"
                          onClick={() => toast.success("Recommendations applied successfully")}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Apply AI Recommendations
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Database className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No active reviews. Initiate an AI-powered review to get started.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="past" className="mt-0">
                  <div className="text-center py-12">
                    <p className="text-gray-500">No past reviews found.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="upcoming" className="mt-0">
                  <div className="text-center py-12">
                    <p className="text-gray-500">No upcoming reviews scheduled.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
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
