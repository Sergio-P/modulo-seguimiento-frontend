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
        <h1 className="text-4xl font-bold text-font-title">Registro</h1>
      </div>
      <BoundingBox>
        {caseQuery.data && <CaseListTable data={caseQuery.data} />}
      </BoundingBox>
    </MainLayout>
  );
}

interface CaseListTableProps {
  data: Seguimiento[];
}

const columnHelper = createColumnHelper<Seguimiento>();
const columns = [
  columnHelper.accessor("created_at", {
    header: "Registro",
    size: 100,
  }),
  columnHelper.accessor(
    "caso_registro_correspondiente.fecha_lugar_obtencion_dg",
    {
      header: () => "Identificación",
      size: 100,
    }
  ),
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
    header: "Subcategoria",
    size: 168,
  }),
  columnHelper.accessor("caso_registro_correspondiente.fecha_dg", {
    header: "Fecha diagnóstico",
    size: 110,
  }),
  columnHelper.accessor("usuario.nombre", {
    header: "Usuario asignado",
    size: 128,
  }),
  columnHelper.accessor("posee_tto", {
    header: "Rgtro. Tumor",
    size: 64,
    cell: BooleanCell,
  }),
  columnHelper.accessor("tiene_comite_oncologico", {
    header: "Resol. Comité",
    size: 64,
    cell: BooleanCell,
  }),
  columnHelper.accessor("tiene_tratamiento", {
    header: "Trata miento",
    size: 64,
    cell: BooleanCell,
  }),
  columnHelper.display({
    id: "boton_asignar",
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
  columnHelper.display({
    id: "boton_ver",
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
];

function CaseListTable({ data }: CaseListTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return <Datagrid table={table} title="Lista de Casos" />;
}
