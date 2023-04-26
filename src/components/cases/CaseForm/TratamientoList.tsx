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
import { useMemo } from "react";


interface TratamientoListProps {
  elements: TratamientoEnFALP[];
}

const columnHelper = createColumnHelper<TratamientoEnFALP>();
const columns = [
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
  columnHelper.accessor("medico.name", {
    header: "Médico",
    size: 110,
  }),
  columnHelper.accessor("categoria_tto.name", {
    header: "Categoría",
    size: 110,
  }),
  columnHelper.accessor("subcategoria_tto.name", {
    header: "Subcategoría",
    size: 110,
  }),
  columnHelper.accessor("intencion_tto.name", {
    header: "Intención",
    size: 110,
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
