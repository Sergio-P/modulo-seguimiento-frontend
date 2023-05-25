import clsx from "clsx"

interface BoxProps extends React.BaseHTMLAttributes<HTMLBodyElement> {
}

export default function BoundingBox(props: BoxProps) {
  return (
    <div className={clsx(
      "mx-5 rounded-xl border border-zinc-400 p-6",
      props.className
    )}>
      {props.children}
    </div>
  );
}
