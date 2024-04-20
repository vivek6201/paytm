"use client";
import React from "react";
import Link from "next/link";

interface AppbarProps {
  isAuthenticated: boolean;
  onSignin: any;
  onSignout: any;
}

export default function Appbar({
  isAuthenticated,
  onSignin,
  onSignout,
}: AppbarProps): React.JSX.Element {
  return (
    <div className="navbar bg-base-300 overflow-hidden">
      <div className="navbar-start">
        <Link className="text-blue-400 font-bold btn btn-ghost text-2xl" href="/">
          PayTM
        </Link>
      </div>
      <div className="navbar-end">
        <button
          className="btn"
          onClick={isAuthenticated ? onSignout : onSignin}
          type="button"
        >
          {isAuthenticated ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
}
