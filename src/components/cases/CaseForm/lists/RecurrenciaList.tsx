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

type FilterFunc = (data: Recurrencia[]) => Recurrencia[];
interface RecurrenciaListProps {
  filterFunc?: FilterFunc;
}

const columnHelper = createColumnHelper<Recurrencia | RecurrenciaCreate>();
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

export default function RecurrenciaList({ filterFunc }: RecurrenciaListProps) {
  const seguimiento = useContext(SeguimientoContext);
  const updateData = useContext(UpdateDataContext);
  const allData = useSeguimientoEntries<Recurrencia>(
    seguimiento,
    updateData,
    EntryType.recurrencia
  );

  const data = useMemo(() => {
    return filterFunc ? filterFunc(allData) : allData;
  }, [filterFunc, allData]);
  
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
