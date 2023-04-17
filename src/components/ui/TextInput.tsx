/*import { Listbox } from "@headlessui/react";
import clsx from "clsx";
import React from "react";
import { HiChevronDown } from "react-icons/hi2";

interface TextInputProps {
  options: { id: string | number; name: string }[] | string[] | number[];
  label?: string;
  value?: any;
}
const TextInput = React.forwardRef((props: TextInputProps, ref) => {
  const displayValue = (
    value: { id: string | number; name: string } | string | number | undefined
  ) => {
    if (value === undefined) {
      return "";
    } else if (typeof value === "string" || typeof value === "number") {
      return value;
    }
    return value.name;
  };
  return (
    <div className="flex gap-4">
        <input
          type="checkbox"
          ref={ref}
          {...props}
          onChange={(event) => {
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
        </div>
        <label
          htmlFor={props.name}
          className="flex -translate-y-[1px] items-center text-center font-medium text-font"
        >
          {props.label}
        </label>
      </div>
  );
});
TextInput.displayName = "TextInput";

export default TextInput; */
