"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function SidebarItem({
  href,
  icon,
  title,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
}): React.JSX.Element {
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <Link className={`flex items-center ${selected && "text-blue-500"} gap-2 rounded-md dark:hover:bg-slate-800 px-4 py-2 transition-all duration-200`} href={href}>
      {icon}
      <p className={`font-bold ${selected && "text-blue-500"}`}>{title}</p>
    </Link>
  );
}
