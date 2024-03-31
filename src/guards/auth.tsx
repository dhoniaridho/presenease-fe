"use server";

import { getUser } from "@/app/(auth)/_services/actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuth = cookies().has("token");

  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/signin");
  }

  if (!isAuth) {
    redirect("/signin");
  }
  return <>{children}</>;
}
