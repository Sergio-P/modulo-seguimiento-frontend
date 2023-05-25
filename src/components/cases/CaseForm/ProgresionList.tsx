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
import DateCell from "@/components/ui/table/DateCell";
import LastDateCell from "@/components/ui/table/LastDateCell";
import { useMemo } from "react";


interface ProgresionListProps {
  elements: Progresion[];
}

const columnHelper = createColumnHelper<Progresion>();
const columns = [
  columnHelper.accessor("updated_at", {
    header: "Fecha Última Modificación",
    size: 110,
    cell: LastDateCell,
  }),
  columnHelper.accessor("fecha_diagnostico", {
    header: "Fecha",
    cell: DateCell,
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
  columnHelper.display({
    id: "buttons_metastasis",
    size: 50,
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

export default function ProgresionList(props: ProgresionListProps) {
  const data = useMemo(() => props.elements, [props.elements]);
  console.log("Progresion elements: ", data);
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      sorting: [
        {
          id: "updated_at",
          desc: true
        }
      ],
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
