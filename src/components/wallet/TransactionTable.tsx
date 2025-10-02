
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Download, Search } from "lucide-react";
import React from "react";

const transactions = [
  {
    date: "22 Apr '25",
    type: "Financed Received",
    description: "Invoice INV-2025-0422 from AgroMart",
    amount: "+ ₹2,00,000",
    status: "Settled",
    balance: "₹2,35,000",
  },
  {
    date: "18 Apr '25",
    type: "Repayment Made",
    description: "To FPO KrishiKart for INV-2025-0412",
    amount: "- ₹1,00,000",
    status: "Completed",
    balance: "₹35,000",
  },
  {
    date: "15 Apr '25",
    type: "Platform Fee",
    description: "Invoice INV-2025-0410 financing charge",
    amount: "- ₹5,000",
    status: "Deducted",
    balance: "₹1,35,000",
  },
  {
    date: "10 Apr '25",
    type: "Wallet Top-up",
    description: "Via UPI (Ref. UPI009231KS)",
    amount: "+ ₹50,000",
    status: "Credited",
    balance: "₹1,40,000",
  },
];

type FilterType = 'all' | 'received' | 'repayments' | 'fees';

const TransactionTable = () => {
  const [filter, setFilter] = useState<FilterType>('all');
  
  const filteredTransactions = transactions.filter(transaction => {
    switch (filter) {
      case 'received':
        return transaction.status === 'Credited' || transaction.status === 'Settled';
      case 'repayments':
        return transaction.status === 'Deducted';
      case 'fees':
        return transaction.status === 'Completed';
      default:
        return true; // 'all' shows everything
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button 
            variant={filter === 'all' ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'received' ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter('received')}
          >
            Received
          </Button>
          <Button 
            variant={filter === 'repayments' ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter('repayments')}
          >
            Repayments
          </Button>
          <Button 
            variant={filter === 'fees' ? "default" : "outline"} 
            size="sm"
            onClick={() => setFilter('fees')}
          >
            Fees
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              className="pl-8 w-[250px]"
            />
          </div>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Balance After</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <TableRow key={index}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className={transaction.amount.includes('+') ? 'text-green-600' : 'text-red-600'}>
                    {transaction.amount}
                  </TableCell>
                  <TableCell>{transaction.status}</TableCell>
                  <TableCell>{transaction.balance}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                  No transactions found for the selected filter
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TransactionTable;
