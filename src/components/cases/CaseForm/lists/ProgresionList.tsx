import Datagrid from "@/components/ui/table/Datagrid";
import DateCell from "@/components/ui/table/DateCell";
import LastDateCell from "@/components/ui/table/LastDateCell";
import { EntryType } from "@/types/Enums";
import { Progresion, ProgresionCreate } from "@/types/Progresion";
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

type FilterFunc = (data: Progresion[]) => Progresion[];
interface ProgresionListProps {
  filterFunc?: FilterFunc;
}

const columnHelper = createColumnHelper<Progresion>();
const columns = [
  columnHelper.accessor("updated_at", {
    header: "Fecha Última Modificación",
    size: 50,
    cell: DateCell,
  }),
  columnHelper.accessor("fecha_diagnostico", {
    header: "Fecha",
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
  columnHelper.accessor("tipo", {
    header: "Tipo Progresión",
    size: 60,
  }),
  columnHelper.accessor("codigo_topografia_progresion", {
    header: "Detalle Topografía Progresión",
    size: 200,
    cell: ({ row }) => {
      return `(${row.original.codigo_topografia_progresion}) ${row.original.descripcion_topografia_progresion}`;
    },
  }),
  createEditColumn(
    columnHelper,
    "Progresión",
    EntryType.progresion,
    ProgresionModalRender
  ),
];

export default function ProgresionList({ filterFunc }: ProgresionListProps) {
  const seguimiento = useContext(SeguimientoContext);
  const updateData = useContext(UpdateDataContext);
  const allData = useSeguimientoEntries<Progresion>(
    seguimiento,
    updateData,
    EntryType.progresion
  );

  const data = useMemo(() => {
    return filterFunc ? filterFunc(allData) : allData;
  }, [filterFunc, allData]);

  console.log("Progresion elements: ", data);
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
