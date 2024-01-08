import Datagrid from "@/components/ui/table/Datagrid";
import DateCell from "@/components/ui/table/DateCell";
import LastDateCell from "@/components/ui/table/LastDateCell";
import { EntryType } from "@/types/Enums";
import { Metastasis } from "@/types/Metastasis";
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
import { MetastasisModalRender } from "../modals/MetastasisModal";
import { createEditColumn } from "./edition";

type FilterFunc = (data: Metastasis[]) => Metastasis[];
interface MetastasisListProps {
  filterFunc?: FilterFunc;
}

const columnHelper = createColumnHelper<Metastasis>();
const columns = [
  columnHelper.accessor("updated_at", {
    header: "Fecha Última Modificación",
    size: 50,
    cell: DateCell,
  }),
  columnHelper.accessor("fecha_diagnostico", {
    header: "Fecha Diagnóstico",
    cell: DateCell,
    size: 50,
  }),
  columnHelper.accessor("numero_seguimiento", {
    header: "Origen",
    size: 50,
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
  columnHelper.accessor("codigo_topografia_metastasis", {
    header: "Detalle Topografia",
    size: 200,
    cell: ({ row }) => {
      return `(${row.original.codigo_topografia_metastasis}) ${row.original.descripcion_topografia_metastasis}`;
    },
  }),
  createEditColumn(
    columnHelper,
    "Metástasis",
    EntryType.metastasis,
    MetastasisModalRender
  ),
];

export default function MetastasisList({ filterFunc }: MetastasisListProps) {
  const seguimiento = useContext(SeguimientoContext);
  const updateData = useContext(UpdateDataContext);
  const allData = useSeguimientoEntries<Metastasis>(
    seguimiento,
    updateData,
    EntryType.metastasis
  );

  const data = useMemo(() => {
    return filterFunc ? filterFunc(allData) : allData;
  }, [filterFunc, allData]);

  console.log("MetastasisList elements:", data);
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
        title="Lista de Extensión al Diagnóstico"
        total={{
          value: data.length,
          name: "Metástasis",
          pluralName: "Metástasis",
        }}
      />
    </div>
  );
}
