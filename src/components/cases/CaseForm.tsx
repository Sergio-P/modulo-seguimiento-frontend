import { Seguimiento, SeguimientoUpdate } from "@/types/Seguimiento";
import axiosClient from "@/utils/axios";
import sleep from "@/utils/sleep";
import _ from "lodash";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Button from "../ui/Button";
import SelectInput from "../ui/SelectInput";
import BoundingBox from "../ui/layout/BoundingBox";
import MainLayout from "../ui/layout/MainLayout";
import { SeguimientoContext } from "./CaseForm/context/seguimiento";
import { UpdateDataContext } from "./CaseForm/context/updateData";
import MoreInfoModal from "./CaseForm/modals/MoreInfoModal";
import SignModal from "./CaseForm/modals/SignModal";
import ComiteSection from "./CaseForm/sections/ComiteSection";
import MetastasisSection from "./CaseForm/sections/MetastasisSection";
import ProgresionSection from "./CaseForm/sections/ProgresionSection";
import RecurrenciaSection from "./CaseForm/sections/RecurrenciaSection";
import TratamientoSection from "./CaseForm/sections/TratamientoSection";
import ValidacionSection from "./CaseForm/sections/ValidacionSection";
import { Foo, Subtitle } from "./CaseForm/ui";
import { EntryCreate } from "@/types/UtilitySchemas";
import { useRouter } from "next/router";
import * as api from "@/api/api";
import { serializeSeguimientoUpdate } from "./CaseForm/serialization";

interface CaseFormProps {
  caseId: string;
}

const sections = [
  { id: "metastasis", name: "Metástasis" },
  { id: "recurrencia", name: "Recurrencia" },
  { id: "progresion", name: "Progresión" },
  { id: "tratamiento", name: "Tratamiento" },
  { id: "comite", name: "Comité" },
  { id: "validacion", name: "Validación Antecedentes" },
];

export interface SeguimientoForm extends Seguimiento {}

export default function CaseForm(props: CaseFormProps) {
  const { caseId: seguimientoId } = props;
  const router = useRouter();
  const queryClient = useQueryClient();
  // query del seguimiento
  const seguimientoQuery = useQuery<Seguimiento>({
    queryKey: ["seguimiento", seguimientoId],
    queryFn: () => api.getSeguimiento(seguimientoId),
    enabled: !!seguimientoId,
    refetchOnWindowFocus: false,
  });
  const seguimiento = useMemo(() => seguimientoQuery?.data, [seguimientoQuery]);
  const caso = useMemo(
    () => seguimiento?.caso_registro_correspondiente,
    [seguimiento]
  );
  const form = useForm<SeguimientoForm>({
    defaultValues: seguimiento,
  });
  const [newEntries, setNewEntries] = useState<EntryCreate[]>([]);

  // acciones con la api

  const closeSeguimientoMutation = useMutation(
    async (formData: SeguimientoForm) => {
      if (!seguimiento) return;
      const requestBody = serializeSeguimientoUpdate(
        formData,
        seguimiento,
        newEntries
      );
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
        seguimiento,
        newEntries
      );
      await api.saveSeguimiento(seguimiento.id, requestBody);
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

  return (
    <SeguimientoContext.Provider value={seguimientoQuery.data}>
      <UpdateDataContext.Provider
        value={{
          newEntries,
          setNewEntries,
        }}
      >
        <FormProvider {...form}>
          <MainLayout>
            {seguimientoQuery.isSuccess && seguimientoQuery.data && (
              <>
                <div className="sticky top-0 z-30 bg-white">
                  <div className="flex items-center justify-between gap-7 border-b px-5 pt-6 pb-5">
                    <h1 className="text-4xl font-bold text-font-title">
                      <Link href="/">Seguimiento de Casos</Link>
                    </h1>
                    <div className="flex items-center">
                      <div className="mr-14 w-72">
                        <SelectInput
                          options={sections}
                          label={"Sección"}
                          value={selectedSection}
                          onChange={handleSectionSelect}
                        />
                      </div>
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
                        <Button
                          title="Comentar"
                          type="button"
                          icon="chatbubble"
                          filled
                        />
                        <Button
                          icon="SaveIcon"
                          filled
                          loading={saveMutation.isLoading}
                          type="button"
                          title="Guardar"
                          onClick={() => saveMutation.mutate()}
                        />

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
                            value={
                              seguimiento?.numero_seguimiento?.toString() || ""
                            }
                          />
                        </div>
                        <Foo label={"RUT"} value={caso?.rut_dni || ""} />
                        <Foo
                          label={"Ficha"}
                          value={caso?.ficha.toString() || ""}
                        />
                        <Foo
                          label={"Subcategoría"}
                          value={caso?.subcategoria || ""}
                        />
                        <Foo
                          label={"Lateralidad"}
                          value={caso?.lateralidad || ""}
                        />
                        <MoreInfoModal seguimiento={seguimientoQuery.data} />
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
              </>
            )}
            <div className="h-10" />
          </MainLayout>
        </FormProvider>
      </UpdateDataContext.Provider>
    </SeguimientoContext.Provider>
  );
}
