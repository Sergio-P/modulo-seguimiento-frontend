import Datagrid from "@/components/ui/table/Datagrid";
import { Metastasis } from "@/types/Metastasis";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as fns from "date-fns";
import { useState } from "react";


interface MetastasisListProps {
  elements: Metastasis[];
}

const columnHelper = createColumnHelper<Metastasis>();
const columns = [
  columnHelper.accessor("fecha_diagnostico", {
    header: "Fecha diagnóstico",
    size: 110,
  }),
  columnHelper.accessor("detalle_topografia", {
    header: "Detalle topografia",
    size: 110,
  }),
];

export default function MetastasisList(props: MetastasisListProps) {
  const [data, setData] = useState(props.elements);
  //console.log(data)
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
        title="Lista Metástasis"
        total={{
          value: data.length,
          name: "Metástasis",
          pluralName: "Metástasis",
        }}
      />
    </div>
  );
}
