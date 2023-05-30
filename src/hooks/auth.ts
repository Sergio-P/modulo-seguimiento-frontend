import axiosClient from "@/utils/axios";
import { useMutation } from "react-query";

/*
const wea = configureAuth({
  userFn: () => fetch("/usuario/users/me"),
  loginFn: async (credentials: { username: string; password: string }) => axiosClient.post("/usuario/token", {
      ...credentials,
    }).then(response => response.data)
  },
  registerFn: (credentials) => api.post("/register", credentials),
  logoutFn: () => api.post("/logout"),
});
*/

export const useLogin = () => {
  return useMutation(
    (credentials: { email: string; password: string }) =>
      axiosClient
        .post<string>(
          "/usuario/token",
          {
            username: credentials.email,
            password: credentials.password,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((response) => response.data),
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );
};
