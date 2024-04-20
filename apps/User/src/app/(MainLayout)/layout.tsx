import React from "react";
import AppbarClient from "../../components/appbar-client";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="min-h-screen grid grid-rows-[70px_1fr]">
      <AppbarClient />
      {children}
    </div>
  );
}
