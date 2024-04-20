"use client";

import { useState } from "react";
import { Card } from "../../../../packages/ui/src/card";

export default function BalanceCard({
  balance,
}: {
  balance: {
    amount: number;
    locked: number;
  };
}): JSX.Element {
  const [lockedBalance, setLockedBalance] = useState<number>(balance.locked);
  const [unlockedBalance, setUnlockedBalance] = useState<number>(
    balance.amount
  );

  return (
    <Card title="Wallet Balance">
      <BalanceCardItem title="Unlocked Balance" value={unlockedBalance} />
      <BalanceCardItem title="Locked Balance" value={lockedBalance} />
      <BalanceCardItem
        title="Total Balance"
        value={lockedBalance + unlockedBalance}
      />
    </Card>
  );
}

function BalanceCardItem({
  title,
  value,
}: {
  title: string;
  value: number;
}): JSX.Element {
  return (
    <div className="flex justify-between items-center w-full py-1 border-b dark:border-slate-600 border-slate-200">
      <p>{title}</p>
      <p>Rs. {value / 100}</p>
    </div>
  );
}
