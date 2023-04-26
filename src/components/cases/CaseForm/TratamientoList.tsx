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


interface TratamientoListProps {
  elements: TratamientoEnFALP[];
}

const columnHelper = createColumnHelper<TratamientoEnFALP>();
const columns = [
  columnHelper.accessor("fecha_de_inicio", {
    header: "Inicio",
    size: 110,
  }),
  columnHelper.accessor("fecha_de_termino", {
    header: "Término",
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
];

export default function TratamientoList(props: TratamientoListProps) {
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
