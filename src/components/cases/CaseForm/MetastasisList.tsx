import {
  Table,
  useReactTable,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
} from "@tanstack/react-table";
import * as fns from "date-fns";

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
  const table = useReactTable({
    data: [
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
    ],
    columns,
    getCoreRowModel: getCoreRowModel(),
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
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
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

      <tbody>
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
  );
}
