
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface InsurancePolicy {
  srNo: string;
  policyName: string;
  policyNo: string;
  insuredAmount: string;
  validityFrom: string;
  validityTo: string;
  companyName: string;
}

interface InsuranceDetailsProps {
  data: any;
  onDataChange: (data: any) => void;
}

export function InsuranceDetails({ data, onDataChange }: InsuranceDetailsProps) {
  const addInsurancePolicy = () => {
    const newPolicy: InsurancePolicy = {
      srNo: (data.insurancePolicies.length + 1).toString(),
      policyName: "",
      policyNo: "",
      insuredAmount: "",
      validityFrom: "",
      validityTo: "",
      companyName: ""
    };
    onDataChange({
      ...data,
      insurancePolicies: [...data.insurancePolicies, newPolicy]
    });
  };

  const updateInsurancePolicy = (index: number, field: keyof InsurancePolicy, value: string) => {
    const updatedPolicies = data.insurancePolicies.map((policy: InsurancePolicy, i: number) => 
      i === index ? { ...policy, [field]: value } : policy
    );
    onDataChange({
      ...data,
      insurancePolicies: updatedPolicies
    });
  };

  const removeInsurancePolicy = (index: number) => {
    if (data.insurancePolicies.length > 1) {
      const updatedPolicies = data.insurancePolicies.filter((_: any, i: number) => i !== index);
      onDataChange({
        ...data,
        insurancePolicies: updatedPolicies
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-base font-semibold">Amount of Advance paid, if any</Label>
        <Input
          value={data.advanceAmount}
          onChange={(e) => onDataChange({...data, advanceAmount: e.target.value})}
          placeholder="Enter advance amount (₹)"
          className="h-11"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-base font-semibold">Insurance Policy Details</Label>
          <Button 
            type="button" 
            onClick={addInsurancePolicy}
            variant="outline" 
            size="sm"
            className="text-[#2E7D32] border-[#2E7D32] hover:bg-green-50"
          >
            Add Policy
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground mb-4">
          Insured for fire, floods, theft, burglary, misappropriation, riots, strikes or terrorism:
        </div>

        {data.insurancePolicies.map((policy: InsurancePolicy, index: number) => (
          <Card key={index} className="p-4 border-2 border-dashed border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Policy #{policy.srNo}</h4>
              {data.insurancePolicies.length > 1 && (
                <Button 
                  type="button"
                  onClick={() => removeInsurancePolicy(index)}
                  variant="ghost" 
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Remove
                </Button>
              )}
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Name of Insurance Policy</Label>
                <Input
                  value={policy.policyName}
                  onChange={(e) => updateInsurancePolicy(index, 'policyName', e.target.value)}
                  placeholder="Policy name"
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Policy No.</Label>
                <Input
                  value={policy.policyNo}
                  onChange={(e) => updateInsurancePolicy(index, 'policyNo', e.target.value)}
                  placeholder="Policy number"
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Insured Amount (₹)</Label>
                <Input
                  value={policy.insuredAmount}
                  onChange={(e) => updateInsurancePolicy(index, 'insuredAmount', e.target.value)}
                  placeholder="Insured amount"
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Insurance Company</Label>
                <Input
                  value={policy.companyName}
                  onChange={(e) => updateInsurancePolicy(index, 'companyName', e.target.value)}
                  placeholder="Company name"
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Validity From</Label>
                <Input
                  type="date"
                  value={policy.validityFrom}
                  onChange={(e) => updateInsurancePolicy(index, 'validityFrom', e.target.value)}
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Validity To</Label>
                <Input
                  type="date"
                  value={policy.validityTo}
                  onChange={(e) => updateInsurancePolicy(index, 'validityTo', e.target.value)}
                  className="h-10"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-2">
        <Label className="text-base font-semibold">Receipt Validity Date</Label>
        <Input
          type="date"
          value={data.receiptValidityDate}
          onChange={(e) => onDataChange({...data, receiptValidityDate: e.target.value})}
          className="h-11"
        />
        <div className="text-xs text-muted-foreground">
          This receipt shall be valid up to the date of expiry of the declared shelf-life.
        </div>
      </div>
    </div>
  );
}
