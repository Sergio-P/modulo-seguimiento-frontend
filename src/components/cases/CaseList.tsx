import * as api from "@/api/api";
import { useUser } from "@/hooks/auth";
import { SeguimientoState } from "@/types/Enums";
import { Seguimiento } from "@/types/Seguimiento";
import {
  createColumnHelper,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import _, { set } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LogoutButton from "../auth/LogoutButton";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import BoundingBox from "../ui/layout/BoundingBox";
import MainLayout from "../ui/layout/MainLayout";
import BooleanCell from "../ui/table/BooleanCell";
import Datagrid from "../ui/table/Datagrid";
import dateCell from "../ui/table/DateCell";
import AssignmentModal from "./CaseList/AssignmentModal";
import TimeLineModal from "./CaseForm/modals/TimeLineModal";
import SeguimientoFilters from "./CaseList/SeguimientoFilters";
import Tooltip from "../ui/Tooltip";

export default function CaseList() {
  const userQuery = useUser();
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(2);
  const [filters, setFilters] = useState<Record<string, string | number>>({});
  const caseQuery = useQuery({
    queryKey: ["seguimientos", offset, limit, filters],
    queryFn: () =>
      api.getSeguimientos(
        offset,
        limit,
        _.mapValues(filters, (x) => x.toString())
      ),
  });
  console.log("caseQuery:", caseQuery.data);
  const [filterFn, setFilterFn] = useState(() => (x: Seguimiento[]) => x);
  const filteredData = useMemo(
    () => (caseQuery.data ? filterFn(caseQuery.data.body) : []),
    [caseQuery.data, filterFn]
  );
  const subcategories = useMemo(
    () =>
      caseQuery.data
        ? _.uniq(
            caseQuery.data.body.map(
              (x) => x.caso_registro_correspondiente.subcategoria
            )
          )
        : [],
    [caseQuery.data]
  );
  console.log("filteredData:", filteredData);
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
            setFilterFn={setFilterFn}
            subcategories={subcategories}
          />
          {caseQuery.data && <CaseListTable data={filteredData} />}
        </div>
      </BoundingBox>
    </MainLayout>
  );
}

const columnHelper = createColumnHelper<Seguimiento>();

interface CaseListTableProps {
  data: Seguimiento[];
}

function CaseListTable({ data }: CaseListTableProps) {
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

          if (state === "Sin asignar" || state === "Finalizado") {
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
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
