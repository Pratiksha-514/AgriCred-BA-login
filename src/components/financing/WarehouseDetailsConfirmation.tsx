
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Edit3 } from "lucide-react";

interface WarehouseDetailsConfirmationProps {
  initialData: {
    enwrNumber: string;
    commodity: string;
    quantity: string;
    warehouseValue: number;
    warehouseName: string;
    storageLocation: string;
    validTill: string;
    issuedDate: string;
    depositorName: string;
    varietyGrade: string;
  };
  onConfirm: (data: any) => void;
  onBack: () => void;
}

export function WarehouseDetailsConfirmation({ 
  initialData, 
  onConfirm, 
  onBack 
}: WarehouseDetailsConfirmationProps) {
  const [formData, setFormData] = useState(initialData);
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
          <h3 className="text-lg font-semibold text-gray-900">Step 1: Confirm eNWR Details</h3>
          <p className="text-sm text-muted-foreground">
            Review and edit the eNWR details extracted from NeRL
          </p>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <span className="text-sm font-medium">eNWR Verified Successfully</span>
        <Badge variant="secondary" className="bg-green-100 text-green-800">Verified</Badge>
      </div>

      {/* Form Card */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-lg">
              📋 eNWR Details
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
              <Label htmlFor="enwrNumber">eNWR Number</Label>
              <Input
                id="enwrNumber"
                value={formData.enwrNumber}
                onChange={(e) => handleInputChange("enwrNumber", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="depositorName">Depositor Name</Label>
              <Input
                id="depositorName"
                value={formData.depositorName}
                onChange={(e) => handleInputChange("depositorName", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="commodity">Commodity</Label>
              <Input
                id="commodity"
                value={formData.commodity}
                onChange={(e) => handleInputChange("commodity", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="varietyGrade">Variety/Grade</Label>
              <Input
                id="varietyGrade"
                value={formData.varietyGrade}
                onChange={(e) => handleInputChange("varietyGrade", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity (MT)</Label>
              <Input
                id="quantity"
                value={formData.quantity}
                onChange={(e) => handleInputChange("quantity", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="warehouseValue">Warehouse Value (₹)</Label>
              <Input
                id="warehouseValue"
                type="number"
                value={formData.warehouseValue}
                onChange={(e) => handleInputChange("warehouseValue", parseInt(e.target.value))}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="warehouseName">Warehouse Name</Label>
              <Input
                id="warehouseName"
                value={formData.warehouseName}
                onChange={(e) => handleInputChange("warehouseName", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="storageLocation">Storage Location</Label>
              <Input
                id="storageLocation"
                value={formData.storageLocation}
                onChange={(e) => handleInputChange("storageLocation", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issuedDate">Issued Date</Label>
              <Input
                id="issuedDate"
                value={formData.issuedDate}
                onChange={(e) => handleInputChange("issuedDate", e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? "bg-gray-50" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="validTill">Valid Till</Label>
              <Input
                id="validTill"
                value={formData.validTill}
                onChange={(e) => handleInputChange("validTill", e.target.value)}
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
              ✅ Confirm eNWR Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
