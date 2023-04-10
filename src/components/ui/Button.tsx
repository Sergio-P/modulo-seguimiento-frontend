import clsx from "clsx";
import Image from "next/image";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  filled?: boolean;
  icon?: string;
}

export default function Button(props: ButtonProps) {
  const { disabled, filled, icon } = props;
  return (
    <button
      {...props}
      className={clsx(
        "h-10 rounded-lg border-2 border-primary text-sm tracking-wide",
        props.children ? "px-4" : "w-10",
        filled ? "bg-primary text-white" : "text-primary",
        disabled && "bg-font-subtitle border-font-subtitle",
        props.className
      )}
    >
      {icon && props.children ? (
        <div className="flex items-center gap-3">
          <Image
            src={`/icons/${icon}.svg`}
            width={16}
            height={16}
            alt=""
            className="h-4 w-4"
          />
          <div>{props.children}</div>
        </div>
      ) : icon && !props.children ? (
        <Image
          src={`/icons/${icon}.svg`}
          width={16}
          height={16}
          alt=""
          className="m-auto h-4 w-4"
        />
      ) : (
        props.children
      )}
    </button>
  );
}
