import { AuthGuard } from "@/guards/auth";

export default function Template({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
