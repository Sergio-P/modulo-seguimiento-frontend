import { Seguimiento } from "@/types/Seguimiento";
import axiosClient from "@/utils/axios";
import sleep from "@/utils/sleep";
import * as fns from "date-fns";
import _ from "lodash";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
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

interface SeguimientoForm extends Seguimiento {}

export default function CaseForm(props: CaseFormProps) {
  const { caseId: seguimientoId } = props;
  const seguimientoQuery = useQuery<Seguimiento>({
    queryKey: ["seguimiento", seguimientoId],
    queryFn: () =>
      axiosClient
        .get(`http://localhost:8000/seguimiento/${seguimientoId}`)
        .then((res) => {
          const data = res.data as Seguimiento;
          const fixUpdatedAt = (things: { updated_at: string | null }[]) => {
            things.forEach((x) => {
              if (!_.isNil(x.updated_at)) {
                x.updated_at = x.updated_at + "Z";
              }
            });
          };
          fixUpdatedAt(data.caso_registro_correspondiente.tratamientos_en_falp);
          fixUpdatedAt(
            data.caso_registro_correspondiente.tratamientos_post_durante_falp
          );
          return data;
        }),
    enabled: !!seguimientoId,
    refetchOnWindowFocus: false,
  });
  const caso = useMemo(
    () => seguimientoQuery.data?.caso_registro_correspondiente,
    [seguimientoQuery.data]
  );

  const [newEntries, setNewEntries] = useState<
    {
      entry_type: string;
      entry_content: any;
    }[]
  >([]);

  const [selectedSection, setSelectedSection] = useState(sections[0]);

  async function closeSeguimiento(seguimientoId: number) {
    const requestBody = {
      id: seguimientoId,
      caso_registro_id: caso?.id,
      state: seguimientoQuery.data?.state,
      numero_seguimiento: seguimientoQuery.data?.numero_seguimiento,
      validacion_clase_caso: seguimientoQuery.data?.validacion_clase_caso,
      posee_recurrencia: seguimientoQuery.data?.posee_recurrencia,
      posee_progresion: seguimientoQuery.data?.posee_progresion,
      posee_metastasis: seguimientoQuery.data?.posee_metastasis,
      posee_tto: seguimientoQuery.data?.posee_tto,
      condicion_del_caso: seguimientoQuery.data?.condicion_del_caso,
      ultimo_contacto: seguimientoQuery.data?.ultimo_contacto,
      estado_vital: seguimientoQuery.data?.estado_vital,
      cierre_del_caso: seguimientoQuery.data?.cierre_del_caso,
      tiene_consulta_nueva: seguimientoQuery.data?.tiene_consulta_nueva,
      tiene_examenes: seguimientoQuery.data?.tiene_examenes,
      tiene_comite_oncologico: seguimientoQuery.data?.tiene_comite_oncologico,
      tiene_tratamiento: seguimientoQuery.data?.tiene_tratamiento,
      new_entries: [] as { entry_type: string; entry_content: any }[],
      updated_entries: [],
      deleted_entries: [],
    };
    axiosClient
      .put(
        `http://localhost:8000/seguimiento/sign/${seguimientoId}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Manejar la respuesta de la petición aquí
        setNewEntries([]);
        window.location.href = `/`;
      })
      .catch((error) => {
        // Manejar el error de la petición aquí
      });
  }

  async function updateSeguimiento(formData: SeguimientoForm) {
    const seguimientoId = seguimientoQuery.data?.id;
    console.log("data entregado", formData);
    console.log(
      "data clase caso:",
      formData.caso_registro_correspondiente.clase_caso
        ? formData.caso_registro_correspondiente.clase_caso
        : seguimientoQuery.data?.validacion_clase_caso
    );
    console.log(
      "data ultimo_contacto:",
      formData.ultimo_contacto
        ? typeof formData.ultimo_contacto === "string"
          ? formData.ultimo_contacto
          : fns.format(formData.ultimo_contacto as Date, "yyyy-MM-dd")
        : seguimientoQuery.data?.ultimo_contacto
    );
    console.log(
      "data estado vital:",
      formData.estado_vital
        ? formData.estado_vital
        : seguimientoQuery.data?.estado_vital
    );
    const estado_vital = formData.estado_vital
      ? formData.estado_vital
      : seguimientoQuery.data?.estado_vital;
    const requestBody = {
      id: seguimientoId,
      caso_registro_id: caso?.id,
      state: seguimientoQuery.data?.state,
      numero_seguimiento: seguimientoQuery.data?.numero_seguimiento,
      validacion_clase_caso: formData.caso_registro_correspondiente.clase_caso
        ? formData.caso_registro_correspondiente.clase_caso
        : seguimientoQuery.data?.validacion_clase_caso,
      posee_recurrencia: seguimientoQuery.data?.posee_recurrencia,
      posee_progresion: seguimientoQuery.data?.posee_progresion,
      posee_metastasis: seguimientoQuery.data?.posee_metastasis,
      posee_tto: seguimientoQuery.data?.posee_tto,
      condicion_del_caso: formData.condicion_del_caso
        ? formData.condicion_del_caso
        : seguimientoQuery.data?.condicion_del_caso,
      ultimo_contacto: formData.ultimo_contacto
        ? typeof formData.ultimo_contacto === "string"
          ? formData.ultimo_contacto
          : fns.format(formData.ultimo_contacto as Date, "yyyy-MM-dd")
        : seguimientoQuery.data?.ultimo_contacto,
      causa_defuncion:
        formData.causa_defuncion && estado_vital === "Muerto"
          ? formData.causa_defuncion
          : null,
      fecha_defuncion:
        formData.fecha_defuncion && estado_vital === "Muerto"
          ? typeof formData.fecha_defuncion === "string"
            ? formData.fecha_defuncion
            : fns.format(formData.fecha_defuncion as Date, "yyyy-MM-dd")
          : null,
      //sigue_atencion_otro_centro: formData.sigue_atencion_otro_centro,  //OJO NO ESTA EN EL Modelo de datos
      //fecha_estimada: formData.fecha_estimada,  //OJO NO ESTA EN EL MODELO DE DATOS
      estado_vital: estado_vital,
      cierre_del_caso: seguimientoQuery.data?.cierre_del_caso,
      tiene_consulta_nueva: seguimientoQuery.data?.tiene_consulta_nueva,
      tiene_examenes: seguimientoQuery.data?.tiene_examenes,
      tiene_comite_oncologico: seguimientoQuery.data?.tiene_comite_oncologico,
      tiene_tratamiento: seguimientoQuery.data?.tiene_tratamiento,
      new_entries: [] as { entry_type: string; entry_content: any }[],
      updated_entries: [],
      deleted_entries: [],
    };
    // Construir new_entries

    for (const newEntry of newEntries) {
      requestBody.new_entries.push(newEntry);
    }

    // Realizar la petición PUT a la API
    axiosClient
      .put(
        `http://localhost:8000/seguimiento/save/${seguimientoId}`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        // Manejar la respuesta de la petición aquí
        setNewEntries([]);
      })
      .catch((error) => {
        // Manejar el error de la petición aquí
      });
  }

  const form = useForm({
    defaultValues: seguimientoQuery.data,
  });
  const { register, watch, handleSubmit, formState, control } = form;

  const queryClient = useQueryClient();
  const saveMutation = useMutation(
    async () => {
      await updateSeguimiento(form.getValues());
      await sleep(500);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["seguimiento", seguimientoId]);
      },
    }
  );

  const headerHeight = 251;
  const handleSectionSelect = (value: { id: string; name: string }) => {
    const element = document.getElementById(value.id);
    element?.scrollIntoView({
      behavior: "auto",
    });
    window.scroll(0, window.scrollY - headerHeight);
    setSelectedSection(value);
  };

  const onSubmit = (data: any) => {
    // subimos a la api,,,
    updateSeguimiento(data);
    //ahora guardar
    //o cerrar (sign)
    if (seguimientoQuery.data?.id) {
      closeSeguimiento(seguimientoQuery.data?.id);
    }

    console.log(data);
  };

  console.log("watch: ", watch());
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
                              seguimientoQuery?.data?.numero_seguimiento?.toString() ||
                              ""
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
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <MetastasisSection />
                  <RecurrenciaSection />
                  <ProgresionSection />
                  <ComiteSection />
                  <TratamientoSection />
                  <ValidacionSection />
                  <div className="flex justify-around">
                    <SignModal />
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
