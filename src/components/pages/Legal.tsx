import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Download, Clock, CheckCircle, AlertCircle } from "lucide-react";

// Define a type for the document data to ensure consistency
interface Document {
  id: string;
  type: string;
  instrument: string;
  status: "Signed" | "Pending" | "Under Review" | "Rejected";
  signedDate: string;
  lender: string;
  downloadUrl: string;
}

const mockDocuments: Document[] = [
  {
    id: "DOC001",
    type: "Loan Agreement",
    instrument: "INV023",
    status: "Signed",
    signedDate: "2024-06-30",
    lender: "Axis Bank",
    downloadUrl: "#"
  },
  {
    id: "DOC002",
    type: "Lien Marking",
    instrument: "ENWR003",
    status: "Signed",
    signedDate: "2024-06-28",
    lender: "ICICI Bank",
    downloadUrl: "#"
  },
  {
    id: "DOC003",
    type: "Repayment Schedule",
    instrument: "INV024",
    status: "Pending",
    signedDate: "-",
    lender: "HDFC Bank",
    downloadUrl: "#"
  },
  {
    id: "DOC004",
    type: "Warehouse Lien",
    instrument: "ENWR004",
    status: "Under Review",
    signedDate: "-",
    lender: "SBI",
    downloadUrl: "#"
  }
];

const getStatusBadge = (status: Document['status']) => {
  const config = {
    "Signed": { variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
    "Pending": { variant: "secondary" as const, icon: Clock, color: "text-yellow-600" },
    "Under Review": { variant: "outline" as const, icon: AlertCircle, color: "text-blue-600" },
    "Rejected": { variant: "destructive" as const, icon: AlertCircle, color: "text-red-600" }
  };

  const { variant, icon: Icon, color } = config[status] || config["Under Review"];

  return (
    <Badge variant={variant} className="flex items-center gap-1">
      <Icon className={`h-3 w-3 ${color}`} />
      {status}
    </Badge>
  );
};

const Legal = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDocuments = mockDocuments.filter(doc =>
    doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.lender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-6 p-6 pb-16">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Legal Docs & Contracts</h1>
        <p className="text-muted-foreground mt-1">
          Manage legal documents and eSignature workflows.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockDocuments.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Signed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockDocuments.filter(d => d.status === "Signed").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {mockDocuments.filter(d => d.status === "Pending").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {mockDocuments.filter(d => d.status === "Under Review").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Search Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by document type, instrument, or lender..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Legal Center</CardTitle>
          <CardDescription>All legal documents and their signing status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Type</TableHead>
                <TableHead>Instrument</TableHead>
                <TableHead>Lender</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Signed Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.type}</TableCell>
                  <TableCell>{doc.instrument}</TableCell>
                  <TableCell>{doc.lender}</TableCell>
                  <TableCell>{getStatusBadge(doc.status)}</TableCell>
                  <TableCell>{doc.signedDate}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={doc.status !== "Signed"}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      {doc.status === "Pending" && (
                        <Button variant="outline" size="sm">
                          Sign Now
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* eSignature Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">eSignature Process</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-blue-800 space-y-2">
            <p className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Documents are digitally signed using Aadhaar-based eSign
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              All signatures are legally valid and timestamped
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Automatic notification to all parties upon completion
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Legal;