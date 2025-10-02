import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, TrendingUp, AlertCircle, Search, Filter, FileText, Warehouse } from "lucide-react";
import { InstrumentTimeline } from "@/components/offers/InstrumentTimeline";

interface BidData {
  instrument: string;
  type: string;
  buyer: string;
  bestOffer: string;
  rate: string;
  auctionTime?: string;
  matched: boolean;
  status: string;
}

const Offers = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInstrument, setSelectedInstrument] = useState<string | null>(null);

  // Mock data for bids
  const bidsData: BidData[] = [
    {
      instrument: "INV-2024-001",
      type: "Invoice",
      buyer: "Reliance Retail",
      bestOffer: "₹2,00,000",
      rate: "12.5% p.a.",
      auctionTime: "2h 15m left",
      matched: false,
      status: "Live Auction"
    },
    {
      instrument: "ENWR-2024-002",
      type: "eNWR",
      buyer: "Wheat Stock",
      bestOffer: "₹6,40,000",
      rate: "11.8% p.a.",
      auctionTime: "45m left",
      matched: true,
      status: "Matched"
    },
    {
      instrument: "INV-2024-003",
      type: "Invoice",
      buyer: "Tata Motors",
      bestOffer: "₹1,50,000",
      rate: "13.2% p.a.",
      auctionTime: "Ended",
      matched: true,
      status: "Funded"
    },
    {
      instrument: "ENWR-2024-004",
      type: "eNWR",
      buyer: "Rice Stock",
      bestOffer: "₹4,20,000",
      rate: "12.0% p.a.",
      auctionTime: "1h 30m left",
      matched: false,
      status: "Live Auction"
    }
  ];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Live Auction":
        return "bg-blue-100 text-blue-800";
      case "Matched":
        return "bg-green-100 text-green-800";
      case "Funded":
        return "bg-purple-100 text-purple-800";
      case "Expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredBids = bidsData.filter(bid => {
    const matchesSearch = bid.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bid.buyer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || bid.status === statusFilter;
    const matchesTab = activeTab === "all" || 
                      (activeTab === "invoice" && bid.type === "Invoice") ||
                      (activeTab === "enwr" && bid.type === "eNWR");
    
    return matchesSearch && matchesStatus && matchesTab;
  });

  const renderDetailedView = () => {
    if (!selectedInstrument) return null;

    const instrument = bidsData.find(bid => bid.instrument === selectedInstrument);
    if (!instrument) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => setSelectedInstrument(null)}
            className="rounded-xl"
          >
            ← Back to All Offers
          </Button>
          <Badge className={getStatusBadgeColor(instrument.status)}>
            {instrument.status}
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Panel - Instrument Details */}
          <div className="space-y-6">
            {/* Existing offer details card */}
            <Card className="shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {instrument.type === "Invoice" ? <FileText className="h-5 w-5" /> : <Warehouse className="h-5 w-5" />}
                  {instrument.instrument}
                </CardTitle>
                <CardDescription>{instrument.buyer}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Best Offer</p>
                    <p className="text-2xl font-bold text-[#2E7D32]">{instrument.bestOffer}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Interest Rate</p>
                    <p className="text-xl font-semibold">{instrument.rate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className={getStatusBadgeColor(instrument.status)}>
                      {instrument.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Matched</p>
                    <div className="flex items-center gap-1">
                      {instrument.matched ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-orange-600" />
                      )}
                      <span className="font-medium">
                        {instrument.matched ? "Yes" : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline Component */}
            <InstrumentTimeline 
              instrumentId={instrument.instrument}
              instrumentType={instrument.type === 'Invoice' ? 'invoice' : 'enwr'}
            />
          </div>

          {/* Right Panel - Offers Timeline */}
          <div className="space-y-6">
            <Card className="shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle>Auction Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-semibold">HDFC Bank</p>
                      <p className="text-sm text-muted-foreground">2 minutes ago</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[#2E7D32]">₹2,00,000</p>
                      <p className="text-sm text-muted-foreground">12.5% p.a.</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">ICICI Bank</p>
                      <p className="text-sm text-muted-foreground">5 minutes ago</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹1,95,000</p>
                      <p className="text-sm text-muted-foreground">12.8% p.a.</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-semibold">Axis Bank</p>
                      <p className="text-sm text-muted-foreground">8 minutes ago</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹1,90,000</p>
                      <p className="text-sm text-muted-foreground">13.0% p.a.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 space-y-6 p-6 pb-16 bg-gray-50/50">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">Offers & Bids</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Offers & Bids</h1>
        <p className="text-lg text-muted-foreground">
          Track your financing requests and manage incoming offers
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="shadow-md rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Live Auctions</p>
                <p className="text-3xl font-bold text-blue-900">2</p>
              </div>
              <div className="p-3 bg-blue-200 rounded-xl">
                <Clock className="h-6 w-6 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Matched</p>
                <p className="text-3xl font-bold text-green-900">2</p>
              </div>
              <div className="p-3 bg-green-200 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Total Value</p>
                <p className="text-3xl font-bold text-purple-900">₹14.1L</p>
              </div>
              <div className="p-3 bg-purple-200 rounded-xl">
                <TrendingUp className="h-6 w-6 text-purple-700" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Avg. Rate</p>
                <p className="text-3xl font-bold text-orange-900">12.4%</p>
              </div>
              <div className="p-3 bg-orange-200 rounded-xl">
                <AlertCircle className="h-6 w-6 text-orange-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedInstrument ? (
        renderDetailedView()
      ) : (
        <div className="space-y-6">
          {/* Filters and Search */}
          <Card className="shadow-md rounded-2xl bg-white border-0">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
                  <TabsList className="grid w-full grid-cols-3 md:w-auto bg-gray-100 rounded-xl">
                    <TabsTrigger value="all" className="rounded-lg">All</TabsTrigger>
                    <TabsTrigger value="invoice" className="rounded-lg">Invoices</TabsTrigger>
                    <TabsTrigger value="enwr" className="rounded-lg">eNWRs</TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="flex gap-3 w-full md:w-auto">
                  <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search instruments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 rounded-xl"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40 rounded-xl">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Live Auction">Live Auction</SelectItem>
                      <SelectItem value="Matched">Matched</SelectItem>
                      <SelectItem value="Funded">Funded</SelectItem>
                      <SelectItem value="Expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bids Table */}
          <Card className="shadow-md rounded-2xl bg-white border-0">
            <CardHeader className="border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">Bids Inbox</CardTitle>
                <Badge variant="outline" className="text-[#2E7D32] border-[#2E7D32]">
                  {filteredBids.length} Active Instruments
                </Badge>
              </div>
              <CardDescription className="text-base">
                Track all your financing requests and offers in one place
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/80">
                    <tr className="border-b border-gray-100">
                      <th className="text-left p-4 font-semibold text-gray-900">Instrument</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Type</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Best Offer</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Auction Status</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Matched</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Status</th>
                      <th className="text-left p-4 font-semibold text-gray-900">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBids.map((bid, index) => (
                      <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                        <td className="p-4">
                          <div className="font-semibold text-gray-900">{bid.instrument}</div>
                          <div className="text-sm text-muted-foreground">{bid.buyer}</div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="font-medium">
                            {bid.type}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-[#2E7D32]">{bid.bestOffer}</div>
                          <div className="text-sm text-muted-foreground">{bid.rate}</div>
                        </td>
                        <td className="p-4">
                          {bid.auctionTime && bid.auctionTime !== "Ended" && (
                            <div className="flex items-center gap-2">
                              <div className="animate-pulse h-2 w-2 bg-blue-600 rounded-full"></div>
                              <span className="text-sm font-medium text-blue-600">{bid.auctionTime}</span>
                            </div>
                          )}
                          {bid.auctionTime === "Ended" && (
                            <span className="text-sm text-gray-600">Auction Ended</span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            {bid.matched ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <Clock className="h-4 w-4 text-orange-600" />
                            )}
                            <span className="text-sm font-medium">
                              {bid.matched ? "Yes" : "Pending"}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className={getStatusBadgeColor(bid.status)}>
                            {bid.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Button 
                            onClick={() => setSelectedInstrument(bid.instrument)}
                            className="bg-[#2E7D32] hover:bg-green-700 rounded-xl px-4 py-2"
                          >
                            View Timeline
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Offers;
