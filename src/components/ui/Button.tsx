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
        "rounded-lg border-2 border-primary py-2 text-sm tracking-wide",
        props.children ? "px-4" : "px-2",
        filled ? "bg-primary text-white" : "text-primary",
        props.className
      )}
    >
      {icon && props.children ? (
        <div className="flex items-center gap-3">
          <Image src={`/icons/${icon}.svg`} width={16} height={16} alt="" />
          <div>{props.children}</div>
        </div>
      ) : icon && !props.children ?
          <Image src={`/icons/${icon}.svg`} width={16} height={16} alt="" />
      : (
        props.children
      )}
    </button>
  );
}
