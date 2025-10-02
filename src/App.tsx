import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/layout/AppSidebar";
import { TopBar } from "@/components/layout/TopBar";

// Pages
import Dashboard from "./components/pages/Dashboard";
import Instruments from "./components/pages/Instruments";
import Offers from "./components/pages/Offers";
import Legal from "./components/pages/Legal";
import Payouts from "./components/pages/Payouts";
import Repayments from "./components/pages/Repayments";
import Analytics from "./components/pages/Analytics";
import Notifications from "./components/pages/Notifications";
import Settings from "./components/pages/Settings";
import ApplyForFinancing from "./components/pages/ApplyForFinancing";
import NotFound from "./components/pages/NotFound";

const queryClient = new QueryClient();

// Main layout wrapper
const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  </SidebarProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
          <Route path="/apply-financing" element={<MainLayout><ApplyForFinancing /></MainLayout>} />
          
          {/* Instruments now renders a single page with internal Tabs */}
          <Route path="/instruments" element={<MainLayout><Instruments /></MainLayout>} />

          <Route path="/offers" element={<MainLayout><Offers /></MainLayout>} />
          <Route path="/legal" element={<MainLayout><Legal /></MainLayout>} />
          <Route path="/payouts" element={<MainLayout><Payouts /></MainLayout>} />
          <Route path="/repayments" element={<MainLayout><Repayments /></MainLayout>} />
          <Route path="/analytics" element={<MainLayout><Analytics /></MainLayout>} />
          <Route path="/notifications" element={<MainLayout><Notifications /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
          <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;  