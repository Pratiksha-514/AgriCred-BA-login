
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, DollarSign, FileText, Clock, CheckCircle, X } from "lucide-react";
import { toast } from "sonner";

const mockNotifications = [
  {
    id: "1",
    type: "offer",
    title: "New Offer Received",
    message: "Offer received on Invoice #INV023 from SBI AgriFund at 12.8%",
    time: "2 minutes ago",
    isNew: true,
    priority: "high"
  },
  {
    id: "2",
    type: "payout",
    title: "Payout Received", 
    message: "Payout of ₹3L received for eNWR #ENWR003",
    time: "1 hour ago",
    isNew: true,
    priority: "medium"
  },
  {
    id: "3",
    type: "repayment",
    title: "Repayment Reminder",
    message: "Repayment due in 3 days for Invoice #INV020 - ₹1.85L",
    time: "3 hours ago",
    isNew: false,
    priority: "high"
  },
  {
    id: "4",
    type: "auction",
    title: "Auction Ending Soon",
    message: "Bid window closing in 1 hour for Invoice #INV026",
    time: "5 hours ago",
    isNew: false,
    priority: "medium"
  },
  {
    id: "5",
    type: "document",
    title: "Document Signed",
    message: "Loan agreement for eNWR #ENWR004 has been digitally signed",
    time: "1 day ago",
    isNew: false,
    priority: "low"
  },
  {
    id: "6",
    type: "match",
    title: "Auto-Match Successful",
    message: "Auto-match successful for eNWR #ENWR011 at 11.9%",
    time: "2 days ago",
    isNew: false,
    priority: "medium"
  }
];

const getNotificationIcon = (type: string) => {
  const icons = {
    offer: DollarSign,
    payout: CheckCircle,
    repayment: Clock,
    auction: Bell,
    document: FileText,
    match: CheckCircle
  };
  const Icon = icons[type as keyof typeof icons] || Bell;
  return <Icon className="h-4 w-4" />;
};

const getNotificationColor = (type: string, priority: string) => {
  if (priority === "high") return "bg-red-100 border-red-200";
  if (priority === "medium") return "bg-yellow-100 border-yellow-200";
  return "bg-blue-100 border-blue-200";
};

const getPriorityBadge = (priority: string) => {
  const variants = {
    high: "destructive",
    medium: "secondary", 
    low: "outline"
  } as const;
  
  return <Badge variant={variants[priority as keyof typeof variants]}>
    {priority.toUpperCase()}
  </Badge>;
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, isNew: false } : notif
      )
    );
    toast.success("Notification marked as read");
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, isNew: false }))
    );
    toast.success("All notifications marked as read");
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast.success("Notification dismissed");
  };

  const unreadCount = notifications.filter(n => n.isNew).length;

  return (
    <div className="flex-1 space-y-6 p-6 pb-16">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">🔔 Notifications</h1>
          <p className="text-muted-foreground mt-1">
            Stay updated with offers, payments, and important alerts.
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline" className="rounded-xl">
            Mark All as Read ({unreadCount})
          </Button>
        )}
      </div>

      {/* Notification Settings */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="font-semibold">⚙️ Notification Settings</CardTitle>
          <CardDescription>Manage how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch 
                checked={emailNotifications} 
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
              </div>
              <Switch 
                checked={smsNotifications} 
                onCheckedChange={setSmsNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Browser push notifications</p>
              </div>
              <Switch 
                checked={pushNotifications} 
                onCheckedChange={setPushNotifications}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="font-semibold">Recent Notifications</CardTitle>
          <CardDescription>
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All notifications read'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-4 rounded-xl border ${getNotificationColor(notification.type, notification.priority)} ${
                  notification.isNew ? 'border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-full ${
                      notification.priority === 'high' ? 'bg-red-200' :
                      notification.priority === 'medium' ? 'bg-yellow-200' : 'bg-blue-200'
                    }`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{notification.title}</h4>
                        {notification.isNew && <Badge className="bg-red-500">🔴 New</Badge>}
                        {getPriorityBadge(notification.priority)}
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {notification.isNew && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="rounded-xl"
                      >
                        ✅ Mark Read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => dismissNotification(notification.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {notifications.length === 0 && (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No notifications</h3>
                <p className="text-muted-foreground">You're all caught up!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Alert Types Legend */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="font-semibold">🏷️ Notification Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-full">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Offer Notifications</p>
                  <p className="text-sm text-muted-foreground">New bids and offers received</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Payout Alerts</p>
                  <p className="text-sm text-muted-foreground">Fund disbursements and transfers</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Clock className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium">Repayment Reminders</p>
                  <p className="text-sm text-muted-foreground">Upcoming due dates</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Bell className="h-4 w-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Auction Updates</p>
                  <p className="text-sm text-muted-foreground">Bidding windows and matches</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-full">
                  <FileText className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium">Document Status</p>
                  <p className="text-sm text-muted-foreground">Signing and verification updates</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
