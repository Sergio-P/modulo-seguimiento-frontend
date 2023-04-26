import Datagrid from "@/components/ui/table/Datagrid";
import DateCell from "@/components/ui/table/DateCell";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as fns from "date-fns";
import { useState } from "react";
import { Recurrencia } from "@/types/Recurrencia";
import { useMemo } from "react";


interface RecurrenciaListProps {
  elements: Recurrencia[];
}

const columnHelper = createColumnHelper<Recurrencia>();
const columns = [
  columnHelper.accessor("fecha_diagnostico", {
    header: "Fecha diagnóstico",
    cell: DateCell,
    size: 110,
  }),
  columnHelper.accessor("tipo.name", {
    header: "Tipo Recurrencia",
    size: 110,
  }),
  columnHelper.accessor("detalle_topografia_recurrencia", {
    header: "Detalle Topografía Recurrencia",
    size: 110,
  }),
];

export default function RecurrenciaList(props: RecurrenciaListProps) {
  const data = useMemo(() => props.elements, [props.elements]);
  console.log("RecurrenciaList elements: ", data);
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });
  return (
    <div>
      <Datagrid
        table={table}
        title="Lista Recurrencia"
        total={{
          value: data.length,
          name: "Recurrencia",
          pluralName: "Recurrencias",
        }}
      />
    </div>
  );
}
