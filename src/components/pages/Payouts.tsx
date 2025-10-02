
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarIcon, Download, CreditCard, Smartphone, Building2, Warehouse, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const mockENWRs = [
  {
    id: "ENWR003",
    commodity: "Wheat",
    quantity: "500 MT",
    warehouse: "WDRA Warehouse Pune",
    value: "₹3,00,000",
    status: "Funded",
    expiry: "2024-12-31",
    daysStored: 45,
    location: "Pune, Maharashtra"
  },
  {
    id: "ENWR004",
    commodity: "Rice",
    quantity: "750 MT",
    warehouse: "WDRA Warehouse Delhi",
    value: "₹4,50,000",
    status: "Funded",
    expiry: "2025-01-15",
    daysStored: 32,
    location: "Delhi"
  },
  {
    id: "ENWR005",
    commodity: "Maize",
    quantity: "300 MT",
    warehouse: "WDRA Warehouse Mumbai",
    value: "₹1,80,000",
    status: "Funded",
    expiry: "2024-11-30",
    daysStored: 28,
    location: "Mumbai, Maharashtra"
  }
];

const getStatusBadge = (status: string) => {
  return <Badge variant="default">{status}</Badge>;
};

const Payouts = () => {
  const { toast } = useToast();
  const [selectedENWR, setSelectedENWR] = useState<any>(null);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    quantityToWithdraw: "",
    deliveryType: "",
    assayRequired: false,
    deliveryReason: "",
    paymentMode: "",
    acknowledgement: false
  });
  const [deliveryWindow, setDeliveryWindow] = useState<Date>();
  const [uploadedProof, setUploadedProof] = useState<File | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "processing" | "success" | "failed">("pending");

  const filteredENWRs = mockENWRs.filter(enwr => {
    const matchesSearch = enwr.commodity.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         enwr.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const calculateCharges = () => {
    if (!selectedENWR) return { storage: 0, handling: 0, assaying: 0, processing: 0, total: 0 };
    
    const qty = parseInt(formData.quantityToWithdraw) || 0;
    const storageCharges = qty * 240 * selectedENWR.daysStored; // ₹240/MT/Day
    const handlingCharges = qty * 100; // ₹100/MT
    const assayingCharges = formData.assayRequired ? 2000 : 0;
    const processingCharges = 500;
    
    return {
      storage: storageCharges,
      handling: handlingCharges,
      assaying: assayingCharges,
      processing: processingCharges,
      total: storageCharges + handlingCharges + assayingCharges + processingCharges
    };
  };

  const charges = calculateCharges();

  const handleWithdrawRequest = (enwr: any) => {
    setSelectedENWR(enwr);
    setFormData({
      quantityToWithdraw: "",
      deliveryType: "",
      assayRequired: false,
      deliveryReason: "",
      paymentMode: "",
      acknowledgement: false
    });
    setDeliveryWindow(undefined);
    setPaymentStatus("pending");
    setShowWithdrawModal(true);
  };

  const handlePayment = () => {
    if (!formData.paymentMode) {
      toast({
        title: "Payment Mode Required",
        description: "Please select a payment mode to proceed.",
        variant: "destructive"
      });
      return;
    }

    setPaymentStatus("processing");
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentStatus("success");
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
      });
    }, 2000);
  };

  const handleSubmit = () => {
    if (paymentStatus !== "success") {
      toast({
        title: "Payment Required",
        description: "Please complete payment before submitting the request.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.acknowledgement) {
      toast({
        title: "Acknowledgement Required",
        description: "Please tick the acknowledgement checkbox to proceed.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Delivery Request Submitted",
      description: "Your stock withdrawal request has been submitted successfully. Warehouse notification sent.",
    });
    setShowWithdrawModal(false);
  };

  const getPaymentStatusBadge = () => {
    switch (paymentStatus) {
      case "success":
        return <Badge className="bg-green-100 text-green-800">🟢 Payment Successful</Badge>;
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800">🟠 Processing Payment</Badge>;
      case "failed":
        return <Badge className="bg-red-100 text-red-800">🔴 Payment Failed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">⚪ Payment Pending</Badge>;
    }
  };

  const canSubmit = paymentStatus === "success" && formData.acknowledgement;

  return (
    <div className="flex-1 space-y-6 p-6 pb-16">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          🧑‍🌾 Stock Withdrawal Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Select eNWR stocks for withdrawal and process delivery requests with integrated payments.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available eNWRs</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockENWRs.length}</div>
            <p className="text-xs text-muted-foreground">Ready for withdrawal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stock Value</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹9.30L</div>
            <p className="text-xs text-muted-foreground">Across all commodities</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quantity</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,550 MT</div>
            <p className="text-xs text-muted-foreground">Available for withdrawal</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search eNWRs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by eNWR ID or commodity..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </CardContent>
      </Card>

      {/* eNWR Stock Withdrawal Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📥 Available eNWR Stocks for Withdrawal
          </CardTitle>
          <CardDescription>Select commodities to initiate withdrawal and delivery requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>eNWR ID</TableHead>
                <TableHead>Commodity</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Warehouse Location</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Days Stored</TableHead>
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
                  <TableCell>{enwr.location}</TableCell>
                  <TableCell className="font-semibold">{enwr.value}</TableCell>
                  <TableCell>{enwr.daysStored} days</TableCell>
                  <TableCell>{getStatusBadge(enwr.status)}</TableCell>
                  <TableCell>
                    <Button 
                      onClick={() => handleWithdrawRequest(enwr)}
                      className="flex items-center gap-2"
                      size="sm"
                    >
                      <Download className="h-4 w-4" />
                      Withdraw Stock
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Stock Withdrawal Modal */}
      <Dialog open={showWithdrawModal} onOpenChange={setShowWithdrawModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              🧑‍🌾 Stock Withdrawal Request
            </DialogTitle>
            <DialogDescription>
              📥 Delivery Request Form - Configure withdrawal details and process payment
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Left Column - Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Withdrawal Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="enwrNumber">eNWR Number</Label>
                      <Input
                        id="enwrNumber"
                        value={selectedENWR?.id || ""}
                        disabled
                        className="bg-gray-50"
                      />
                      <p className="text-xs text-muted-foreground">✅ Verified via NeRL</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="commodity">Commodity</Label>
                      <Input
                        id="commodity"
                        value={selectedENWR?.commodity || ""}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalQuantity">Total Quantity Available</Label>
                      <Input
                        id="totalQuantity"
                        value={selectedENWR?.quantity || ""}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantityToWithdraw">Quantity to Withdraw</Label>
                      <Input
                        id="quantityToWithdraw"
                        placeholder="e.g., 50 MT"
                        value={formData.quantityToWithdraw}
                        onChange={(e) => setFormData({...formData, quantityToWithdraw: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryType">Delivery Type</Label>
                      <Select value={formData.deliveryType} onValueChange={(value) => setFormData({...formData, deliveryType: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select delivery type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">Full Delivery</SelectItem>
                          <SelectItem value="partial">Partial Delivery</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="deliveryWindow">Delivery Window</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !deliveryWindow && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {deliveryWindow ? format(deliveryWindow, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={deliveryWindow}
                            onSelect={(date) => setDeliveryWindow(date)}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="assayRequired" 
                      checked={formData.assayRequired}
                      onCheckedChange={(checked) => setFormData({...formData, assayRequired: checked as boolean})}
                    />
                    <Label htmlFor="assayRequired">Assay Required Again? (Adds charge)</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryReason">Delivery Reason (Optional)</Label>
                    <Textarea
                      id="deliveryReason"
                      placeholder="Optional reason for delivery"
                      value={formData.deliveryReason}
                      onChange={(e) => setFormData({...formData, deliveryReason: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="proofUpload">Upload Proof (if offline payment)</Label>
                    <Input
                      id="proofUpload"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => setUploadedProof(e.target.files?.[0] || null)}
                    />
                    <p className="text-xs text-muted-foreground">Optional fallback for offline payments</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="acknowledgement" 
                      checked={formData.acknowledgement}
                      onCheckedChange={(checked) => setFormData({...formData, acknowledgement: checked as boolean})}
                    />
                    <Label htmlFor="acknowledgement" className="text-sm">
                      "I agree to pay required charges to initiate delivery"
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Payment Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">💰 Dynamic Payment Summary</CardTitle>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Auto-generated Invoice ID:</span>
                    <Badge variant="outline">INV-DEL-{selectedENWR?.id}-001</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Storage Charges (₹240/MT/Day × {selectedENWR?.daysStored || 0} days)</span>
                      <span className="font-semibold">₹{charges.storage.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Handling Charges (₹100/MT)</span>
                      <span className="font-semibold">₹{charges.handling.toLocaleString()}</span>
                    </div>
                    {formData.assayRequired && (
                      <div className="flex justify-between">
                        <span className="text-sm">Assaying Charges</span>
                        <span className="font-semibold">₹{charges.assaying.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm">Delivery Processing</span>
                      <span className="font-semibold">₹{charges.processing}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Payable</span>
                      <span className="text-green-600">₹{charges.total.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">✅ Includes GST where applicable</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🛡️ Integrated Payment Gateway</CardTitle>
                  <div className="flex items-center gap-2">
                    {getPaymentStatusBadge()}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Choose Payment Mode</Label>
                    <Select value={formData.paymentMode} onValueChange={(value) => setFormData({...formData, paymentMode: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="upi">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            UPI Payment
                          </div>
                        </SelectItem>
                        <SelectItem value="netbanking">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            Net Banking
                          </div>
                        </SelectItem>
                        <SelectItem value="linked-account">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            Linked Account
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.paymentMode && paymentStatus === "pending" && (
                    <Button 
                      onClick={handlePayment} 
                      className="w-full"
                      disabled={!formData.quantityToWithdraw}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Pay ₹{charges.total.toLocaleString()}
                    </Button>
                  )}

                  {paymentStatus === "processing" && (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="text-sm text-muted-foreground mt-2">Processing payment...</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowWithdrawModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={canSubmit ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {canSubmit ? "✅ Submit Delivery Request" : "🚫 Complete Payment First"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Payouts;
