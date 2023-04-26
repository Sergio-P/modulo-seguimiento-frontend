import { CellContext } from "@tanstack/react-table";
import * as fns from "date-fns";

export default function DateCell<T>(ctx: CellContext<T, Date | string>) {
  // If value is of type date, format it
  if (ctx.cell.getValue() instanceof Date) {
    return fns.format(ctx.cell.getValue() as Date, "yyyy-MM-dd");
  } else {
    return ctx.cell.getValue() as string;
  }
}
