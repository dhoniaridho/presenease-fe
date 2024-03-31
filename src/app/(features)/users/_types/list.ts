import { ResponseSuccess } from "@/types/api/response.type";
import { PaginationType } from "@/types/pagination";

export type UserListType = ResponseSuccess<
  PaginationType<{
    id: string;
    email: string;
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
  }>
>;
