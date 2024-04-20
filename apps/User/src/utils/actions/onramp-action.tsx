"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";

export const createOnRampTransactions = async (
  amount: number,
  provider: string
) => {
  const session = (await getServerSession(authOptions)) as any;
  const userId = session?.user.id;
  const token = Math.random().toString();

  if (!userId) {
    return {
      message: "User not logged in",
    };
  }

  await db.onRampTransaction.create({
    data: {
      amount,
      provider,
      startTime: new Date(),
      status: "Processing",
      token,
      userId: Number(userId),
    },
  });

  return {
    message: "New transaction Added",
  };
};
