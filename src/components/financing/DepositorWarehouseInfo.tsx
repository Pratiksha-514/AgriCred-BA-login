
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, CheckCircle } from "lucide-react";

interface DepositorWarehouseInfoProps {
  data: any;
  onDataChange: (data: any) => void;
}

export function DepositorWarehouseInfo({ data, onDataChange }: DepositorWarehouseInfoProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onDataChange({
        ...data,
        receiptFile: file
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-base font-semibold">Depositor Name</Label>
          <Input
            value={data.depositorName}
            onChange={(e) => onDataChange({...data, depositorName: e.target.value})}
            placeholder="Auto-filled from KYC"
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-base font-semibold">PAN / Aadhaar</Label>
          <Input
            value={data.panAadhaar}
            onChange={(e) => onDataChange({...data, panAadhaar: e.target.value})}
            placeholder="Auto-filled from KYC"
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-base font-semibold">Mobile Number</Label>
          <Input
            value={data.mobileNumber}
            onChange={(e) => onDataChange({...data, mobileNumber: e.target.value})}
            placeholder="Auto-filled"
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-base font-semibold">WDRA Registered Warehouse</Label>
          <Select value={data.warehouse} onValueChange={(value) => onDataChange({...data, warehouse: value})}>
            <SelectTrigger className="h-11">
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
          <Label className="text-base font-semibold">Storage Type</Label>
          <Select value={data.storageType} onValueChange={(value) => onDataChange({...data, storageType: value})}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="godown">Godown</SelectItem>
              <SelectItem value="cold">Cold Storage</SelectItem>
              <SelectItem value="silo">Silo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-base font-semibold">Receipt No.</Label>
          <Input
            value={data.receiptNo}
            onChange={(e) => onDataChange({...data, receiptNo: e.target.value})}
            placeholder="Enter receipt number"
            className="h-11"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-base font-semibold">Date of Storage</Label>
          <Input
            type="date"
            value={data.storageDate}
            onChange={(e) => onDataChange({...data, storageDate: e.target.value})}
            className="h-11"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <Label className="text-base font-semibold">Upload Receipt/Kacha Bill</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 bg-gray-50/50 hover:border-[#2E7D32] transition-colors">
          <div className="text-center space-y-3">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <div>
              <input
                type="file"
                id="receipt-upload"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label
                htmlFor="receipt-upload"
                className="cursor-pointer inline-flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <Upload className="h-4 w-4" />
                Choose File
              </label>
            </div>
            <p className="text-sm text-muted-foreground">
              Upload receipt or kacha bill (PDF, JPG, PNG up to 10MB)
            </p>
            {data.receiptFile && (
              <div className="flex items-center gap-2 justify-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                {data.receiptFile.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
