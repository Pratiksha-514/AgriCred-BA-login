
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { InstrumentSnapshots } from "@/components/dashboard/InstrumentSnapshots";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleApplyFinancing = () => {
    navigate("/apply-financing");
  };

  return (
    <div className="flex-1 space-y-6 p-6 pb-16">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome to your AgriCred issuer dashboard
          </p>
        </div>
        <Button 
          onClick={handleApplyFinancing}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="mr-2 h-4 w-4" />
          Apply for Financing
        </Button>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Activity Feed */}
        <ActivityFeed />
        
        {/* Instrument Snapshots */}
        <InstrumentSnapshots />
      </div>
    </div>
  );
};

export default Dashboard;
