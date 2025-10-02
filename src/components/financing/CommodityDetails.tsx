
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CommodityDetailsProps {
  data: any;
  onDataChange: (data: any) => void;
}

export function CommodityDetails({ data, onDataChange }: CommodityDetailsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label className="text-base font-semibold">Commodity Name</Label>
        <Select value={data.commodityName} onValueChange={(value) => onDataChange({...data, commodityName: value})}>
          <SelectTrigger className="h-11">
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
        <Label className="text-base font-semibold">Variety/Grade</Label>
        <Input
          value={data.varietyGrade}
          onChange={(e) => onDataChange({...data, varietyGrade: e.target.value})}
          placeholder="e.g., HD-2967"
          className="h-11"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-base font-semibold">Quantity</Label>
        <Input
          value={data.quantity}
          onChange={(e) => onDataChange({...data, quantity: e.target.value})}
          placeholder="Enter quantity (MT/Qtl)"
          className="h-11"
        />
      </div>
      <div className="space-y-2">
        <Label className="text-base font-semibold">Pack Type</Label>
        <Select value={data.packType} onValueChange={(value) => onDataChange({...data, packType: value})}>
          <SelectTrigger className="h-11">
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
  );
}
