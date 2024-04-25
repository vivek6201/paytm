# A Full Stack Paytm Project

- Tech Stack 
  - Mono repo (Turbo repo)
  - Merchant app (Next.js)
  - User app (Next.js)
  - Auxillary Backend for Webhooks (Node.js && Express.js backend)
  - Postgres DB (Using Prisma as ORM)
  - NextAuth for Authentication

- Features of the app
  - Add Money to the Wallet from a bank
  - Send Money back to the Bank (Future Scope)
  - P2P Transactions
  - Dashboard for all transactions


# How to setup locally

- With Docker
  - Start a postgres instance on docker.
  - command -> docker run --name my_db -d -e POSTGRES_PASSWORD=mysecretpass -p 5432:5432 postgres

  - clone the repo
  - create a env file and copy the example env to env inside user app and db folder inside packages
  - then run the command -> yarn install (in the root directory)
  - then go the db folder inside packages and run the command -> npx prisma migrate dev --name init && npx prisma generate.
  - after that run the command -> npx prisma db seed 
  - then run the command -> yarn dev
  - the go to http://localhost:3000 to test the app.

- Without docker

 - get a postgres connection string from avian.tech or any db provider.
 - follow the same steps as with docker.
