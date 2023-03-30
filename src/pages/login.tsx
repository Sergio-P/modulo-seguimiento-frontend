import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { profileId, dark } = router.query;

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-300 to-purple-400">
      <Head>
        <title>Log In | My App</title>
      </Head>
      <form
        className="rounded-lg bg-white p-10 shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-8 text-2xl font-bold text-center text-gray-800">
          Log In
        </h2>
        <div className="mb-4">
          <label className="mb-2 block font-bold text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            className="w-full rounded-lg border border-gray-400 p-2"
            id="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
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
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button
          className="w-full rounded-lg bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          type="submit"
        >
          Log In
        </button>
        <div className="flex flex-row justify-center p-10">
          <GoogleLoginButton dark={dark === "true"} />
        </div>
      </form>
    </div>
  );
}
