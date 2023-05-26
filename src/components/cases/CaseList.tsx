import { Seguimiento } from "@/types/Seguimiento";
import MainLayout from "../ui/layout/MainLayout";
import Datagrid from "../ui/table/Datagrid";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from "react-query";
import Section from "../ui/layout/Section";
import BoundingBox from "../ui/layout/BoundingBox";
import Image from "next/image";
import BooleanCell from "../ui/table/BooleanCell";
import Link from "next/link";
import dateCell from "../ui/table/DateCell";
import Checkbox from "../ui/Checkbox";

export default function CaseList() {
  const caseQuery = useQuery({
    queryKey: ["seguimientos"],
    queryFn: () =>
      fetch("http://localhost:8000/seguimiento/").then((res) => res.json()),
  });
  console.log(caseQuery.data);
  return (
    <MainLayout>
      <div className="px-5 pb-6 pt-5">
        <h1 className="text-4xl font-bold text-font-title">
          <Link href="/">Seguimiento de Casos</Link>
        </h1>
      </div>
      <BoundingBox>
        {caseQuery.data && <CaseListTable data={caseQuery.data} />}
      </BoundingBox>
    </MainLayout>
  );
}

const columnHelper = createColumnHelper<Seguimiento>();
const columns = [
  columnHelper.display({
    id: "checkbox",
    size: 48,
    header: (props) => (
      <div className="flex justify-center">
        <Checkbox
          type="checkbox"
          sizeType="sm"
          onClick={props.table.getToggleAllRowsSelectedHandler()}
          checked={props.table.getIsAllRowsSelected()}
        />
      </div>
    ),
    cell: (props) => (
      <div className="flex justify-center">
        <Checkbox
          type="checkbox"
          sizeType="sm"
          onClick={props.row.getToggleSelectedHandler()}
          checked={props.row.getIsSelected()}
          disabled={!props.row.getCanSelect()}
        />
      </div>
    ),
  }),
  columnHelper.display({
    id: "boton_ver",
    header: "Ver",
    size: 32,
    cell: (props) => (
      <Link
        href={`/cases/${props.row.original.id}`}
        className="block h-6 w-6 text-primary"
      >
        <Image
          alt=""
          src="/icons/View.svg"
          width={24}
          height={24}
          className="h-6 w-6"
        />
      </Link>
    ),
  }),
  columnHelper.accessor("caso_registro_correspondiente.ficha", {
    header: "Ficha",
    size: 100,
  }),
  columnHelper.accessor("state", {
    header: "Estado",
    size: 100,
  }),
  columnHelper.accessor(
    (row) =>
      `${row.caso_registro_correspondiente.nombre} ${row.caso_registro_correspondiente.apellido}`,
    {
      id: "paciente",
      header: "Paciente",
      size: 128,
    }
  ),
  columnHelper.accessor("caso_registro_correspondiente.subcategoria", {
    header: "Subcategoría",
    size: 168,
  }),
  columnHelper.accessor("caso_registro_correspondiente.fecha_dg", {
    header: "Fecha diagnóstico",
    size: 110,
    cell: dateCell,
  }),
  columnHelper.accessor("usuario_asignado.nombre", {
    header: "Usuario asignado",
    size: 128,
  }),
  columnHelper.accessor("tiene_consulta_nueva", {
    header: "Consulta Nueva",
    size: 64,
    cell: BooleanCell,
  }),
  columnHelper.accessor("tiene_examenes", {
    header: "Examenes",
    size: 64,
    cell: BooleanCell,
  }),
  columnHelper.accessor("tiene_comite_oncologico", {
    header: "Comité Onc.",
    size: 64,
    cell: BooleanCell,
  }),
  columnHelper.accessor("tiene_tratamiento", {
    header: "Tratamiento",
    size: 64,
    cell: BooleanCell,
  }),
  /*
  columnHelper.display({
    id: "boton_asignar",
    header: "Asignar",
    size: 40,
    cell: (props) => (
      <button
        onClick={(e) => {
          e.preventDefault();
          alert(`aquí deberíamos asignar`);
        }}
        className="h-6 w-6 text-primary"
      >
        <Image
          alt=""
          src="/icons/Two People.svg"
          width={24}
          height={24}
          className="h-6 w-6"
        />
      </button>
    ),
  }),
  */
];

interface CaseListTableProps {
  data: Seguimiento[];
}

function CaseListTable({ data }: CaseListTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return <Datagrid table={table} title="Lista de Casos" />;
}
