import { Reports } from "./Reports";
import clsx from "clsx";

interface wrapperProps extends React.PropsWithChildren{
  modcom?: boolean
  modtraten?: boolean
  modtratpost?: boolean
  keywords?: string[];
}

export function ReportsModalWrapper(props: wrapperProps) {
  const {modcom, modtraten, modtratpost} = props;
  return (
    <div className="grid grid-cols-12 divide-x">
      <div className={clsx(
        modcom && "h-[70vh]",
        modtraten && "h-[60vh]",
        modtratpost && "h-[45vh]",
        "h-[30vh]",
        "col-span-6 overflow-y-auto pr-4")}>
        <Reports keywords={props.keywords || []}/>
      </div>
      <div className="col-span-6 pl-4">{props.children}</div>
    </div>
  );
}
