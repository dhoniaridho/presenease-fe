import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from "@nextui-org/react";
import { PropsWithChildren } from "react";
export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="w-full min-h-screen">
      <div className="max-w-xl mx-auto py-10 px-2">
        <Card shadow="none" className="py-5">
          <CardHeader className="justify-center mt-10">
            <Image
              className="w-40"
              src="https://uploads-ssl.webflow.com/5c3a510a91db03828e568da1/5c3a6a8e6bc471b88202e53e_Logo%205%20Copy%208.svg"
              alt="Logo"
            />
          </CardHeader>
          <CardBody className="px-5 mb-10">{children}</CardBody>
          <CardFooter className="justify-center">
            <p className="text-center text-sm">
              Copyright © 2022. All Rights Reserved.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
