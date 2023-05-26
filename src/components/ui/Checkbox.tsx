import clsx from "clsx";
import _ from "lodash";
import Image from "next/image";
import React, { useMemo, useState } from "react";

type CheckboxSizes = "sm" | "md";

const Checkbox = React.forwardRef(
  (
    props: {
      label?: string;
      sizeType?: CheckboxSizes;
    } & React.InputHTMLAttributes<HTMLInputElement>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [checkedState, setChecked] = useState(props.checked || false);
    const { disabled } = props;
    const checked = useMemo(
      () => (_.isNil(props.checked) ? checkedState : props.checked),
      [checkedState, props.checked]
    );
    const size = props.sizeType || "md";
    return (
      <div className={clsx("flex gap-4", disabled && "opacity-50")}>
        <input
          type="checkbox"
          ref={ref}
          {...props}
          onChange={(event) => {
            setChecked(event.target.checked);
            props.onChange && props.onChange(event);
          }}
          className={clsx(
            "absolute opacity-0",
            size === "sm" && "h-4 w-4",
            size === "md" && "h-8 w-8"
          )}
        />
        <div
          className={clsx(
            "flex items-center justify-center rounded-lg",
            size === "sm" && "h-4 w-4 rounded-sm",
            size === "md" && "h-8 w-8 rounded-lg",
            checked ? "bg-primary" : "bg-background-dark",
            props.className
          )}
        >
          <Image
            src={"/icons/Check.svg"}
            width={20}
            height={20}
            alt=""
            className={clsx(
              !checked && "invisible",
              size === "sm" && "h-4 w-4",
              size === "md" && "h-5 w-5"
            )}
          />
        </div>
        {props.label && (
          <label
            htmlFor={props.name}
            className="flex -translate-y-[1px] items-center text-center font-medium text-font"
          >
            {props.label}
          </label>
        )}
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export default Checkbox;
