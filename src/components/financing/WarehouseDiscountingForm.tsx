
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function WarehouseDiscountingForm() {
  const [option, setOption] = useState<"existing" | "generate" | "">("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const [enwrData, setEnwrData] = useState({
    enwrNumber: "",
    repository: "",
    commodity: "",
    quantity: "",
    warehouseName: "",
    storageLocation: "",
    validTill: "",
    issuedDate: "",
    lienMarkStatus: ""
  });

  const [newEnwrData, setNewEnwrData] = useState({
    depositorName: "",
    panAadhaar: "",
    mobileNumber: "",
    warehouse: "",
    warehouseRegNo: "",
    gpsCoordinates: "",
    storageType: "",
    commodityName: "",
    varietyGrade: "",
    quantity: "",
    packType: "",
    packSize: "",
    assayingRequired: false,
    assayingAgency: ""
  });

  const handleEnwrVerification = async () => {
    if (!enwrData.enwrNumber) return;
    
    setLoading(true);
    // Simulate API call to NeRL
    setTimeout(() => {
      setEnwrData({
        ...enwrData,
        repository: "NeRL",
        commodity: "Wheat",
        quantity: "100 MT",
        warehouseName: "ABC Warehouse Pvt Ltd",
        storageLocation: "Rajasthan",
        validTill: "2024-12-31",
        issuedDate: "2024-06-01",
        lienMarkStatus: "No"
      });
      setVerified(true);
      setLoading(false);
      toast({
        title: "eNWR Verified",
        description: "eNWR details have been fetched successfully from NeRL.",
      });
    }, 2000);
  };

  const handleGenerateEnwr = () => {
    setLoading(true);
    // Simulate eNWR generation
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "eNWR Generated",
        description: "New eNWR has been generated successfully. ID: ENWR2024001",
      });
      // Would redirect to financing workflow
    }, 3000);
  };

  const renderExistingEnwr = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="enwrNumber">eNWR Number</Label>
          <div className="flex gap-2">
            <Input
              id="enwrNumber"
              value={enwrData.enwrNumber}
              onChange={(e) => setEnwrData({...enwrData, enwrNumber: e.target.value})}
              placeholder="Enter eNWR unique ID"
            />
            <Button onClick={handleEnwrVerification} disabled={loading || !enwrData.enwrNumber}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Verify"}
            </Button>
          </div>
        </div>

        {loading && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
            <span className="text-sm">Connecting to NeRL...</span>
          </div>
        )}

        {verified && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">eNWR Verified Successfully</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">Verified</Badge>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">eNWR Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Repository</Label>
                    <Input value={enwrData.repository} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Commodity</Label>
                    <Input value={enwrData.commodity} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Quantity</Label>
                    <Input value={enwrData.quantity} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Warehouse Name</Label>
                    <Input value={enwrData.warehouseName} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Storage Location</Label>
                    <Input value={enwrData.storageLocation} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Valid Till</Label>
                    <Input value={enwrData.validTill} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Issued Date</Label>
                    <Input value={enwrData.issuedDate} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>Lien Mark Status</Label>
                    <Input value={enwrData.lienMarkStatus} readOnly className="bg-gray-50" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full">
              Raise Financing Request
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const renderGenerateEnwr = () => (
    <div className="space-y-6">
      <Accordion type="single" collapsible value={`step-${step}`} onValueChange={(value) => setStep(parseInt(value?.split('-')[1] || '1'))}>
        <AccordionItem value="step-1">
          <AccordionTrigger>Step 1: Depositor & Warehouse Info</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Depositor Name</Label>
                <Input
                  value={newEnwrData.depositorName}
                  onChange={(e) => setNewEnwrData({...newEnwrData, depositorName: e.target.value})}
                  placeholder="Auto-filled from KYC"
                />
              </div>
              <div className="space-y-2">
                <Label>PAN / Aadhaar</Label>
                <Input
                  value={newEnwrData.panAadhaar}
                  onChange={(e) => setNewEnwrData({...newEnwrData, panAadhaar: e.target.value})}
                  placeholder="Auto-filled from KYC"
                />
              </div>
              <div className="space-y-2">
                <Label>Mobile Number</Label>
                <Input
                  value={newEnwrData.mobileNumber}
                  onChange={(e) => setNewEnwrData({...newEnwrData, mobileNumber: e.target.value})}
                  placeholder="Auto-filled"
                />
              </div>
              <div className="space-y-2">
                <Label>WDRA Registered Warehouse</Label>
                <Select value={newEnwrData.warehouse} onValueChange={(value) => setNewEnwrData({...newEnwrData, warehouse: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="abc-warehouse">ABC Warehouse Pvt Ltd</SelectItem>
                    <SelectItem value="xyz-storage">XYZ Storage Solutions</SelectItem>
                    <SelectItem value="agri-store">Agri Store India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Storage Type</Label>
                <Select value={newEnwrData.storageType} onValueChange={(value) => setNewEnwrData({...newEnwrData, storageType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="godown">Godown</SelectItem>
                    <SelectItem value="cold">Cold Storage</SelectItem>
                    <SelectItem value="silo">Silo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="step-2">
          <AccordionTrigger>Step 2: Commodity Details</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Commodity Name</Label>
                <Select value={newEnwrData.commodityName} onValueChange={(value) => setNewEnwrData({...newEnwrData, commodityName: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select commodity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="maize">Maize</SelectItem>
                    <SelectItem value="soybean">Soybean</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Variety/Grade</Label>
                <Input
                  value={newEnwrData.varietyGrade}
                  onChange={(e) => setNewEnwrData({...newEnwrData, varietyGrade: e.target.value})}
                  placeholder="e.g., HD-2967"
                />
              </div>
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input
                  value={newEnwrData.quantity}
                  onChange={(e) => setNewEnwrData({...newEnwrData, quantity: e.target.value})}
                  placeholder="Enter quantity (MT/Qtl)"
                />
              </div>
              <div className="space-y-2">
                <Label>Pack Type</Label>
                <Select value={newEnwrData.packType} onValueChange={(value) => setNewEnwrData({...newEnwrData, packType: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pack type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bags">Bags</SelectItem>
                    <SelectItem value="bulk">Bulk</SelectItem>
                    <SelectItem value="containers">Containers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="step-3">
          <AccordionTrigger>Step 3: Generate eNWR</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">Ready to Generate eNWR</h4>
              <p className="text-sm text-muted-foreground mb-4">
                All details have been collected. Click below to generate your eNWR and raise financing request.
              </p>
              <Button onClick={handleGenerateEnwr} disabled={loading} className="w-full">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating eNWR...
                  </>
                ) : (
                  "Generate eNWR & Raise Financing"
                )}
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <div className="space-y-6">
      <RadioGroup value={option} onValueChange={(value) => setOption(value as "existing" | "generate")}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="existing" id="existing" />
          <Label htmlFor="existing">I already have an eNWR</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="generate" id="generate" />
          <Label htmlFor="generate">I need to generate an eNWR (Stock is stored in WDRA-registered warehouse)</Label>
        </div>
      </RadioGroup>

      {option === "existing" && renderExistingEnwr()}
      {option === "generate" && renderGenerateEnwr()}
    </div>
  );
}
