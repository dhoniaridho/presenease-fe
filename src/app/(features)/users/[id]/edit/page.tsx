"use client";

import { useHttp, useHttpMutation } from "@/hooks/http";
import { ResponseSuccess } from "@/types/api/response.type";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
type TVariable = {
  id?: string;
  fullName?: string;
  email?: string;
  username?: string;
};
export default function Page() {
  const router = useRouter();
  const params = useParams();

  const { data } = useHttp<ResponseSuccess<TVariable>>(`/users/${params.id}`);
  const { mutate, isPending } = useHttpMutation(`/users/${params.id}`, {
    method: "PUT",
    queryOptions: {
      onSuccess: () => {
        toast.success("User updated successfully");
        router.push("/users");
      },
      onError: () => {
        toast.error("Failed to update user");
      },
    },
  });

  const { control, setValue, handleSubmit } = useForm<TVariable>({
    mode: "all",
  });

  useEffect(() => {
    setValue("fullName", data?.data.fullName);
    setValue("email", data?.data.email);
    setValue("username", data?.data.username);
  }, [data, setValue]);

  const onBack = () => {
    router.back();
  };

  const onSubmit = (data: TVariable) => {
    mutate(data);
  };

  return (
    <div>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          render={({ field }) => <Input label="Name" {...field} />}
          name="fullName"
          control={control}
        />

        <Controller
          render={({ field }) => <Input label="Email" {...field} />}
          name="email"
          control={control}
        />

        <Controller
          render={({ field }) => <Input label="Username" {...field} />}
          name="username"
          control={control}
        />

        <div className="flex justify-end gap-3">
          <Button color="default" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" color="primary" isLoading={isPending}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}
