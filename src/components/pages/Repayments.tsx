
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard, Clock, CheckCircle, AlertTriangle, Filter, Calendar } from "lucide-react";
import { toast } from "sonner";

const mockRepayments = [
  {
    id: "REP001",
    instrument: "INV020",
    amount: "₹5,50,000",
    tenure: "30 days",
    repaymentDue: "2024-07-26",
    status: "Pending",
    lender: "Axis Bank",
    daysLeft: 5,
    interestRate: "13.5%"
  },
  {
    id: "REP002",
    instrument: "ENWR003",
    amount: "₹3,00,000",
    tenure: "45 days",
    repaymentDue: "2024-08-12",
    status: "Scheduled",
    lender: "ICICI Bank",
    daysLeft: 22,
    interestRate: "12.8%"
  },
  {
    id: "REP003",
    instrument: "INV019",
    amount: "₹2,25,000",
    tenure: "30 days",
    repaymentDue: "2024-06-15",
    status: "Completed",
    lender: "HDFC Bank",
    daysLeft: 0,
    interestRate: "14.0%"
  },
  {
    id: "REP004",
    instrument: "INV023",
    amount: "₹1,80,000",
    tenure: "30 days",
    repaymentDue: "2024-07-30",
    status: "Overdue",
    lender: "HDFC Bank",
    daysLeft: -1,
    interestRate: "13.5%"
  }
];

const getStatusBadge = (status: string, daysLeft: number) => {
  if (status === "Overdue") {
    return <Badge variant="destructive" className="flex items-center gap-1">
      <AlertTriangle className="h-3 w-3" />
      Overdue
    </Badge>;
  }
  
  if (status === "Completed") {
    return <Badge variant="default" className="flex items-center gap-1">
      <CheckCircle className="h-3 w-3" />
      Completed
    </Badge>;
  }
  
  if (daysLeft <= 3) {
    return <Badge variant="destructive" className="flex items-center gap-1">
      <Clock className="h-3 w-3" />
      Due Soon
    </Badge>;
  }
  
  return <Badge variant="secondary" className="flex items-center gap-1">
    <Clock className="h-3 w-3" />
    {status}
  </Badge>;
};

const Repayments = () => {
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRepayment, setSelectedRepayment] = useState<any>(null);

  const filteredRepayments = mockRepayments.filter(repayment => {
    const matchesSearch = repayment.instrument.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         repayment.lender.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || repayment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalOutstanding = mockRepayments
    .filter(r => r.status !== "Completed")
    .reduce((sum, r) => sum + parseInt(r.amount.replace(/[₹,]/g, "")), 0);

  const overdueCases = mockRepayments.filter(r => r.status === "Overdue").length;
  const dueSoon = mockRepayments.filter(r => r.daysLeft <= 3 && r.status !== "Completed").length;

  const handleRepayNow = (repayment: any) => {
    toast.success(`Redirecting to payment gateway for ${repayment.amount}...`);
    setSelectedRepayment(null);
  };

  return (
    <div className="flex-1 space-y-6 p-6 pb-16">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Repayments</h1>
        <p className="text-muted-foreground mt-1">
          Manage loan schedules and repayment processing.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalOutstanding.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Soon</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{dueSoon}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueCases}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Time Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94.2%</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Input
            placeholder="Search by instrument or lender..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Scheduled">Scheduled</SelectItem>
              <SelectItem value="Overdue">Overdue</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Loan Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Schedule</CardTitle>
          <CardDescription>All active and completed repayment schedules</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Instrument</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Tenure</TableHead>
                <TableHead>Repayment Due</TableHead>
                <TableHead>Lender</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRepayments.map((repayment) => (
                <TableRow key={repayment.id} className={repayment.status === "Overdue" ? "bg-red-50" : ""}>
                  <TableCell className="font-medium">{repayment.instrument}</TableCell>
                  <TableCell className="font-semibold">{repayment.amount}</TableCell>
                  <TableCell>{repayment.tenure}</TableCell>
                  <TableCell>{repayment.repaymentDue}</TableCell>
                  <TableCell>{repayment.lender}</TableCell>
                  <TableCell>{getStatusBadge(repayment.status, repayment.daysLeft)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {repayment.status !== "Completed" && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant={repayment.status === "Overdue" ? "destructive" : "outline"} 
                              size="sm"
                              onClick={() => setSelectedRepayment(repayment)}
                            >
                              Repay Now
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Repayment Details</DialogTitle>
                              <DialogDescription>
                                Review and process repayment for {selectedRepayment?.instrument}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedRepayment && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Principal Amount</p>
                                    <p className="text-lg font-semibold">{selectedRepayment.amount}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Interest Rate</p>
                                    <p className="text-lg font-semibold">{selectedRepayment.interestRate}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                                    <p className="text-lg font-semibold">{selectedRepayment.repaymentDue}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-muted-foreground">Lender</p>
                                    <p className="text-lg font-semibold">{selectedRepayment.lender}</p>
                                  </div>
                                </div>
                                
                                <div className="bg-blue-50 p-4 rounded-lg">
                                  <h4 className="font-medium text-blue-900 mb-2">Payment Calculation</h4>
                                  <div className="space-y-1 text-sm text-blue-800">
                                    <div className="flex justify-between">
                                      <span>Principal Amount:</span>
                                      <span>{selectedRepayment.amount}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Interest ({selectedRepayment.interestRate}):</span>
                                      <span>₹{Math.floor(parseInt(selectedRepayment.amount.replace(/[₹,]/g, "")) * 0.135 * 30 / 365).toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>Processing Fee:</span>
                                      <span>₹500</span>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex justify-between font-semibold">
                                      <span>Total Amount:</span>
                                      <span>₹{(parseInt(selectedRepayment.amount.replace(/[₹,]/g, "")) + Math.floor(parseInt(selectedRepayment.amount.replace(/[₹,]/g, "")) * 0.135 * 30 / 365) + 500).toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <p className="text-sm font-medium">Select Payment Method:</p>
                                  <div className="flex gap-3">
                                    <Button 
                                      onClick={() => handleRepayNow(selectedRepayment)} 
                                      className="flex-1"
                                    >
                                      Pay via UPI/Card
                                    </Button>
                                    <Button 
                                      variant="outline" 
                                      onClick={() => handleRepayNow(selectedRepayment)}
                                      className="flex-1"
                                    >
                                      Bank Transfer
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upcoming Payments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Payments
          </CardTitle>
          <CardDescription>Repayments due in the next 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockRepayments
              .filter(r => r.daysLeft > 0 && r.daysLeft <= 30 && r.status !== "Completed")
              .map((repayment) => (
                <div key={repayment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{repayment.instrument} - {repayment.lender}</p>
                    <p className="text-sm text-muted-foreground">Due in {repayment.daysLeft} days</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{repayment.amount}</p>
                    <p className="text-sm text-muted-foreground">{repayment.repaymentDue}</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Repayments;
