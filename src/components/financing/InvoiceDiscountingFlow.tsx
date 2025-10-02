
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, AlertCircle, Calendar, Building2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { InvoiceScorePreview } from "./InvoiceScorePreview";

interface InvoiceDiscountingFlowProps {
  onDataUpdate: (data: any) => void;
}

export function InvoiceDiscountingFlow({ onDataUpdate }: InvoiceDiscountingFlowProps) {
  const [step, setStep] = useState(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [invoiceDetailsConfirmed, setInvoiceDetailsConfirmed] = useState(false);
  const [showScorePreview, setShowScorePreview] = useState(false);
  const [previewConfirmed, setPreviewConfirmed] = useState(false);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    buyerName: "",
    invoiceAmount: "",
    invoiceDate: "",
    dueDate: "",
    buyerGSTIN: "",
    supplyTerms: ""
  });
  const [scoreData, setScoreData] = useState({
    invoiceRiskScore: 720, // out of 1000
    minInterest: 11,
    maxInterest: 14,
    financingPercent: 80
  });
  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    ifscCode: "",
    accountNumber: ""
  });
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setUploadedFile(file);
      setIsProcessing(true);
      setShowInvoiceForm(false);
      setInvoiceDetailsConfirmed(false);
      setShowScorePreview(false);
      setPreviewConfirmed(false);
      
      // Simulate OCR processing
      setTimeout(() => {
        const mockData = {
          invoiceNumber: "INV-2024-001",
          buyerName: "Reliance Retail Ltd.",
          invoiceAmount: "250000",
          invoiceDate: "2024-06-15",
          dueDate: "2024-07-15",
          buyerGSTIN: "27AABCR1234M1Z5",
          supplyTerms: "30"
        };
        setInvoiceData(mockData);
        setIsProcessing(false);
        setShowInvoiceForm(true);
        
        onDataUpdate({ 
          invoiceAmount: parseInt(mockData.invoiceAmount),
          estimatedFinancing: parseInt(mockData.invoiceAmount) * 0.8,
          status: 'processing'
        });
        toast({
          title: "Invoice Processed Successfully",
          description: "Invoice details have been auto-filled. Please review and confirm the details.",
        });
      }, 3000);
    } else {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file only.",
        variant: "destructive"
      });
    }
  };

  const handleInvoiceDetailsConfirm = () => {
    if (!invoiceData.invoiceNumber || !invoiceData.buyerName || !invoiceData.invoiceAmount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before confirming.",
        variant: "destructive"
      });
      return;
    }

    setInvoiceDetailsConfirmed(true);
    setShowScorePreview(true);
    
    // Simulate risk scoring with confirmed data
    const mockScoreData = {
      invoiceRiskScore: 720 + Math.floor(Math.random() * 200), // 720-920 out of 1000
      minInterest: 11 + Math.floor(Math.random() * 2), // 11-12%
      maxInterest: 14 + Math.floor(Math.random() * 2), // 14-15%
      financingPercent: 80
    };
    setScoreData(mockScoreData);
    
    onDataUpdate({ 
      invoiceAmount: parseInt(invoiceData.invoiceAmount),
      estimatedFinancing: parseInt(invoiceData.invoiceAmount) * (mockScoreData.financingPercent / 100),
      status: 'scored'
    });
    
    toast({
      title: "Invoice Details Confirmed",
      description: "Risk score has been calculated. Please review the financing preview.",
    });
  };

  const handlePreviewConfirm = () => {
    setPreviewConfirmed(true);
    toast({
      title: "Invoice Preview Confirmed",
      description: "You can now proceed with the financing application.",
    });
  };

  const handleInvoiceDataChange = (field: string, value: string) => {
    const updatedData = { ...invoiceData, [field]: value };
    setInvoiceData(updatedData);
    
    if (field === 'invoiceAmount' && value) {
      onDataUpdate({ 
        invoiceAmount: parseInt(value),
        estimatedFinancing: parseInt(value) * (scoreData.financingPercent / 100)
      });
    }
  };

  const handleSubmit = () => {
    onDataUpdate({ status: 'submitted' });
    toast({
      title: "Financing Request Submitted",
      description: "Your invoice has been submitted for financing offers. You'll receive offers within 2-4 hours.",
    });
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8">
      {[1, 2, 3].map((stepNumber) => (
        <div key={stepNumber} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
            step >= stepNumber 
              ? 'bg-[#2E7D32] text-white shadow-md' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
          </div>
          {stepNumber < 3 && (
            <div className={`w-20 h-1 mx-3 rounded-full transition-all ${
              step > stepNumber ? 'bg-[#2E7D32]' : 'bg-gray-200'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gray-50/50 hover:bg-gray-50 transition-colors">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="space-y-3">
            <p className="text-lg font-semibold text-gray-900">Upload Invoice PDF</p>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Upload your invoice in PDF format. Our OCR technology will automatically extract and verify all details.
            </p>
            <Input
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
              className="max-w-xs mx-auto border-[#2E7D32] focus:ring-[#2E7D32]"
            />
          </div>
        </div>

        {uploadedFile && (
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">{uploadedFile.name}</span>
            {isProcessing ? (
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">Processing...</Badge>
            ) : (
              <Badge variant="secondary" className="bg-green-100 text-green-800">Processed</Badge>
            )}
          </div>
        )}
      </div>

      {/* Step 1: Invoice Details Confirmation Form */}
      {showInvoiceForm && !invoiceDetailsConfirmed && (
        <>
          <Separator />
          <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg text-blue-900">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                ✅ Step 1: Confirm Invoice Details
              </CardTitle>
              <p className="text-sm text-blue-700">
                Please review and edit the auto-filled details extracted from your invoice.
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="invoiceNumber" className="text-base font-semibold">Invoice Number *</Label>
                  <Input
                    id="invoiceNumber"
                    value={invoiceData.invoiceNumber}
                    onChange={(e) => handleInvoiceDataChange('invoiceNumber', e.target.value)}
                    placeholder="Auto-filled from document"
                    className="h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buyerName" className="text-base font-semibold">Buyer Name *</Label>
                  <Input
                    id="buyerName"
                    value={invoiceData.buyerName}
                    onChange={(e) => handleInvoiceDataChange('buyerName', e.target.value)}
                    placeholder="Auto-filled from document"
                    className="h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoiceAmount" className="text-base font-semibold">Invoice Amount (₹) *</Label>
                  <Input
                    id="invoiceAmount"
                    type="number"
                    value={invoiceData.invoiceAmount}
                    onChange={(e) => handleInvoiceDataChange('invoiceAmount', e.target.value)}
                    placeholder="Auto-filled from document"
                    className="h-12"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="invoiceDate" className="text-base font-semibold">Invoice Date</Label>
                  <Input
                    id="invoiceDate"
                    type="date"
                    value={invoiceData.invoiceDate}
                    onChange={(e) => handleInvoiceDataChange('invoiceDate', e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate" className="text-base font-semibold">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={invoiceData.dueDate}
                    onChange={(e) => handleInvoiceDataChange('dueDate', e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buyerGSTIN" className="text-base font-semibold">Buyer GSTIN</Label>
                  <Input
                    id="buyerGSTIN"
                    value={invoiceData.buyerGSTIN}
                    onChange={(e) => handleInvoiceDataChange('buyerGSTIN', e.target.value)}
                    placeholder="Auto-filled from document"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="supplyTerms" className="text-base font-semibold">Supply Terms</Label>
                  <Select value={invoiceData.supplyTerms} onValueChange={(value) => handleInvoiceDataChange('supplyTerms', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select payment terms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 Days</SelectItem>
                      <SelectItem value="60">60 Days</SelectItem>
                      <SelectItem value="90">90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  onClick={handleInvoiceDetailsConfirm}
                  className="w-full h-12 bg-[#2E7D32] hover:bg-green-700 rounded-xl text-base font-semibold"
                  disabled={!invoiceData.invoiceNumber || !invoiceData.buyerName || !invoiceData.invoiceAmount}
                >
                  ✏️ Confirm Invoice Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Step 2: Invoice Score Preview */}
      {showScorePreview && invoiceDetailsConfirmed && !previewConfirmed && (
        <>
          <Separator />
          <InvoiceScorePreview
            invoiceValue={parseInt(invoiceData.invoiceAmount)}
            financingPercent={scoreData.financingPercent}
            estimatedFinancing={parseInt(invoiceData.invoiceAmount) * (scoreData.financingPercent / 100)}
            minInterest={scoreData.minInterest}
            maxInterest={scoreData.maxInterest}
            invoiceRiskScore={scoreData.invoiceRiskScore}
            onConfirm={handlePreviewConfirm}
          />
        </>
      )}

      {/* Continue to Bank Details Button - Show only after preview is confirmed */}
      {previewConfirmed && (
        <>
          <Separator />
          <Button 
            onClick={() => setStep(2)} 
            className="w-full h-12 bg-[#2E7D32] hover:bg-green-700 rounded-xl text-base font-semibold"
          >
            Continue to Bank Details
          </Button>
        </>
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Building2 className="h-5 w-5 text-[#2E7D32]" />
          Bank Details
        </h3>
        <p className="text-muted-foreground">
          Add your bank details for payout (optional if already added to profile)
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="bankName" className="text-base font-semibold">Bank Name</Label>
          <Select value={bankDetails.bankName} onValueChange={(value) => setBankDetails({...bankDetails, bankName: value})}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select your bank" />
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
          <Label htmlFor="ifscCode" className="text-base font-semibold">IFSC Code</Label>
          <Input
            id="ifscCode"
            value={bankDetails.ifscCode}
            onChange={(e) => setBankDetails({...bankDetails, ifscCode: e.target.value})}
            placeholder="e.g., HDFC0000123"
            className="h-12"
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="accountNumber" className="text-base font-semibold">Account Number</Label>
          <Input
            id="accountNumber"
            value={bankDetails.accountNumber}
            onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
            placeholder="Enter your account number"
            className="h-12"
          />
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-12 rounded-xl">
          Back
        </Button>
        <Button onClick={() => setStep(3)} className="flex-1 h-12 bg-[#2E7D32] hover:bg-green-700 rounded-xl">
          Continue to Review
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Review & Submit</h3>
        <p className="text-muted-foreground">
          Please review your details before submitting for financing
        </p>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Invoice Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 text-sm">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-muted-foreground">Invoice Number:</span>
              <span className="font-semibold">{invoiceData.invoiceNumber}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-muted-foreground">Buyer:</span>
              <span className="font-semibold">{invoiceData.buyerName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-semibold text-[#2E7D32]">₹{parseInt(invoiceData.invoiceAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Due Date:</span>
              <span className="font-semibold">{invoiceData.dueDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setStep(2)} className="flex-1 h-12 rounded-xl">
          Back
        </Button>
        <Button onClick={handleSubmit} className="flex-1 h-12 bg-[#2E7D32] hover:bg-green-700 rounded-xl">
          Submit for Financing
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {renderStepIndicator()}
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderStep3()}
    </div>
  );
}
