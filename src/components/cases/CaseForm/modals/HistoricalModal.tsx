import * as api from "@/api/api";
import Button from "@/components/ui/Button";
import Modal, { ModalProps, ModalRenderProps } from "@/components/ui/Modal";
import _ from "lodash";
import { useContext, useEffect, useMemo, useState } from "react";
import { SeguimientoContext } from "../context/seguimiento";
import { useUser } from "@/hooks/auth";
import { createColumnHelper, getCoreRowModel, OnChangeFn, PaginationState, useReactTable } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { Seguimiento } from "@/types/Seguimiento";
import Checkbox from "@/components/ui/Checkbox";
import Tooltip from "@/components/ui/Tooltip";
import Image from "next/image";
import Link from "next/link";
import dateCell from "@/components/ui/table/DateCell";
import BooleanCell from "@/components/ui/table/BooleanCell";
import TimeLineModal from "@/components/cases/CaseForm/modals/TimeLineModal";
import { SeguimientoState } from "@/types/Enums";
import Datagrid from "@/components/ui/table/Datagrid";
import AssignmentModal from "@/components/cases/CaseList/AssignmentModal";

export const HistoricalModalRender = (
  props: ModalProps
) => {
  const { handleClose } = props;
  const seguimiento = useContext(SeguimientoContext);

  let nroFicha = seguimiento?.caso_registro_correspondiente?.ficha;
  const userQuery = useUser();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const offset = useMemo(
    () => pagination.pageIndex * pagination.pageSize,
    [pagination]
  );
  const limit = useMemo(() => pagination.pageSize, [pagination]);
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  useEffect(() => {
    setPagination({ pageIndex: 0, pageSize: 10 });
  }, [filters]);
  const caseQuery = useQuery({
    queryKey: ["seguimientos", offset, limit, filters],
    queryFn: () => api.getSeguimientos(offset, limit, {caso__ficha: nroFicha}),
  });

  let data = useMemo(
    () => caseQuery?.data?.body || [],
    [caseQuery?.data?.body]
  );

  let regMap = {};
  data = data.filter(d => {
    let n = d.caso_registro_correspondiente.id;
    if(!regMap[n]){
      regMap[n] = true;
      return true;
    }
    return false;
  });

  const pageCount = useMemo(
    () =>
      caseQuery?.data?.total
        ? _.ceil(caseQuery.data.total / pagination.pageSize)
        : 0,
    [pagination, caseQuery?.data?.total]
  );

  if (!seguimiento) {
    return <></>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 items-center gap-6">
        <CaseListTable
          data={data}
          pageCount={pageCount}
          pagination={pagination}
          onPaginationChange={setPagination}
          loading={caseQuery.isLoading}
        />
      </div>
      <div className="mt-6 flex justify-between">
        <Button type="button" onClick={handleClose}>
          Cerrar
        </Button>
      </div>
    </div>
  );
};

export default function HistoricalModal(props: Partial<ModalProps>) {
  return (
    <Modal
      title="Históricos de Casos"
      icon="history"
      width="xl"
      render={(renderProps) => (
        <HistoricalModalRender {...renderProps} />
      )}
      {..._.omit(props)}
    >
      Históricos
    </Modal>
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
      columnHelper.accessor("caso_registro_correspondiente.id", {
        header: "Nro Registro",
        size: 100,
      }),
      columnHelper.accessor("caso_registro_correspondiente.categoria", {
        header: "Categoría",
        size: 168,
      }),
      columnHelper.accessor("caso_registro_correspondiente.subcategoria", {
        header: "Subcategoría",
        size: 168,
      }),
      columnHelper.accessor("caso_registro_correspondiente.lateralidad", {
        header: "Lateralidad",
        size: 168,
      }),
      columnHelper.accessor("caso_registro_correspondiente.fecha_dg", {
        header: "Fecha diagnóstico",
        size: 110,
        cell: dateCell,
      }),
      columnHelper.accessor("caso_registro_correspondiente.morfologia", {
        header: "Morfología",
        size: 168,
      }),
      columnHelper.accessor("caso_registro_correspondiente.topografia", {
        header: "Topografía",
        size: 168,
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
  return (
    <>
      <Datagrid
        table={table}
        title="Lista de Históricos"
        loading={loading}
      />
    </>
  );
}