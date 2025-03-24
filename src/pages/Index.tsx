
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Zap, Plus, User, BarChart, CheckCircle, XCircle, Edit, Clock } from "lucide-react";

const Index = () => {
  const [isReviewStarted, setIsReviewStarted] = useState(false);

  const handleStartReview = () => {
    setIsReviewStarted(true);
    // In a real app, this would trigger the AI review process
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">AWS System Overview</h1>
        <p className="text-gray-500">Access Management and Review Dashboard</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* System Info Card */}
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
                disabled={isReviewStarted}
              >
                <Zap className="mr-2 h-4 w-4" />
                Initiate AI Access Review
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Review Content */}
        <div className="md:col-span-3 space-y-6">
          {/* Stats Cards */}
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

          {/* Access Reviews Tabs */}
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
                        <h3 className="font-medium text-indigo-800 mb-1">AI Access Review In Progress</h3>
                        <p className="text-sm text-indigo-600">Analyzing access patterns and user behaviors...</p>
                      </div>
                      
                      {/* Example User Cards */}
                      <UserReviewCard 
                        name="Alice Smith" 
                        role="DevOps Engineer" 
                        accessType="Admin" 
                        lastLogin="2 days ago" 
                        status="completed" 
                        recommendation="approve"
                      />
                      
                      <UserReviewCard 
                        name="Bob Johnson" 
                        role="Junior Developer" 
                        accessType="ReadOnly" 
                        lastLogin="45 days ago" 
                        status="completed" 
                        recommendation="revoke"
                      />
                      
                      <UserReviewCard 
                        name="Carol Williams" 
                        role="Project Manager" 
                        accessType="Editor" 
                        lastLogin="12 days ago" 
                        status="in-progress" 
                        recommendation="modify"
                      />
                      
                      <Button className="w-full mt-2">
                        Apply AI Recommendations
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-12">
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

// User Review Card Component
const UserReviewCard = ({ 
  name, 
  role, 
  accessType, 
  lastLogin, 
  status, 
  recommendation 
}: { 
  name: string; 
  role: string; 
  accessType: string; 
  lastLogin: string; 
  status: "in-progress" | "completed"; 
  recommendation: "approve" | "revoke" | "modify"; 
}) => {
  // Define recommendation styling
  const recommendationConfig = {
    approve: { 
      icon: CheckCircle, 
      color: "text-green-600", 
      bg: "bg-green-100", 
      border: "border-green-200",
      badge: "bg-green-500" 
    },
    revoke: { 
      icon: XCircle, 
      color: "text-red-600", 
      bg: "bg-red-100", 
      border: "border-red-200",
      badge: "bg-red-500" 
    },
    modify: { 
      icon: Edit, 
      color: "text-orange-600", 
      bg: "bg-orange-100", 
      border: "border-orange-200",
      badge: "bg-orange-500" 
    }
  };
  
  const config = recommendationConfig[recommendation];
  const RecommendationIcon = config.icon;
  
  return (
    <div className={`p-4 rounded-md border ${config.border} ${config.bg}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-6 w-6 text-gray-600" />
          </div>
          <div className="ml-3">
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-gray-600">{role}</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <Badge className={config.badge}>
            {recommendation.charAt(0).toUpperCase() + recommendation.slice(1)}
          </Badge>
          <span className="text-xs text-gray-500 mt-1">
            {status === "in-progress" ? (
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" /> In Progress
              </span>
            ) : "Reviewed"}
          </span>
        </div>
      </div>
      
      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
        <div>
          <span className="text-gray-500">Access:</span> {accessType}
        </div>
        <div>
          <span className="text-gray-500">Last Login:</span> {lastLogin}
        </div>
      </div>
      
      <div className={`mt-3 flex items-center ${config.color}`}>
        <RecommendationIcon className="h-4 w-4 mr-1" />
        <span className="text-sm font-medium">
          {recommendation === "approve" ? "Maintain access" : 
           recommendation === "revoke" ? "Revoke access" : "Modify permissions"}
        </span>
      </div>
    </div>
  );
};

export default Index;
