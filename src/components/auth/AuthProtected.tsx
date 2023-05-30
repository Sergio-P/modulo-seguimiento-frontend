import { useUser } from "@/hooks/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AuthProtected(props: React.PropsWithChildren) {
  const userQuery = useUser();
  const router = useRouter();
  useEffect(() => {
    if (userQuery.isError) {
      router.push("/login/");
    }
  });
  return <>{props.children}</>;
}
