import clsx from "clsx";
import Image from "next/image";
import React from "react";

const TextArea = React.forwardRef(
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
          className={clsx(
            "resize-vertical min-h-32 max-h-48 w-full cursor-pointer rounded-lg bg-background px-5 py-2 text-font-input placeholder-font-subtitle",
            props.className
          )}
        />
      </div>
    );
  }
);
TextArea.displayName = "TextArea";

export default TextArea;
