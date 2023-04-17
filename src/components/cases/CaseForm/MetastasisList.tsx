import {
  Table,
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
  getPaginationRowModel,
} from "@tanstack/react-table";
import clsx from "clsx";
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
    cell: (info) => fns.format(info.getValue(), "dd-mm-yyyy"),
  }),
  columnHelper.accessor("detalle_topografia", {
    cell: (info) => info.getValue(),
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
      fecha_diagnostico: new Date("2023-03-20"),
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
  });
  return (
    <>
      <h1 className="">Lista Metástasis</h1>
      <Datagrid table={table} />
    </>
  );
}

function Datagrid<TData = any>({ table }: { table: Table<TData> }) {
  return (
    <div>
      <table>
        <thead
          className={clsx(
            "overflow-hidden rounded-t-md border-b bg-background",
            "text-sm font-semibold tracking-wide text-font-subtitle"
          )}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="h-12">
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between">
        <div />
        {}
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            Inicio
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            Fin
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
        </div>
      </div>
      {JSON.stringify(table.getState().pagination)}
    </div>
  );
}
