import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Wea() {
  const router = useRouter();
  const [weaReactivo, setWeaReactivo] = useState(10);
  const [foo, setFoo] = useState(weaReactivo + 100);

  useEffect(() => {
    setFoo(weaReactivo + 100);
  }, [weaReactivo]);

  useEffect(() => {
    console.log("llamando a api");
  }, []);

  const { profileId, dark } = router.query;
  let wea = 10;

  return (
    <div>
      <div className="flex flex-row justify-center bg-gray-100 p-10">
        <GoogleLoginButton dark={dark === "true"} />
      </div>
      <p>Hola {profileId}</p>
      <p>foo: {foo}</p>
      <p>weaReactivo: {weaReactivo}</p>
      <button
        onClick={() => {
          wea += 1;
          setWeaReactivo((old) => old + 1);
          console.log(wea);
        }}
      >
        clickeame
      </button>
    </div>
  );
}
