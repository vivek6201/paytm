"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export const getP2PTransactions = async () => {};

export const sendMoneyAction = async (
  recieverPhoneNumber: string,
  amount: number
) => {
  const session = (await getServerSession(authOptions)) as any;
  const fromUserId = session?.user.id;

  if (!fromUserId) {
    return {
      message: "Error while fetching session",
    };
  }

  if (!recieverPhoneNumber) {
    return {
      message: "receiver's Phone number is required",
    };
  }

  if (!amount) {
    return {
      message: "Amount not provided",
    };
  }

  let toUser;

  try {
    toUser = await prisma.user.findUnique({
      where: {
        phone: recieverPhoneNumber,
      },
    });

    if (!toUser) {
      return {
        message: "User not found",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Error while fetching reciever's data",
    };
  }

  try {
    await prisma.$transaction(async (txns) => {
      //we are doing this to prevent parallel requests to access the user's balance at the same time.
      await txns.$queryRaw`SELECT * from "Balance" WHERE "userId" = ${Number(fromUserId)} FOR UPDATE`;

      const balance = await txns.balance.findUnique({
        where: {
          userId: Number(fromUserId),
        },
      });

      if (!balance || balance.amount < Number(amount)) {
        throw new Error("Insufficiant Funds");
      }

      await txns.balance.update({
        where: {
          userId: Number(fromUserId),
        },
        data: {
          amount: {
            decrement: amount,
          },
        },
      });
      await txns.balance.update({
        where: {
          userId: toUser.id,
        },
        data: {
          amount: {
            increment: amount,
          },
        },
      });

      await txns.p2PTransactions.create({
        data: {
          amount,
          fromUserId: Number(fromUserId),
          toUserId: Number(toUser.id),
        },
      });
    });

    return {
      message: "Money sent successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to process the request",
    };
  }
};
