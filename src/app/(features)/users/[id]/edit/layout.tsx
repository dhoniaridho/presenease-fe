"use client";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";

export default function Page({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex justify-between">
        <div className="mb-5">
          <h3 className="mb-2">
            <span className="text-3xl font-bold">Users</span>
          </h3>
          <Breadcrumbs>
            <BreadcrumbItem>Users</BreadcrumbItem>
            <BreadcrumbItem>Edit</BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>
      <div>{children}</div>
    </>
  );
}
