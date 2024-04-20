"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import { RecoilRoot } from "recoil";

export default function Providers({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <SessionProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </SessionProvider>
  );
}
