import Datagrid from "@/components/ui/table/Datagrid";
import DateCell from "@/components/ui/table/DateCell";
import LastDateCell from "@/components/ui/table/LastDateCell";
import { EntryType } from "@/types/Enums";
import {
  TratamientoEnFALP,
  TratamientoEnFALPCreate,
} from "@/types/TratamientoEnFALP";
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
import _ from "lodash";

const columnHelper = createColumnHelper<
  TratamientoEnFALPCreate | TratamientoEnFALP
>();
export default function TratamientoEnFALPList() {
  const updateData = useContext(UpdateDataContext);
  const seguimiento = useContext(SeguimientoContext);
  const caso = seguimiento?.caso_registro_correspondiente;
  const newTratamientoList = useMemo(
    () =>
      updateData?.newEntries
        .filter((x) => x.entry_type === EntryType.tratamiento_en_falp)
        .map((x) => x.entry_content) as TratamientoEnFALPCreate[],
    [updateData?.newEntries]
  );
  const data = useMemo(
    () =>
      caso?.tratamientos_en_falp
        ? [...caso?.tratamientos_en_falp, ...newTratamientoList]
        : newTratamientoList,
    [caso, newTratamientoList]
  );
  console.log("TratamientoList data: ", data);

  const columns = useMemo(
    () => [
      columnHelper.accessor("updated_at", {
        header: "Fecha Última Modificación",
        size: 110,
        cell: LastDateCell,
      }),
      columnHelper.accessor("fecha_de_inicio", {
        header: "Inicio",
        cell: DateCell,
        size: 110,
      }),
      columnHelper.accessor("fecha_de_termino", {
        header: "Término",
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
      columnHelper.accessor("categoria_tto", {
        header: "Categoría",
        size: 110,
      }),
      columnHelper.accessor("subcategoria_tto", {
        header: "Subcategoría",
        size: 110,
      }),
      columnHelper.accessor("intencion_tto", {
        header: "Intención",
        size: 110,
      }),
      columnHelper.display({
        id: "buttons_metastasis",
        size: 50,
        cell: (props) =>
          _.isNil(props.row.original.numero_seguimiento) ||
          props.row.original.numero_seguimiento !==
            seguimiento?.numero_seguimiento ? (
            <></>
          ) : (
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
    ],
    [seguimiento]
  );

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
        title="Lista de Tratamientos"
        total={{
          value: data.length,
          name: "Tratamiento",
          pluralName: "Tratamientos",
        }}
      />
    </div>
  );
}
