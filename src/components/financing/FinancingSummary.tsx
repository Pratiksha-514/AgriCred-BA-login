
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Warehouse, TrendingUp, Clock } from "lucide-react";

interface FinancingSummaryProps {
  activeTab: string;
}

export function FinancingSummary({ activeTab }: FinancingSummaryProps) {
  const getInstrumentIcon = () => {
    return activeTab === "invoice" ? FileText : Warehouse;
  };

  const getInstrumentType = () => {
    return activeTab === "invoice" ? "Invoice" : "eNWR";
  };

  const getEstimatedFinancing = () => {
    return activeTab === "invoice" ? "₹2,00,000" : "₹6,40,000";
  };

  const getExpectedOffers = () => {
    return activeTab === "invoice" ? "3-5 offers" : "2-4 offers";
  };

  const Icon = getInstrumentIcon();

  return (
    <div className="space-y-4 sticky top-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Icon className="h-5 w-5 text-primary" />
            Smart Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Instrument Type</span>
              <Badge variant="outline">{getInstrumentType()}</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge variant="secondary">Draft</Badge>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Estimated Financing</span>
                <span className="font-semibold text-primary">{getEstimatedFinancing()}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Based on 80% of {activeTab === "invoice" ? "invoice" : "commodity"} value
              </p>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Expected Offers</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                <span className="text-sm font-medium">{getExpectedOffers()}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Processing Time</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-orange-600" />
                <span className="text-sm">2-4 hours</span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <Button className="w-full" disabled>
            Submit Financing Request
          </Button>
          
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Complete the form to enable submission</p>
            <p>• You'll receive offers within 4 hours</p>
            <p>• Compare and accept the best offer</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Application</span>
              <span>2 days ago</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Success Rate</span>
              <span className="text-green-600 font-medium">95%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg. Rate</span>
              <span>12.5% p.a.</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
