
import { useState } from "react";
import { 
  Home, 
  FileText, 
  TrendingUp, 
  FileCheck, 
  DollarSign, 
  RotateCcw, 
  BarChart3, 
  Bell, 
  Settings,
  CreditCard
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Apply for Financing",
    url: "/apply-financing",
    icon: CreditCard,
  },
  {
    title: "My Instruments",
    url: "/instruments",
    icon: FileText,
    subItems: [
      { title: "Invoices", url: "/instruments/invoices" },
      { title: "eNWRs", url: "/instruments/enwrs" },
    ]
  },
  {
    title: "Offers & Bids",
    url: "/offers",
    icon: TrendingUp,
  },
  {
    title: "Legal Docs & Contracts",
    url: "/legal",
    icon: FileCheck,
  },
  {
    title: "Funds & Payouts",
    url: "/payouts",
    icon: DollarSign,
  },
  {
    title: "Repayments",
    url: "/repayments",
    icon: RotateCcw,
  },
  {
    title: "Analytics & Reports",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Notifications",
    url: "/notifications",
    icon: Bell,
  },
  {
    title: "Settings & KYC",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/" && currentPath === "/") return true;
    if (path !== "/" && currentPath.startsWith(path)) return true;
    return false;
  };

  const getNavClass = (path: string) => {
    return isActive(path) 
      ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";
  };

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-border/60 p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">AC</span>
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-lg text-primary">AgriCred</h2>
              <p className="text-xs text-muted-foreground">Issuer Dashboard</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground mb-2">
            MAIN MENU
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${getNavClass(item.url)}`}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && (
                        <span className="text-sm font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
