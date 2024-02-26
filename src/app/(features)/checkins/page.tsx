import { CheckinTable } from "./_components/table";
import { Suspense } from "react";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";
import { getCheckin } from "./_services/getter";

export default async function Page() {
  return (
    <div>
      <Suspense fallback="Loading...">
        <CheckinTable />
      </Suspense>
    </div>
  );
}
