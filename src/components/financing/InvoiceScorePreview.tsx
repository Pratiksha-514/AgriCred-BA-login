
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, TrendingUp, AlertCircle, Info } from "lucide-react";

interface InvoiceScorePreviewProps {
  invoiceValue: number;
  financingPercent: number;
  estimatedFinancing: number;
  minInterest: number;
  maxInterest: number;
  invoiceRiskScore: number; // out of 1000
  onConfirm: () => void;
}

export function InvoiceScorePreview({
  invoiceValue,
  financingPercent,
  estimatedFinancing,
  minInterest,
  maxInterest,
  invoiceRiskScore,
  onConfirm
}: InvoiceScorePreviewProps) {
  // Convert risk score from 1000 to 100 scale
  const riskScoreOutOf100 = Math.round(invoiceRiskScore / 10);
  
  // Determine risk level and color
  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: "Low Risk", color: "bg-green-100 text-green-800" };
    if (score >= 60) return { level: "Medium Risk", color: "bg-yellow-100 text-yellow-800" };
    return { level: "High Risk", color: "bg-red-100 text-red-800" };
  };

  const riskInfo = getRiskLevel(riskScoreOutOf100);

  return (
    <Card className="border-l-4 border-l-blue-500 bg-blue-50/50 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg text-blue-900">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          📄 Invoice Score Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Invoice Details */}
        <div className="grid gap-3 text-sm">
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 font-medium">Invoice Value:</span>
            <span className="font-bold text-lg">₹{invoiceValue.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 bg-green-50 px-3 rounded-lg">
            <span className="text-gray-600 font-medium">Estimated Financing ({financingPercent}%):</span>
            <span className="font-bold text-lg text-green-700">₹{estimatedFinancing.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 font-medium">Interest Rate Range:</span>
            <span className="font-semibold">{minInterest}% – {maxInterest}% p.a.</span>
          </div>
          
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 font-medium">Invoice Risk Score:</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">{riskScoreOutOf100}/100</span>
              <Badge variant="secondary" className={riskInfo.color}>
                {riskInfo.level}
              </Badge>
            </div>
          </div>
        </div>

        {/* Risk Score Explanation */}
        <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600">
          <div className="flex items-start gap-2">
            <TrendingUp className="h-4 w-4 mt-0.5 text-blue-600" />
            <span>(Calculated by our internal risk engine – higher score = lower risk)</span>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 mt-0.5 text-amber-600" />
            <div className="text-xs text-amber-800">
              <span className="font-medium">💡 Note:</span> The exact interest rate will be finalized during the bidding/negotiation phase, influenced by investor interest and the risk score.
            </div>
          </div>
        </div>

        {/* Confirmation Button */}
        <div className="pt-2">
          <Button 
            onClick={onConfirm}
            className="w-full h-12 bg-[#2E7D32] hover:bg-green-700 rounded-xl text-base font-semibold"
          >
            🔧 Confirm & Proceed to Apply Financing
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
