import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";

const Checkbox = React.forwardRef(
  (
    props: { label?: string } & React.InputHTMLAttributes<HTMLInputElement>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [checked, setChecked] = useState(props.checked || false);
    return (
      <div className="flex gap-4">
        <input
          type="checkbox"
          ref={ref}
          {...props}
          onChange={(event) => {
            console.log(event.target.checked);
            setChecked(event.target.checked);
            props.onChange && props.onChange(event);
          }}
          className={clsx("absolute h-8 w-8 opacity-0", props.className)}
        />
        <div
          className={clsx(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            checked ? "bg-primary" : "bg-background-dark"
          )}
        >
          <Image
            src={"/icons/Check.svg"}
            width={20}
            height={20}
            alt=""
            className={clsx("h-5 w-5", !checked && "invisible")}
          />
        </div>
        <label
          htmlFor={props.name}
          className="flex -translate-y-[1px] items-center text-center font-medium text-font"
        >
          {props.label}
        </label>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export default Checkbox;
