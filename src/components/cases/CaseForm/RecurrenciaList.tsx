import Datagrid from "@/components/ui/table/Datagrid";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as fns from "date-fns";
import { useState } from "react";

interface Recurrencia {
  id: number;
  seguimiento_id: number;
  caso_registro_id: number;
  created_at: Date;
  updated_at: Date;
  fecha_diagnostico: Date;
  tipo: string; // Local, Regional, Metástasis, Peritoneal, Sin información
  detalle_topografia_recurrencia: string;
}

const columnHelper = createColumnHelper<Recurrencia>();
const columns = [
  columnHelper.accessor("fecha_diagnostico", {
    cell: (info) => fns.format(info.getValue(), "dd-LL-yyyy"),
    header: (info) => "Fecha",
  }),
  columnHelper.accessor("tipo", {
    cell: (info) => info.getValue(),
    header: (info) => "Tipo Recurrencia",
  }),
  columnHelper.accessor("detalle_topografia_recurrencia", {
    cell: (info) => info.getValue(),
    header: (info) => "Detalle Topografía Recurrencia",
  }),
];

export default function RecurrenciaList() {
  const [data, setData] = useState([
    {
      id: 1,
      seguimiento_id: 1,
      caso_registro_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      fecha_diagnostico: new Date("2023-03-01"),
      detalle_topografia_recurrencia:
        "(C77.0) GANGLIOS LINFÁTICOS DE LA CABEZA, LA CARA Y EL CUELLO",
      tipo: "Local",
    },
  ]);
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
