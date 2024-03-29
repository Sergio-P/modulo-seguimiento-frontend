import * as api from "@/api/api";
import { ClaseCaso, CondicionCaso, EstadoVital } from "@/types/Enums";
import { Seguimiento } from "@/types/Seguimiento";
import sleep from "@/utils/sleep";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Button from "../ui/Button";
import SelectInput from "../ui/SelectInput";
import Tooltip from "../ui/Tooltip";
import BoundingBox from "../ui/layout/BoundingBox";
import MainLayout from "../ui/layout/MainLayout";
import { SeguimientoContext } from "./CaseForm/context/seguimiento";
import {
  UpdateDataContext,
  UpdateDataProvider,
} from "./CaseForm/context/updateData";
import ComentarModal from "./CaseForm/modals/ComentarModal";
import MoreInfoModal from "./CaseForm/modals/MoreInfoModal";
import ReportsModal from "./CaseForm/modals/ReportsModal";
import SignModal from "./CaseForm/modals/SignModal";
import ComiteSection from "./CaseForm/sections/ComiteSection";
import MetastasisSection from "./CaseForm/sections/MetastasisSection";
import ProgresionSection from "./CaseForm/sections/ProgresionSection";
import RecurrenciaSection from "./CaseForm/sections/RecurrenciaSection";
import TratamientoSection from "./CaseForm/sections/TratamientoSection";
import ValidacionSection from "./CaseForm/sections/ValidacionSection";
import {
  serializeSeguimientoUpdate,
  unserializeSeguimiento,
} from "./CaseForm/serialization/serialization";
import { BoldElement, Subtitle } from "./CaseForm/ui";
import DuplicarModal from "@/components/cases/CaseForm/modals/DuplicarModal";
import QualityReportModal from "@/components/cases/CaseForm/modals/QualityReportModal";
import HistoricalModal from "@/components/cases/CaseForm/modals/HistoricalModal";
import Image from "next/image";

interface CaseFormProps {
  caseId: string;
}

const sections = [
  { id: "metastasis", name: "Extensión al Diagnóstico" },
  { id: "recurrencia", name: "Recurrencia" },
  { id: "progresion", name: "Progresión" },
  { id: "tratamiento", name: "Tratamiento" },
  { id: "comite", name: "Comité" },
  { id: "validacion", name: "Validación Antecedentes" },
];

export interface SeguimientoForm {
  validacion_clase_caso: ClaseCaso | null;
  posee_recurrencia: boolean | null;
  posee_progresion: boolean | null;
  posee_metastasis: boolean | null;
  posee_tto: boolean | null;
  condicion_del_caso: CondicionCaso | null;
  ultimo_contacto: Date | null;
  estado_vital: EstadoVital | null;
  fecha_defuncion: Date | null;
  causa_defuncion: string | null;
  tiene_consulta_nueva: boolean;
  tiene_examenes: boolean;
  tiene_comite_oncologico: boolean;
  tiene_tratamiento: boolean;
  sigue_atencion_otro_centro: boolean;
}

function InnerCaseForm(props: CaseFormProps) {
  const { caseId: seguimientoId } = props;
  const router = useRouter();
  const queryClient = useQueryClient();
  const seguimiento = useContext(SeguimientoContext);
  const caso = useMemo(
    () => seguimiento?.caso_registro_correspondiente,
    [seguimiento]
  );
  const form = useForm<SeguimientoForm>({
    defaultValues: async () =>
      unserializeSeguimiento(await api.getSeguimiento(seguimientoId)),
  });
  const { newEntries, setNewEntries } = useContext(UpdateDataContext);
  // acciones con la api

  const closeSeguimientoMutation = useMutation(
    async (formData: SeguimientoForm) => {
      if (!seguimiento) return;
      const requestBody = serializeSeguimientoUpdate(formData, seguimiento);
      requestBody.new_entries = newEntries;
      await api.signSeguimiento(seguimiento.id, requestBody);
      await sleep(500);
    },
    {
      onSuccess: () => {
        setNewEntries([]);
        queryClient.invalidateQueries(["seguimiento", seguimientoId]);
        router.push("/");
      },
    }
  );

  const saveMutation = useMutation(
    async () => {
      if (!seguimiento) return;
      const requestBody = serializeSeguimientoUpdate(
        form.getValues(),
        seguimiento
      );
      requestBody.new_entries = newEntries;
      await api.updateSeguimiento(seguimiento.id, requestBody);
      await sleep(500);
    },
    {
      onSuccess: () => {
        setNewEntries([]);
        queryClient.invalidateQueries(["seguimiento", seguimientoId]);
      },
    }
  );

  // header selection

  const [selectedSection, setSelectedSection] = useState(sections[0]);
  const headerHeight = 251;
  const handleSectionSelect = (value: { id: string; name: string }) => {
    const element = document.getElementById(value.id);
    element?.scrollIntoView({
      behavior: "auto",
    });
    window.scroll(0, window.scrollY - headerHeight);
    setSelectedSection(value);
  };

  // form submit

  const onSubmit: SubmitHandler<SeguimientoForm> = async (data) => {
    if (!seguimiento) return;
    if (seguimiento.id) {
      closeSeguimientoMutation.mutate(data);
    }
  };

  if (!seguimiento) {
    return <></>;
  }

  return (
    <FormProvider {...form}>
      <div className="sticky top-0 z-30 bg-white">
        <div className="flex items-center justify-between gap-7 border-b px-5 pt-6 pb-5">
          <h1 className="text-3xl font-bold text-font-title">
            <Link href="/">
              <img
                src="/icons/selectArrow.svg"
                width={16}
                height={16}
                alt=""
                className="h-4 w-4 rotate-90 inline mr-3"
              />
              Seguimiento de Casos
            </Link>
          </h1>
          <div className="flex items-center">
            {/*<div className="mr-10 w-72">*/}
            {/*  <SelectInput*/}
            {/*    options={sections}*/}
            {/*    label={"Sección"}*/}
            {/*    value={selectedSection}*/}
            {/*    onChange={handleSectionSelect}*/}
            {/*  />*/}
            {/*</div>*/}
            <div className="flex justify-center gap-x-2 gap-y-0.5 flex-wrap">
              <Link href={`../../historico/${seguimiento.id}`}>
                <Button filled icon="timeLinePage" className="">
                  Linea de Tiempo
                </Button>
              </Link>
              <ComentarModal />
              <DuplicarModal />
              <QualityReportModal />
              <HistoricalModal />
              <ReportsModal />
              <Button
                icon="SaveIcon"
                filled
                loading={saveMutation.isLoading}
                type="button"
                title="Guardar"
                onClick={() => saveMutation.mutate()}
              >
                Guardar
              </Button>
              {/*<Link href="../../">*/}
              {/*  <Button icon="GeoLocate" filled>*/}
              {/*    Seguimientos*/}
              {/*  </Button>*/}
              {/*</Link>*/}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <BoundingBox thin className="m-4 border-background-dark">
            <div className="flex place-items-center justify-around flex-wrap">
              <div className="flex-col items-center justify-center">
                <div className="relative text-2xl font-bold">
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
              <BoldElement
                label={"N. Registro"}
                value={caso?.id || ""}
              />
              <div className="relative">
                <Tooltip message={caso?.subcategoria || ""}>
                  <BoldElement
                    classData="text-ellipsis overflow-hidden"
                    label={"Subcategoría"}
                    value={caso ? `${caso?.subcategoria} ${caso?.lateralidad != null && caso?.lateralidad != "NO APLICA" ? caso?.lateralidad : ""}` : ""}
                  />
                </Tooltip>
              </div>
              <BoldElement
                label={"Fecha último contacto"}
                value={caso?.ultimo_contacto || ""}
              />
              <MoreInfoModal seguimiento={seguimiento} />
            </div>
          </BoundingBox>
        </div>
      </div>

      <form
        className="mt-2 mb-3 flex flex-col gap-7"
        onSubmit={form.handleSubmit(onSubmit)}
        id="seguimiento-form"
      >
        <MetastasisSection />
        <RecurrenciaSection />
        <ProgresionSection />
        <ComiteSection />
        <TratamientoSection />
        <ValidacionSection />
        <div className="flex justify-around">
          <SignModal loading={closeSeguimientoMutation.isLoading} />
        </div>
      </form>
      <div className="h-10" />
    </FormProvider>
  );
}

export default function CaseForm(props: CaseFormProps) {
  const seguimientoId = props.caseId ? parseInt(props.caseId) : props.caseId;
  const seguimientoQuery = useQuery<Seguimiento>({
    queryKey: ["seguimiento", seguimientoId],
    queryFn: () => api.getSeguimiento(seguimientoId),
    enabled: !!seguimientoId,
    refetchOnWindowFocus: false,
  });
  return (
    <SeguimientoContext.Provider value={seguimientoQuery?.data}>
      <UpdateDataProvider>
        <MainLayout>
          {seguimientoQuery.isSuccess && seguimientoQuery.data && (
            <InnerCaseForm {...props} />
          )}
        </MainLayout>
      </UpdateDataProvider>
    </SeguimientoContext.Provider>
  );
}
