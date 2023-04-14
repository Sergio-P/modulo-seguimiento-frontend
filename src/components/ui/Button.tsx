import clsx from "clsx";
import Image from "next/image";
import _ from "lodash";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  filled?: boolean;
  clear?: boolean;
  icon?: string;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  const { disabled, filled, clear, icon } = props;
  return (
    <button
      {..._.omit(props, ["icon", "filled", "clear"])}
      className={clsx(
        "h-10 rounded-lg border-primary text-sm tracking-wide",
        props.children ? "px-4" : "w-10",
        clear ? "border-none" : "border-2",
        filled ? "bg-primary text-white" : "text-primary",
        disabled && "border-primary border-opacity-0 bg-primary bg-opacity-50",
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
