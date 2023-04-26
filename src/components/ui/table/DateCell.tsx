import { CellContext } from "@tanstack/react-table";
import * as fns from "date-fns";

export default function DateCell<T>(ctx: CellContext<T, Date>) {
  return fns.format(ctx.cell.getValue(), "dd-LL-yyyy");
}
