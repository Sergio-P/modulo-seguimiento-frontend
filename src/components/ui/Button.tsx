import clsx from "clsx";
import Image from "next/image";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  filled?: boolean;
  icon?: string;
}

export default function Button(props: ButtonProps) {
  const { filled, icon } = props;
  return (
    <button
      {...props}
      className={clsx(
        "rounded-lg border-2 border-primary px-3 py-1 text-sm tracking-wide",
        filled ? "bg-primary text-white" : "text-primary",
        props.className
      )}
    >
      {icon ? (
        <div className="flex items-center gap-2">
          <Image src={`/icons/${icon}.svg`} width={16} height={16} alt="" />
          <div>{props.children}</div>
        </div>
      ) : (
        props.children
      )}
    </button>
  );
}
