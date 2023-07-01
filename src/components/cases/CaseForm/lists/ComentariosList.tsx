import Datagrid from "@/components/ui/table/Datagrid";
import LastDateCell from "@/components/ui/table/LastDateCell";
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
import { Comentario } from "@/types/Comentario";
import Tooltip from "@/components/ui/Tooltip";

type FilterFunc = (data: Comentario[]) => Comentario[];
interface ComentarioListProps {
  filterFunc?: FilterFunc;
}

const columnHelper = createColumnHelper<Comentario>();
const columns = [
  columnHelper.accessor("created_at", {
    header: "Fecha de publicación",
    size: 110,
    cell: LastDateCell,
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

  columnHelper.accessor("nombre_usuario", {
    header: "Usuario",
    size: 110,
  }),

  columnHelper.accessor("comentario", {
    header: "Comentario",
    size: 110,
    cell: ({ row }) => {
      return (
        <Tooltip message={row.original.comentario}>
          <div className="line-clamp-3">{row.original.comentario}</div>
        </Tooltip>
      );
    },
  }),

];

export default function ComentarioList({ filterFunc }: ComentarioListProps) {
  const seguimiento = useContext(SeguimientoContext);
  const updateData = useContext(UpdateDataContext);
  const allData = useSeguimientoEntries<Comentario>(
    seguimiento,
    updateData,
    EntryType.comentario
  );

  const data = useMemo(() => {
    return filterFunc ? filterFunc(allData) : allData;
  }, [filterFunc, allData]);

  console.log("Comentario elements:", data);
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
        title="Lista de Comentarios"
        total={{
          value: data.length,
          name: "Comentarios",
          pluralName: "Comentarios",
        }}
      />
    </div>
  );
}
