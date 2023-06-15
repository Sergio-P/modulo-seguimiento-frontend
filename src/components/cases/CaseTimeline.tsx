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
import { Foo, Subtitle } from "./CaseForm/ui";
import Sticky from "../Sticky";
import TimeLine from "./TimeLine";

interface CaseTimeLineProps {
  caseId: string;
}

function InnerTimeline(props: CaseTimeLineProps) {
  const seguimiento = useContext(SeguimientoContext);
  const caso = useMemo(
    () => seguimiento?.caso_registro_correspondiente,
    [seguimiento]
  );
  return (
    <div className="sticky top-0 z-30 bg-white">
      <div className="flex items-center justify-between gap-7 border-b px-5 pt-6 pb-5">
        <h1 className="text-4xl font-bold text-font-title">
          <Link href="/">Seguimiento de Casos</Link>
        </h1>
        <div className="flex items-center">
          <div className="mr-14 w-72"></div>
          <div className="flex justify-center gap-4">
            <Button icon="FileIcon" className="">
              Historial
            </Button>
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
              <h2 className="text-2xl font-bold">
                {caso?.nombre} {caso?.apellido}
              </h2>
              <Subtitle
                label={"Seguimiento"}
                value={seguimiento?.numero_seguimiento?.toString() || ""}
              />
            </div>
            <Foo label={"RUT"} value={caso?.rut_dni || ""} />
            <Foo label={"Ficha"} value={caso?.ficha.toString() || ""} />
            <Foo label={"Subcategoría"} value={caso?.subcategoria || ""} />
            <Foo label={"Lateralidad"} value={caso?.lateralidad || ""} />
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
          <TimeLine />
          </>
        )}
      </MainLayout>
    </SeguimientoContext.Provider>
  );
}
