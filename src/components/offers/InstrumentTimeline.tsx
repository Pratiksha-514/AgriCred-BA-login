
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, Upload, FileText, Users, CreditCard } from "lucide-react";

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'pending';
  timestamp?: string;
  icon: any;
}

interface InstrumentTimelineProps {
  instrumentId: string;
  instrumentType: 'invoice' | 'enwr';
}

export function InstrumentTimeline({ instrumentId, instrumentType }: InstrumentTimelineProps) {
  // Mock timeline data - in real app this would come from API
  const getTimelineSteps = (): TimelineStep[] => {
    const baseSteps = [
      {
        id: '1',
        title: 'Document Uploaded',
        description: `${instrumentType === 'invoice' ? 'Invoice' : 'eNWR'} uploaded and verified`,
        status: 'completed' as const,
        timestamp: '2 hours ago',
        icon: Upload
      },
      {
        id: '2',
        title: 'OCR Processing',
        description: 'Document details extracted and validated',
        status: 'completed' as const,
        timestamp: '2 hours ago',
        icon: FileText
      },
      {
        id: '3',
        title: 'Auction Live',
        description: 'Dutch auction started, receiving bids from lenders',
        status: 'active' as const,
        timestamp: '1 hour ago',
        icon: Users
      },
      {
        id: '4',
        title: 'Best Offer Matched',
        description: 'Auto-matched with highest bidder',
        status: 'pending' as const,
        icon: CreditCard
      },
      {
        id: '5',
        title: 'Funds Disbursed',
        description: 'Amount credited to your account',
        status: 'pending' as const,
        icon: CheckCircle
      }
    ];

    return baseSteps;
  };

  const timelineSteps = getTimelineSteps();

  const getStatusIcon = (status: TimelineStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'active':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: TimelineStep['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <Card className="shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Clock className="h-5 w-5 text-[#2E7D32]" />
          Progress Timeline - {instrumentId}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {timelineSteps.map((step, index) => (
            <div key={step.id} className="flex gap-4">
              {/* Timeline Line */}
              <div className="flex flex-col items-center">
                <div className={`p-2 rounded-full ${
                  step.status === 'completed' ? 'bg-green-100' :
                  step.status === 'active' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <step.icon className={`h-4 w-4 ${
                    step.status === 'completed' ? 'text-green-600' :
                    step.status === 'active' ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                </div>
                {index < timelineSteps.length - 1 && (
                  <div className={`w-0.5 h-16 ${
                    step.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                  }`} />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-8">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-semibold">{step.title}</h4>
                  <Badge className={getStatusColor(step.status)}>
                    {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                  </Badge>
                  {step.timestamp && (
                    <span className="text-xs text-muted-foreground">{step.timestamp}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                
                {step.status === 'active' && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="animate-pulse h-2 w-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm font-medium text-blue-800">
                        Live auction - 2 hours remaining
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
