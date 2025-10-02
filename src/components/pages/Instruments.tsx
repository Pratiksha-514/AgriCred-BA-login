import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Filter, Eye, Edit, Download, TrendingUp, Users, Layers } from "lucide-react";
import { UploadInstrumentModal } from "@/components/instruments/UploadInstrumentModal";
import { StockWithdrawalModal } from "@/components/instruments/StockWithdrawalModal";

// --- Mock Data Structures (for a complete, runnable example) ---

// Mock data for Invoices
const mockInvoices = [
  {
    id: "INV-001",
    buyer: "Acme Corp",
    amount: "₹5.50L",
    fundedAmount: "₹4.50L",
    fundingPercentage: 82,
    bestOffer: "₹5.00L",
    rate: "12.5% p.a.",
    investors: 3,
    lotSizes: 5,
    status: "Partially Funded",
  },
  {
    id: "INV-002",
    buyer: "Globex Inc.",
    amount: "₹2.25L",
    fundedAmount: "₹2.25L",
    fundingPercentage: 100,
    bestOffer: "₹2.10L",
    rate: "11.0% p.a.",
    investors: 2,
    lotSizes: 3,
    status: "Funded",
  },
  {
    id: "INV-003",
    buyer: "Stark Industries",
    amount: "₹8.00L",
    fundedAmount: "₹0.00L",
    fundingPercentage: 0,
    bestOffer: "₹7.50L",
    rate: "11.8% p.a.",
    investors: 6,
    lotSizes: 10,
    status: "Awaiting Offer",
  },
  {
    id: "INV-004",
    buyer: "Wayne Enterprises",
    amount: "₹1.50L",
    fundedAmount: "₹0.00L",
    fundingPercentage: 0,
    bestOffer: "-",
    rate: "-",
    investors: 0,
    lotSizes: 0,
    status: "Draft",
  },
];

// Mock data for eNWRs (Electronic Negotiable Warehouse Receipts)
const mockENWRs = [
  {
    id: "ENWR-001",
    commodity: "Wheat",
    quantity: "150 MT",
    value: "₹6.75L",
    warehouse: "Central Warehousing Corp.",
    expiry: "2026-03-15",
    fundedAmount: "₹5.00L",
    fundingPercentage: 74,
    bestOffer: "₹6.00L",
    rate: "12.0% p.a.",
    investors: 4,
    lotSizes: 8,
    status: "Partially Funded",
  },
  {
    id: "ENWR-002",
    commodity: "Soybeans",
    quantity: "200 MT",
    value: "₹8.50L",
    warehouse: "Agri Logistics Hub",
    expiry: "2026-05-20",
    fundedAmount: "₹8.50L",
    fundingPercentage: 100,
    bestOffer: "₹8.00L",
    rate: "10.5% p.a.",
    investors: 5,
    lotSizes: 12,
    status: "Funded",
  },
  {
    id: "ENWR-003",
    commodity: "Cotton",
    quantity: "80 MT",
    value: "₹4.00L",
    warehouse: "National Agri-Logistics",
    expiry: "2026-06-01",
    fundedAmount: "₹0.00L",
    fundingPercentage: 0,
    bestOffer: "₹3.80L",
    rate: "13.2% p.a.",
    investors: 2,
    lotSizes: 4,
    status: "Under Negotiation",
  },
];

// Helper Functions
const getStatusBadge = (status: string) => {
  const variants = {
    "Funded": "default",
    "Partially Funded": "secondary",
    "Awaiting Offer": "outline",
    "Under Negotiation": "outline",
    "Rejected": "destructive",
    "Draft": "outline"
  } as const;
  
  return <Badge variant={variants[status as keyof typeof variants] || "outline"}>{status}</Badge>;
};

const getFundingColor = (percentage: number) => {
  if (percentage >= 80) return "text-green-600";
  if (percentage >= 50) return "text-yellow-600";
  return "text-red-600";
};

const Instruments = () => {
  const [activeTab, setActiveTab] = useState("invoices");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);

  const [selectedENWR, setSelectedENWR] = useState<{
    id: string;
    commodity: string;
    quantity: string;
  } | null>(null);

  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Filters
  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = invoice.buyer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          invoice.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const filteredENWRs = mockENWRs.filter(enwr => {
    const matchesSearch = enwr.commodity.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          enwr.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || enwr.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleWithdrawRequest = (enwr: typeof mockENWRs[0]) => {
    setSelectedENWR({
      id: enwr.id,
      commodity: enwr.commodity,
      quantity: enwr.quantity,
    });
    setShowWithdrawalModal(true);
  };

  return (
    <div className="flex-1 space-y-6 p-6 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Instruments & Offers</h1>
          <p className="text-muted-foreground mt-1">
            Manage your invoices, eNWRs, and track funding offers in one place.
          </p>
        </div>
        <Button onClick={() => setShowUploadModal(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Upload New Instrument
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">₹14.55L</p>
              </div>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Funded</p>
                <p className="text-2xl font-bold text-green-600">₹8.89L</p>
              </div>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Investors</p>
                <p className="text-2xl font-bold">11</p>
              </div>
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Rate</p>
                <p className="text-2xl font-bold">11.8%</p>
              </div>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Input
            placeholder="Search by ID or buyer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Awaiting Offer">Awaiting Offer</SelectItem>
              <SelectItem value="Under Negotiation">Under Negotiation</SelectItem>
              <SelectItem value="Partially Funded">Partially Funded</SelectItem>
              <SelectItem value="Funded">Funded</SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="invoices" className="flex items-center gap-2">
            Invoices ({filteredInvoices.length})
          </TabsTrigger>
          <TabsTrigger value="enwrs" className="flex items-center gap-2">
            eNWRs ({filteredENWRs.length})
          </TabsTrigger>
        </TabsList>

        {/* Invoices Tab */}
        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Portfolio & Offers</CardTitle>
              <CardDescription>All your uploaded invoices, funding status, and live offers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Funding Status</TableHead>
                    <TableHead>Best Offer</TableHead>
                    <TableHead>Investors</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.buyer}</TableCell>
                      <TableCell className="font-semibold">{invoice.amount}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold ${getFundingColor(invoice.fundingPercentage)}`}>
                              {invoice.fundedAmount}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ({invoice.fundingPercentage}%)
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-semibold text-green-600">{invoice.bestOffer}</div>
                          <div className="text-sm text-muted-foreground">{invoice.rate}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{invoice.investors} investors</div>
                          <div className="text-muted-foreground">{invoice.lotSizes} lots</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* eNWRs Tab */}
        <TabsContent value="enwrs">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    🧑‍🌾 Issuer Dashboard - eNWR Portfolio & Stock Withdrawal
                  </CardTitle>
                  <CardDescription>Electronic Negotiable Warehouse Receipts, funding status, and withdrawal options</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>eNWR ID</TableHead>
                    <TableHead>Commodity</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Funding Status</TableHead>
                    <TableHead>Best Offer</TableHead>
                    <TableHead>Investors</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredENWRs.map((enwr) => (
                    <TableRow key={enwr.id}>
                      <TableCell className="font-medium">{enwr.id}</TableCell>
                      <TableCell>{enwr.commodity}</TableCell>
                      <TableCell>{enwr.quantity}</TableCell>
                      <TableCell className="font-semibold">{enwr.value}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold ${getFundingColor(enwr.fundingPercentage)}`}>
                              {enwr.fundedAmount}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ({enwr.fundingPercentage}%)
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-semibold text-green-600">{enwr.bestOffer}</div>
                          <div className="text-sm text-muted-foreground">{enwr.rate}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{enwr.investors} investors</div>
                          <div className="text-muted-foreground">{enwr.lotSizes} lots</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(enwr.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleWithdrawRequest(enwr)}
                            className="text-xs"
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Withdraw
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <UploadInstrumentModal open={showUploadModal} onClose={() => setShowUploadModal(false)} />
      <StockWithdrawalModal 
        open={showWithdrawalModal} 
        onClose={() => setShowWithdrawalModal(false)}
        selectedENWR={selectedENWR}
      />
    </div>
  );
};

export default Instruments;