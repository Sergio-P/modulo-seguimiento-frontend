import { ReactNode } from "react";
import clsx from "clsx";
import React from "react";

interface TooltipProps extends React.BaseHTMLAttributes<HTMLBodyElement> {
  message: string;
  children: ReactNode;
  hoverObs?: boolean;
}

export default function Tooltip(tooltipProps: TooltipProps) {
  return (
    <div className={clsx("group relative flex", tooltipProps.className)}>
      {tooltipProps.children}
      <span className={clsx(
        tooltipProps.hoverObs? "left-0 inset-x-0" : "top-8",
        "absolute z-10 scale-0 rounded bg-gray-800",
        "p-2 text-xs text-white transition-all group-hover:scale-100")}>
        {tooltipProps.message}
      </span>
    </div>
  );
}
