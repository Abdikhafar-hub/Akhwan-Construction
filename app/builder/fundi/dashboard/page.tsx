"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Hammer,
  Clock,
  Star,
  CheckCircle,
  Calendar,
  MessageSquare,
  Bell,
  FileCheck,
  ChevronRight,
  Filter,
  MapPin,
  Plus,
  X,
  Upload,
  Camera,
  AlertTriangle,
  DollarSign,
  FileText,
  Eye,
} from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"

type Job = {
  title: string;
  location: string;
  budget: string;
  posted: string;
  deadline: string;
  description: string;
  skills: string[];
};

type Project = {
  title: string;
  customer: string;
  location: string;
  amount: string;
  progress: number;
  dueDate: string;
  milestones: { name: string; completed: boolean }[];
};

export default function FundiDashboardPage() {
  const { logout } = useAuth();
  const router = useRouter();
  const [bidFormOpen, setBidFormOpen] = useState(false);
  const [jobDetailsOpen, setJobDetailsOpen] = useState(false);
  const [customBidOpen, setCustomBidOpen] = useState(false);
  const [messageClientOpen, setMessageClientOpen] = useState(false);
  const [updateProgressOpen, setUpdateProgressOpen] = useState(false);
  const [withdrawalOpen, setWithdrawalOpen] = useState(false);
  const [instantPayoutOpen, setInstantPayoutOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [addCertificationOpen, setAddCertificationOpen] = useState(false);
  const [addLicenseOpen, setAddLicenseOpen] = useState(false);
  const [viewAllReviewsOpen, setViewAllReviewsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const { toast } = useToast();

  const handleBidSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Bid Submitted",
      description: "Your bid has been submitted successfully.",
    });
    setBidFormOpen(false);
  };

  const handleCustomBidSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Custom Bid Created",
      description: "Your custom bid has been created successfully.",
    });
    setCustomBidOpen(false);
  };

  const handleMessageSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the client.",
    });
    setMessageClientOpen(false);
  };

  const handleProgressUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Progress Updated",
      description: "Project progress has been updated successfully.",
    });
    setUpdateProgressOpen(false);
  };

  const handleMilestoneComplete = (milestone: string) => {
    toast({
      title: "Milestone Completed",
      description: `${milestone} has been marked as complete.`,
    });
  };

  const handleWithdrawalRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Withdrawal Requested",
      description: "Your withdrawal request has been submitted.",
    });
    setWithdrawalOpen(false);
  };

  const handleEnableInstantPayout = () => {
    toast({
      title: "Instant Payout Enabled",
      description: "You can now receive instant payouts with a 2% fee.",
    });
    setInstantPayoutOpen(false);
  };

  const handleProfileUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
    setEditProfileOpen(false);
  };

  const handleCertificationUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Certification Added",
      description: "Your certification has been uploaded for verification.",
    });
    setAddCertificationOpen(false);
  };

  const handleLicenseUpload = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "License Added",
      description: "Your license has been uploaded for verification.",
    });
    setAddLicenseOpen(false);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-background border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <span className="font-bold">J</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Akhwan</h1>
              <p className="text-sm text-muted-foreground">Fundi Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Hammer className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Bob Fundi</p>
                <p className="text-xs text-muted-foreground">Plumbing Specialist</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => { logout(); router.push('/login'); }}>
              Log Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Welcome, Bob!</h2>
            <p className="text-muted-foreground">Manage your jobs, bids, and payments from your dashboard</p>
          </div>
          <Button className="mt-4 md:mt-0" onClick={() => setJobDetailsOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Find New Jobs
          </Button>
        </div>

        <Toaster />
      </div>
    </div>
  );
}
