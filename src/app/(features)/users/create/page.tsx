"use client";

import { Button, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { CreateUserType } from "../_types/create";
import { useHttpMutation } from "@/hooks/http";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<CreateUserType>();
  const { mutate, isPending } = useHttpMutation("/users", {
    method: "POST",
    queryOptions: {
      onSuccess: () => {
        router.push("/users");
        toast.success("User created successfully");
      },
      onError: () => {
        toast.error("Failed to create user");
      },
    },
  });

  const onSubmit = (data: CreateUserType) => {
    mutate(data);
  };

  return (
    <>
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

        <Controller
          render={({ field }) => <Input label="Password" {...field} />}
          name="password"
          control={control}
        />

        <div className="flex justify-end gap-3">
          <Button color="default">Back</Button>
          <Button isLoading={isPending} type="submit" color="primary">
            Create
          </Button>
        </div>
      </form>
    </>
  );
}
