"use client";

import { Button } from "components/ui/Button";
import { Card } from "components/ui/Card";

export function PaymentSettings() {
  return (
    <Card className="p-4 md:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-semibold">
            Payment Settings
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Manage your payment methods and billing information
          </p>
        </div>
        <Button variant="outline" className="w-full sm:w-auto">
          Add Payment Method
        </Button>
      </div>
    </Card>
  );
} 