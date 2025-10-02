import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { CalendarIcon, CreditCard, Smartphone, Building2 } from "lucide-react";

interface StockWithdrawalModalProps {
  open: boolean;
  onClose: () => void;
  selectedENWR: {
    id: string;
    commodity: string;
    quantity: string;
  } | null;
}

export function StockWithdrawalModal({ open, onClose, selectedENWR }: StockWithdrawalModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    enwrNumber: selectedENWR?.id || "",
    commodity: selectedENWR?.commodity || "",
    totalQuantity: selectedENWR?.quantity || "",
    quantityToWithdraw: "",
    deliveryType: "",
    assayRequired: false,
    deliveryReason: "",
    paymentMode: "",
    acknowledgement: false,
  });
  const [deliveryWindow, setDeliveryWindow] = useState<Date | undefined>();
  const [paymentStatus, setPaymentStatus] = useState<"pending" | "processing" | "success" | "failed">("pending");

  // Improved calculation, handles invalid input gracefully
  const calculateCharges = () => {
    const qty = parseInt(formData.quantityToWithdraw, 10) || 0;
    const storage = qty * 240;
    const handling = qty * 100;
    const assaying = formData.assayRequired ? 2000 : 0;
    const processing = 500;
    return { storage, handling, assaying, processing, total: storage + handling + assaying + processing };
  };

  const charges = calculateCharges();
  const isQuantityValid = parseInt(formData.quantityToWithdraw, 10) > 0 && parseInt(formData.quantityToWithdraw, 10) <= parseInt(formData.totalQuantity, 10);
  const canPay = isQuantityValid && formData.paymentMode && paymentStatus === "pending";
  const canSubmit = paymentStatus === "success" && formData.acknowledgement;

  const handlePayment = () => {
    if (!formData.paymentMode) {
      toast({ title: "Payment Mode Required", description: "Please select a payment mode.", variant: "destructive" });
      return;
    }
    setPaymentStatus("processing");
    setTimeout(() => {
      setPaymentStatus("success");
      toast({ title: "Payment Successful", description: "Payment processed successfully." });
    }, 2000);
  };

  const handleSubmit = () => {
    if (!canSubmit) {
      toast({ title: "Cannot Submit", description: "Complete payment and acknowledgement first.", variant: "destructive" });
      return;
    }
    toast({ title: "Request Submitted", description: "Stock withdrawal request submitted successfully." });
    onClose();
  };

  const getPaymentBadge = () => {
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

  if (!selectedENWR) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>🧑‍🌾 Stock Withdrawal Request</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>eNWR Number</Label>
                    <Input value={formData.enwrNumber} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Commodity</Label>
                    <Input value={formData.commodity} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Total Quantity</Label>
                    <Input value={formData.totalQuantity} disabled />
                  </div>
                  <div className="space-y-2">
                    <Label>Quantity to Withdraw</Label>
                    <Input
                      type="number"
                      value={formData.quantityToWithdraw}
                      onChange={(e) => setFormData({ ...formData, quantityToWithdraw: e.target.value })}
                      min="0"
                      max={formData.totalQuantity}
                    />
                    {formData.quantityToWithdraw && !isQuantityValid && (
                      <p className="text-red-500 text-sm mt-1">Quantity must be between 1 and {formData.totalQuantity}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label>Delivery Type</Label>
                    <Select
                      value={formData.deliveryType}
                      onValueChange={(value) => setFormData({ ...formData, deliveryType: value })}
                    >
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
                    <Label>Delivery Window</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button className={cn("w-full text-left", !deliveryWindow && "text-muted-foreground")}>
                          <CalendarIcon className="mr-2 h-4 w-4" /> {deliveryWindow ? format(deliveryWindow, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-3">
                        <CalendarComponent mode="single" selected={deliveryWindow} onSelect={setDeliveryWindow} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox checked={formData.assayRequired} onCheckedChange={(checked) => setFormData({ ...formData, assayRequired: checked as boolean })} />
                  <Label>Assay Required Again?</Label>
                </div>

                <div className="space-y-2">
                  <Label>Delivery Reason (Optional)</Label>
                  <Textarea value={formData.deliveryReason} onChange={(e) => setFormData({ ...formData, deliveryReason: e.target.value })} />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox checked={formData.acknowledgement} onCheckedChange={(checked) => setFormData({ ...formData, acknowledgement: checked as boolean })} />
                  <Label>I agree to pay required charges to initiate delivery</Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>💰 Payment Summary</CardTitle>
                <div className="flex justify-between items-center">
                  <span>Invoice ID:</span>
                  <Badge>INV-ENWR-001</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between"><span>Storage</span><span>₹{charges.storage}</span></div>
                  <div className="flex justify-between"><span>Handling</span><span>₹{charges.handling}</span></div>
                  {formData.assayRequired && <div className="flex justify-between"><span>Assaying</span><span>₹{charges.assaying}</span></div>}
                  <div className="flex justify-between"><span>Processing</span><span>₹{charges.processing}</span></div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg"><span>Total</span><span>₹{charges.total}</span></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>🛡️ Payment Gateway</CardTitle>
                {getPaymentBadge()}
              </CardHeader>
              <CardContent>
                <Select value={formData.paymentMode} onValueChange={(v) => setFormData({ ...formData, paymentMode: v })}>
                  <SelectTrigger><SelectValue placeholder="Select payment mode" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upi"><Smartphone className="h-4 w-4 mr-2" />UPI</SelectItem>
                    <SelectItem value="netbanking"><Building2 className="h-4 w-4 mr-2" />Net Banking</SelectItem>
                    <SelectItem value="linked-account"><CreditCard className="h-4 w-4 mr-2" />Linked Account</SelectItem>
                  </SelectContent>
                </Select>

                {formData.paymentMode && (
                  <Button className="w-full mt-2" onClick={handlePayment} disabled={!canPay}>
                    Pay ₹{charges.total}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!canSubmit}>
            {canSubmit ? "✅ Submit" : "🚫 Complete Payment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}