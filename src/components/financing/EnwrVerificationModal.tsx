
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, AlertCircle, Loader2, FileText, Upload, MapPin, Calendar, Package, ExternalLink, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnwrVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnwrVerified: (enwrData: any) => void;
}

interface EnwrData {
  enwrNumber: string;
  commodity: string;
  quantity: string;
  warehouseName: string;
  warehouseLocation: string;
  issueDate: string;
  validityStatus: string;
  isValid: boolean;
  isPledged?: boolean;
}

export function EnwrVerificationModal({ isOpen, onClose, onEnwrVerified }: EnwrVerificationModalProps) {
  const [verificationMethod, setVerificationMethod] = useState<"manual" | "upload" | "">("");
  const [enwrNumber, setEnwrNumber] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const [verifiedEnwr, setVerifiedEnwr] = useState<EnwrData | null>(null);
  const [showManualFallback, setShowManualFallback] = useState(false);
  const { toast } = useToast();

  const handleManualVerification = async () => {
    if (!enwrNumber.trim()) return;
    
    setIsVerifying(true);
    
    // Simulate NeRL API call
    setTimeout(() => {
      // Mock validation - in real app, this would call NeRL API
      const mockEnwrData: EnwrData = {
        enwrNumber: enwrNumber,
        commodity: "Soybean",
        quantity: "150 Quintals",
        warehouseName: "V.P. Patil Warehouse",
        warehouseLocation: "Latur, Maharashtra",
        issueDate: "2025-06-28",
        validityStatus: "Valid",
        isValid: true,
        isPledged: false
      };
      
      setVerifiedEnwr(mockEnwrData);
      setIsVerifying(false);
      
      toast({
        title: "eNWR Verified Successfully",
        description: "eNWR details have been fetched from NeRL.",
      });
    }, 2000);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = ['application/pdf', 'application/xml', 'text/xml', 'application/zip'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload a PDF, XML, or ZIP file.",
          variant: "destructive"
        });
        return;
      }

      setUploadedFile(file);
      setIsProcessingFile(true);

      // Simulate file processing and extraction
      setTimeout(() => {
        // Mock file parsing success/failure (80% success rate)
        const parseSuccess = Math.random() > 0.2;
        
        if (parseSuccess) {
          const extractedData: EnwrData = {
            enwrNumber: "ENWR2024567890",
            commodity: "Wheat",
            quantity: "200 Quintals",
            warehouseName: "Maharashtra State Warehouse",
            warehouseLocation: "Pune, Maharashtra",
            issueDate: "2025-06-25",
            validityStatus: "Valid",
            isValid: true,
            isPledged: false
          };
          
          setVerifiedEnwr(extractedData);
          setIsProcessingFile(false);
          
          toast({
            title: "File Processed Successfully",
            description: "eNWR details have been extracted from the document.",
          });
        } else {
          setIsProcessingFile(false);
          setShowManualFallback(true);
          
          toast({
            title: "File Processing Failed",
            description: "Could not extract eNWR details. Please try manual entry.",
            variant: "destructive"
          });
        }
      }, 3000);
    }
  };

  const handleConfirmAndProceed = () => {
    if (verifiedEnwr) {
      onEnwrVerified(verifiedEnwr);
      onClose();
      toast({
        title: "eNWR Confirmed",
        description: "Proceeding with financing application.",
      });
    }
  };

  const resetForm = () => {
    setVerificationMethod("");
    setEnwrNumber("");
    setUploadedFile(null);
    setVerifiedEnwr(null);
    setShowManualFallback(false);
    setIsVerifying(false);
    setIsProcessingFile(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const renderMethodSelection = () => (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">How would you like to verify your eNWR?</h3>
        <p className="text-sm text-muted-foreground">
          Choose between manual entry or document upload
        </p>
      </div>

      <RadioGroup 
        value={verificationMethod} 
        onValueChange={(value) => setVerificationMethod(value as "manual" | "upload")}
        className="space-y-4"
      >
        <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-[#2E7D32] transition-colors">
          <RadioGroupItem value="manual" id="manual" className="border-[#2E7D32]" />
          <Label htmlFor="manual" className="text-base font-medium cursor-pointer flex-1">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-[#2E7D32]" />
              <div>
                <div className="font-semibold">Manual Entry</div>
                <div className="text-sm text-muted-foreground">Enter your eNWR number directly</div>
              </div>
            </div>
          </Label>
        </div>
        
        <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-[#2E7D32] transition-colors">
          <RadioGroupItem value="upload" id="upload" className="border-[#2E7D32]" />
          <Label htmlFor="upload" className="text-base font-medium cursor-pointer flex-1">
            <div className="flex items-center gap-3">
              <Upload className="h-5 w-5 text-[#2E7D32]" />
              <div>
                <div className="font-semibold">Document Upload</div>
                <div className="text-sm text-muted-foreground">Upload eNWR file (PDF/XML/ZIP)</div>
              </div>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );

  const renderManualEntry = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label htmlFor="enwrNumber" className="text-base font-semibold">eNWR Number</Label>
        <Input
          id="enwrNumber"
          value={enwrNumber}
          onChange={(e) => setEnwrNumber(e.target.value)}
          placeholder="Enter your eNWR unique ID (e.g., ENWR2024001)"
          className="h-12"
        />
        
        <Button 
          onClick={handleManualVerification}
          disabled={!enwrNumber.trim() || isVerifying}
          className="w-full h-12 bg-[#2E7D32] hover:bg-green-700 rounded-xl"
        >
          {isVerifying ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying eNWR...
            </>
          ) : (
            "Verify eNWR"
          )}
        </Button>
      </div>

      {isVerifying && (
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
          <span className="text-sm font-medium text-blue-800">Connecting to NeRL...</span>
        </div>
      )}
    </div>
  );

  const renderFileUpload = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-base font-semibold">Upload eNWR Document</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50/50 hover:border-[#2E7D32] transition-colors">
          <div className="text-center space-y-3">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <div>
              <input
                type="file"
                id="enwrFile"
                accept=".pdf,.xml,.zip"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="enwrFile"
                className="cursor-pointer inline-flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Upload className="h-4 w-4" />
                Choose File
              </label>
            </div>
            <p className="text-sm text-muted-foreground">
              Upload your eNWR document (PDF, XML, ZIP up to 10MB)
            </p>
            {uploadedFile && (
              <div className="flex items-center gap-2 justify-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                {uploadedFile.name}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <HelpCircle className="h-4 w-4" />
          <span>You can download your eNWR from your warehouse or NeRL dashboard.</span>
        </div>
        
        <div className="flex gap-4 text-sm">
          <Button variant="ghost" size="sm" className="text-[#2E7D32] hover:text-green-700">
            <ExternalLink className="h-3 w-3 mr-1" />
            View Sample eNWR
          </Button>
          <Button variant="ghost" size="sm" className="text-[#2E7D32] hover:text-green-700">
            <HelpCircle className="h-3 w-3 mr-1" />
            Where to find your eNWR?
          </Button>
        </div>
      </div>

      {isProcessingFile && (
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
          <span className="text-sm font-medium text-blue-800">Processing document...</span>
        </div>
      )}

      {showManualFallback && (
        <div className="space-y-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">Fallback to Manual Entry</span>
          </div>
          <p className="text-sm text-yellow-700">
            We couldn't extract the eNWR details from your document. Please enter the eNWR number manually below.
          </p>
          <div className="space-y-3">
            <Input
              value={enwrNumber}
              onChange={(e) => setEnwrNumber(e.target.value)}
              placeholder="Enter eNWR number from your document"
              className="bg-white"
            />
            <Button 
              onClick={handleManualVerification}
              disabled={!enwrNumber.trim() || isVerifying}
              className="w-full bg-[#2E7D32] hover:bg-green-700"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify eNWR"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  const renderEnwrPreview = () => {
    if (!verifiedEnwr) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <span className="text-sm font-semibold text-green-800">eNWR Verified Successfully</span>
          <Badge variant="secondary" className="bg-green-100 text-green-800 ml-auto">Verified</Badge>
        </div>

        <Card className="rounded-2xl border-2 border-green-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Package className="h-5 w-5 text-[#2E7D32]" />
              eNWR Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-600">eNWR Number</Label>
                <div className="p-3 bg-gray-50 rounded-lg font-mono text-sm">{verifiedEnwr.enwrNumber}</div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-600">Commodity</Label>
                <div className="p-3 bg-gray-50 rounded-lg">{verifiedEnwr.commodity}</div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-600">Quantity</Label>
                <div className="p-3 bg-gray-50 rounded-lg">{verifiedEnwr.quantity}</div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-600">Warehouse</Label>
                <div className="p-3 bg-gray-50 rounded-lg">{verifiedEnwr.warehouseName}</div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-600">Location</Label>
                <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  {verifiedEnwr.warehouseLocation}
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-600">Issue Date</Label>
                <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  {verifiedEnwr.issueDate}
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-600">Status:</span>
                {verifiedEnwr.isValid && !verifiedEnwr.isPledged ? (
                  <Badge className="bg-green-100 text-green-800">✅ Verified & Available</Badge>
                ) : (
                  <Badge variant="destructive">❌ Already pledged or invalid</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {verifiedEnwr.isValid && !verifiedEnwr.isPledged ? (
          <Button 
            onClick={handleConfirmAndProceed}
            className="w-full h-12 bg-[#2E7D32] hover:bg-green-700 rounded-xl text-base font-semibold"
          >
            Confirm & Proceed with Financing
          </Button>
        ) : (
          <div className="p-4 bg-red-50 rounded-xl border border-red-200">
            <div className="flex items-center gap-2 text-red-800">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">This eNWR is already pledged or invalid.</span>
            </div>
            <p className="text-sm text-red-700 mt-2">
              Please contact your warehouse or check with NeRL for more details.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Verify Your eNWR for Financing</DialogTitle>
          <DialogDescription>
            Enter your existing eNWR details or upload your eNWR document to proceed with financing
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!verificationMethod && renderMethodSelection()}
          {verificationMethod === "manual" && !verifiedEnwr && renderManualEntry()}
          {verificationMethod === "upload" && !verifiedEnwr && renderFileUpload()}
          {verifiedEnwr && renderEnwrPreview()}
          
          {!verifiedEnwr && verificationMethod && (
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setVerificationMethod("")} className="flex-1">
                Back
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
