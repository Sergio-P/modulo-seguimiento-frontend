import Datagrid from "@/components/ui/table/Datagrid";
import DateCell from "@/components/ui/table/DateCell";
import { Metastasis } from "@/types/Metastasis";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo } from "react";

interface MetastasisListProps {
  elements: Metastasis[];
}

const columnHelper = createColumnHelper<Metastasis>();
const columns = [
  columnHelper.accessor("fecha_diagnostico", {
    header: "Fecha diagnóstico",
    cell: DateCell,
    size: 110,
  }),
  columnHelper.accessor("detalle_topografia", {
    header: "Detalle topografia",
    size: 110,
  }),
];

export default function MetastasisList(props: MetastasisListProps) {
  const data = useMemo(() => props.elements, [props.elements]);
  console.log("MetastasisList elements: ", data);
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
