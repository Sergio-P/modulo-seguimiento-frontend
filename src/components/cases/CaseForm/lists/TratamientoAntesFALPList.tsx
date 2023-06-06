import Datagrid from "@/components/ui/table/Datagrid";
import DateCell from "@/components/ui/table/DateCell";
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
import _ from "lodash";
import { TratamientoAntesFALP, TratamientoAntesFALPCreate } from "@/types/TratamientoAntesFALP";

const columnHelper = createColumnHelper<
  TratamientoAntesFALPCreate | TratamientoAntesFALP
>();
export default function TratamientoPostList() {
  const updateData = useContext(UpdateDataContext);
  const seguimiento = useContext(SeguimientoContext);
  const caso = seguimiento?.caso_registro_correspondiente;
  const newAntesTratamientoList = useMemo(
    () =>
      updateData?.newEntries
        .filter((x) => x.entry_type === EntryType.tratamiento_antes_falp)
        .map((x) => x.entry_content) as TratamientoAntesFALPCreate[],
    [updateData?.newEntries]
  );
  const data = useMemo(
    () =>
      caso?.tratamientos_antes_falp
        ? [...caso?.tratamientos_antes_falp, ...newAntesTratamientoList]
        : newAntesTratamientoList,
    [caso, newAntesTratamientoList]
  );
  console.log("TratamientoAntesFalpList data: ", data);

  const columns = useMemo(
    () => [
      columnHelper.accessor("fecha_de_inicio", {
        header: "Inicio",
        cell: DateCell,
        size: 110,
      }),
      columnHelper.accessor("lugar_tto", {
        header: "Lugar Tratamiento",
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
        title="Lista de Tratamientos Antes FALP"
        total={{
          value: data.length,
          name: "Tratamiento",
          pluralName: "Tratamientos",
        }}
      />
    </div>
  );
}
