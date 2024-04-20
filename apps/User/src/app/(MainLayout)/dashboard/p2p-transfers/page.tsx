import React from "react";
import SendMoneyCard from "../../../../components/p2p/send-money-card";
import P2PTransactions from "../../../../components/p2p/p2p-transactions";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../utils/auth";

const getTransactions = async (userId: string) => {
  const transactions = await prisma.p2PTransactions.findMany({
    where: {
      OR: [
        {
          fromUserId: Number(userId),
        },
        {
          toUserId: Number(userId),
        },
      ],
    },
    select: {
      amount: true,
      id: true,
      fromUserId: true,
      toUserId: true,
    },
  });

  return transactions;
};

export default async function page(): Promise<JSX.Element> {
  const session = (await getServerSession(authOptions)) as any;

  const transactions = await getTransactions(session?.user.id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <SendMoneyCard />
      <div className="max-h-fit">
        <P2PTransactions transactions={transactions} userId={session.user.id} />
      </div>
    </div>
  );
}
