"use client";

import { useHttp } from "@/hooks/http";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const { data } = useHttp(`/users/${params.id}`);
  return <div>{JSON.stringify(data)}</div>;
}
