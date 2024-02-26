import { Spinner } from "@nextui-org/react";

export function Loader({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  if (!isLoading) {
    return <>{children}</>;
  }
  return <Spinner />;
}
