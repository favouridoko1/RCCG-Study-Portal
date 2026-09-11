import { redirect } from "next/navigation";
import { getCurrentUser } from "@/src/prisma/session";
import HomeClient from "./HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <HomeClient user={user} />;
}