
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Building, CreditCard, FileText, Shield, Bell, Upload, CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";

const mockProfile = {
  name: "Ramesh Kumar",
  email: "ramesh.kumar@farmerpro.in",
  phone: "+91 98765 43210",
  aadhaar: "1234 5678 9012",
  pan: "ABCDE1234F",
  gstin: "27ABCDE1234F1Z5",
  entityType: "Individual Farmer",
  address: "Village Kharkhoda, Sonipat, Haryana - 131001"
};

const mockBankAccount = {
  accountNumber: "1234567890123456",
  ifsc: "SBIN0001234",
  bankName: "State Bank of India",
  branch: "Sonipat Main Branch",
  accountType: "Savings"
};

const mockDocuments = [
  { type: "Aadhaar Card", status: "Approved", uploadDate: "15 Jun 2024", icon: FileText },
  { type: "PAN Card", status: "Approved", uploadDate: "15 Jun 2024", icon: FileText },
  { type: "Bank Statement", status: "Pending", uploadDate: "28 Jun 2024", icon: FileText },
  { type: "Cancelled Cheque", status: "Approved", uploadDate: "16 Jun 2024", icon: FileText },
  { type: "Board Resolution", status: "Not Required", uploadDate: "-", icon: FileText }
];

const getStatusBadge = (status: string) => {
  const variants = {
    "Approved": { variant: "default" as const, icon: CheckCircle, color: "text-green-600 bg-green-100" },
    "Pending": { variant: "secondary" as const, icon: Clock, color: "text-yellow-600 bg-yellow-100" },
    "Rejected": { variant: "destructive" as const, icon: XCircle, color: "text-red-600 bg-red-100" },
    "Not Required": { variant: "outline" as const, icon: FileText, color: "text-gray-600 bg-gray-100" }
  };
  
  const config = variants[status as keyof typeof variants] || variants["Pending"];
  const Icon = config.icon;
  
  return (
    <Badge className={`flex items-center gap-1 ${config.color}`}>
      <Icon className="h-3 w-3" />
      {status}
    </Badge>
  );
};

const Settings = () => {
  const [profile, setProfile] = useState(mockProfile);
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleDocumentUpload = (docType: string) => {
    toast.success(`${docType} uploaded successfully! Verification in progress.`);
  };

  return (
    <div className="flex-1 space-y-6 p-6 pb-16">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">⚙️ Settings & KYC</h1>
        <p className="text-muted-foreground mt-1">
          Manage your profile, KYC documents, and account preferences.
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="kyc" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            KYC Documents
          </TabsTrigger>
          <TabsTrigger value="banking" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Banking
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                🎯 Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal and business information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Personal Details</h3>
                <Button 
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                  className="rounded-xl"
                >
                  {isEditing ? "✅ Save Changes" : "✏️ Edit Profile"}
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    disabled={!isEditing}
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="entityType">Entity Type</Label>
                  <Select value={profile.entityType} disabled={!isEditing}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Individual Farmer">Individual Farmer</SelectItem>
                      <SelectItem value="FPO">Farmer Producer Organization</SelectItem>
                      <SelectItem value="FPC">Farmer Producer Company</SelectItem>
                      <SelectItem value="Trader">Trader</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address"
                  value={profile.address}
                  onChange={(e) => setProfile({...profile, address: e.target.value})}
                  disabled={!isEditing}
                  className="rounded-xl"
                />
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold mb-4">Government IDs</h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Aadhaar Number</Label>
                    <Input value={profile.aadhaar} disabled className="rounded-xl bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>PAN Number</Label>
                    <Input value={profile.pan} disabled className="rounded-xl bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>GSTIN</Label>
                    <Input value={profile.gstin} disabled className="rounded-xl bg-gray-50" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Government IDs are verified through official channels and cannot be edited directly.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* KYC Documents Tab */}
        <TabsContent value="kyc">
          <Card className="shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" />
                🗂️ KYC Documents Upload
              </CardTitle>
              <CardDescription>
                Upload and manage your KYC documents for verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <doc.icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.uploadDate !== "-" ? `Uploaded: ${doc.uploadDate}` : "Not uploaded"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusBadge(doc.status)}
                      {doc.status !== "Approved" && doc.status !== "Not Required" && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDocumentUpload(doc.type)}
                          className="rounded-xl"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Upload
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <h4 className="font-semibold text-blue-900 mb-2">✅ OCR Verification</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Documents are automatically verified using OCR technology</li>
                  <li>• Aadhaar and PAN details are cross-verified with government databases</li>
                  <li>• Bank account validation through penny drop verification</li>
                  <li>• Typical verification time: 2-24 hours</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Banking Tab */}
        <TabsContent value="banking">
          <Card className="shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="font-semibold flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                💳 Banking Information
              </CardTitle>
              <CardDescription>
                Manage your linked bank accounts for payouts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-green-900">Primary Bank Account</h4>
                  <Badge className="bg-green-100 text-green-800">✅ Verified</Badge>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Bank Name</p>
                    <p className="font-semibold">{mockBankAccount.bankName}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Branch</p>
                    <p className="font-semibold">{mockBankAccount.branch}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Account Number</p>
                    <p className="font-mono">****{mockBankAccount.accountNumber.slice(-4)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">IFSC Code</p>
                    <p className="font-mono">{mockBankAccount.ifsc}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="rounded-xl">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Add New Account
                </Button>
                <Button variant="outline" className="rounded-xl">
                  <FileText className="h-4 w-4 mr-2" />
                  Update Bank Details
                </Button>
              </div>

              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                <h4 className="font-semibold text-yellow-900 mb-2">🏦 Bank Mandate Letter</h4>
                <p className="text-sm text-yellow-800 mb-3">
                  Required for automated loan disbursements and repayments
                </p>
                <Button size="sm" className="bg-[#2E7D32] hover:bg-[#1B5E20] rounded-xl">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Mandate Letter
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5" />
                🔒 Security Settings
              </CardTitle>
              <CardDescription>
                Manage your account security and authentication preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add extra security with OTP verification</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">✅ Enabled</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <p className="font-medium">Aadhaar eSign</p>
                    <p className="text-sm text-muted-foreground">Digital signature using Aadhaar</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">✅ Active</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-xl">
                  <div>
                    <p className="font-medium">Login Notifications</p>
                    <p className="text-sm text-muted-foreground">Get notified of account access</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">✅ On</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <Button variant="outline" className="w-full rounded-xl">
                  🔑 Change Password
                </Button>
                <Button variant="outline" className="w-full rounded-xl">
                  📱 Update Phone Number
                </Button>
                <Button variant="outline" className="w-full rounded-xl">
                  📧 Change Email Address
                </Button>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <h4 className="font-semibold text-red-900 mb-2">⚠️ Account Deactivation</h4>
                <p className="text-sm text-red-800 mb-3">
                  Permanently deactivate your AgriCred account. This action cannot be undone.
                </p>
                <Button variant="destructive" size="sm" className="rounded-xl">
                  Deactivate Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
