"use server";
import { prisma } from "@/platform/database/prisma.db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { sign } from "jsonwebtoken";
import { http } from "@/platform/http/axios";
import { ResponseSuccess } from "@/types/api/response.type";

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

  const user = await http.get<
    ResponseSuccess<{
      fullName: string;
    }>
  >("auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return user;
}
