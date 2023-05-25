import { CellContext } from "@tanstack/react-table";
import * as fns from "date-fns";

export default function DateCell<T>(ctx: CellContext<T, Date | string>) {
  // If value is of type date, format it
  if (ctx.cell.getValue() instanceof Date) {
    return fns.format(ctx.cell.getValue() as Date, "dd-MM-yyyy");
  } 
  else if (typeof ctx.cell.getValue() === "string") {
    return fns.format(fns.parseISO(ctx.cell.getValue() as string), "dd-MM-yyyy");
  }
  else {
    return ctx.cell.getValue() as string;
  }
}
