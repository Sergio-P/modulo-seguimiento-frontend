import { Table, flexRender } from "@tanstack/react-table";
import SelectInput from "../SelectInput";
import clsx from "clsx";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

export default function Datagrid<TData = any>({
  table,
  title,
  total,
}: {
  table: Table<TData>;
  title?: string;
  total?: { value: number; name: string; pluralName?: string };
}) {
  const PaginationButton = ({ pageIndex }: { pageIndex: number }) => (
    <button
      key={pageIndex}
      onClick={() => table.setPageIndex(pageIndex)}
      className={clsx(
        "flex h-8 w-8 items-center justify-center rounded-full",
        pageIndex === table.getState().pagination.pageIndex
          ? "bg-[#6E7191] font-black text-white"
          : "font-semibold opacity-90 hover:bg-zinc-200"
      )}
    >
      <span className="-ml-[1px] -mt-[1px] block">{pageIndex + 1}</span>
    </button>
  );

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-bold text-font-title">{title}</h3>
        <div className="flex items-center gap-4">
          <SelectInput
            options={[5, 10, 20]}
            value={table.getState().pagination.pageSize}
            onChange={(value: number) => {
              console.log(value);
              table.setPageSize(value);
            }}
          />
          <span className="font-medium">Items por página</span>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="w-full table-auto border-collapse">
          <thead
            className={clsx(
              "text-sm font-semibold tracking-wide text-font-subtitle"
            )}
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="h-12">
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={clsx(
                      "border-b",
                      "bg-background px-2 text-left",
                      "first:rounded-tl-lg last:rounded-tr-lg"
                    )}
                    colSpan={header.colSpan}
                    style={{
                      width: header.getSize(),
                      minWidth: header.getSize(),
                    }}
                  >
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
                  <td
                    key={cell.id}
                    className={clsx(
                      "border-t border-zinc-200 px-2 py-2",
                      "text-sm tracking-wide text-font-title",
                      "bg-background-light"
                    )}
                    style={{
                      width: cell.column.getSize(),
                      minWidth: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex items-center justify-between text-font-title">
        <div>
          {total && (
            <div className="font-medium text-zinc-900">
              {total.value}{" "}
              {total.value > 1
                ? total.name
                : total.pluralName || total.name + "s"}
            </div>
          )}
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="disabled:opacity-50"
          >
            <HiChevronLeft />
          </button>
          <button
            type="button"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="disabled:opacity-50"
          >
            Inicio
          </button>

          <div className="flex items-center gap-4">
            {table.getPageCount() <= 5 ? (
              [...Array(table.getPageCount()).keys()].map((pageIndex) => (
                <PaginationButton key={pageIndex} pageIndex={pageIndex} />
              ))
            ) : (
              <>
                {table.getState().pagination.pageIndex >= 3 && <div>...</div>}
                {[...Array(5).keys()]
                  .map(
                    (index) => index + table.getState().pagination.pageIndex - 2
                  )
                  .filter((index) => 0 <= index && index < table.getPageCount())
                  .map((pageIndex) => (
                    <PaginationButton key={pageIndex} pageIndex={pageIndex} />
                  ))}
                {table.getState().pagination.pageIndex <=
                  table.getPageCount() - 4 && <div>...</div>}
              </>
            )}
          </div>

          <button
            
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="disabled:opacity-50"
          >
            Fin
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="disabled:opacity-50"
          >
            <HiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}
