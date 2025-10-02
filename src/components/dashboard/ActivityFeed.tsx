
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, Upload, DollarSign, FileText } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "upload",
    title: "Invoice #INV023 uploaded",
    description: "Awaiting Offers",
    time: "2h ago",
    icon: Upload,
    status: "pending"
  },
  {
    id: 2,
    type: "payout",
    title: "Payout for eNWR #ENWR003 disbursed",
    description: "₹3,00,000 credited to HDFC Bank",
    time: "4h ago",
    icon: DollarSign,
    status: "completed"
  },
  {
    id: 3,
    type: "offer",
    title: "New offer received",
    description: "Axis Bank - ₹1,80,000 @ 13.5% for INV023",
    time: "6h ago",
    icon: FileText,
    status: "new"
  },
  {
    id: 4,
    type: "agreement",
    title: "Legal agreement signed",
    description: "eNWR #ENWR003 lien marking completed",
    time: "1d ago",
    icon: CheckCircle,
    status: "completed"
  },
  {
    id: 5,
    type: "upload",
    title: "Invoice #INV020 uploaded",
    description: "BigBasket - ₹5,00,000",
    time: "2d ago",
    icon: Upload,
    status: "completed"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-orange-100 text-orange-800";
    case "new":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function ActivityFeed() {
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <activity.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{activity.title}</p>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                {activity.status}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
