import * as api from "@/api/api";
import { useUser } from "@/hooks/auth";
import { useQuery } from "@tanstack/react-query";
import {
  OnChangeFn,
  PaginationState,
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import LogoutButton from "../auth/LogoutButton";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import Tooltip from "../ui/Tooltip";
import BoundingBox from "../ui/layout/BoundingBox";
import MainLayout from "../ui/layout/MainLayout";
import BooleanCell from "../ui/table/BooleanCell";
import Datagrid from "../ui/table/Datagrid";
import dateCell from "../ui/table/DateCell";
import { Comentario } from "@/types/Comentario";
import { QualityReportTypes } from "@/types/Enums";

export default function AuditListQualityReport() {
  const userQuery = useUser();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const offset = useMemo(
    () => pagination.pageIndex * pagination.pageSize,
    [pagination]
  );
  const limit = useMemo(() => pagination.pageSize, [pagination]);
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  useEffect(() => {
    setPagination({ pageIndex: 0, pageSize: 5 });
  }, [filters]);
  const caseQuery = useQuery({
    queryKey: ["seguimientos", offset, limit, filters],
    queryFn: () => api.getComentariosByType("quality_report"),
  });

  const data = useMemo(
    () => caseQuery?.data || [],
    [caseQuery?.data]
  );

  console.log(data);

  const pageCount = useMemo(
    () =>
      caseQuery?.data?.total
        ? _.ceil(caseQuery.data.total / pagination.pageSize)
        : 0,
    [pagination, caseQuery?.data?.total]
  );
  return (
    <MainLayout>
      <div className="px-5 pb-6 pt-5">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold text-font-title">
            <Link href="/">Revisión de Casos</Link>
          </h1>
          <div className="flex justify-between gap-4 font-bold">
            <Link href="/audit-duplicates">
              <Button>Duplicados</Button>
            </Link>
            <Link href="/audit-qr">
              <Button>Revisión de Calidad</Button>
            </Link>
            <div className="flex flex-col items-center justify-center">
              <div className="text-font-title">{userQuery.data?.nombre}</div>
              <div className="text-xs text-font-subtitle">
                {userQuery.data?.rol.toLocaleUpperCase()}
              </div>
            </div>
            <LogoutButton />
          </div>
        </div>
      </div>
      <BoundingBox>
        <div className="flex flex-col gap-4">
          <AuditListTable
            data={data}
            pageCount={pageCount}
            pagination={pagination}
            onPaginationChange={setPagination}
            loading={caseQuery.isLoading}
          />
        </div>
      </BoundingBox>
    </MainLayout>
  );
}

const columnHelper = createColumnHelper<Comentario>();

interface AuditListTableProps {
  data: Comentario[];
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  pageCount: number;
  loading: boolean;
}

function AuditListTable({
  data,
  pagination,
  onPaginationChange,
  pageCount,
  loading,
}: AuditListTableProps) {
  const userQuery = useUser();
  const columns = useMemo(
    () => [
      ...(userQuery.data?.rol === "admin"
        ? [
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
          ]
        : []),
      columnHelper.display({
        id: "boton_ver",
        header: "Ver",
        size: 32,
        cell: (props) => {
          const state = props.row.original.state;
          const isAssigned = props.row.original.usuario_id;


          if (
            userQuery.data?.rol != "admin" && (
            state === "Sin asignar" ||
            state === "Finalizado" ||
            state === "Completo fallecido" ||
            isAssigned !== userQuery.data?.id)
          ) {
            return (
              <>
                <Tooltip message={state}>
                  <Image
                    alt=""
                    src="/icons/crossView.svg"
                    width={24}
                    height={24}
                    className="h-6 w-6"
                  />
                </Tooltip>
              </>
            );
          }

          return (
            <Link
              href={`/cases/${props.row.original.numero_seguimiento}`}
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
          );
        },
      }),
      columnHelper.accessor("caso_registro_id", {
        header: "Nro Registro",
        size: 100,
      }),
      columnHelper.accessor("closed", {
        header: "Completado",
        size: 100,
        cell: BooleanCell
      }),
      // columnHelper.accessor(
      //   (row) =>
      //     `${row.caso_registro_correspondiente.nombre} ${row.caso_registro_correspondiente.apellido}`,
      //   {
      //     id: "paciente",
      //     header: "Paciente",
      //     size: 128,
      //   }
      // ),
      ...(Object.keys(QualityReportTypes).map(e => columnHelper.accessor(`data.${e}`, {
        header: QualityReportTypes[e].replace("ANTECEDENTES DEL ", "").replace("ANTECEDENTES DE ", ""),
        size: 100,
        cell: BooleanCell
      }))),
      columnHelper.accessor("data.justificacion", {
        header: "Justificación",
        size: 320
      }),
    ],
    [userQuery.data]
  );
  const paginationState = useMemo(() => pagination, [pagination]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    state: {
      pagination: paginationState,
    },
    onPaginationChange: onPaginationChange,
    pageCount: pageCount
  });

  return (
    <>
      <Datagrid
        table={table}
        title="Lista de Revisiones de Calidad"
        loading={loading}
      />
    </>
  );
}
