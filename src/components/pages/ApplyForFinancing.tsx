
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import { FileText, Warehouse, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react";
// import { InvoiceDiscountingFlow } from "@/components/financing/InvoiceDiscountingFlow";
// import { WarehouseDiscountingFlow } from "@/components/financing/WarehouseDiscountingFlow";
// import { FinancingSmartSidebar } from "@/components/financing/FinancingSmartSidebar";

// const ApplyFinancing = () => {
//   const [activeTab, setActiveTab] = useState("invoice");
//   const [applicationData, setApplicationData] = useState({
//     instrumentType: "invoice",
//     status: "draft",
//     estimatedFinancing: 0,
//     invoiceAmount: 0,
//     enwrValue: 0
//   });

//   const handleDataUpdate = (data: any) => {
//     setApplicationData(prev => ({ ...prev, ...data }));
//   };

//   return (
//     <div className="flex-1 space-y-6 p-6 pb-16 bg-gray-50/50">
//       {/* Breadcrumb */}
//       <div className="flex items-center text-sm text-muted-foreground">
//         <span>Dashboard</span>
//         <span className="mx-2">/</span>
//         <span className="text-foreground font-medium">Apply for Financing</span>
//       </div>

//       {/* Header Section */}
//       <div className="space-y-3">
//         <h1 className="text-3xl font-bold tracking-tight text-gray-900">Apply for Financing</h1>
//         <p className="text-lg text-muted-foreground max-w-2xl">
//           Raise financing against your invoices or warehouse stock (eNWR). 
//           Get competitive offers from multiple lenders in minutes.
//         </p>
//       </div>

//       <div className="grid gap-6 lg:grid-cols-4">
//         {/* Main Content */}
//         <div className="lg:col-span-3">
//           <Tabs value={activeTab} onValueChange={(value) => {
//             setActiveTab(value);
//             handleDataUpdate({ instrumentType: value });
//           }} className="space-y-6">
            
//             <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm border rounded-2xl p-1 h-14">
//               <TabsTrigger 
//                 value="invoice" 
//                 className="flex items-center gap-3 rounded-xl py-3 px-6 data-[state=active]:bg-[#2E7D32] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
//               >
//                 <FileText className="h-5 w-5" />
//                 <div className="text-left">
//                   <div className="font-semibold">Invoice Discounting</div>
//                   <div className="text-xs opacity-80">Upload & get offers</div>
//                 </div>
//               </TabsTrigger>
//               <TabsTrigger 
//                 value="warehouse" 
//                 className="flex items-center gap-3 rounded-xl py-3 px-6 data-[state=active]:bg-[#2E7D32] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
//               >
//                 <Warehouse className="h-5 w-5" />
//                 <div className="text-left">
//                   <div className="font-semibold">Warehouse Discounting</div>
//                   <div className="text-xs opacity-80">eNWR financing</div>
//                 </div>
//               </TabsTrigger>
//             </TabsList>

//             <TabsContent value="invoice" className="space-y-6">
//               <Card className="border-t-4 border-t-[#2E7D32] shadow-md rounded-2xl">
//                 <CardHeader className="pb-4">
//                   <CardTitle className="flex items-center gap-3 text-xl">
//                     <div className="p-2 bg-green-100 rounded-xl">
//                       <FileText className="h-6 w-6 text-[#2E7D32]" />
//                     </div>
//                     Upload & Raise Invoice
//                   </CardTitle>
//                   <CardDescription className="text-base">
//                     Upload your invoice and get instant financing offers from multiple lenders
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <InvoiceDiscountingFlow onDataUpdate={handleDataUpdate} />
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             <TabsContent value="warehouse" className="space-y-6">
//               <Card className="border-t-4 border-t-[#2E7D32] shadow-md rounded-2xl">
//                 <CardHeader className="pb-4">
//                   <CardTitle className="flex items-center gap-3 text-xl">
//                     <div className="p-2 bg-green-100 rounded-xl">
//                       <Warehouse className="h-6 w-6 text-[#2E7D32]" />
//                     </div>
//                     Warehouse Discounting (via NeRL)
//                   </CardTitle>
//                   <CardDescription className="text-base">
//                     Raise financing against your warehouse stock using eNWR
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <WarehouseDiscountingFlow onDataUpdate={handleDataUpdate} />
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </div>

//         {/* Smart Sidebar */}
//         <div className="lg:col-span-1">
//           <FinancingSmartSidebar 
//             activeTab={activeTab} 
//             applicationData={applicationData}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplyFinancing;



import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Warehouse } from "lucide-react";

// Financing flows & sidebar
import { InvoiceDiscountingFlow } from "@/components/financing/InvoiceDiscountingFlow";
import { WarehouseDiscountingFlow } from "@/components/financing/WarehouseDiscountingFlow";
import { FinancingSmartSidebar } from "@/components/financing/FinancingSmartSidebar";

const ApplyForFinancing = () => {
  const [activeTab, setActiveTab] = useState<"invoice" | "warehouse">("invoice");
  const [applicationData, setApplicationData] = useState({
    instrumentType: "invoice",
    status: "draft",
    estimatedFinancing: 0,
    invoiceAmount: 0,
    enwrValue: 0,
  });

  const handleDataUpdate = (data: any) => {
    setApplicationData((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="flex-1 space-y-6 p-6 pb-16 bg-gray-50/50">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground">
        <span>Dashboard</span>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">Apply for Financing</span>
      </div>

      {/* Header Section */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Apply for Financing
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Raise financing against your invoices or warehouse stock (eNWR). 
          Get competitive offers from multiple lenders in minutes.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs
            value={activeTab}
            onValueChange={(value: "invoice" | "warehouse") => {
              setActiveTab(value);
              handleDataUpdate({ instrumentType: value });
            }}
            className="space-y-6"
          >
            {/* Tabs */}
            <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm border rounded-2xl p-1 h-14">
              <TabsTrigger
                value="invoice"
                className="flex items-center gap-3 rounded-xl py-3 px-6 data-[state=active]:bg-[#2E7D32] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <FileText className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Invoice Discounting</div>
                  <div className="text-xs opacity-80">Upload & get offers</div>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="warehouse"
                className="flex items-center gap-3 rounded-xl py-3 px-6 data-[state=active]:bg-[#2E7D32] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200"
              >
                <Warehouse className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-semibold">Warehouse Discounting</div>
                  <div className="text-xs opacity-80">eNWR financing</div>
                </div>
              </TabsTrigger>
            </TabsList>

            {/* Invoice Tab */}
            <TabsContent value="invoice" className="space-y-6">
              <Card className="border-t-4 border-t-[#2E7D32] shadow-md rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-green-100 rounded-xl">
                      <FileText className="h-6 w-6 text-[#2E7D32]" />
                    </div>
                    Upload & Raise Invoice
                  </CardTitle>
                  <CardDescription className="text-base">
                    Upload your invoice and get instant financing offers from multiple lenders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InvoiceDiscountingFlow onDataUpdate={handleDataUpdate} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Warehouse Tab */}
            <TabsContent value="warehouse" className="space-y-6">
              <Card className="border-t-4 border-t-[#2E7D32] shadow-md rounded-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-green-100 rounded-xl">
                      <Warehouse className="h-6 w-6 text-[#2E7D32]" />
                    </div>
                    Warehouse Discounting (via NeRL)
                  </CardTitle>
                  <CardDescription className="text-base">
                    Raise financing against your warehouse stock using eNWR
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <WarehouseDiscountingFlow onDataUpdate={handleDataUpdate} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Smart Sidebar */}
        <div className="lg:col-span-1">
          <FinancingSmartSidebar
            activeTab={activeTab}
            applicationData={applicationData}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplyForFinancing;
