
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Warehouse, TrendingUp, Clock, CheckCircle, AlertCircle, BarChart3 } from "lucide-react";

interface FinancingSmartSidebarProps {
  activeTab: string;
  applicationData: {
    instrumentType: string;
    status: string;
    estimatedFinancing: number;
    invoiceAmount: number;
    enwrValue: number;
  };
}

export function FinancingSmartSidebar({ activeTab, applicationData }: FinancingSmartSidebarProps) {
  const getInstrumentIcon = () => {
    return activeTab === "invoice" ? FileText : Warehouse;
  };

  const getInstrumentType = () => {
    return activeTab === "invoice" ? "Invoice" : "eNWR";
  };

  const getStatusColor = () => {
    switch (applicationData.status) {
      case 'draft': return 'bg-gray-100 text-gray-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'verified': return 'bg-green-100 text-green-700';
      case 'submitted': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = () => {
    switch (applicationData.status) {
      case 'draft': return 'Draft';
      case 'processing': return 'Processing';
      case 'verified': return 'Verified';
      case 'submitted': return 'Submitted';
      default: return 'Draft';
    }
  };

  const getEstimatedFinancing = () => {
    if (applicationData.estimatedFinancing > 0) {
      return `₹${applicationData.estimatedFinancing.toLocaleString()}`;
    }
    return activeTab === "invoice" ? "₹2,00,000" : "₹6,40,000";
  };

  const getExpectedOffers = () => {
    return activeTab === "invoice" ? "3-5 offers" : "2-4 offers";
  };

  const getProcessingTime = () => {
    return activeTab === "invoice" ? "2-4 hours" : "4-6 hours";
  };

  const Icon = getInstrumentIcon();

  return (
    <div className="space-y-6 sticky top-6">
      {/* Main Summary Card */}
      <Card className="shadow-md rounded-2xl border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-3">
            <div className="p-2 bg-[#2E7D32]/10 rounded-xl">
              <Icon className="h-6 w-6 text-[#2E7D32]" />
            </div>
            Smart Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground font-medium">Instrument Type</span>
              <Badge variant="outline" className="border-[#2E7D32] text-[#2E7D32]">
                {getInstrumentType()}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground font-medium">Status</span>
              <Badge className={getStatusColor()}>
                {getStatusText()}
              </Badge>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground font-medium">Estimated Financing</span>
                <span className="font-bold text-lg text-[#2E7D32]">{getEstimatedFinancing()}</span>
              </div>
              <p className="text-xs text-muted-foreground bg-green-50 p-2 rounded-lg">
                💡 Based on 80% of {activeTab === "invoice" ? "invoice" : "commodity"} value
              </p>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground font-medium">Expected Offers</span>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-semibold">{getExpectedOffers()}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground font-medium">Processing Time</span>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium">{getProcessingTime()}</span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <Button 
            className="w-full h-12 bg-[#2E7D32] hover:bg-green-700 rounded-xl text-base font-semibold" 
            disabled={applicationData.status === 'draft'}
          >
            {applicationData.status === 'submitted' ? 'Request Submitted ✓' : 'Submit Financing Request'}
          </Button>
          
          <div className="text-xs text-muted-foreground space-y-2 bg-gray-50 p-3 rounded-xl">
            <div className="flex items-start gap-2">
              <CheckCircle className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
              <span>Complete the form to enable submission</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-3 w-3 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>You'll receive offers within {getProcessingTime()}</span>
            </div>
            <div className="flex items-start gap-2">
              <BarChart3 className="h-3 w-3 text-purple-600 mt-0.5 flex-shrink-0" />
              <span>Compare and accept the best offer</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Quick Stats Card */}
      <Card className="shadow-md rounded-2xl border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">Your Track Record</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Last Application</span>
              <span className="font-medium">2 days ago</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Success Rate</span>
              <div className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-600" />
                <span className="text-green-600 font-semibold">95%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Avg. Rate</span>
              <span className="font-medium">12.5% p.a.</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Funded</span>
              <span className="font-semibold text-[#2E7D32]">₹25.6L</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
