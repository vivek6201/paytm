"use client";
import { Card } from "@repo/ui/src/card";
import TextInput from "@repo/ui/src/text-input";
import React, { useState } from "react";
import { sendMoneyAction } from "../../utils/actions/p2p-action";

export default function SendMoneyCard() {
  const [phone, setPhone] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  return (
    <Card title="Send Money">
      <TextInput
        title="Phone Number"
        placeholder="Enter User Phone Number"
        onInput={setPhone}
        type="number"
      />
      <TextInput
        title="Amount"
        placeholder="Enter Amount"
        onInput={setAmount}
        type="number"
      />

      <button
        type="button"
        className="btn"
        onClick={() => sendMoneyAction(phone, Number(amount) * 100)}
      >
        Send Money
      </button>
    </Card>
  );
}
