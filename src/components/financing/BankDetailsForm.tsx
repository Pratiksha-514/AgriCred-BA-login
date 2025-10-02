
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Upload, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BankDetailsFormProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
  submitButtonText?: string;
}

export function BankDetailsForm({ 
  onSubmit, 
  onBack, 
  submitButtonText = "Apply for Financing" 
}: BankDetailsFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    accountHolderName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    upiId: "",
    cancelledCheque: null as File | null,
    confirmAccuracy: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.accountHolderName.trim()) {
      newErrors.accountHolderName = "Account holder name is required";
    }

    if (!formData.accountNumber.trim()) {
      newErrors.accountNumber = "Account number is required";
    }

    if (!formData.confirmAccountNumber.trim()) {
      newErrors.confirmAccountNumber = "Please confirm account number";
    } else if (formData.accountNumber !== formData.confirmAccountNumber) {
      newErrors.confirmAccountNumber = "Account numbers do not match";
    }

    if (!formData.ifscCode.trim()) {
      newErrors.ifscCode = "IFSC code is required";
    } else if (!/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/.test(formData.ifscCode)) {
      newErrors.ifscCode = "Invalid IFSC code format";
    }

    if (!formData.confirmAccuracy) {
      newErrors.confirmAccuracy = "Please confirm the accuracy of bank details";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      toast({
        title: "Application Submitted",
        description: "Your financing application has been submitted successfully.",
      });
      onSubmit(formData);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleInputChange("cancelledCheque", file);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Step 3: Bank Details & Final Submission</h3>
          <p className="text-sm text-muted-foreground">
            Provide your bank details for financing disbursement
          </p>
        </div>
      </div>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-lg">
            <div className="p-2 bg-green-100 rounded-lg">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
            🏦 Bank Account Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="accountHolderName">Account Holder Name *</Label>
                <Input
                  id="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={(e) => handleInputChange("accountHolderName", e.target.value)}
                  placeholder="Enter account holder name"
                  className={errors.accountHolderName ? "border-red-500" : ""}
                />
                {errors.accountHolderName && (
                  <p className="text-sm text-red-500">{errors.accountHolderName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Bank Account Number *</Label>
                <Input
                  id="accountNumber"
                  value={formData.accountNumber}
                  onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                  placeholder="Enter account number"
                  className={errors.accountNumber ? "border-red-500" : ""}
                />
                {errors.accountNumber && (
                  <p className="text-sm text-red-500">{errors.accountNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmAccountNumber">Confirm Bank Account Number *</Label>
                <Input
                  id="confirmAccountNumber"
                  value={formData.confirmAccountNumber}
                  onChange={(e) => handleInputChange("confirmAccountNumber", e.target.value)}
                  placeholder="Re-enter account number"
                  className={errors.confirmAccountNumber ? "border-red-500" : ""}
                />
                {errors.confirmAccountNumber && (
                  <p className="text-sm text-red-500">{errors.confirmAccountNumber}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ifscCode">IFSC Code *</Label>
                <Input
                  id="ifscCode"
                  value={formData.ifscCode}
                  onChange={(e) => handleInputChange("ifscCode", e.target.value.toUpperCase())}
                  placeholder="Enter IFSC code"
                  className={errors.ifscCode ? "border-red-500" : ""}
                />
                {errors.ifscCode && (
                  <p className="text-sm text-red-500">{errors.ifscCode}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="upiId">UPI ID (Optional)</Label>
                <Input
                  id="upiId"
                  value={formData.upiId}
                  onChange={(e) => handleInputChange("upiId", e.target.value)}
                  placeholder="yourname@upi"
                />
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="cancelledCheque">Upload Cancelled Cheque (Optional)</Label>
              <div className="flex items-center gap-3">
                <Input
                  id="cancelledCheque"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("cancelledCheque")?.click()}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Choose File
                </Button>
                {formData.cancelledCheque && (
                  <span className="text-sm text-green-600">
                    ✓ {formData.cancelledCheque.name}
                  </span>
                )}
              </div>
            </div>

            {/* Confirmation Checkbox */}
            <div className="flex items-start space-x-2 p-4 bg-gray-50 rounded-lg">
              <Checkbox
                id="confirmAccuracy"
                checked={formData.confirmAccuracy}
                onCheckedChange={(checked) => handleInputChange("confirmAccuracy", checked as boolean)}
                className={errors.confirmAccuracy ? "border-red-500" : ""}
              />
              <div className="space-y-1">
                <Label 
                  htmlFor="confirmAccuracy" 
                  className="text-sm font-medium cursor-pointer"
                >
                  I confirm that the above bank details are accurate and belong to me.
                </Label>
                {errors.confirmAccuracy && (
                  <p className="text-sm text-red-500">{errors.confirmAccuracy}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button 
                type="submit"
                className="w-full h-12 bg-[#2E7D32] hover:bg-green-700 rounded-xl text-base font-semibold"
              >
                🚀 {submitButtonText}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
