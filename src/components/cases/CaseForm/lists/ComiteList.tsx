import Datagrid from "@/components/ui/table/Datagrid";
import DateCell from "@/components/ui/table/DateCell";
import LastDateCell from "@/components/ui/table/LastDateCell";
import { Comite, ComiteCreate } from "@/types/Comite";
import { EntryType } from "@/types/Enums";
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
import { ProgresionModalRender } from "../modals/ProgresionModal";

interface ComiteListProps {
  origenFilter: number | null;
}

const columnHelper = createColumnHelper<Comite>();
const columns = [
  columnHelper.accessor("updated_at", {
    header: "Fecha Última Modificación",
    size: 110,
    cell: LastDateCell,
  }),
  columnHelper.accessor("fecha_comite", {
    header: "Fecha Comité",
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
  columnHelper.accessor("medico", {
    header: "Médico",
    size: 110,
  }),
  columnHelper.accessor("intencion_tto", {
    header: "Intención",
    size: 110,
  }),
  createEditColumn(
    columnHelper,
    "Comité",
    EntryType.comite,
    ProgresionModalRender
  ),
];

export default function ComiteList({ origenFilter }: ComiteListProps) {
  const seguimiento = useContext(SeguimientoContext);
  const updateData = useContext(UpdateDataContext);
  const allData = useSeguimientoEntries<Comite>(
    seguimiento,
    updateData,
    EntryType.comite
  );

  const data = useMemo(() => {
    return typeof origenFilter === "undefined"
      ? allData
      : allData.filter((row) => row.numero_seguimiento === origenFilter);
  }, [allData, origenFilter]);

  console.log("ComiteList elements: ", data);
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
        title="Lista Comités"
        total={{
          value: data.length,
          name: "Comité",
          pluralName: "Comités",
        }}
      />
    </div>
  );
}
