import express from "express";
import db from "@repo/db/client"
import prisma from "@repo/db/client";

const app = express();
const port = 4242;

app.use(express.json())

app.post("/hdfc-hook", async (req, res) => {
    const { token, user_id, amount } = req.body;

    const transactionStatus = await prisma.onRampTransaction.findUnique({
        where: {
            token
        }
    })

    if (transactionStatus && transactionStatus?.status !== "Processing") {
        return res.status(401).json({
            message: "Transaction already processed"
        })
    }

    const paymentInfo: {
        token: string;
        userId: string;
        amount: string
    } = {
        token,
        userId: user_id,
        amount
    }

    try {
        await db.$transaction([
            db.balance.update({
                where: {
                    userId: Number(paymentInfo.userId),
                },
                data: {
                    amount: {
                        increment: Number(paymentInfo.amount)
                    }
                }
            }),
            db.onRampTransaction.update({
                where: {
                    token: paymentInfo.token
                },
                data: {
                    status: "Success"
                }
            })
        ])

        res.status(200).json({
            message: "Captured"
        })
    } catch (error) {
        console.error(error);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})

app.listen(port, () => {
    console.log("server is up at: " + port)
})