import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../ui/Button";
import { logout } from "@/hooks/auth";

export default function LogoutButton() {
  const queryClient = useQueryClient();
  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries(["usuario", "me"]);
    },
  });
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    <>
      <Button onClick={handleLogout}>Salir</Button>
    </>
  );
}
