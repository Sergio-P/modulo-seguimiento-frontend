import Datagrid from "@/components/ui/table/Datagrid";
import DateCell from "@/components/ui/table/DateCell";
import LastDateCell from "@/components/ui/table/LastDateCell";
import { EntryType } from "@/types/Enums";
import {
  TratamientoEnFALP,
  TratamientoEnFALPCreate,
} from "@/types/TratamientoEnFALP";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import _ from "lodash";
import { useContext, useMemo } from "react";
import { SeguimientoContext } from "../context/seguimiento";
import { UpdateDataContext } from "../context/updateData";
import useSeguimientoEntries from "../hooks/useSeguimientoEntries";
import BooleanCell from "@/components/ui/table/BooleanCell";
import { createEditColumn } from "./edition";
import { TratamientoEnFalpModalRender } from "../modals/TratamientoEnFalpModal";

type FilterFunc = (data: TratamientoEnFALP[]) => TratamientoEnFALP[];
interface TratamientoEnFALPListProps {
  filterFunc?: FilterFunc;
}

const columnHelper = createColumnHelper<TratamientoEnFALP>();
export default function TratamientoEnFALPList({
  filterFunc,
}: TratamientoEnFALPListProps) {
  const seguimiento = useContext(SeguimientoContext);
  const updateData = useContext(UpdateDataContext);
  const allData = useSeguimientoEntries<TratamientoEnFALP>(
    seguimiento,
    updateData,
    EntryType.tratamiento_en_falp
  );

  const data = useMemo(() => {
    return filterFunc ? filterFunc(allData) : allData;
  }, [filterFunc, allData]);

  console.log("TratamientoEnFalpList data: ", data);

  const columns = useMemo(
    () => [
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
      columnHelper.accessor("en_tto", {
        header: "En tratamiento",
        size: 32,
        cell: BooleanCell,
      }),
      columnHelper.accessor("numero_seguimiento", {
        header: "Origen",
        size: 110,
        cell: ({ row }) => {
          if (
            row.original.numero_seguimiento === null ||
            row.original.numero_seguimiento === undefined
          ) {
            return "Registro";
          } else {
            return `Seguimiento ${row.original.numero_seguimiento}`;
          }
        },
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
      createEditColumn(
        columnHelper,
        "Tratamiento",
        EntryType.tratamiento_en_falp,
        TratamientoEnFalpModalRender
      ),
    ],
    []
  );

  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: [
        {
          id: "updated_at",
          desc: true,
        },
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
