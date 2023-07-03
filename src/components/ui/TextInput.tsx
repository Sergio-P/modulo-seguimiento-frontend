import clsx from "clsx";
import Image from "next/image";
import React from "react";

const TextInput = React.forwardRef(
  (
    props: { label?: string } & React.InputHTMLAttributes<HTMLInputElement>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <>
        <div className={clsx("relative", props.disabled && "opacity-50")}>
          {props.label && (
            <span className="absolute top-0 left-0 truncate whitespace-nowrap pl-5 pr-4 pt-2 text-xs font-medium text-font-subtitle">
              {props.label}
            </span>
          )}
          <input
            type="text"
            ref={ref}
            {...props}
            className={clsx(
              "h-14 w-full rounded-lg bg-background pl-5 pr-4 text-font-input",
              props.label && "pt-4",
              props.className
            )}
          />
        </div>
      </>
    );
  }
);
TextInput.displayName = "TextInput";

export default TextInput;
