"use client";
import { Google } from "@/assets/auth";
import { Button, Input } from "@nextui-org/react";
import { useGoogleLogin } from "@react-oauth/google";
import { signIn } from "../_services/actions";
import { useState } from "react";
import { If } from "@/utils/if";

export default function Page() {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      signIn(tokenResponse.access_token);
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  return (
    <form action="" className="space-y-5">
      <fieldset className="space-y-2">
        <div>
          <Input label="Username / Email" />
        </div>
        <div className="space-y-2">
          <Input label="Password" />
          <Button variant="light">
            <span>Forgot Password</span>
          </Button>
        </div>
      </fieldset>
      <div className="space-y-5">
        <Button color="primary" className="w-full">
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
