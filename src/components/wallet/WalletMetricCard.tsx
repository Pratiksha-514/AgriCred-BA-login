
import { Card, CardContent } from "../../components/ui/card";
import { cn } from "../../lib/utils";
import { Separator } from "../../components/ui/separator";
import React from "react";

interface WalletMetricCardProps {
  title: string;
  amount: string;
  description: string;
  className?: string;
  invoiceCount?: number;
}

const WalletMetricCard = ({ title, amount, description, className, invoiceCount }: WalletMetricCardProps) => {
  return (
    <Card className={cn("h-full", className)}>
      <CardContent className="pt-6">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="mt-2 text-2xl font-bold">{amount}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        
        {invoiceCount !== undefined && (
          <>
            <Separator className="my-3 border-dashed" />
            <p className="text-xs text-muted-foreground">{invoiceCount} invoice{invoiceCount !== 1 ? 's' : ''}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default WalletMetricCard;
