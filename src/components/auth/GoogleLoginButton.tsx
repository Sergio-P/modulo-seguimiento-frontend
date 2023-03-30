import clsx from "clsx";
import { FaGoogle } from "react-icons/fa";

interface GoogleLoginButtonProps {
  dark: boolean;
}

export default function GoogleLoginButton(props: GoogleLoginButtonProps) {
  const { dark } = props;
  return (
    <button
      className={clsx(
        "rounded-xl px-4 py-2 font-semibold shadow",
        dark ? "bg-gray-800 text-gray-300" : "bg-white text-gray-500"
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <div className="translate-y-[1px]">
          <FaGoogle className="text-red-500" />
        </div>
        <div>Continuar con Google</div>
      </div>
    </button>
  );
}
