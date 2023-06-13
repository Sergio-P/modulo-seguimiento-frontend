import Datagrid from "@/components/ui/table/Datagrid";
import DateCell from "@/components/ui/table/DateCell";
import LastDateCell from "@/components/ui/table/LastDateCell";
import { EntryType } from "@/types/Enums";
import { Recurrencia, RecurrenciaCreate } from "@/types/Recurrencia";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useContext, useMemo } from "react";
import { SeguimientoContext } from "../context/seguimiento";
import { UpdateDataContext } from "../context/updateData";
import useSeguimientoEntries from "../hooks/useSeguimientoEntries";
import { createEditColumn } from "./edition";
import { RecurrenciaModalRender } from "../modals/RecurrenciaModal";

interface RecurrenciaListProps {
  origenFilter: number | null;
}

const columnHelper = createColumnHelper<Recurrencia>();
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
  columnHelper.accessor("tipo", {
    header: "Tipo Recurrencia",
    size: 110,
  }),
  columnHelper.accessor("detalle_topografia_recurrencia", {
    header: "Detalle Topografía Recurrencia",
    size: 110,
  }),
  createEditColumn(
    columnHelper,
    "Recurrencia",
    EntryType.recurrencia,
    RecurrenciaModalRender
  ),
];

export default function RecurrenciaList({
  origenFilter,
}: RecurrenciaListProps) {
  const seguimiento = useContext(SeguimientoContext);
  const updateData = useContext(UpdateDataContext);
  const allData = useSeguimientoEntries<Recurrencia>(
    seguimiento,
    updateData,
    EntryType.recurrencia
  );

  const data = useMemo(() => {
    return typeof origenFilter === "undefined"
      ? allData
      : allData.filter((row) => row.numero_seguimiento === origenFilter);
  }, [allData, origenFilter]);

  console.log("RecurrenciaList elements: ", data);
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
