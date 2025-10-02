
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EnwrFileUploadProps {
  onEnwrVerified: (data: any) => void;
  option: "existing" | "generate";
}

export function EnwrFileUpload({ onEnwrVerified, option }: EnwrFileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [enwrData, setEnwrData] = useState<any>(null);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const validTypes = ['application/pdf', 'application/xml', 'text/xml', 'application/zip'];
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, XML, or ZIP file.",
          variant: "destructive"
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleVerifyEnwr = async () => {
    if (!selectedFile) return;
    
    setLoading(true);
    
    // Simulate NeRL API call
    setTimeout(() => {
      const mockEnwrData = {
        commodityName: "Wheat",
        quantity: "100 MT",
        warehouseName: "ABC Warehouse Pvt Ltd",
        warehouseLocation: "Rajasthan",
        issueDate: "2024-06-01",
        validityStatus: "Valid",
        expiryDate: "2024-12-31",
        depositorName: "Farmer Cooperative Ltd",
        enwrNumber: "ENWR2024001",
        varietyGrade: "HD-2967"
      };
      
      setEnwrData(mockEnwrData);
      setLoading(false);
      
      toast({
        title: "eNWR Verified Successfully",
        description: "eNWR details have been fetched from NeRL.",
      });
    }, 2000);
  };

  const handleConfirmProceed = () => {
    onEnwrVerified(enwrData);
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-dashed border-gray-300 rounded-2xl bg-gray-50/50">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center gap-3 text-lg">
            <FileText className="h-6 w-6 text-gray-600" />
            Upload eNWR File
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {option === "existing" 
              ? "Upload your existing eNWR document for verification"
              : "Upload your generated eNWR document for verification"
            }
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label htmlFor="enwrFile" className="text-base font-medium">
              Upload eNWR file (PDF/XML/ZIP)
            </Label>
            <div className="flex items-center gap-3">
              <input
                id="enwrFile"
                type="file"
                accept=".pdf,.xml,.zip"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("enwrFile")?.click()}
                className="flex items-center gap-2 h-12"
              >
                <Upload className="h-4 w-4" />
                Choose File
              </Button>
              {selectedFile && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  {selectedFile.name}
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Supported formats: PDF, XML, ZIP (Max size: 10MB)
            </p>
          </div>

          {selectedFile && !enwrData && (
            <Button 
              onClick={handleVerifyEnwr}
              disabled={loading}
              className="w-full h-12 bg-[#2E7D32] hover:bg-green-700 rounded-xl"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying with NeRL...
                </>
              ) : (
                "🔍 Verify eNWR"
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {loading && (
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
          <span className="text-sm font-medium text-blue-800">Connecting to NeRL API...</span>
        </div>
      )}

      {enwrData && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <span className="text-sm font-semibold text-green-800">eNWR Verified Successfully</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800 ml-auto">Verified</Badge>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">eNWR Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Commodity Name</Label>
                  <div className="p-3 bg-gray-50 rounded-lg text-sm font-medium">{enwrData.commodityName}</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Quantity</Label>
                  <div className="p-3 bg-gray-50 rounded-lg text-sm font-medium">{enwrData.quantity}</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Warehouse Name</Label>
                  <div className="p-3 bg-gray-50 rounded-lg text-sm font-medium">{enwrData.warehouseName}</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Warehouse Location</Label>
                  <div className="p-3 bg-gray-50 rounded-lg text-sm font-medium">{enwrData.warehouseLocation}</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Issue Date</Label>
                  <div className="p-3 bg-gray-50 rounded-lg text-sm font-medium">{enwrData.issueDate}</div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Validity Status</Label>
                  <div className="flex items-center gap-2">
                    <div className="p-3 bg-gray-50 rounded-lg text-sm font-medium flex-1">{enwrData.validityStatus}</div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Valid</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={handleConfirmProceed}
            className="w-full h-12 bg-[#2E7D32] hover:bg-green-700 rounded-xl text-base font-semibold"
          >
            ✅ Confirm & Proceed
          </Button>
        </div>
      )}
    </div>
  );
}
