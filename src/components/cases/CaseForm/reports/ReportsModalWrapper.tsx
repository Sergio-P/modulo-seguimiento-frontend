import { Reports } from "./Reports";

export function ReportsModalWrapper(props: React.PropsWithChildren) {
  return (
    <div className="grid grid-cols-12 divide-x">
      <div className="col-span-6 h-[30vh] overflow-scroll pr-4">
        <Reports />
      </div>
      <div className="col-span-6 pl-4">{props.children}</div>
    </div>
  );
}
