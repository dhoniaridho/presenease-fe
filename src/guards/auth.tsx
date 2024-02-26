"use server";

import { useAuth } from "@/app/(auth)/_store/auth";
import { JwtPayload } from "@/app/(auth)/signin/_types/jwt";
import { prisma } from "@/platform/database/prisma.db";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuth = cookies().has("token");

  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/signin");
  }

  const payload = verify(token, process.env.JWT_SECRET as string) as JwtPayload;

  await prisma.users.findFirstOrThrow({
    where: {
      id: payload.id,
    },
  });

  if (!isAuth) {
    redirect("/signin");
  }
  return <>{children}</>;
}
