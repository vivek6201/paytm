import React from "react";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import AddMoneyCard from "../../../../components/add-money-card";
import BalanceCard from "../../../../components/balance-card";
import OnRampCard from "../../../../components/on-ramp-card";
import { authOptions } from "../../../../utils/auth";

const getTransactions = async () => {
  const session = (await getServerSession(authOptions)) as any;

  const transactions = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user.id),
    },
  });

  return transactions.map((txns) => {
    return {
      time: txns.startTime,
      amount: txns.amount,
      status: txns.status,
      provider: txns.provider,
    };
  });
};
const getBalance = async () => {
  const session = (await getServerSession(authOptions)) as any;

  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user.id),
    },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
};

export default async function page(): Promise<React.ReactNode> {
  const transactions = await getTransactions();
  const balance = await getBalance();

  return (
    <div className="">
      <p className="text-blue-500 text-3xl font-bold mb-10">Transfers</p>
      <div className="grid grid-cols-2 gap-5">
        <AddMoneyCard />

        <div className="flex flex-col gap-y-5">
          <BalanceCard balance={balance} />
          <OnRampCard allTransactions={transactions} />
        </div>
      </div>
    </div>
  );
}
