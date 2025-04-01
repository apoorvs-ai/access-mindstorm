import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import UserActionToggle from "@/components/UserActionToggle";

type UserAction = 'approve' | 'modify' | 'revoke' | null;

interface User {
  id: number;
  name: string;
  systemGroups: string[];
  type: string;
  employment: string;
  access: string;
  lastActive: string;
  reviewRecommendation: string;
  role: string;
  userAction?: UserAction;
}

const Index = () => {
  const [isReviewStarted, setIsReviewStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentAction, setCurrentAction] = useState("");
  const [usersReviewed, setUsersReviewed] = useState<string[]>([]);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers] = useState(0);
  const usersPerPage = 6;
  const [users, setUsers] = useState<User[]>([
    { 
      id: 1, 
      name: "Alice Smith", 
      systemGroups: ["Administrators", "Developers"], 
      type: "Employee", 
      employment: "Full Time", 
      access: "Admin", 
      lastActive: "2 days ago",
      reviewRecommendation: "approve",
      role: "DevOps Engineer",
      userAction: null
    },
    { 
      id: 2, 
      name: "Bob Johnson", 
      systemGroups: ["Support"], 
      type: "Contractor", 
      employment: "Part Time", 
      access: "ReadOnly", 
      lastActive: "45 days ago",
      reviewRecommendation: "revoke",
      role: "Junior Developer",
      userAction: null
    },
    { 
      id: 3, 
      name: "Carol Williams", 
      systemGroups: ["Project Managers"], 
      type: "Employee", 
      employment: "Full Time", 
      access: "Editor", 
      lastActive: "12 days ago",
      reviewRecommendation: "modify",
      role: "Project Manager",
      userAction: null
    },
    { 
      id: 4, 
      name: "David Brown", 
      systemGroups: ["Sales"], 
      type: "Contractor", 
      employment: "Temporary", 
      access: "Viewer", 
      lastActive: "30 days ago",
      reviewRecommendation: "",
      role: "Sales Representative",
      userAction: null
    },
    { 
      id: 5, 
      name: "Eve Jones", 
      systemGroups: ["Marketing"], 
      type: "Employee", 
      employment: "Full Time", 
      access: "Editor", 
      lastActive: "5 days ago",
      reviewRecommendation: "",
      role: "Marketing Specialist",
      userAction: null
    },
    { 
      id: 6, 
      name: "Frank Miller", 
      systemGroups: ["Developers"], 
      type: "Contractor", 
      employment: "Part Time", 
      access: "Developer", 
      lastActive: "1 day ago",
      reviewRecommendation: "",
      role: "Frontend Developer",
      userAction: null
    }
  ]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.systemGroups.some(group => group.toLowerCase().includes(searchQuery.toLowerCase())) ||
    user.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.employment.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.access.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleUserActionChange = (userId: number, action: UserAction) => {
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        return {
          ...user,
          userAction: action
        };
      }
      return user;
    }));

    const actionMessages = {
      approve: "Access approved for user",
      modify: "Access modified for user",
      revoke: "Access revoked for user"
    };

    if (action) {
      toast.success(actionMessages[action], {
        description: `User access has been updated`
      });
    }
  };

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

  const applyAllRecommendations = () => {
    setUsers(prev => prev.map(user => {
      if (user.reviewRecommendation) {
        return {
          ...user,
          userAction: user.reviewRecommendation as UserAction
        };
      }
      if (user.lastActive.includes('days') && parseInt(user.lastActive) > 30) {
        return { ...user, userAction: 'revoke' };
      } else if (user.access === 'Admin') {
        return { ...user, userAction: 'modify' };
      } else {
        return { ...user, userAction: 'approve' };
      }
    }));

    toast.success("All recommendations applied", {
      description: "User access has been updated according to AI recommendations"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-100 px-6 py-3 text-sm text-gray-600 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Security</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/">User Access Review</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Access Review</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>System Review For Jira</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">System Review For Jira</h1>
        
        <Card className="mb-6 border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
            <div className="md:col-span-2 flex items-center justify-center md:justify-start">
              <div className="bg-blue-50 p-3 rounded-md">
                <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M40 0L15 25L27.5 37.5L65 0H40Z" fill="#2684FF"/>
                  <path d="M26.5 25L39 37.5L52.5 25L40 12.5L26.5 25Z" fill="#2684FF"/>
                  <path d="M40 25L52.5 37.5L65 25L52.5 12.5L40 25Z" fill="#2684FF"/>
                </svg>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="font-bold text-gray-800">Jira</h3>
              <p className="text-sm text-gray-600">Service Management</p>
              <p className="text-sm text-gray-600">And CRM</p>
            </div>
            
            <div className="md:col-span-2">
              <p className="text-sm font-medium mb-1 text-gray-700">Progress</p>
              <Progress value={30} className="h-2 bg-gray-200" />
              <p className="text-right text-xs text-gray-600 mt-1">0/0</p>
            </div>
            
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-700">Reviewer</p>
              <p className="text-gray-600">N/A</p>
              
              <p className="text-sm font-medium mt-3 text-gray-700">Created Date</p>
              <p className="text-gray-600">03/31/2025</p>
            </div>
            
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-700">Modified Permissions</p>
              <p className="text-gray-600">N/A</p>
              
              <p className="text-sm font-medium mt-3 text-gray-700">Due Date</p>
              <p className="text-gray-600">04/07/2025</p>
            </div>
            
            <div className="md:col-span-2">
              <p className="text-sm font-medium text-gray-700">Removed Permissions</p>
              <p className="text-gray-600">N/A</p>
              
              <p className="text-sm font-medium mt-3 text-gray-700">Status</p>
              <Badge className="bg-orange-100 text-orange-600 hover:bg-orange-100">Incomplete</Badge>
            </div>
          </div>
        </Card>
        
        {isReviewStarted && isLoading && (
          <Card className="mb-6 border border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle>AI Access Review Progress</CardTitle>
              <CardDescription>Processing access patterns and detecting anomalies...</CardDescription>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>
        )}
        
        {!isReviewStarted && (
          <Card className="mb-6 border border-gray-200 shadow-sm">
            <CardContent className="p-6 flex justify-center">
              <Button 
                className="w-full max-w-md bg-blue-600 hover:bg-blue-700" 
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

        <Card className="mb-6 border border-gray-200 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>User Access</CardTitle>
              <Button size="sm" variant="outline" className="border-gray-300">
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search users..."
                  className="pl-9 border-gray-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="h-10 w-10 border-gray-300">
                <Filter className="h-4 w-4 text-gray-600" />
              </Button>
              <Button variant="outline" className="w-full md:w-auto border-gray-300 text-gray-700">
                {filteredUsers.length} Results
              </Button>
            </div>

            {isReviewStarted && analysisComplete && (
              <div className="bg-green-50 border border-green-100 p-4 rounded-md mb-6 flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                <div>
                  <h3 className="font-medium text-green-700">AI Access Review Complete</h3>
                  <p className="text-green-600 text-sm">All users have been analyzed and recommendations are available</p>
                </div>
                <Button 
                  className="ml-auto bg-green-600 hover:bg-green-700"
                  onClick={applyAllRecommendations}
                  size="sm"
                >
                  Apply All Recommendations
                </Button>
              </div>
            )}

            {filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {currentUsers.map((user) => {
                  const isBeingReviewed = isReviewStarted && isLoading && 
                    !usersReviewed.includes(user.name) && 
                    usersReviewed.length > 0;
                  
                  const isReviewed = isReviewStarted && 
                    (usersReviewed.includes(user.name) || analysisComplete);
                  
                  const userRecommendation = isReviewed 
                    ? user.reviewRecommendation || (user.lastActive.includes("days") && parseInt(user.lastActive) > 30 
                        ? "revoke" 
                        : user.access === "Admin" 
                            ? "modify" 
                            : "approve")
                    : "";
                  
                  return (
                    <Card key={user.id} className={`border border-gray-200 ${isBeingReviewed ? "animate-pulse" : ""}`}>
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <User className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-800">{user.name}</h3>
                              <p className="text-xs text-gray-500">{user.role}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {isReviewed && userRecommendation && (
                              <div className={`flex items-center ${
                                userRecommendation === "approve" ? "text-green-600" :
                                userRecommendation === "revoke" ? "text-red-600" : "text-orange-600"
                              }`}>
                                {userRecommendation === "approve" && <CheckCircle className="h-4 w-4" />}
                                {userRecommendation === "revoke" && <XCircle className="h-4 w-4" />}
                                {userRecommendation === "modify" && <Edit className="h-4 w-4" />}
                              </div>
                            )}
                            <UserActionToggle 
                              value={user.userAction} 
                              onValueChange={(action) => handleUserActionChange(user.id, action)}
                              size="sm" 
                            />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-4">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-gray-600 font-medium">Access</p>
                            <Badge variant={user.access === "Admin" ? "destructive" : "default"} className="text-xs mt-1">
                              {user.access}
                            </Badge>
                          </div>
                          <div>
                            <p className="text-gray-600 font-medium">Last Active</p>
                            <p className="text-gray-800">{user.lastActive}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 font-medium">Type</p>
                            <p className="text-gray-800">{user.type}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 font-medium">Employment</p>
                            <p className="text-gray-800">{user.employment}</p>
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-gray-600 font-medium">System Groups</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {user.systemGroups.map((group, idx) => (
                              <Badge key={idx} variant="outline" className="bg-gray-100 font-normal text-xs">
                                {group}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="bg-gray-50 p-8 rounded-md text-center">
                <div className="flex justify-center mb-4">
                  <FileSearch className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-700">No Data!</h3>
                <p className="text-gray-500">No users match your search criteria</p>
              </div>
            )}

            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length}
              </div>
              
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink onClick={() => setCurrentPage(1)} isActive={false}>
                      <ChevronsLeft className="h-4 w-4" />
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink 
                      onClick={() => setCurrentPage(current => Math.max(current - 1, 1))} 
                      isActive={false}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </PaginationLink>
                  </PaginationItem>
                  
                  {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }).map((_, idx) => (
                    <PaginationItem key={idx}>
                      <PaginationLink 
                        onClick={() => setCurrentPage(idx + 1)} 
                        isActive={currentPage === idx + 1}
                      >
                        {idx + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  <PaginationItem>
                    <PaginationLink 
                      onClick={() => setCurrentPage(current => Math.min(current + 1, Math.ceil(filteredUsers.length / usersPerPage)))}
                      isActive={false}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink 
                      onClick={() => setCurrentPage(Math.ceil(filteredUsers.length / usersPerPage))}
                      isActive={false}
                    >
                      <ChevronsRight className="h-4 w-4" />
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white py-4 border-t mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-sm text-gray-500">
          <div>© 2025 Akitra. All rights reserved. <Link to="/" className="text-blue-500">EULA</Link> & <Link to="/" className="text-blue-500">Privacy Policy</Link>.</div>
          <div>v23.13.1</div>
        </div>
      </div>
    </div>
  );
};

export default Index;
