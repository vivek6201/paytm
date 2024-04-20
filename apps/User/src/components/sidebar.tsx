import React from "react";
import { FaHome } from "react-icons/fa";
import { RiP2PFill } from "react-icons/ri";
import { TbTransactionDollar } from "react-icons/tb";
import { BiTransfer } from "react-icons/bi";
import SidebarItem from "./sidebar-item";

export default function Sidebar(): React.JSX.Element {
  return (
    <div className="flex flex-col gap-y-2 px-5 py-10 border-r border-slate-600 h-full overflow-y-auto">
      <SidebarItem href="/dashboard" icon={<FaHome />} title="Home" />
      <SidebarItem href="/dashboard/transfer" icon={<BiTransfer />} title="Transfer" />
      <SidebarItem
        href="/dashboard/transactions"
        icon={<TbTransactionDollar />}
        title="Transactions"
      />
      <SidebarItem
        href="/dashboard/p2p-transfers"
        icon={<RiP2PFill />}
        title="P2P Transfers"
      />
    </div>
  );
}
