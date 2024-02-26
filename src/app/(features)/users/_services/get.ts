"use server";

import { createPaginationEntity } from "@/common/entities/pagination.entity";
import { createResponseEntity } from "@/common/entities/response.entity";
import { prisma } from "@/platform/database/prisma.db";
import { PaginationType } from "@/types/pagination";

export const getUsers = async (filter: PaginationType) => {
  const [data, count] = await prisma.$transaction([
    prisma.users.findMany({
      skip: (filter.page - 1) * filter.pageSize,
      take: filter.pageSize,
    }),
    prisma.users.count(),
  ]);

  return createResponseEntity(
    200,
    "OK",
    createPaginationEntity({
      data,
      pageSize: filter.pageSize,
      page: filter.page,
      total: count,
    })
  );
};
