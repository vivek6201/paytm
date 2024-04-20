import React from "react";
import LandingPage from "../../components/landing-page";
import { getServerSession } from "next-auth";
import { authOptions } from "../../utils/auth";
import { redirect } from "next/navigation";

export default async function page(): Promise<React.JSX.Element> {

  const session = await getServerSession(authOptions);

  if(session?.user){
    redirect("/dashboard");
  }

  return <LandingPage/>
}
