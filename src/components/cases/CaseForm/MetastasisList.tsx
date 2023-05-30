import Datagrid from "@/components/ui/table/Datagrid";
import DateCell from "@/components/ui/table/DateCell";
import LastDateCell from "@/components/ui/table/LastDateCell";
import { Metastasis } from "@/types/Metastasis";
import {
  SortingState,
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Button } from "react-day-picker";

interface MetastasisListProps {
  elements: Metastasis[];
}

const columnHelper = createColumnHelper<Metastasis>();
const columns = [
  columnHelper.accessor("updated_at", {
    header: "Fecha Última Modificación",
    size: 110,
    cell: LastDateCell,
  }),
  columnHelper.accessor("fecha_diagnostico", {
    header: "Fecha Diagnóstico",
    cell: DateCell,
    size: 110,
  }),
  columnHelper.accessor("numero_seguimiento", {
    header: "Origen",
    size: 110,
    cell: ({ row }) => {
      if (row.original.numero_seguimiento === null || row.original.numero_seguimiento === undefined) {
        return 'Registro';
      } else {
        return `Seguimiento ${row.original.numero_seguimiento}`;
      }
    },
  }),
  columnHelper.accessor("detalle_topografia", {
    header: "Detalle Topografia",
    size: 110,
  }),
  columnHelper.display({
    id: "buttons_metastasis",
    size: 20,
    cell: (props) => (
      <div className="flex gap-6">
        <button
          onClick={(e) => {
            e.preventDefault();
            alert(`aquí deberíamos editar`);
          }}
          className="h-6 w-8 text-primary"
        >
          Editar
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            alert(`aquí deberíamos borrar`);
          }}
          className="h-6 w-8 text-primary"
        >
          Borrar
        </button>
      </div>
    ),
  }),
];

export default function MetastasisList(props: MetastasisListProps) {
  const data = useMemo(() => props.elements.map(element => ({
    ...element,
    updated_at: new Date(element.updated_at)
  })), [props.elements]);

  console.log("MetastasisList elements: ", data);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "updated_at",
      desc: true,
    },
  ]);

  const sortedData = useMemo(() => {
    const sorted = [...props.elements].sort((a, b) => {
      const aDate = new Date(a.updated_at);
      const bDate = new Date(b.updated_at);
      return aDate.getTime() - bDate.getTime();
    });
    if (sorting[0].desc) {
      sorted.reverse();
    }
    return sorted;
  }, [props.elements, sorting]);

  const table = useReactTable({
    data: sortedData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });


  return (
    <div>
      <Datagrid
        table={table}
        title="Lista Metástasis"
        total={{
          value: sortedData.length,
          name: "Metástasis",
          pluralName: "Metástasis",
        }}
      />
    </div>
  );
}
