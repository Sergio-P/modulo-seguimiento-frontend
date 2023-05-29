import clsx from "clsx";
import Image from "next/image";
import React from "react";

const TextInput = React.forwardRef(
  (
    props: { label?: string } & React.InputHTMLAttributes<HTMLTextAreaElement>,
    ref: React.ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <div className="relative">
          <textarea
            placeholder={props.label}
            ref={ref}
            {...props}
            className={clsx("resize-vertical w-full rounded-lg cursor-pointer bg-background px-5 py-2 text-font-input max-h-48 min-h-32 placeholder-font-subtitle", props.className)}
          />
      </div>
    )}
);
TextInput.displayName = "TextInput";

export default TextInput;
      