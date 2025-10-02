
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Loader2, MapPin, Package, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DepositorWarehouseInfo } from "./DepositorWarehouseInfo";
import { CommodityDetails } from "./CommodityDetails";
import { InsuranceDetails } from "./InsuranceDetails";
import { Separator } from "@/components/ui/separator";

interface NewEnwrGenerationProps {
  onDataUpdate: (data: any) => void;
}

export function NewEnwrGeneration({ onDataUpdate }: NewEnwrGenerationProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const { toast } = useToast();

  const [newEnwrData, setNewEnwrData] = useState({
    depositorName: "",
    panAadhaar: "",
    mobileNumber: "",
    warehouse: "",
    warehouseRegNo: "",
    gpsCoordinates: "",
    storageType: "",
    receiptNo: "",
    storageDate: "",
    receiptFile: null as File | null,
    commodityName: "",
    varietyGrade: "",
    quantity: "",
    packType: "",
    packSize: "",
    assayingRequired: false,
    assayingAgency: "",
    advanceAmount: "",
    insurancePolicies: [
      {
        srNo: "1",
        policyName: "",
        policyNo: "",
        insuredAmount: "",
        validityFrom: "",
        validityTo: "",
        companyName: ""
      }
    ],
    receiptValidityDate: ""
  });

  const handleDataChange = (data: any) => {
    setNewEnwrData(data);
  };

  const handleConfirmDetails = () => {
    // Validate required fields
    if (!newEnwrData.depositorName || !newEnwrData.warehouse || !newEnwrData.commodityName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before confirming.",
        variant: "destructive"
      });
      return;
    }

    setShowConfirmation(true);
    toast({
      title: "Details Collected",
      description: "Please review your eNWR details before generation.",
    });
  };

  const handleConfirmReview = () => {
    setConfirmed(true);
    toast({
      title: "Details Confirmed",
      description: "You can now proceed to generate the eNWR.",
    });
  };

  const handleGenerateEnwr = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onDataUpdate({ status: 'submitted' });
      toast({
        title: "eNWR Generated Successfully",
        description: "New eNWR ID: ENWR2024001. Financing request submitted.",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible value={`step-${step}`} onValueChange={(value) => setStep(parseInt(value?.split('-')[1] || '1'))}>
        <AccordionItem value="step-1" className="border rounded-2xl px-1">
          <AccordionTrigger className="hover:no-underline px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Step 1: Depositor & Warehouse Info</div>
                <div className="text-sm text-muted-foreground">Basic information and warehouse details</div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 px-5 pb-5">
            <DepositorWarehouseInfo data={newEnwrData} onDataChange={handleDataChange} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="step-2" className="border rounded-2xl px-1 mt-4">
          <AccordionTrigger className="hover:no-underline px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Step 2: Commodity Details</div>
                <div className="text-sm text-muted-foreground">Specify commodity type, quantity and quality</div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 px-5 pb-5">
            <CommodityDetails data={newEnwrData} onDataChange={handleDataChange} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="step-3" className="border rounded-2xl px-1 mt-4">
          <AccordionTrigger className="hover:no-underline px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Shield className="h-5 w-5 text-orange-600" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Step 3: Insurance Details</div>
                <div className="text-sm text-muted-foreground">Insurance coverage information</div>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-6 px-5 pb-5">
            <InsuranceDetails data={newEnwrData} onDataChange={handleDataChange} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Step 1: Confirm Details Button - Show after basic info is filled */}
      {newEnwrData.depositorName && newEnwrData.warehouse && newEnwrData.commodityName && !showConfirmation && (
        <>
          <Separator />
          <Button 
            onClick={handleConfirmDetails}
            className="w-full h-12 bg-[#2E7D32] hover:bg-green-700 rounded-xl text-base font-semibold"
          >
            ✏️ Confirm eNWR Details
          </Button>
        </>
      )}

      {/* Step 2: Review Details Card */}
      {showConfirmation && !confirmed && (
        <>
          <Separator />
          <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg text-blue-900">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                </div>
                ✅ Review eNWR Details
              </CardTitle>
              <p className="text-sm text-blue-700">
                Please review the collected details before generating your eNWR.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-muted-foreground">Depositor:</span>
                  <span className="font-semibold">{newEnwrData.depositorName}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-muted-foreground">Warehouse:</span>
                  <span className="font-semibold">{newEnwrData.warehouse}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-muted-foreground">Commodity:</span>
                  <span className="font-semibold">{newEnwrData.commodityName}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Quantity:</span>
                  <span className="font-semibold text-[#2E7D32]">{newEnwrData.quantity}</span>
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  onClick={handleConfirmReview}
                  className="w-full h-12 bg-[#2E7D32] hover:bg-green-700 rounded-xl text-base font-semibold"
                >
                  ✅ Confirm Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Generate eNWR Button - Show only after confirmation */}
      {confirmed && (
        <>
          <Separator />
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-green-50 border-2 border-dashed border-blue-200 rounded-2xl">
            <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Ready to Generate eNWR
            </h4>
            <p className="text-muted-foreground mb-6">
              All details have been collected and confirmed. Click below to generate your eNWR and raise financing request.
            </p>
            <Button 
              onClick={handleGenerateEnwr} 
              disabled={loading} 
              className="w-full h-12 bg-[#2E7D32] hover:bg-green-700 rounded-xl text-base font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating eNWR...
                </>
              ) : (
                "Generate eNWR & Raise Financing"
              )}
            </Button>
          </Card>
        </>
      )}
    </div>
  );
}
