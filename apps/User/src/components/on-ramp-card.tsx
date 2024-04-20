"use client";

import { Card } from "@repo/ui/src/card";
import { formatDateTime } from "../utils/utils";
import { TransactionStatus as Status } from "../utils/utils";

export default function OnRampCard({
  allTransactions,
}: {
  allTransactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}): JSX.Element {

  if (allTransactions.length === 0) {
    return (
      <Card title="Recent Transactions">
        <p className="text-center text-xl my-5">No Transactions Found</p>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      {allTransactions.map((transaction, i) => (
        <div className="flex justify-between items-center" key={i}>
          <div>
            <p>Money Received</p>
            <p>Date {formatDateTime(new Date())}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p
              className={`
              ${
                transaction.status === Status.SUCCESS
                  ? "text-green-700"
                  : transaction.status === Status.FAILED
                    ? "text-red-700"
                    : "text-yellow-500"
              }
          font-bold text-end`}
            >
              Rs. {transaction.amount / 100}
            </p>
            <p
              className={`
              ${
                transaction.status === Status.SUCCESS
                  ? "text-green-700"
                  : transaction.status === Status.FAILED
                    ? "text-red-700"
                    : "text-yellow-500"
              }
            uppercase font-bold tracking-wide text-end`}
            >
              {transaction.status}
            </p>
          </div>
        </div>
      ))}
    </Card>
  );
}
