
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Switch } from "../../components/ui/switch";
import { Badge } from "../../components/ui/badge";
import React from "react";

const BankAccountPanel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Bank Accounts & Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Primary Repayment Bank Account</h3>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">SBI - 123456789012</p>
                <p className="text-sm text-muted-foreground">IFSC: SBIN0001234</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-50">Verified</Badge>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Linked UPI ID</h3>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <p>millname@upi</p>
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Auto-Debit Mandate</h3>
            <div className="p-4 border rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <p>Status</p>
                <Badge variant="outline" className="bg-green-50">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <p>Next Scheduled Debit</p>
                <p>30 Apr 2025 - ₹1,75,000</p>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm">View Terms</Button>
                <Button variant="outline" size="sm" className="text-red-600">Revoke Mandate</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-medium">Wallet Settings</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable Auto-Debit</p>
              <p className="text-sm text-muted-foreground">Automatically debit for approved invoices</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-withdraw financing</p>
              <p className="text-sm text-muted-foreground">Transfer received funds to bank account</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Low balance alerts</p>
              <p className="text-sm text-muted-foreground">Get notified when balance is low</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BankAccountPanel;
