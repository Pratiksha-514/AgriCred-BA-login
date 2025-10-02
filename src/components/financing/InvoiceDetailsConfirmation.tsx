
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Edit3, FileText } from "lucide-react";

interface InvoiceDetailsConfirmationProps {
  initialData?: {
    invoiceNumber: string;
    buyerName: string;
    invoiceAmount: number;
    invoiceDate: string;
    dueDate: string;
    buyerGstin: string;
    supplyTerms: string;
  };
  onConfirm: (data: any) => void;
  onBack: () => void;
}

export function InvoiceDetailsConfirmation({ 
  initialData, 
  onConfirm, 
  onBack 
}: InvoiceDetailsConfirmationProps) {
  const [formData, setFormData] = useState(initialData || {
    invoiceNumber: "INV-2024-001",
    buyerName: "Reliance Retail Ltd.",
    invoiceAmount: 250000,
    invoiceDate: "15-06-2024",
    dueDate: "15-07-2024",
    buyerGstin: "27ABCR1234M1Z5",
    supplyTerms: "30 Days"
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfirm = () => {
    onConfirm(formData);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Step 2: Confirm Invoice Details</h3>
          <p className="text-sm text-muted-foreground">
            Review and edit the invoice details extracted from OCR
          </p>
        </div>
      </div>

      {/* Form Card */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              📄 Invoice Details
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit3 className="h-4 w-4 mr-2" />
              {isEditing ? "Done Editing" : "Edit Details"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="buyerName">Buyer Name</Label>
              <Input
                id="buyerName"
                value={formData.buyerName}
                onChange={(e) => handleInputChange("buyerName", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="invoiceAmount">Invoice Amount (₹)</Label>
              <Input
                id="invoiceAmount"
                type="number"
                value={formData.invoiceAmount}
                onChange={(e) => handleInputChange("invoiceAmount", parseInt(e.target.value))}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="invoiceDate">Invoice Date</Label>
              <Input
                id="invoiceDate"
                value={formData.invoiceDate}
                onChange={(e) => handleInputChange("invoiceDate", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                value={formData.dueDate}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="buyerGstin">Buyer GSTIN</Label>
              <Input
                id="buyerGstin"
                value={formData.buyerGstin}
                onChange={(e) => handleInputChange("buyerGstin", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="supplyTerms">Supply Terms</Label>
              <Input
                id="supplyTerms"
                value={formData.supplyTerms}
                onChange={(e) => handleInputChange("supplyTerms", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
          </div>

          <div className="pt-4">
            <Button 
              onClick={handleConfirm}
              className="w-full h-12 bg-[#2E7D32] hover:bg-green-700 rounded-xl text-base font-semibold"
            >
              ✅ Confirm Invoice Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
