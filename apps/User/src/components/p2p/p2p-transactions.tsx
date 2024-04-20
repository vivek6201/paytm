import { Card } from "@repo/ui/src/card";
import React from "react";
import { formatDateTime } from "../../utils/utils";
import { TransactionStatus as Status } from "../../utils/utils";

interface TransactionsProps {
  transactions: {
    amount: number;
    fromUserId: number;
    toUserId: number;
    id: number;
  }[];
  userId: string;
}

export default function P2PTransactions({
  transactions,
  userId,
}: TransactionsProps): JSX.Element {
  return (
    <Card title="Recent Transactions">
      {transactions.map((transaction, i) => (
        <div className="flex justify-between items-center" key={i}>
          <div>
            <p>
              {transaction.fromUserId !== Number(userId)
                ? "Money Recieved"
                : "Money Sent"}
            </p>
            <p>Date {formatDateTime(new Date())}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            {transaction.fromUserId === Number(userId) ? (
              <p className="text-red-400">- Rs. {transaction.amount / 100}</p>
            ) : (
              <p className="text-green-700">+ Rs. {transaction.amount / 100}</p>
            )}
          </div>
        </div>
      ))}
    </Card>
  );
}
