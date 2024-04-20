import db from "../src/index.ts";
import bcrypt from "bcryptjs"

async function main() {
  const alice = await db.user.upsert({
    where: { phone: '9999999999' },
    update: {},
    create: {
      phone: '9999999999',
      password: await bcrypt.hash('alice',10),
      name: 'alice',
      Balance: {
        create:{
          amount: 20000,
          locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "122",
          provider: "HDFC Bank",
        },
      },
    },
  })
  const bob = await db.user.upsert({
    where: { phone: '9999999998' },
    update: {},
    create: {
      phone: '9999999998',
      password: await bcrypt.hash('bob',10),
      name: 'bob',
      Balance: {
        create:{
          amount: 30000,
          locked: 0
        }
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failed",
          amount: 2000,
          token: "123",
          provider: "HDFC Bank",
        },
      },
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await db.$disconnect()
    process.exit(1)
  })