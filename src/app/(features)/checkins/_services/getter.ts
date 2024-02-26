"use server";

import { getUser } from "@/app/(auth)/_services/actions";
import { createPaginationEntity } from "@/common/entities/pagination.entity";
import { createResponseEntity } from "@/common/entities/response.entity";
import { prisma } from "@/platform/database/prisma.db";
import { PaginationType } from "@/types/pagination";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function getCheckin(pagination?: PaginationType) {
  const user = await getUser();

  const attendaceParam: Prisma.AttendancesFindManyArgs = {
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: user?.id,
    },
  };

  if (pagination) {
    Object.assign(attendaceParam, {
      take: pagination.pageSize,
      skip: (pagination.page - 1) * pagination.pageSize,
    });
  }

  const [attendance, total] = await Promise.all([
    await prisma.attendances.findMany(attendaceParam),
    await prisma.attendances.count({
      where: {
        userId: user?.id,
      },
    }),
  ]);

  const users = await prisma.users.findMany({
    where: {
      id: {
        in: attendance.map((attendance) => attendance.userId),
      },
    },
  });

  const activities = await prisma.activityLogs.findMany({
    where: {
      attendanceId: {
        in: attendance.map((attendance) => attendance.id),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const resp = createResponseEntity(
    200,
    "success",
    createPaginationEntity({
      data: attendance.map((attendance) => {
        const status =
          activities
            .filter((activity) => activity.attendanceId === attendance.id)
            .at(0)?.type ?? "IN";
        return {
          ...attendance,
          user: users.find((user) => user.id === attendance.userId),
          activities: activities,
          status,
        };
      }),
      page: pagination?.page ?? 1,
      pageSize: pagination?.pageSize ?? 10,
      total,
    })
  );
  return resp;
}

export async function getLastCheckin(path?: string) {
  const user = await getUser();
  const attendance = await prisma.attendances.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      userId: user?.id,
    },
  });

  const activity = await prisma.activityLogs.findFirst({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (path) {
    revalidatePath(path, "layout");
  }

  return {
    ...attendance,
    status: activity?.type ?? "LOGOUT",
  };
}
