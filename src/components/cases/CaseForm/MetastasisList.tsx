import Datagrid from "@/components/ui/table/Datagrid";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as fns from "date-fns";
import { useState } from "react";

interface Metastasis {
  id: number;
  seguimiento_id: number;
  caso_registro_id: number;
  created_at: Date;
  updated_at: Date;
  fecha_diagnostico: Date;
  detalle_topografia: string;
}

const columnHelper = createColumnHelper<Metastasis>();
const columns = [
  columnHelper.accessor("fecha_diagnostico", {
    cell: (info) => fns.format(info.getValue(), "dd-LL-yyyy"),
    header: (info) => "Fecha",
  }),
  columnHelper.accessor("detalle_topografia", {
    cell: (info) => info.getValue(),
    header: (info) => "Detalle Topografía",
  }),
];

export default function MetastasisList() {
  const [data, setData] = useState([
    {
      id: 1,
      seguimiento_id: 1,
      caso_registro_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      fecha_diagnostico: new Date("2023-03-01"),
      detalle_topografia:
        "(C77.0) GANGLIOS LINFÁTICOS DE LA CABEZA, LA CARA Y EL CUELLO",
    },
    {
      id: 2,
      seguimiento_id: 1,
      caso_registro_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      fecha_diagnostico: new Date("2023-03-20"),
      detalle_topografia:
        "(C77.0) GANGLIOS LINFÁTICOS DE LA CABEZA, LA CARA Y EL CUELLO",
    },
    {
      id: 3,
      seguimiento_id: 1,
      caso_registro_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      fecha_diagnostico: new Date("2023-03-20"),
      detalle_topografia:
        "(C77.0) GANGLIOS LINFÁTICOS DE LA CABEZA, LA CARA Y EL CUELLO",
    },
    {
      id: 4,
      seguimiento_id: 1,
      caso_registro_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      fecha_diagnostico: new Date("2023-03-20"),
      detalle_topografia:
        "(C77.0) GANGLIOS LINFÁTICOS DE LA CABEZA, LA CARA Y EL CUELLO",
    },
    {
      id: 5,
      seguimiento_id: 1,
      caso_registro_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      fecha_diagnostico: new Date("2023-03-20"),
      detalle_topografia:
        "(C77.0) GANGLIOS LINFÁTICOS DE LA CABEZA, LA CARA Y EL CUELLO",
    },
    {
      id: 6,
      seguimiento_id: 1,
      caso_registro_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      fecha_diagnostico: new Date("2023-03-20"),
      detalle_topografia:
        "(C77.0) GANGLIOS LINFÁTICOS DE LA CABEZA, LA CARA Y EL CUELLO",
    },
    {
      id: 7,
      seguimiento_id: 1,
      caso_registro_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      fecha_diagnostico: new Date("2023-03-20"),
      detalle_topografia:
        "(C77.0) GANGLIOS LINFÁTICOS DE LA CABEZA, LA CARA Y EL CUELLO",
    },
    {
      id: 8,
      seguimiento_id: 1,
      caso_registro_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      fecha_diagnostico: new Date("2023-03-20"),
      detalle_topografia:
        "(C77.0) GANGLIOS LINFÁTICOS DE LA CABEZA, LA CARA Y EL CUELLO",
    },
    {
      id: 9,
      seguimiento_id: 1,
      caso_registro_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      fecha_diagnostico: new Date("2023-03-20"),
      detalle_topografia:
        "(C77.0) GANGLIOS LINFÁTICOS DE LA CABEZA, LA CARA Y EL CUELLO",
    },
    {
      id: 10,
      seguimiento_id: 1,
      caso_registro_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      fecha_diagnostico: new Date("2023-03-20"),
      detalle_topografia:
        "(C77.0) GANGLIOS LINFÁTICOS DE LA CABEZA, LA CARA Y EL CUELLO",
    },
    {
      id: 11,
      seguimiento_id: 1,
      caso_registro_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      fecha_diagnostico: new Date("2023-03-20"),
      detalle_topografia:
        "(C77.0) GANGLIOS LINFÁTICOS DE LA CABEZA, LA CARA Y EL CUELLO",
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
        title="Lista Metástasis"
        total={{
          value: data.length,
          name: "Metástasis",
          pluralName: "Metástasis",
        }}
      />
    </div>
  );
}
