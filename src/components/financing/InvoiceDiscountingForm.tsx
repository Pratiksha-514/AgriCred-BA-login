
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export function InvoiceDiscountingForm() {
  const [step, setStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    buyerName: "",
    invoiceAmount: "",
    invoiceDate: "",
    dueDate: "",
    buyerGSTIN: "",
    supplyTerms: ""
  });
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    ifscCode: "",
    accountNumber: ""
  });
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // Simulate OCR processing
      setTimeout(() => {
        setInvoiceData({
          invoiceNumber: "INV-2024-001",
          buyerName: "Reliance Retail Ltd.",
          invoiceAmount: "250000",
          invoiceDate: "2024-06-15",
          dueDate: "2024-07-15",
          buyerGSTIN: "27AABCR1234M1Z5",
          supplyTerms: "30"
        });
        toast({
          title: "Invoice Processed",
          description: "Invoice details have been auto-filled from the document.",
        });
      }, 2000);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Financing Request Submitted",
      description: "Your invoice has been submitted for financing offers.",
    });
    // Redirect to offers page would happen here
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="space-y-2">
            <p className="text-lg font-medium">Upload Invoice PDF</p>
            <p className="text-sm text-muted-foreground">
              PDF files only. OCR will auto-parse the details.
            </p>
            <Input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="max-w-xs mx-auto"
            />
          </div>
        </div>

        {uploadedFile && (
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium">{uploadedFile.name}</span>
            <Badge variant="secondary">Processing...</Badge>
          </div>
        )}
      </div>

      <Separator />

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="invoiceNumber">Invoice Number</Label>
          <Input
            id="invoiceNumber"
            value={invoiceData.invoiceNumber}
            onChange={(e) => setInvoiceData({...invoiceData, invoiceNumber: e.target.value})}
            placeholder="Auto-filled from document"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="buyerName">Buyer Name</Label>
          <Input
            id="buyerName"
            value={invoiceData.buyerName}
            onChange={(e) => setInvoiceData({...invoiceData, buyerName: e.target.value})}
            placeholder="Auto-filled from document"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="invoiceAmount">Invoice Amount (₹)</Label>
          <Input
            id="invoiceAmount"
            type="number"
            value={invoiceData.invoiceAmount}
            onChange={(e) => setInvoiceData({...invoiceData, invoiceAmount: e.target.value})}
            placeholder="Auto-filled from document"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="invoiceDate">Invoice Date</Label>
          <Input
            id="invoiceDate"
            type="date"
            value={invoiceData.invoiceDate}
            onChange={(e) => setInvoiceData({...invoiceData, invoiceDate: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dueDate">Due Date</Label>
          <Input
            id="dueDate"
            type="date"
            value={invoiceData.dueDate}
            onChange={(e) => setInvoiceData({...invoiceData, dueDate: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="buyerGSTIN">Buyer GSTIN</Label>
          <Input
            id="buyerGSTIN"
            value={invoiceData.buyerGSTIN}
            onChange={(e) => setInvoiceData({...invoiceData, buyerGSTIN: e.target.value})}
            placeholder="Auto-filled from document"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="supplyTerms">Supply Terms</Label>
          <Select value={invoiceData.supplyTerms} onValueChange={(value) => setInvoiceData({...invoiceData, supplyTerms: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30">30 Days</SelectItem>
              <SelectItem value="60">60 Days</SelectItem>
              <SelectItem value="90">90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {invoiceData.invoiceAmount && (
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-blue-600" />
            <span className="font-medium">Invoice Score Preview</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Estimated Financing Limit: ₹{(parseInt(invoiceData.invoiceAmount) * 0.8).toLocaleString()}
            (80% of invoice value)
          </p>
        </div>
      )}

      <Button 
        onClick={() => setStep(2)} 
        className="w-full"
        disabled={!invoiceData.invoiceNumber || !invoiceData.buyerName}
      >
        Continue to Bank Details
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Bank Details</h3>
        <p className="text-sm text-muted-foreground">
          Add your bank details for payout (optional if already added to profile)
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="bankName">Bank Name</Label>
          <Select value={bankDetails.bankName} onValueChange={(value) => setBankDetails({...bankDetails, bankName: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select bank" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hdfc">HDFC Bank</SelectItem>
              <SelectItem value="icici">ICICI Bank</SelectItem>
              <SelectItem value="sbi">State Bank of India</SelectItem>
              <SelectItem value="axis">Axis Bank</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="ifscCode">IFSC Code</Label>
          <Input
            id="ifscCode"
            value={bankDetails.ifscCode}
            onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value})}
            placeholder="e.g., HDFC0000123"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="accountNumber">Account Number</Label>
          <Input
            id="accountNumber"
            value={bankDetails.accountNumber}
            onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
            placeholder="Enter account number"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setStep(1)}>
          Back
        </Button>
        <Button onClick={() => setStep(3)} className="flex-1">
          Continue to Review
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Review & Submit</h3>
        <p className="text-sm text-muted-foreground">
          Please review your details before submitting for financing
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Invoice Number:</span>
              <span className="font-medium">{invoiceData.invoiceNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Buyer:</span>
              <span className="font-medium">{invoiceData.buyerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-medium">₹{parseInt(invoiceData.invoiceAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Due Date:</span>
              <span className="font-medium">{invoiceData.dueDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setStep(2)}>
          Back
        </Button>
        <Button onClick={handleSubmit} className="flex-1">
          Submit for Financing
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-6">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step >= stepNumber 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {stepNumber}
            </div>
            {stepNumber < 3 && (
              <div className={`w-20 h-1 mx-2 ${
                step > stepNumber ? 'bg-primary' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
}
