import { Usuario } from "@/types/Usuario";
import axiosClient from "@/utils/axios";
import { useMutation, useQuery } from "react-query";

type LoginResponse = {
  access_token: string;
  token_type: string;
};

export const login = (credentials: { email: string; password: string }) =>
  axiosClient
    .post<LoginResponse>(
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
    .then((response) => response.data)
    .then((data) => {
      sessionStorage.setItem("token", data.access_token);
      return data;
    })
    .catch((err) => {
      sessionStorage.removeItem("token");
      throw err;
    });

export const logout = () => {
  sessionStorage.removeItem("token");
};

export const useUser = () => {
  return useQuery({
    queryKey: ["usuario", "me"],
    queryFn: () =>
      axiosClient
        .get<Usuario>("/usuario/user/me")
        .then((response) => response.data),
    retry: false,
    onError: () => {
      sessionStorage.removeItem("token");
    },
  });
};
