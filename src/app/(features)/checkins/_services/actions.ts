"use server";
import { getUser } from "@/app/(auth)/_services/actions";
import { prisma } from "@/platform/database/prisma.db";
import { Tasks } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export type CheckinPayloadType = Partial<Pick<Tasks, "name">>[];

export async function onCheckin(tasks: CheckinPayloadType) {
  const user = await getUser();
  const anyIn = await prisma.attendances.findFirst({
    where: {
      userId: user?.id,
      status: "IN",
    },
  });

  if (anyIn) {
    throw new Error("Already checkin");
  }

  const attendance = await prisma.attendances.create({
    data: {
      userId: user?.id,
      status: "IN",
    },
  });

  await prisma.activityLogs.create({
    data: {
      type: "LOGIN",
      reason: "LOGIN",
      attendanceId: attendance.id,
    },
  });

  await prisma.tasks.createMany({
    data: tasks.map((task) => ({
      name: task.name ?? "",
      status: "TODO",
      attendancesId: attendance.id,
    })),
  });

  revalidatePath(headers().get("next-url") ?? "/");

  return {
    message: "success",
  };
}

export async function onCheckout() {
  const user = await getUser();
  const attendance = await prisma.attendances.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: user?.id,
    },
  });

  if (!attendance) {
    return {
      message: "fail",
    };
  }

  await prisma.activityLogs.create({
    data: {
      type: "LOGOUT",
      attendanceId: attendance.id,
      reason: "LOGOUT",
    },
  });

  await prisma.attendances.update({
    where: {
      id: attendance.id,
    },
    data: {
      status: "OUT",
    },
  });

  revalidatePath(headers().get("next-url") ?? "/");

  return {
    message: "success",
  };
}

export async function onLeave(reason: string) {
  const user = await getUser();
  const attendance = await prisma.attendances.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: user?.id,
      status: "IN",
    },
  });

  if (!attendance) {
    throw new Error("Not found");
  }

  await prisma.activityLogs.create({
    data: {
      type: "AFK",
      attendanceId: attendance.id,
      reason: "AFK",
    },
  });

  revalidatePath(headers().get("next-url") ?? "/");
}

export async function onComeBack() {
  const user = await getUser();
  const attendance = await prisma.attendances.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: user?.id,
    },
  });

  if (!attendance) {
    throw new Error("Not found");
  }

  const leave = await prisma.activityLogs.findFirst({
    where: {
      attendanceId: attendance.id,
      type: "AFK",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  await prisma.activityLogs.update({
    where: {
      id: leave?.id,
    },
    data: {
      type: "BACK",
    },
  });

  await prisma.attendances.update({
    where: {
      id: attendance.id,
    },
    data: {
      status: "IN",
    },
  });

  revalidatePath(headers().get("next-url") ?? "/");
}
