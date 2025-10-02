
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Loader2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EnwrVerificationModal } from "./EnwrVerificationModal";

interface ExistingEnwrVerificationProps {
  onDataUpdate: (data: any) => void;
}

export function ExistingEnwrVerification({ onDataUpdate }: ExistingEnwrVerificationProps) {
  const [showEnwrModal, setShowEnwrModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [enwrData, setEnwrData] = useState({
    enwrNumber: "",
    repository: "",
    commodity: "",
    quantity: "",
    warehouseName: "",
    storageLocation: "",
    validTill: "",
    issuedDate: "",
    lienMarkStatus: "",
    estimatedValue: ""
  });
  const { toast } = useToast();

  const handleEnwrVerified = (verifiedEnwrData: any) => {
    const mockData = {
      ...enwrData,
      enwrNumber: verifiedEnwrData.enwrNumber,
      repository: "NeRL",
      commodity: verifiedEnwrData.commodity,
      quantity: verifiedEnwrData.quantity,
      warehouseName: verifiedEnwrData.warehouseName,
      storageLocation: verifiedEnwrData.warehouseLocation,
      validTill: "2024-12-31",
      issuedDate: verifiedEnwrData.issueDate,
      lienMarkStatus: "No",
      estimatedValue: "500000"
    };
    
    setEnwrData(mockData);
    setVerified(true);
    onDataUpdate({ 
      enwrValue: parseInt(mockData.estimatedValue),
      estimatedFinancing: parseInt(mockData.estimatedValue) * 0.8,
      status: 'verified'
    });
  };

  const handleEnwrVerification = async () => {
    if (!enwrData.enwrNumber) return;
    
    setLoading(true);
    // Simulate API call to NeRL
    setTimeout(() => {
      const mockData = {
        ...enwrData,
        repository: "NeRL",
        commodity: "Wheat",
        quantity: "100 MT",
        warehouseName: "ABC Warehouse Pvt Ltd",
        storageLocation: "Rajasthan",
        validTill: "2024-12-31",
        issuedDate: "2024-06-01",
        lienMarkStatus: "No",
        estimatedValue: "640000"
      };
      setEnwrData(mockData);
      setVerified(true);
      setLoading(false);
      onDataUpdate({ 
        enwrValue: parseInt(mockData.estimatedValue),
        estimatedFinancing: parseInt(mockData.estimatedValue) * 0.8,
        status: 'verified'
      });
      toast({
        title: "eNWR Verified Successfully",
        description: "eNWR details have been fetched from NeRL.",
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-dashed border-gray-300 rounded-2xl p-6 bg-gray-50/50">
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <FileText className="mx-auto h-8 w-8 text-gray-400" />
            <h3 className="font-semibold text-gray-900">Enter eNWR Details</h3>
            <p className="text-sm text-muted-foreground">
              Choose how you'd like to verify your existing eNWR
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={() => setShowEnwrModal(true)}
              className="flex-1 h-12 bg-[#2E7D32] hover:bg-green-700 rounded-xl"
            >
              Already have an eNWR?
            </Button>
          </div>

          <div className="space-y-3">
            <Label htmlFor="enwrNumber" className="text-base font-semibold">Or enter eNWR Number directly</Label>
            <div className="flex gap-3">
              <Input
                id="enwrNumber"
                value={enwrData.enwrNumber}
                onChange={(e) => setEnwrData({...enwrData, enwrNumber: e.target.value})}
                placeholder="Enter eNWR unique ID (e.g., ENWR2024001)"
                className="h-12"
              />
              <Button 
                onClick={handleEnwrVerification} 
                disabled={loading || !enwrData.enwrNumber}
                className="h-12 px-6 bg-[#2E7D32] hover:bg-green-700 rounded-xl"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {loading && (
        <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
          <span className="text-sm font-medium text-blue-800">Connecting to NeRL...</span>
        </div>
      )}

      {verified && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <span className="text-sm font-semibold text-green-800">eNWR Verified Successfully</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800 ml-auto">Verified</Badge>
          </div>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">eNWR Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Repository</Label>
                  <Input value={enwrData.repository} readOnly className="bg-gray-50 h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Commodity</Label>
                  <Input value={enwrData.commodity} readOnly className="bg-gray-50 h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Quantity</Label>
                  <Input value={enwrData.quantity} readOnly className="bg-gray-50 h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Warehouse Name</Label>
                  <Input value={enwrData.warehouseName} readOnly className="bg-gray-50 h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Storage Location</Label>
                  <Input value={enwrData.storageLocation} readOnly className="bg-gray-50 h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Valid Till</Label>
                  <Input value={enwrData.validTill} readOnly className="bg-gray-50 h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Issued Date</Label>
                  <Input value={enwrData.issuedDate} readOnly className="bg-gray-50 h-11" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-600">Lien Mark Status</Label>
                  <Input value={enwrData.lienMarkStatus} readOnly className="bg-gray-50 h-11" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full h-12 bg-[#2E7D32] hover:bg-green-700 rounded-xl text-base font-semibold">
            Raise Financing Request
          </Button>
        </div>
      )}

      <EnwrVerificationModal 
        isOpen={showEnwrModal}
        onClose={() => setShowEnwrModal(false)}
        onEnwrVerified={handleEnwrVerified}
      />
    </div>
  );
}
