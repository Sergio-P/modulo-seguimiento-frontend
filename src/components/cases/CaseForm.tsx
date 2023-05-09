import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useMemo, useState } from "react";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import SelectInput from "../ui/SelectInput";
import DatePicker from "../ui/DatePicker";
import Modal from "../ui/Modal";
import TextInput from "../ui/TextInput";
import MetastasisList from "./CaseForm/MetastasisList";
import RecurrenciaList from "./CaseForm/RecurrenciaList";
import ProgresionList from "./CaseForm/ProgresionList";
import TratamientoList from "./CaseForm/TratamientoList";
import MainLayout from "../ui/layout/MainLayout";
import Section from "../ui/layout/Section";
import BoundingBox from "../ui/layout/BoundingBox";
import Link from "next/link";
import { useQuery } from "react-query";
import { Seguimiento } from "@/types/Seguimiento";
import { EstadoVital } from "@/types/Enums";
import { VscSave } from "react-icons/vsc";
import { Metastasis } from "@/types/Metastasis";
import * as fns from "date-fns";
import { set } from "lodash";

interface CaseFormProps {
  caseId: string;
}

const sections = [
  { id: "diagnostico", name: "Diagnóstico" },
  { id: "morfologia", name: "Morfología y Topografía" },
  { id: "lateralidad", name: "Lateralidad y Estadío" },
  { id: "metastasis", name: "Metástasis" },
  { id: "recurrencia", name: "Recurrencia" },
  { id: "progresion", name: "Progresión" },
  { id: "tratamiento", name: "Tratamiento" },
  { id: "estadovital", name: "Estado Vital" },
];
/*
          <Section id="recurrencia" title="Recurrencia">
            <SubSection title="Datos Complementarios">ola</SubSection>
          </Section>
          <Section id="progresion" title="Progresión">
            <SubSection title="Datos Complementarios">ola</SubSection>
          </Section>
          <Section id="antecedentes" title="Antecedentes tratamiento ">
            <SubSection title="Datos Complementarios">ola</SubSection>
          </Section>
          <Section id="lateralidad" title="Lateralidad y Estadío">
            <SubSection title="Datos Complementarios">ola</SubSection>
          </Section>
          */

interface SeguimientoForm extends Seguimiento {}

export default function CaseForm(props: CaseFormProps) {
  const { caseId: seguimientoId } = props;
  const seguimientoQuery = useQuery<Seguimiento>({
    queryKey: ["seguimiento", seguimientoId],
    queryFn: () =>
      fetch(`http://localhost:8000/seguimiento/${seguimientoId}`).then((res) =>
        res.json()
      ),
  });
  const caso = useMemo(
    () => seguimientoQuery.data?.caso_registro_correspondiente,
    [seguimientoQuery.data]
  );

  async function closeSeguimiento(seguimientoId: number) {
    const response = await fetch(`http://localhost:8000/seguimiento/close/${seguimientoId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }

  async function saveNewMetastasis(metastasisList: any[]){
    for (const metastasis of metastasisList) {
      fetch(`http://localhost:8000/metastasis/?caso_registro_id=${metastasis.caso_registro_id}&seguimiento_id=${metastasis.seguimiento_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha_diagnostico: fns.format(metastasis.fecha_diagnostico, 'yyyy-MM-dd'),
          fecha_estimada: metastasis.fecha_estimada,
          detalle_topografia: metastasis.detalle_topografia,
        }),
      })
        .then((response) => {
          // Manejar la respuesta de la petición aquí
        })
        .catch((error) => {
          // Manejar el error de la petición aquí
        });
    }
    setNewMetastasisList([]);
  }

  async function saveNewRecurrencia(recurrenciaList: any[]){
    for (const recurrencia of recurrenciaList) {
      fetch(`http://localhost:8000/recurrencia/?caso_registro_id=${recurrencia.caso_registro_id}&seguimiento_id=${recurrencia.seguimiento_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha_diagnostico: fns.format(recurrencia.fecha_diagnostico, 'yyyy-MM-dd'),
          fecha_estimada: recurrencia.fecha_estimada,
          tipo: recurrencia.tipo,
          detalle_topografia_recurrencia: recurrencia.detalle_topografia_recurrencia,
        }),
      })
        .then((response) => {
          // Manejar la respuesta de la petición aquí
        })
        .catch((error) => {
          // Manejar el error de la petición aquí
        });
    }
    setNewRecurrenciaList([]);
  }

  async function saveNewProgresion(progresionList: any[]){
    for (const progresion of progresionList) {
      fetch(`http://localhost:8000/progresion/?caso_registro_id=${progresion.caso_registro_id}&caso_seguimiento_id=${progresion.seguimiento_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha_diagnostico: fns.format(progresion.fecha_diagnostico, 'yyyy-MM-dd'),
          fecha_estimada: progresion.fecha_estimada,
          tipo: progresion.tipo,
          detalle_topografia_progresion: progresion.detalle_topografia_progresion,
        }),
      })
        .then((response) => {
          // Manejar la respuesta de la petición aquí
        })
        .catch((error) => {
          // Manejar el error de la petición aquí
        });
    }
    setNewProgresionList([]);
  }

  async function saveNewTratamientoEnFalp(tratamientoList: any[]){
    for (const tratamiento of tratamientoList) {
      fetch(`http://localhost:8000/tratamiento/en_falp?caso_registro_id=${tratamiento.caso_registro_id}&seguimiento_id=${tratamiento.seguimiento_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          medico: tratamiento.medico,
          fecha_de_inicio: fns.format(tratamiento.fecha_inicio, 'yyyy-MM-dd'),
          fecha_de_termino: fns.format(tratamiento.fecha_termino, 'yyyy-MM-dd'),
          en_tto: tratamiento.en_tto,
          categoria_tto: tratamiento.categoria_tto,
          subcategoria_tto: tratamiento.subcategoria_tto,
          intencion_tto: tratamiento.intencion_tto,
          observaciones: tratamiento.observaciones,
        }),
      })
        .then((response) => {
          // Manejar la respuesta de la petición aquí
        })
        .catch((error) => {
          // Manejar el error de la petición aquí
        });
    }
    setNewTratamientoList([]);
  }

  const [newMetastasisList, setNewMetastasisList] = useState<any[]>([]);
  const [newRecurrenciaList, setNewRecurrenciaList] = useState([]);
  const [newProgresionList, setNewProgresionList] = useState([]);
  const [newTratamientoList, setNewTratamientoList] = useState([]);
  const [selectedSection, setSelectedSection] = useState(sections[0]);
  const form = useForm({
    defaultValues: seguimientoQuery.data,
  });
  const { register, watch, handleSubmit, formState, control } = form;
  const tieneMetastasis: boolean = useWatch({
    control,
    name: "posee_metastasis",
    defaultValue: false,
  });
  const tieneRecurrencia: boolean = useWatch({
    control,
    name: "posee_recurrencia",
    defaultValue: false,
  });
  const tieneProgresion: boolean = useWatch({
    control,
    name: "posee_progresion",
    defaultValue: false,
  });

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
    // manejamos también newMetastasisList añadiendola a new_entries
    if (seguimientoQuery.data?.id){
      closeSeguimiento(seguimientoQuery.data?.id).then((response) => {
        // Aquí puedes realizar cualquier acción que desees después de que la petición PATCH tenga éxito, como actualizar la lista de seguimientos.
      });
    }
    saveNewMetastasis(newMetastasisList);
    saveNewRecurrencia(newRecurrenciaList);
    saveNewProgresion(newProgresionList);
    saveNewTratamientoEnFalp(newTratamientoList);


    console.log(data);
    
    // fetch() a la API para subir seguimientos
    // finalmente una redireccion de vuelta a la lista de seguimientos
  };
  console.log(watch());
  return (
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
                  <Button icon="FileIcon" className="mr-6">
                    Historial
                  </Button>
                  <Link href="../../">
                    <Button icon="GeoLocate" filled>
                      Seguimientos
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mt-8 pb-7">
                <BoundingBox>
                  <div className="flex items-center justify-between">
                    <h2 className="flex-none text-2xl font-bold">
                      {caso?.nombre} {caso?.apellido}
                    </h2>
                    <Foo label={"RUT"} value={caso?.rut_dni || ""} />
                    <Foo label={"Registro"} value={caso?.num_registro || ""} />
                    <Foo label={"Ficha"} value={caso?.ficha.toString() || ""} />
                    <div className="flex justify-between gap-4">
                      <Button icon="2cuadrados" filled />
                      <Button icon="chatbubble" filled />
                    </div>
                  </div>
                </BoundingBox>
              </div>
            </div>

            <form
              className="mb-7 flex flex-col gap-7"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Section id="diagnostico" title="Diagnóstico">
                <SubSection title="Antecedentes"></SubSection>
                <div className="grid max-w-5xl grid-cols-3 gap-8">
                  <Controller
                    name="caso_registro_correspondiente.categoria"
                    control={control}
                    defaultValue={"Tiroides"}
                    render={({ field }) => (
                      <SelectInput
                        label={"Categoría"}
                        disabled={true}
                        options={[
                          { id: 1, name: "Tiroides" },
                          { id: 2, name: "Hola" },
                        ]}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="caso_registro_correspondiente.subcategoria"
                    control={control}
                    defaultValue={"Glandula Tiroides"}
                    render={({ field }) => (
                      <SelectInput
                        label={"Subcategoría"}
                        disabled={true}
                        options={[
                          { id: 1, name: "Glandula Tiroides" },
                          { id: 2, name: "Chao" },
                        ]}
                        {...field}
                      />
                    )}
                  />
                </div>
                <Separator />
                <SubSection title="Validación">
                  <div className="grid max-w-5xl grid-cols-3 gap-8">
                    <Controller
                      name="caso_registro_correspondiente.fecha_dg"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          label="Fecha Diagnóstico"
                          disabled={true}
                          defaultValue={
                            caso?.fecha_dg
                              ? new Date(caso.fecha_dg)
                              : new Date()
                          }
                          {...field}
                        />
                      )}
                    />

                    <Controller
                      name="caso_registro_correspondiente.fecha_lugar_obtencion_dg"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          disabled={true}
                          defaultValue={
                            caso?.fecha_lugar_obtencion_dg
                              ? new Date(caso.fecha_lugar_obtencion_dg)
                              : new Date()
                          }
                          label="Fecha Lugar Obtención Diagnóstico"
                          {...field}
                        />
                      )}
                    />
                    <div className="flex items-center">
                      <Checkbox
                        className="col-start-3"
                        {...register(
                          "caso_registro_correspondiente.fecha_estimada_dg"
                        )}
                        disabled={true}
                        label="Fecha estimada"
                      />
                    </div>
                    <Controller
                      name="caso_registro_correspondiente.lugar_obtencion_dg"
                      control={control}
                      defaultValue={"Informe Anatomía Patológica"}
                      render={({ field }) => (
                        <SelectInput
                          label={"Lugar Obtención Diagnóstico"}
                          disabled={true}
                          options={[
                            { id: 1, name: "Informe Anatomía Patológica" },
                            { id: 2, name: "Otro" },
                          ]}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </SubSection>
              </Section>
              <Section id="morfologia" title="Morfología y Topografía">
                <Checkbox
                  {...register(
                    "caso_registro_correspondiente.sin_informacion_morfologia"
                  )}
                  label="Sin información"
                  disabled={true}
                />
                <SubSection title="Datos Morfología"></SubSection>
                <div className="grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
                  <Controller
                    name="caso_registro_correspondiente.morfologia"
                    control={control}
                    defaultValue={"(8260/3) Adenocarcinoma Papilar, Sai"}
                    render={({ field }) => (
                      <div className="col-span-1 lg:col-span-2">
                        <SelectInput
                          label={"Morfología"}
                          disabled={true}
                          options={[
                            {
                              id: 1,
                              name: "(8260/3) Adenocarcinoma Papilar, Sai",
                            },
                            { id: 2, name: "Opción 2" },
                          ]}
                          {...field}
                        />
                      </div>
                    )}
                  />
                  <Controller
                    name="caso_registro_correspondiente.grado_diferenciacion"
                    control={control}
                    defaultValue={"Desconocido"}
                    render={({ field }) => (
                      <SelectInput
                        label={"Grado Diferenciación"}
                        disabled={true}
                        options={[
                          { id: 1, name: "Desconocido" },
                          { id: 2, name: "Conocido" },
                        ]}
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    name="caso_registro_correspondiente.lugar_obtencion_morfologia"
                    control={control}
                    defaultValue={"Informe Anatomía Patológica"}
                    render={({ field }) => (
                      <SelectInput
                        label={"Lugar Obtención Diagnóstico"}
                        disabled={true}
                        options={[
                          { id: 1, name: "Informe Anatomía Patológica" },
                          { id: 2, name: "No c" },
                        ]}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="caso_registro_correspondiente.fecha_lugar_obtencion_morfologia"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Fecha Lugar Obtención Diagnóstico"
                        defaultValue={
                          caso?.fecha_lugar_obtencion_morfologia
                            ? new Date(caso.fecha_lugar_obtencion_morfologia)
                            : new Date()
                        }
                        disabled={true}
                        {...field}
                      />
                    )}
                  />
                </div>
                <Separator />
                <SubSection title="Datos Topografía"></SubSection>
                <div className="grid max-w-5xl grid-cols-3 gap-8">
                  <Controller
                    name="caso_registro_correspondiente.topografia"
                    control={control}
                    defaultValue={"(8260/3) Adenocarcinoma Papilar, Sai"}
                    render={({ field }) => (
                      <div className="col-span-2">
                        <SelectInput
                          label={"Topografía"}
                          disabled={true}
                          options={[
                            {
                              id: 1,
                              name: "(8260/3) Adenocarcinoma Papilar, Sai",
                            },
                            { id: 2, name: "Opción 2" },
                          ]}
                          {...field}
                        />
                      </div>
                    )}
                  />
                  <Controller
                    name="caso_registro_correspondiente.lugar_obtencion_topografia"
                    control={control}
                    defaultValue={"Informe Anatomía Patológica"}
                    render={({ field }) => (
                      <div className="col-start-1">
                        <SelectInput
                          label={"Lugar Obtención Diagnóstico"}
                          disabled={true}
                          options={[
                            { id: 1, name: "Informe Anatomía Patológica" },
                            { id: 2, name: "No c" },
                          ]}
                          {...field}
                        />
                      </div>
                    )}
                  />
                  <Controller
                    name="caso_registro_correspondiente.fecha_lugar_obtencion_dg"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Fecha Lugar Obtención Diagnóstico"
                        defaultValue={
                          caso?.fecha_lugar_obtencion_topografia
                            ? new Date(caso.fecha_lugar_obtencion_topografia)
                            : new Date()
                        }
                        disabled={true}
                        {...field}
                      />
                    )}
                  />
                </div>
              </Section>
              <Section id="lateralidad" title="Lateralidad y Estadío">
                <SubSection title="Datos Complementarios">
                  <div className="grid max-w-5xl grid-cols-3 gap-8">
                    <Controller
                      name="caso_registro_correspondiente.lateralidad"
                      control={control}
                      defaultValue={"No aplica"}
                      render={({ field }) => (
                        <SelectInput
                          label={"Lateralidad"}
                          disabled={true}
                          options={[
                            { id: 1, name: "Tiroides" },
                            { id: 2, name: "Hola" },
                          ]}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="caso_registro_correspondiente.comportamiento"
                      control={control}
                      defaultValue={"Neoplasias malignas de locali"}
                      render={({ field }) => (
                        <SelectInput
                          label={"Comportamiento"}
                          disabled={true}
                          options={[
                            { id: 1, name: "Neoplasias malignas de locali" },
                            { id: 2, name: "Chao" },
                          ]}
                          {...field}
                        />
                      )}
                    />
                    <Controller
                      name="caso_registro_correspondiente.extension_dg"
                      control={control}
                      defaultValue={"Regional"}
                      render={({ field }) => (
                        <div className="col-start-1">
                          <SelectInput
                            label={"Extension Diagnostico"}
                            disabled={true}
                            options={[
                              { id: 1, name: "Regional" },
                              { id: 2, name: "Hola" },
                            ]}
                            {...field}
                          />
                        </div>
                      )}
                    />
                    <Controller
                      name="caso_registro_correspondiente.estadio_dg"
                      control={control}
                      defaultValue={"Desconocido"}
                      render={({ field }) => (
                        <SelectInput
                          label={"Estadio Diagnostico"}
                          disabled={true}
                          options={[
                            { id: 1, name: "Desconocido" },
                            { id: 2, name: "Chao" },
                          ]}
                          {...field}
                        />
                      )}
                    />
                  </div>
                </SubSection>
              </Section>
              <Section id="metastasis" title="Metástasis">
                <SubSection>
                  <div className="flex justify-between">
                    <Checkbox
                      {...register("posee_metastasis")}
                      label="Presenta Metástasis"
                    />
                    <Modal
                      type="button"
                      disabled={!tieneMetastasis}
                      metastasis={true}
                      icon="plus"
                      filled
                      seguimiento={seguimientoQuery.data}
                      setNewMetastasisList={setNewMetastasisList}
                    >
                      Agregar Metastasis
                    </Modal>
                  </div>

                  <div className="mt-5">
                    <MetastasisList
                      elements={
                        caso?.metastasis
                          ? [...caso.metastasis, ...newMetastasisList]
                          : newMetastasisList
                      }
                    />
                  </div>
                </SubSection>
              </Section>
              <Section id="recurrencia" title="Recurrencia">
                <SubSection>
                  <div className="flex justify-between">
                    <Checkbox
                      {...register("posee_recurrencia")}
                      label="Presenta recurrencia"
                    />
                    <Modal
                      type="button"
                      disabled={!tieneRecurrencia}
                      recurrencia={true}
                      icon="plus"
                      seguimiento={seguimientoQuery.data}
                      filled
                      setNewRecurrenciaList={setNewRecurrenciaList}
                    >
                      Agregar Recurrencia
                    </Modal>
                  </div>
                </SubSection>
                <div className="mt-5">
                  <RecurrenciaList
                    elements={
                      caso?.recurrencias
                        ? [...caso.recurrencias, ...newRecurrenciaList]
                        : newMetastasisList
                      }
                  />
                </div>
              </Section>
              <Section id="progresion" title="Progresión">
                <SubSection>
                  <div className="flex justify-between">
                    <Checkbox
                      {...register("posee_progresion")}
                      label="Presenta progresión"
                    />
                    <Modal
                      type="button"
                      disabled={!tieneProgresion}
                      progresion={true}
                      icon="plus"
                      seguimiento={seguimientoQuery.data}
                      filled
                      setNewProgresionList={setNewProgresionList}
                    >
                      Agregar Progresión
                    </Modal>
                  </div>
                </SubSection>
                <div className="mt-5">
                  <ProgresionList
                    elements={
                      caso?.progresiones 
                      ? [...caso.progresiones, ...newProgresionList]
                      : newProgresionList
                    }
                  />
                </div>
              </Section>
              <Section id="tratamiento" title="Antecedentes Tratamiento">
                <SubSection title="Configuración"></SubSection>
                <div className="grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
                  <Controller
                    name="caso_registro_correspondiente.clase_caso"
                    control={control}
                    defaultValue={"Diagnóstico y tratamiento en FALP"}
                    render={({ field }) => (
                      <div className="col-span-2">
                        <SelectInput
                          label={"Clase Caso"}
                          disabled={true}
                          options={[
                            {
                              id: 1,
                              name: "Diagnóstico y tratamiento en FALP",
                            },
                            { id: 2, name: "Tratamiento en FALP" },
                            { id: 3, name: "Diagnóstico en FALP" },
                          ]}
                          {...field}
                        />
                      </div>
                    )}
                  />
                  <Controller
                    name="caso_registro_correspondiente.clasificacion_dg_ttos"
                    control={control}
                    defaultValue={"Informe Anatomía Patológica"}
                    render={({ field }) => (
                      <SelectInput
                        label={"Clasificación DG/TTOS."}
                        disabled={true}
                        options={[
                          { id: 1, name: "Cirugía o procedimiento quirúrgico" },
                          { id: 2, name: "Terapia sistémica" },
                          { id: 3, name: "Radioterapia" },
                          { id: 4, name: "Otro" },
                        ]}
                        {...field}
                      />
                    )}
                  />
                </div>
                <Separator />
                <SubSection title="">
                  <div className="grid max-w-5xl grid-cols-1 items-center gap-8 lg:grid-cols-3">
                    <div>
                      <SelectInput
                        label={"Agregar Tratamiento"}
                        options={[
                          { id: 1, name: "Tratamiento En FALP" },
                          { id: 2, name: "Tratamiento Post/Durante FALP" },
                        ]}
                      />
                    </div>
                    <Modal
                      type="button"
                      className="max-w-[115px]"
                      tratamiento={true}
                      icon="plus"
                      seguimiento={seguimientoQuery.data}
                      filled
                      setNewTratamientoList={setNewTratamientoList}
                    >
                      Agregar
                    </Modal>
                  </div>
                  <div className="mt-5">
                    <TratamientoList
                      elements={
                        caso?.tratamientos_en_falp
                          ? [...caso.tratamientos_en_falp, ...newTratamientoList]
                          : newTratamientoList
                      }
                    />
                  </div>
                </SubSection>
              </Section>
              <Section id="estadovital" title="Antecedentes Estado Vital">
                <SubSection title="Último Contacto"></SubSection>
                <div className="grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
                  <div>
                    <Controller
                      name="ultimo_contacto"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          defaultValue={
                            caso?.ultimo_contacto
                              ? new Date(caso.ultimo_contacto)
                              : new Date()
                          }
                          label="Último Contacto"
                          {...field}
                        />
                      )}
                    />
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      {...register(
                        "caso_registro_correspondiente.sigue_atencion_otro_centro"
                      )}
                      label="Seguimiento otro centro"
                    />
                  </div>
                </div>
                <Separator />
                <SubSection title="Estado Vital"></SubSection>
                <div className="grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
                  <Controller
                    name="condicion_del_caso"
                    control={control}
                    render={({ field }) => (
                      <SelectInput
                        label="Condición del Caso"
                        options={[
                          { id: 1, name: "Vivo sin enfermedad" },
                          { id: 2, name: "Vivo con enfermedad" },
                          { id: 3, name: "Vivo SOE" },
                          { id: 4, name: "Desconocido" },
                          { id: 5, name: "Fallecido" },
                        ]}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="estado_vital"
                    control={control}
                    render={({ field }) => (
                      <SelectInput
                        label="Estado Vital"
                        options={[
                          { id: 1, name: "Vivo" },
                          { id: 2, name: "Muerto" },
                        ]}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="causa_defuncion"
                    control={control}
                    defaultValue={"Causa Defunción"}
                    render={({ field }) => (
                      <div className="col-start-1">
                        <SelectInput
                          label="Causa Defunción"
                          options={[
                            { id: 1, name: "Muerte por cáncer o complicación" },
                            { id: 2, name: "Muerte por otra causa" },
                            { id: 3, name: "Desconocido" },
                          ]}
                          {...field}
                        />
                      </div>
                    )}
                  />
                  <Controller
                    name="fecha_defuncion"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        label="Fecha Defunción"
                        defaultValue={
                          caso?.fecha_defuncion
                            ? new Date(caso.fecha_defuncion)
                            : new Date()
                        }
                        {...field}
                      />
                    )}
                  />
                  <div className="flex items-center">
                    <Checkbox label="Estimada" />
                  </div>
                </div>
              </Section>
              <div className="flex justify-around">
                {/* <Button type="submit" filled className="w-1/7">
                  Guardar
                </Button> */}
                {/* TODO: Make real submit save button */}
                <Button filled type="submit">Cerrar Seguimiento</Button>
                <Link href="../../">
                  <Button filled>Guardar Falso</Button>
                </Link>
              </div>
            </form>
          </>
        )}
        <div className="h-screen" />
      </MainLayout>
    </FormProvider>
  );
}

function Foo(props: { label: string; value: string }) {
  const { label, value } = props;
  return (
    <div className="flex gap-1">
      <div className="font-bold">{label}: </div>{" "}
      <div className="font-bold">{value}</div>
    </div>
  );
}

function SubSection(props: { title?: string } & React.PropsWithChildren) {
  return (
    <>
      <h3 className="mt-5 mb-8 text-xl font-bold text-font-title">
        {props.title}
      </h3>
      {props.children}
    </>
  );
}

function Separator() {
  return <div className="mt-6 h-[1px] w-full bg-zinc-400"></div>;
}
