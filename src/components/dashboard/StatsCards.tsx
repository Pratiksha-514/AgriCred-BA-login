
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Package, TrendingUp, DollarSign } from "lucide-react";

const statsData = [
  {
    title: "Total Discounted Value",
    value: "₹12,00,000",
    icon: Briefcase,
    change: "+15.2%",
    changeType: "positive" as const,
    description: "vs last month"
  },
  {
    title: "Active Instruments",
    value: "4",
    subtitle: "2 Invoices, 2 eNWRs",
    icon: Package,
    change: "+2",
    changeType: "positive" as const,
    description: "new this week"
  },
  {
    title: "Offers Received",
    value: "6",
    subtitle: "Across all instruments",
    icon: TrendingUp,
    change: "3 pending",
    changeType: "neutral" as const,
    description: "review required"
  },
  {
    title: "Payouts Received",
    value: "₹10,50,000",
    icon: DollarSign,
    change: "100%",
    changeType: "positive" as const,
    description: "success rate"
  }
];

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <stat.icon className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            {stat.subtitle && (
              <p className="text-xs text-muted-foreground mb-2">{stat.subtitle}</p>
            )}
            <div className="flex items-center justify-between">
              <Badge 
                variant={
                  stat.changeType === "positive" ? "default" : 
                  stat.changeType === "neutral" ? "secondary" : "destructive"
                }
                className={
                  stat.changeType === "positive" ? "bg-green-100 text-green-800 hover:bg-green-100" :
                  stat.changeType === "neutral" ? "bg-orange-100 text-orange-800 hover:bg-orange-100" :
                  "bg-red-100 text-red-800 hover:bg-red-100"
                }
              >
                {stat.change}
              </Badge>
              <span className="text-xs text-muted-foreground">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
