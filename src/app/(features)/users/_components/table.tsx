"use client";
import React, { useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Select,
  SelectItem,
  Breadcrumbs,
  BreadcrumbItem,
  Button,
} from "@nextui-org/react";
import { DateTime } from "@/utils/datetime";
import { Loader } from "@/components/loader";
import { UserListType } from "../_types/list";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useHttp, useHttpMutation } from "@/hooks/http";
import toast from "react-hot-toast";

export function UserTable() {
  const router = useRouter();
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
  });
  const [selectedId, setSelectedId] = useState<string>();

  const { data, isLoading, refetch } = useHttp<UserListType>("/users");
  const { mutate, isPending } = useHttpMutation(
    useMemo(() => `/users/${selectedId}`, [selectedId]),
    {
      method: "DELETE",
      queryOptions: {
        onSuccess: () => {
          toast.success("User deleted successfully");
          setSelectedId(undefined);
          refetch();
        },
        onError: () => {
          toast.error("Failed to delete user");
        },
      },
    }
  );
  const onDelete = (id: string) => {
    setSelectedId(id);
    mutate({});
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="mb-5">
          <h3 className="mb-2">
            <span className="text-3xl font-bold">Users</span>
          </h3>
          <Breadcrumbs>
            <BreadcrumbItem>Users</BreadcrumbItem>
            <BreadcrumbItem>List</BreadcrumbItem>
          </Breadcrumbs>
        </div>
        <div>
          <Button color="primary" as={Link} href="/users/create">
            Create
          </Button>
        </div>
      </div>
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Created At</TableColumn>
          <TableColumn>Updated At</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody
          items={data?.data.data ?? []}
          emptyContent={isLoading ? " " : "No data"}
          loadingContent={<Loader isLoading={isLoading}>Loading</Loader>}
          isLoading={isLoading}
        >
          {(item) => (
            <TableRow
              key={item.id}
              className="cursor-pointer"
              onClick={() => {
                router.push(`/users/${item.id}/detail`);
              }}
            >
              <TableCell>{item.fullName}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>
                <DateTime date={new Date(item.createdAt)}></DateTime>
              </TableCell>
              <TableCell>
                <DateTime date={new Date(item.createdAt)}></DateTime>
              </TableCell>
              <TableCell>
                <div className="flex gap-3">
                  <Button
                    isIconOnly
                    onPress={() => {
                      router.push(`/users/${item.id}/edit`);
                    }}
                  >
                    <AiOutlineEdit size={20} />
                  </Button>
                  <Button
                    isIconOnly
                    onPress={onDelete.bind(null, item.id)}
                    isLoading={isPending && selectedId === item.id}
                  >
                    <AiOutlineDelete size={20} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-5">
        <div className="w-36">
          <Select
            label="Show"
            selectedKeys={[`${params.pageSize}`]}
            onChange={(e) =>
              setParams({ ...params, pageSize: +e.target.value })
            }
          >
            <SelectItem key="10" value={10}>
              10
            </SelectItem>
            <SelectItem key="20" value={20}>
              20
            </SelectItem>
            <SelectItem key="30" value={30}>
              30
            </SelectItem>
          </Select>
        </div>
        <Pagination
          total={data?.data.meta.totalPage ?? 1}
          initialPage={params.page}
          defaultValue={params.page}
          disableAnimation
          onChange={(page) => setParams({ ...params, page })}
        />
      </div>
    </div>
  );
}
