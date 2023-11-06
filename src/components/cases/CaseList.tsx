import * as api from "@/api/api";
import { useUser } from "@/hooks/auth";
import { SeguimientoState } from "@/types/Enums";
import { Seguimiento } from "@/types/Seguimiento";
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
import TimeLineModal from "./CaseForm/modals/TimeLineModal";
import AssignmentModal from "./CaseList/AssignmentModal";
import SeguimientoFilters from "./CaseList/SeguimientoFilters";
import { is } from "date-fns/locale";

export default function CaseList() {
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
    queryFn: () =>
      api.getSeguimientos(
        offset,
        limit,
        _.mapValues(filters, (x) => x.toString())
      ),
  });
  const subcategoriesQuery = useQuery({
    queryKey: ["subcategories"],
    queryFn: () => api.getSubcategories(),
  });
  const data = useMemo(
    () => caseQuery?.data?.body || [],
    [caseQuery?.data?.body]
  );
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
            <Link href="/">Seguimiento de Casos</Link>
          </h1>
          <div className="flex justify-between gap-4 font-bold">
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
          <SeguimientoFilters
            subcategories={subcategoriesQuery.data || []}
            onFilter={setFilters}
          />
          <CaseListTable
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

const columnHelper = createColumnHelper<Seguimiento>();

interface CaseListTableProps {
  data: Seguimiento[];
  pagination: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  pageCount: number;
  loading: boolean;
}

function CaseListTable({
  data,
  pagination,
  onPaginationChange,
  pageCount,
  loading,
}: CaseListTableProps) {
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
          );
        },
      }),
      columnHelper.accessor("caso_registro_correspondiente.ficha", {
        header: "Ficha",
        size: 100,
      }),
      columnHelper.accessor("state", {
        header: "Estado",
        size: 100,
      }),
      columnHelper.accessor("tipo_seguimiento", {
        header: "Tipo",
        size: 150,
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
        header: "Comité Oncológico",
        size: 64,
        cell: BooleanCell,
      }),
      columnHelper.accessor("tiene_tratamiento", {
        header: "Tratamiento",
        size: 64,
        cell: BooleanCell,
      }),
      columnHelper.display({
        id: "boton_linea_de_tiempo",
        header: "Resumen",
        size: 32,
        cell: (props) => (
          <TimeLineModal seguimientoId={props.row.original.id} />
        ),
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
    pageCount: pageCount,
    enableRowSelection: (row) => {
      return [
        SeguimientoState.sin_asignar,
        SeguimientoState.asignado,
        SeguimientoState.incompleto,
      ].includes(row.original.state);
    },
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  return (
    <>
      <Datagrid
        table={table}
        title="Lista de Seguimientos"
        loading={loading}
        extraHeader={
          <div>
            {userQuery.data?.rol === "admin" && (
              <Button
                filled
                disabled={!_.some(Object.values(table.getState().rowSelection))}
                onClick={() => {
                  let selected = Object.keys(table.getState().rowSelection).map(
                    (id: string) => {
                      return table.getRowModel().rowsById[id].original.id;
                    }
                  );
                  setSelectedIds(selected);
                  setModalOpen(true);
                }}
              >
                Asignar seguimiento
              </Button>
            )}
          </div>
        }
      />
      <AssignmentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={() => {
          table.resetRowSelection();
        }}
        seguimientoIds={selectedIds}
      />
    </>
  );
}
