import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Upload, FileText, Warehouse, Check } from "lucide-react";
import { toast } from "sonner";

interface UploadInstrumentModalProps {
  open: boolean;
  onClose: () => void;
}

export function UploadInstrumentModal({ open, onClose }: UploadInstrumentModalProps) {
  const [step, setStep] = useState(1);
  const [instrumentType, setInstrumentType] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    invoiceNumber: "",
    buyerName: "",
    invoiceAmount: "",
    invoiceDate: "",
    dueDate: "",
    gstin: "",
    supplyTerms: "",
    enwriteNumber: "",
    commodity: "",
    quantity: "",
    warehouse: "",
    value: "",
    comments: ""
  });

  // Reset modal when closed
  useEffect(() => {
    if (!open) {
      setStep(1);
      setInstrumentType("");
      setUploadedFile(null);
      setFormData({
        invoiceNumber: "",
        buyerName: "",
        invoiceAmount: "",
        invoiceDate: "",
        dueDate: "",
        gstin: "",
        supplyTerms: "",
        enwriteNumber: "",
        commodity: "",
        quantity: "",
        warehouse: "",
        value: "",
        comments: ""
      });
    }
  }, [open]);

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setTimeout(() => {
        if (instrumentType === "invoice") {
          setFormData(prev => ({
            ...prev,
            invoiceNumber: "INV-2024-001",
            buyerName: "Tata Steel Limited",
            invoiceAmount: "250000",
            invoiceDate: "2024-06-30",
            dueDate: "2024-07-30",
            gstin: "27AAACT2727Q1ZZ"
          }));
        } else if (instrumentType === "enwr") {
          setFormData(prev => ({
            ...prev,
            enwriteNumber: "ENWR-2024-001",
            commodity: "Wheat",
            quantity: "500",
            warehouse: "WDRA Warehouse Pune",
            value: "300000"
          }));
        }
        toast.success("Document processed successfully! Fields auto-filled.");
      }, 1500);
    }
  };

  const handleSubmit = () => {
    toast.success("Instrument uploaded successfully!");
    onClose();
  };

  const invoiceAmt = parseInt(formData.invoiceAmount || "0", 10);
  const enwrValue = parseInt(formData.value || "0", 10);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload New Instrument</DialogTitle>
          <DialogDescription>Step {step} of 4: Upload and configure your financing instrument</DialogDescription>
        </DialogHeader>

        {/* Step 1: Select Instrument */}
        {step === 1 && (
          <div className="space-y-6">
            <Label>Select Instrument Type</Label>
            <div className="grid grid-cols-2 gap-4">
              <Card
                className={`cursor-pointer ${instrumentType === "invoice" ? "ring-2 ring-primary" : ""}`}
                onClick={() => setInstrumentType("invoice")}
              >
                <CardHeader className="text-center">
                  <FileText className="h-8 w-8 mx-auto text-primary" />
                  <CardTitle>Invoice</CardTitle>
                  <CardDescription>Upload trade invoice</CardDescription>
                </CardHeader>
              </Card>
              <Card
                className={`cursor-pointer ${instrumentType === "enwr" ? "ring-2 ring-primary" : ""}`}
                onClick={() => setInstrumentType("enwr")}
              >
                <CardHeader className="text-center">
                  <Warehouse className="h-8 w-8 mx-auto text-primary" />
                  <CardTitle>eNWR</CardTitle>
                  <CardDescription>Electronic Warehouse Receipt</CardDescription>
                </CardHeader>
              </Card>
            </div>
            <Button onClick={() => setStep(2)} disabled={!instrumentType} className="w-full">
              Continue
            </Button>
          </div>
        )}

        {/* Step 2: Upload File */}
        {step === 2 && (
          <div className="space-y-6">
            <Label>Upload Document</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-primary hover:text-primary/80">Click to upload</span> or drag and drop
                <Input
                  id="file-upload"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </Label>
              <p className="text-sm text-gray-500 mt-2">PDF, JPG, PNG up to 10MB</p>
            </div>
            {uploadedFile && (
              <div className="mt-4 p-3 bg-green-50 rounded-lg flex items-center gap-2">
                <Check className="h-5 w-5 text-green-600" />
                <span className="text-green-800">File uploaded: {uploadedFile.name}</span>
              </div>
            )}
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)} disabled={!uploadedFile} className="flex-1">
                Process Document
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Verify & Edit */}
        {step === 3 && (
          <div className="space-y-6">
            <Label>Verify & Edit Details</Label>
            {instrumentType === "invoice" && (
              <div className="grid grid-cols-2 gap-4">
                <Input value={formData.invoiceNumber} onChange={(e) => setFormData({...formData, invoiceNumber: e.target.value})} placeholder="Invoice Number"/>
                <Input value={formData.buyerName} onChange={(e) => setFormData({...formData, buyerName: e.target.value})} placeholder="Buyer Name"/>
                <Input type="number" value={formData.invoiceAmount} onChange={(e) => setFormData({...formData, invoiceAmount: e.target.value})} placeholder="Invoice Amount"/>
                <Input value={formData.gstin} onChange={(e) => setFormData({...formData, gstin: e.target.value})} placeholder="GSTIN"/>
                <Input type="date" value={formData.invoiceDate} onChange={(e) => setFormData({...formData, invoiceDate: e.target.value})}/>
                <Input type="date" value={formData.dueDate} onChange={(e) => setFormData({...formData, dueDate: e.target.value})}/>
                <Select value={formData.supplyTerms} onValueChange={(v) => setFormData({...formData, supplyTerms: v})}>
                  <SelectTrigger><SelectValue placeholder="Supply Terms"/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 Days</SelectItem>
                    <SelectItem value="60">60 Days</SelectItem>
                    <SelectItem value="90">90 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            {instrumentType === "enwr" && (
              <div className="grid grid-cols-2 gap-4">
                <Input value={formData.enwriteNumber} onChange={(e) => setFormData({...formData, enwriteNumber: e.target.value})} placeholder="eNWR Number"/>
                <Input value={formData.commodity} onChange={(e) => setFormData({...formData, commodity: e.target.value})} placeholder="Commodity"/>
                <Input type="number" value={formData.quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} placeholder="Quantity"/>
                <Input value={formData.warehouse} onChange={(e) => setFormData({...formData, warehouse: e.target.value})} placeholder="Warehouse"/>
                <Input type="number" value={formData.value} onChange={(e) => setFormData({...formData, value: e.target.value})} placeholder="Estimated Value"/>
              </div>
            )}
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button onClick={() => setStep(4)} className="flex-1">Continue</Button>
            </div>
          </div>
        )}

        {/* Step 4: Final Details & Submit */}
        {step === 4 && (
          <div className="space-y-6">
            <Label>Final Details</Label>
            <Textarea value={formData.comments} onChange={(e) => setFormData({...formData, comments: e.target.value})} placeholder="Comments / Notes (Optional)" className="mt-2"/>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-green-800 mb-2">
                  <Check className="h-5 w-5"/>
                  <span className="font-medium">Estimated Financing Available</span>
                </div>
                <p className="text-2xl font-bold text-green-800">
                  ₹{instrumentType === "invoice" ? Math.floor(invoiceAmt*0.8).toLocaleString() : Math.floor(enwrValue*0.7).toLocaleString()}
                </p>
                <p className="text-sm text-green-600 mt-1">
                  {instrumentType === "invoice" ? "80% of invoice value" : "70% of commodity value"}
                </p>
              </CardContent>
            </Card>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
              <Button onClick={handleSubmit} className="flex-1">Submit for Financing</Button>
            </div>
          </div>
        )}

      </DialogContent>
    </Dialog>
  );
}
