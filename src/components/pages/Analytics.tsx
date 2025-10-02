
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp, DollarSign, Clock, AlertTriangle, FileText } from "lucide-react";
import { toast } from "sonner";

const monthlyData = [
  { month: 'Jan', discounted: 450000, count: 12 },
  { month: 'Feb', discounted: 680000, count: 16 },
  { month: 'Mar', discounted: 920000, count: 23 },
  { month: 'Apr', discounted: 750000, count: 19 },
  { month: 'May', discounted: 1200000, count: 28 },
  { month: 'Jun', discounted: 1450000, count: 35 }
];

const commodityData = [
  { name: 'Rice', value: 35, color: '#2E7D32' },
  { name: 'Wheat', value: 25, color: '#FFA726' },
  { name: 'Maize', value: 20, color: '#42A5F5' },
  { name: 'Pulses', value: 15, color: '#AB47BC' },
  { name: 'Others', value: 5, color: '#78909C' }
];

const regionData = [
  { region: 'Punjab', invoices: 45, enwrs: 23 },
  { region: 'Haryana', invoices: 38, enwrs: 19 },
  { region: 'UP', invoices: 52, enwrs: 31 },
  { region: 'Maharashtra', invoices: 41, enwrs: 17 },
  { region: 'Karnataka', invoices: 29, enwrs: 14 }
];

const Analytics = () => {
  const handleExport = (type: string) => {
    toast.success(`Exporting ${type}... Download will start shortly.`);
  };

  return (
    <div className="flex-1 space-y-6 p-6 pb-16">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive insights into your financing activities and performance metrics.
        </p>
      </div>

      {/* Overview Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">📍 Total Discounted</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹54.5L</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">📈 Average Rate (%)</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">12.8%</div>
            <p className="text-xs text-muted-foreground">-0.5% improvement</p>
          </CardContent>
        </Card>
        <Card className="shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">⏱️ Payout Time (avg)</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">2.1 days</div>
            <p className="text-xs text-muted-foreground">Faster by 0.4 days</p>
          </CardContent>
        </Card>
        <Card className="shadow-md rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold">⚠️ Default/Delayed</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1.2%</div>
            <p className="text-xs text-muted-foreground">Industry: 3.5%</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Line Chart */}
        <Card className="shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="font-semibold">📈 Value Discounted Over Time</CardTitle>
            <CardDescription>Monthly trend of total discounted amounts</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${(value as number / 100000).toFixed(1)}L`, 'Amount']} />
                <Line type="monotone" dataKey="discounted" stroke="#2E7D32" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="font-semibold">🥧 Distribution by Commodity Types</CardTitle>
            <CardDescription>Breakdown of instruments by commodity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={commodityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {commodityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Regional Heatmap */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="font-semibold">🗺️ Region-wise Instrument Count</CardTitle>
          <CardDescription>Distribution of invoices and eNWRs across regions</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="invoices" fill="#2E7D32" name="Invoices" />
              <Bar dataKey="enwrs" fill="#FFA726" name="eNWRs" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Export Section */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5" />
            📤 Export Reports
          </CardTitle>
          <CardDescription>Download comprehensive reports in Excel or PDF format</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="p-4">
              <h4 className="font-semibold mb-2">All Instruments</h4>
              <p className="text-sm text-muted-foreground mb-3">Complete list of invoices and eNWRs</p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleExport('All Instruments - Excel')}
                  className="rounded-xl"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Excel
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleExport('All Instruments - PDF')}
                  className="rounded-xl"
                >
                  <Download className="h-4 w-4 mr-1" />
                  PDF
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-2">Offers & Loans</h4>
              <p className="text-sm text-muted-foreground mb-3">All accepted offers and loan details</p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleExport('Offers & Loans - Excel')}
                  className="rounded-xl"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Excel
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleExport('Offers & Loans - PDF')}
                  className="rounded-xl"
                >
                  <Download className="h-4 w-4 mr-1" />
                  PDF
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-2">Repayment Schedules</h4>
              <p className="text-sm text-muted-foreground mb-3">Upcoming and completed repayments</p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleExport('Repayment Schedules - Excel')}
                  className="rounded-xl"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Excel
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleExport('Repayment Schedules - PDF')}
                  className="rounded-xl"
                >
                  <Download className="h-4 w-4 mr-1" />
                  PDF
                </Button>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Time Period Selector */}
      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="font-semibold">📅 Report Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4 items-center">
          <Select defaultValue="last-6-months">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-quarter">Last Quarter</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-commodities">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-commodities">All Commodities</SelectItem>
              <SelectItem value="rice">Rice</SelectItem>
              <SelectItem value="wheat">Wheat</SelectItem>
              <SelectItem value="maize">Maize</SelectItem>
              <SelectItem value="pulses">Pulses</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-[#2E7D32] hover:bg-[#1B5E20] rounded-xl">
            Apply Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
