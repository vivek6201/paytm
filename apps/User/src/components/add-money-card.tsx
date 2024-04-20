"use client";

import { useState } from "react";
import { Card } from "@repo/ui/card";
import TextInput from "@repo/ui/src/text-input";
import Select from "@repo/ui/src/select";
import { createOnRampTransactions } from "../utils/actions/onramp-action";
import { useRouter } from "next/navigation";

export default function AddMoneyCard(): JSX.Element {
  const router = useRouter();
  const [amount, setAmount] = useState<string | null>(null);
  const [provider, setProvider] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const bankList = [
    {
      name: "HDFC Bank",
      url: "https://netbanking.hdfcbank.com",
    },
    {
      name: "Axis Bank",
      url: "https://axisbank.com",
    },
  ];

  return (
    <div className="max-h-fit">
      <Card title="Add Money">
        <TextInput
          onInput={setAmount}
          placeholder="Enter Amount"
          title="Amount"
          type="number"
        />
        <Select
          onSelect={(value) => {
            setUrl(bankList.find((x) => x.name === value)?.url || "");
            setProvider(value as string);
          }}
          options={bankList.map((bank) => {
            return {
              key: bank.name,
              value: bank.name,
            };
          })}
        />
        <button
          className="btn max-w-xs mt-5 btn-outline"
          onClick={async () => {
            await createOnRampTransactions(Number(amount) * 100, provider);
            router.push(url);
          }}
          type="button"
        >
          Add Money
        </button>
      </Card>
    </div>
  );
}
