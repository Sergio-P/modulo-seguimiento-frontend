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

export default function CaseList() {
  const caseQuery = useQuery({
    queryKey: ["seguimientos"],
    queryFn: () =>
      fetch("http://localhost:8000/seguimiento/").then((res) => res.json()),
  });
  return (
    <MainLayout>
      {caseQuery.data && <CaseListTable data={caseQuery.data} />}
    </MainLayout>
  );
}

interface CaseListTableProps {
  data: Seguimiento[];
}

const columnHelper = createColumnHelper<Seguimiento>();
const columns = [
  columnHelper.accessor("caso_registro_correspondiente.fecha_dg", {}),
  columnHelper.accessor("caso_registro_correspondiente.fecha_dg", {
    header: () => "ola",
  }),
  columnHelper.accessor("caso_registro_correspondiente.nombre", {}),
];
function CaseListTable({ data }: CaseListTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div>
      <Datagrid table={table} />
    </div>
  );
}
