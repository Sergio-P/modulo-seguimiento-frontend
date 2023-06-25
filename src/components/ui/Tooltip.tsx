import { ReactNode } from "react"

interface TooltipProps {
  message: string;
  children: ReactNode;
}

export default function Tooltip(tooltipProps: TooltipProps) {
  return (
  <div className="group relative flex">
      {tooltipProps.children}
      <span className="absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
        {tooltipProps.message}
      </span>
  </div>
  )
}
