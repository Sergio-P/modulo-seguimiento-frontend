import Datagrid from "@/components/ui/table/Datagrid";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as fns from "date-fns";
import { useState } from "react";
import { Recurrencia } from "@/types/Recurrencia";


interface RecurrenciaListProps {
  elements: Recurrencia[];
}

const columnHelper = createColumnHelper<Recurrencia>();
const columns = [
  columnHelper.accessor("fecha_diagnostico", {
    header: "Fecha diagnóstico",
    size: 110,
  }),
  columnHelper.accessor("tipo", {
    header: "Tipo Recurrencia",
    size: 110,
  }),
  columnHelper.accessor("detalle_topografia_recurrencia", {
    header: "Detalle Topografía Recurrencia",
    size: 110,
  }),
];

export default function RecurrenciaList(props: RecurrenciaListProps) {
  const [data, setData] = useState(props.elements);
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
