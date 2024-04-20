import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Sidebar from "../../../components/sidebar";
import { authOptions } from "../../../utils/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.ReactNode> {

  const session = await getServerSession(authOptions);
  if(!session) redirect("/api/auth/signin")

  return (
    <div className="grid grid-cols-[250px_1fr]">
      <Sidebar />
      <div className="p-10 overflow-y-auto">{children}</div>
    </div>
  );
}
