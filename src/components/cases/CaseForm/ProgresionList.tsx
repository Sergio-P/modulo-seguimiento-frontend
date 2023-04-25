import Datagrid from "@/components/ui/table/Datagrid";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as fns from "date-fns";
import { useState } from "react";
import { Progresion } from "@/types/Progresion";


interface ProgresionListProps {
  elements: Progresion[];
}

const columnHelper = createColumnHelper<Progresion>();
const columns = [
  columnHelper.accessor("fecha_diagnostico", {
    header: "Fecha",
    size: 110,
  }),
  columnHelper.accessor("tipo", {
    header: "Tipo Recurrencia",
    size: 110,
  }),
  columnHelper.accessor("detalle_topografia_progresion", {
    header: "Detalle Topografía Recurrencia",
    size: 110,
  }),
];

export default function ProgresionList(props: ProgresionListProps) {
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
        title="Lista Progresión"
        total={{
          value: data.length,
          name: "Progresión",
          pluralName: "Progresiones",
        }}
      />
    </div>
  );
}
