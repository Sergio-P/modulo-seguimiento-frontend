import { useContext } from "react";
import { SeguimientoContext } from "../context/seguimiento";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";
import * as api from "@/api/api";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import * as fns from "date-fns";
import { FaFile, FaSpinner } from "react-icons/fa";

interface ReportsProps {
  keywords?: string[];
}

export function Reports(props: ReportsProps) {
  const seguimiento = useContext(SeguimientoContext);
  const caseId = seguimiento?.caso_registro_id;
  const reportsQuery = useQuery({
    queryKey: ["reports", seguimiento?.caso_registro_id],
    queryFn: () => api.getReports(caseId as number),
    enabled: !_.isNil(caseId),
  });
  if (reportsQuery.isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <FaSpinner className="h-12 w-12 animate-spin text-primary opacity-50" />
      </div>
    );
  }
  if (reportsQuery.isSuccess && reportsQuery.data?.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-primary opacity-80">
          <FaFile className="h-12 w-12 text-primary" />
          <div className="text-lg">No hay reportes asociados al caso</div>
        </div>
      </div>
    );
  }

  const hasKeyword = (report) => {
    return props.keywords && props.keywords.some(k => report.informe.normalize("NFKD").toLowerCase().indexOf(k) >= 0);
  }

  return (
    <div className="text-sm">
      <div className="flex flex-col gap-2">
        {reportsQuery.data?.map((report) => (
          <div
            key={report.id}
            className={`rounded-md border border-gray-200 shadow-sm ${hasKeyword(report) ? 'bg-amber-400' : ''}`}
          >
            <Disclosure>
              <div className="flex w-full flex-row items-center justify-between py-1 px-2">
                <div className="flex flex-row items-center gap-2">
                  <div className="text-base text-font-title">{report.tipo}</div>
                  <div className="text-font-subtitle">
                    ({fns.format(new Date(report.fecha), "dd-MM-yyyy")})
                  </div>
                </div>
                <Disclosure.Button>
                  <button>
                    <Image
                      src={`/icons/plusButton.svg`}
                      width={24}
                      height={24}
                      alt=""
                      className="m-auto h-5 w-5 rounded-xl hover:bg-background-dark"
                    />
                  </button>
                </Disclosure.Button>
              </div>
              <Disclosure.Panel className="h-full overflow-hidden rounded-b-md bg-gray-50">
                <div className="whitespace-pre-wrap px-2 py-1 font-mono text-xs text-gray-700">
                  {report.informe}
                </div>
                <div className="flex flex-row gap-2 bg-gray-100 px-2 py-1 text-gray-800">
                  {report.especialidad && (
                    <div>
                      <span className="mr-1 font-semibold">Especialidad:</span>
                      {report.especialidad}
                    </div>
                  )}
                  {report.tipo_episodio && (
                    <div>
                      <span className="mr-1 font-semibold">
                        Tipo de episodio:
                      </span>
                      {report.tipo_episodio}
                    </div>
                  )}
                </div>
              </Disclosure.Panel>
            </Disclosure>
          </div>
        ))}
      </div>
    </div>
  );
}
