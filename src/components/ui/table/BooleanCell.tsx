import { CellContext } from "@tanstack/react-table";
import clsx from "clsx";
import Image from "next/image";

export default function BooleanCell<T>(props: CellContext<T, boolean>) {
  return (
    <div
      className={clsx(
        "h-6 w-6",
        props.cell.getValue() ? "text-green-500" : "text-red-500"
      )}
    >
      <Image
        alt=""
        src={`/icons/${props.cell.getValue() ? "Check" : "Close X"}.svg`}
        width={24}
        height={24}
        className="h-6 w-6"
      />
    </div>
  );
}
