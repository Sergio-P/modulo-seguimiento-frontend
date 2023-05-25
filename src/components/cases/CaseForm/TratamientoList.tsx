import Datagrid from "@/components/ui/table/Datagrid";
import { TratamientoEnFALP } from "@/types/TratamientoEnFALP";
import { TratamientoPostDuranteFALP } from "@/types/TratamientoPostDuranteFALP";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as fns from "date-fns";
import { useState } from "react";
import DateCell from "@/components/ui/table/DateCell";
import LastDateCell from "@/components/ui/table/LastDateCell";
import { useMemo } from "react";


interface TratamientoListProps {
  elements: TratamientoEnFALP[];
}

const columnHelper = createColumnHelper<TratamientoEnFALP>();
const columns = [
  columnHelper.accessor("updated_at", {
    header: "Fecha Última Modificación",
    size: 110,
    cell: LastDateCell,
  }),
  columnHelper.accessor("fecha_de_inicio", {
    header: "Inicio",
    cell: DateCell,
    size: 110,
  }),
  columnHelper.accessor("fecha_de_termino", {
    header: "Término",
    cell: DateCell,
    size: 110,
  }),
  columnHelper.accessor("medico", {
    header: "Médico",
    size: 110,
  }),
  columnHelper.accessor("categoria_tto", {
    header: "Categoría",
    size: 110,
  }),
  columnHelper.accessor("subcategoria_tto", {
    header: "Subcategoría",
    size: 110,
  }),
  columnHelper.accessor("intencion_tto", {
    header: "Intención",
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

export default function TratamientoList(props: TratamientoListProps) {
  const data = useMemo(() => props.elements, [props.elements]);
  console.log("TratamientoList elements: ", data);
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
        title="Lista de Tratamientos"
        total={{
          value: data.length,
          name: "Tratamiento",
          pluralName: "Tratamientos",
        }}
      />
    </div>
  );
}
