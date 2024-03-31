"use client";
import { Google } from "@/assets/auth";
import { Button, Input } from "@nextui-org/react";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { If } from "@/utils/if";
import { useMutation } from "@tanstack/react-query";
import { http } from "@/platform/http/axios";
import {
  SignInErrorType,
  SignInPayloadType,
  SignInSuccessType,
} from "../_types/sign-in.type";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

type Props = {
  onSuccess?: (data: SignInSuccessType) => void;
  onError?: (error: AxiosError<SignInErrorType>) => void;
};

export function SignInForm(props: Props) {
  const router = useRouter();
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      //   signIn(tokenResponse.access_token);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (payload: SignInPayloadType) => {
      return await http.post<SignInSuccessType>("/auth/signin", {
        email: payload.email,
        password: payload.password,
      });
    },
    onError: (error: AxiosError<SignInErrorType>) => {
      props.onError?.(error);
    },
    onSuccess: ({ data }) => {
      Cookies.set("token", data.data.token);
      router.push("/dashboard");
      props?.onSuccess?.(data);
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as SignInPayloadType;
    mutate(data);
  };

  return (
    <form onSubmit={submit} className="space-y-5">
      <fieldset className="space-y-2">
        <div>
          <Input name="email" label="Username / Email" />
        </div>
        <div className="space-y-2">
          <Input name="password" label="Password" />
          <Button variant="light">
            <span>Forgot Password</span>
          </Button>
        </div>
      </fieldset>
      <div className="space-y-5">
        <Button
          isLoading={isPending}
          type="submit"
          color="primary"
          className="w-full"
        >
          <span>Sign In</span>
        </Button>
        <div id="sso" className="space-y-2">
          <div className="text-center">
            <span>Or sign in with</span>
          </div>

          <Button
            isLoading={isLoading}
            startContent={
              <If condition={!isLoading}>
                <Google />
              </If>
            }
            className="w-full"
            onPress={() => {
              login();
              setIsLoading(true);
            }}
          >
            <span>Sign with Google</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
