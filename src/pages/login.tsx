import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import Image from "next/image";
import { login, useUser } from "@/hooks/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Inputs = {
  email: string;
  password: string;
};

export default function Home() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const loginMutation = useMutation(login, {
    onSettled: () => {
      queryClient.invalidateQueries(["usuario", "me"]);
    },
  });
  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    loginMutation.mutate(data);
  };

  const userQuery = useUser();
  useEffect(() => {
    if (!userQuery.isLoading && userQuery.isSuccess) {
      router.push("/");
    }
  }, [router, userQuery.isSuccess, userQuery.isLoading]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-primary">
      <div className="absolute bottom-0 right-0">
        <Image
          src={"abstractform.svg"}
          width="700"
          height="700"
          alt=""
          className="opacity-30"
        />
      </div>
      <div className="absolute top-14 left-10 max-md:w-1/3 md:w-1/4">
        <Image
          src={"logo-imds.svg"}
          width="280"
          height="280"
          alt=""
          className=""
        />
      </div>
      <div className="min-w-200 absolute max-md:top-8 max-md:right-10 max-md:w-1/4 md:bottom-10 md:left-10 md:w-1/5">
        <Image
          src={"logo-falp.svg"}
          width="220"
          height="220"
          alt=""
          className=""
        />
      </div>
      <Head>
        <title>Log In | My App</title>
      </Head>
      <form
        className="z-10 rounded-lg bg-white p-10 shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800">
          Log In
        </h2>
        <div className="mb-4">
          <label className="mb-2 block font-bold text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            className="w-full rounded-lg border border-gray-400 p-2"
            {...register("email", { required: true })}
          />
        </div>
        <div className="mb-6">
          <label
            className="mb-2 block font-bold text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full rounded-lg border border-gray-400 p-2"
            type="password"
            {...register("password", { required: true })}
          />
        </div>
        <button
          className="w-full rounded-lg bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          type="submit"
        >
          Log In
        </button>
        {/*
        <div className="flex flex-row justify-center p-10">
          <GoogleLoginButton dark={dark === "true"} />
        </div>
      */}
      </form>
    </div>
  );
}
