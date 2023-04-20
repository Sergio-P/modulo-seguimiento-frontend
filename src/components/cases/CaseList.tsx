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

export default function CaseList() {
  const caseQuery = useQuery({
    queryKey: ["seguimientos"],
    queryFn: () =>
      fetch("http://localhost:8000/seguimiento/").then((res) => res.json()),
  });
  return (
    <MainLayout>
      <div className="mt-10 px-5">
        <BoundingBox>
          {caseQuery.data && <CaseListTable data={caseQuery.data} />}
        </BoundingBox>
      </div>
    </MainLayout>
  );
}

interface CaseListTableProps {
  data: Seguimiento[];
}

const columnHelper = createColumnHelper<Seguimiento>();
const columns = [
  columnHelper.accessor("caso_registro_correspondiente.fecha_dg", {
    header: "Registro",
  }),
  columnHelper.accessor("caso_registro_correspondiente.fecha_dg", {
    header: () => "Identificación",
  }),
  columnHelper.accessor(
    (row) =>
      `${row.caso_registro_correspondiente.nombre} ${row.caso_registro_correspondiente.apellido}`,
    {
      id: "paciente",
      header: "Paciente",
    }
  ),
  columnHelper.accessor("caso_registro_correspondiente.subcategoria", {
    header: "Subcategoria",
  }),
  columnHelper.accessor("caso_registro_correspondiente.fecha_dg", {
    header: "Fecha diagnóstico",
  }),
  columnHelper.accessor("usuario.nombre", {
    header: "Usuario asignado",
  }),
  columnHelper.accessor("posee_tto", {
    header: "Rgtro. Tumor",
  }),
  columnHelper.accessor("tiene_comite_oncologico", {
    header: "Resol. Comité",
  }),
  columnHelper.accessor("tiene_tratamiento", {
    header: "Tratamiento",
  }),
  columnHelper.display({
    id: "boton_asignar",
    cell: (props) => (
      <div className="h-6 w-6 text-primary">
        <Image
          alt=""
          src="/icons/Two People.svg"
          width={24}
          height={24}
          className="h-6 w-6"
        />
      </div>
    ),
    header: "",
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

function AssignButton() {}
