export default function BoundingBox(props: React.PropsWithChildren) {
  return (
    <div className="mx-5 rounded-xl border border-zinc-400 p-6">
      {props.children}
    </div>
  );
}
