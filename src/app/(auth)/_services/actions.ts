"use server";
import { prisma } from "@/platform/database/prisma.db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { JwtPayload } from "../signin/_types/jwt";
import { sign, verify } from "jsonwebtoken";

export async function signIn(accessToken: string) {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  const { name: username, email } = await response.json();

  const user = await prisma.users.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const payload = {
    username: user?.username,
    email,
    id: user?.id,
  };

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("No secret");
  }

  const token = sign(payload, secret, { expiresIn: "1d" });

  // set token in cookie
  cookies().set("token", token);

  redirect("/dashboard");
}

export async function signOut() {
  cookies().delete("token");
  redirect("/signin");
}

export async function getUser() {
  const token = cookies().get("token")?.value;

  if (!token) {
    return null;
  }

  const payload = verify(token, process.env.JWT_SECRET as string) as JwtPayload;

  const user = await prisma.users.findFirstOrThrow({
    where: {
      id: payload.id,
    },
  });

  return user;
}
