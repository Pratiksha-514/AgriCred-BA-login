
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ExistingEnwrVerification } from "./ExistingEnwrVerification";
import { NewEnwrGeneration } from "./NewEnwrGeneration";

interface WarehouseDiscountingFlowProps {
  onDataUpdate: (data: any) => void;
}

export function WarehouseDiscountingFlow({ onDataUpdate }: WarehouseDiscountingFlowProps) {
  const [option, setOption] = useState<"existing" | "generate" | "">("");

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-900">Choose Your Option</h3>
        <RadioGroup 
          value={option} 
          onValueChange={(value) => {
            setOption(value as "existing" | "generate");
            onDataUpdate({ instrumentType: 'warehouse' });
          }}
          className="space-y-4"
        >
          <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-[#2E7D32] transition-colors">
            <RadioGroupItem value="existing" id="existing" className="border-[#2E7D32]" />
            <Label htmlFor="existing" className="text-base font-medium cursor-pointer flex-1">
              I already have an eNWR
              <div className="text-sm text-muted-foreground mt-1">Verify and use existing eNWR for financing</div>
            </Label>
          </div>
          <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl hover:border-[#2E7D32] transition-colors">
            <RadioGroupItem value="generate" id="generate" className="border-[#2E7D32]" />
            <Label htmlFor="generate" className="text-base font-medium cursor-pointer flex-1">
              I need to generate an eNWR
              <div className="text-sm text-muted-foreground mt-1">Stock is stored in WDRA-registered warehouse</div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {option === "existing" && <ExistingEnwrVerification onDataUpdate={onDataUpdate} />}
      {option === "generate" && <NewEnwrGeneration onDataUpdate={onDataUpdate} />}
    </div>
  );
}
