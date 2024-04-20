"use client";
import Appbar from "@repo/ui/src/components/appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function AppbarClient(): JSX.Element {
  const router = useRouter();
  const session = useSession();

  return (
    <Appbar
      onSignin={signIn}
      onSignout={async () => {
        await signOut();
        router.push("/api/auth/signin");
      }}
      isAuthenticated={session.data?.user}
    />
  );
}
