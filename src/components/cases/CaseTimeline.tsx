import { api } from "@/api";
import { Seguimiento } from "@/types/Seguimiento";
import { useQuery } from "@tanstack/react-query";
import { SeguimientoContext } from "./CaseForm/context/seguimiento";
import MainLayout from "../ui/layout/MainLayout";
import Link from "next/link";
import SelectInput from "../ui/SelectInput";
import Button from "../ui/Button";
import BoundingBox from "../ui/layout/BoundingBox";
import { useContext, useMemo } from "react";
import { BoldElement, Subtitle } from "./CaseForm/ui";
import Sticky from "../Sticky";
import TimeLine from "./TimeLine";
import MoreInfoModal from "./CaseForm/modals/MoreInfoModal";
import Tooltip from "../ui/Tooltip";

interface CaseTimeLineProps {
  caseId: string;
}

function InnerTimeline(props: CaseTimeLineProps) {
  const seguimiento = useContext(SeguimientoContext);
  const caso = useMemo(
    () => seguimiento?.caso_registro_correspondiente,
    [seguimiento]
  );

  if (!seguimiento) {
    return <></>;
  }

  return (
    <div className="sticky top-0 z-30 bg-white">
      <div className="flex items-center justify-between gap-7 border-b px-5 pt-6 pb-5">
        <h1 className="text-4xl font-bold text-font-title">
          <Link href="/">Seguimiento de Casos</Link>
        </h1>
        <div className="flex items-center">
          <div className="mr-14 w-72"></div>
          <div className="flex justify-center gap-4">
              <Link href={`../../cases/${seguimiento?.id}`}>
                <Button icon="FileIcon" className="">
                  Formulario
                </Button>
              </Link>
            <Button
              title="Duplicar Caso"
              type="button"
              icon="2cuadrados"
              filled
            />
            <Button title="Comentar" type="button" icon="chatbubble" filled />
            <Link href="../../">
              <Button icon="GeoLocate" filled>
                Seguimientos
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <BoundingBox thin className="m-4 border-background-dark">
          <div className="flex place-items-center justify-around">
            <div className="flex-col items-center justify-center">
              <div className="text-2xl font-bold">
                <Tooltip message={`${caso?.nombre} ${caso?.apellido}`}>
                  {caso?.nombre.split(" ")[0]} {caso?.apellido.split(" ")[0]}
                </Tooltip>
              </div>
              <Subtitle
                label={"Seguimiento"}
                value={seguimiento?.numero_seguimiento?.toString() || ""}
              />
            </div>
            <BoldElement label={"RUT"} value={caso?.rut_dni || ""} />
            <BoldElement label={"Ficha"} value={caso?.ficha.toString() || ""} />
            <Tooltip message={caso?.subcategoria || ""}>
              <BoldElement classData="text-ellipsis overflow-hidden" label={"Subcategoría"} value={caso?.subcategoria || ""} />
            </Tooltip>
            <BoldElement label={"Lateralidad"} value={caso?.lateralidad || ""} />
            <MoreInfoModal seguimiento={seguimiento} />
          </div>
        </BoundingBox>
      </div>
    </div>
  );
}

export default function CaseTimeline(props: CaseTimeLineProps) {
  const seguimientoId = props.caseId ? parseInt(props.caseId) : props.caseId;
  const seguimientoQuery = useQuery<Seguimiento>({
    queryKey: ["seguimiento", seguimientoId],
    queryFn: () => api.getSeguimiento(seguimientoId),
    enabled: !!seguimientoId,
    refetchOnWindowFocus: false,
  });
  return (
    <SeguimientoContext.Provider value={seguimientoQuery?.data}>
      <MainLayout>
        {seguimientoQuery.isSuccess && seguimientoQuery.data && (
          <>
          <InnerTimeline caseId={props.caseId} />
          <div className="px-6">
            <TimeLine />
          </div>
          </>
        )}
      </MainLayout>
    </SeguimientoContext.Provider>
  );
}
