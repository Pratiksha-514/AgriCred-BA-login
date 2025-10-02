
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Package, Eye } from "lucide-react";

const invoicesData = [
  {
    id: "INV023",
    buyer: "Reliance Retail",
    value: "₹2,00,000",
    status: "Awaiting Offer",
    offers: 1,
    statusColor: "bg-orange-100 text-orange-800"
  },
  {
    id: "INV020",
    buyer: "BigBasket",
    value: "₹5,00,000",
    status: "Funded",
    offers: 3,
    statusColor: "bg-green-100 text-green-800"
  },
  {
    id: "INV019",
    buyer: "DMart",
    value: "₹1,50,000",
    status: "Under Negotiation",
    offers: 2,
    statusColor: "bg-blue-100 text-blue-800"
  }
];

const enwrData = [
  {
    id: "ENWR003",
    commodity: "Wheat",
    quantity: "100 MT",
    value: "₹8,00,000",
    status: "Pledged",
    offers: 2,
    statusColor: "bg-green-100 text-green-800"
  },
  {
    id: "ENWR002",
    commodity: "Rice",
    quantity: "75 MT",
    value: "₹6,00,000",
    status: "Awaiting Offer",
    offers: 0,
    statusColor: "bg-orange-100 text-orange-800"
  }
];

export function InstrumentSnapshots() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Invoices Snapshot */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Invoices Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoicesData.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.buyer}</TableCell>
                  <TableCell className="font-medium">{invoice.value}</TableCell>
                  <TableCell>
                    <Badge className={invoice.statusColor}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* eNWR Snapshot */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            eNWRs Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>eNWR ID</TableHead>
                <TableHead>Commodity</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enwrData.map((enwr) => (
                <TableRow key={enwr.id}>
                  <TableCell className="font-medium">{enwr.id}</TableCell>
                  <TableCell>{enwr.commodity}</TableCell>
                  <TableCell>{enwr.quantity}</TableCell>
                  <TableCell>
                    <Badge className={enwr.statusColor}>
                      {enwr.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
