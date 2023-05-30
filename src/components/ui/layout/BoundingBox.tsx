import clsx from "clsx";

interface BoxProps extends React.BaseHTMLAttributes<HTMLBodyElement> {
  thin?: boolean;
}

export default function BoundingBox(props: BoxProps) {
  const { thin } = props;
  return (
    <div
      className={clsx(
        "mx-5 rounded-xl border border-zinc-400",
        thin ? "p-2" : "p-6",
        props.className
      )}
    >
      {props.children}
    </div>
  );
}
