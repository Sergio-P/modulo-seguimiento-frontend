import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
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
import MainLayout from "../ui/layout/MainLayout";
import Section from "../ui/layout/Section";
import BoundingBox from "../ui/layout/BoundingBox";
import Link from "next/link";

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

export default function CaseForm(props: CaseFormProps) {
  const { caseId } = props;
  const data = {
    patient: {
      rut: "10.233.456-8",
      name: "Marcelo Donoso R.",
      registro: "0000000",
      ficha: "094321223",
    },
  };
  const [selectedSection, setSelectedSection] = useState(sections[0]);
  const form = useForm();
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
    console.log(data);
  };
  console.log(watch());
  return (
    <FormProvider {...form}>
      <MainLayout>
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
              <Button icon="GeoLocate" filled>
                Seguimientos
              </Button>
            </div>
          </div>
          <div className="mt-8 pb-7">
            <BoundingBox>
              <div className="flex items-center justify-between">
                <h2 className="flex-none text-2xl font-bold">
                  {data.patient.name}
                </h2>
                <Foo label={"RUT"} value={data.patient.rut} />
                <Foo label={"Registro"} value={data.patient.registro} />
                <Foo label={"Ficha"} value={data.patient.ficha} />
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
          <Section id="ejemplos" title="Ejemplos" hidden={false}>
            <Controller
              name="example-select"
              control={control}
              defaultValue={"ola"}
              render={({ field }) => (
                <SelectInput options={["ola", "wi"]} {...field} />
              )}
            />
            <Controller
              name="disabled-select"
              control={control}
              defaultValue={"disabled"}
              render={({ field }) => (
                <SelectInput
                  disabled={true}
                  options={["test disabled", "esto no deberia verse"]}
                  {...field}
                />
              )}
            />
            <Checkbox
              disabled={true}
              {...register("example-checkbox1")}
              label="Checkbox disabled"
            />
            <Checkbox
              {...register("example-checkbox2")}
              label="Checkbox con label"
            />
            <Controller
              name="example-date"
              control={control}
              render={({ field }) => (
                <DatePicker label="Fecha ejemplo :0" {...field} />
              )}
            />
            <DatePicker disabled={true} label="Fecha ejemplo :0" />
            <Button disabled={true} icon="FileIcon" className="mr-6">
              Ejemplo
            </Button>
            <Modal disabled={false} metastasis={true} icon="plus" filled>
              Agregar Metastasis
            </Modal>
            <Controller
              name="example-textinput"
              control={control}
              render={({ field }) => <TextInput label="ejemplo"></TextInput>}
            />
          </Section>
          <Section id="diagnostico" title="Diagnóstico">
            <SubSection title="Antecedentes"></SubSection>
            <div className="grid max-w-5xl grid-cols-3 gap-8">
              <Controller
                name="categoria"
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
                name="subcategoria"
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
                  name="fecha_dg"
                  control={control}
                  render={({ field }) => (
                    <DatePicker label="Fecha Diagnóstico" {...field} />
                  )}
                />

                <Controller
                  name="fecha_lugar_obtencion_dg"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      label="Fecha Lugar Obtención Diagnóstico"
                      {...field}
                    />
                  )}
                />
                <div className="flex items-center">
                  <Checkbox
                    className="col-start-3"
                    {...register("fecha_estimada_dg")}
                    label="Fecha estimada"
                  />
                </div>
                <Controller
                  name="lugar_obtencion_dg"
                  control={control}
                  defaultValue={"Informe Anatomía Patológica"}
                  render={({ field }) => (
                    <SelectInput
                      label={"Lugar Obtención Diagnóstico"}
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
              {...register("sin_informacion_morfologia")}
              label="Sin información"
              disabled={true}
            />
            <SubSection title="Datos Morfología"></SubSection>
            <div className="grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
              <Controller
                name="morfologia"
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
                name="grado_diferenciacion"
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
                name="lugar_obtencion_morfologia"
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
                name="fecha_lugar_obtencion_morfologia"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Fecha Lugar Obtención Diagnóstico"
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
                name="topografia"
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
                name="lugar_obtencion_topografia"
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
                name="fecha_lugar_obtencion_topografia"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    label="Fecha Lugar Obtención Diagnóstico"
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
                  name="lateralidad"
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
                  name="comportamiento"
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
                  name="extension_dg"
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
                  name="estadio_dg"
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
                  disabled={!tieneMetastasis}
                  metastasis={true}
                  icon="plus"
                  filled
                >
                  Agregar Metastasis
                </Modal>
              </div>

              <div className="mt-5">
                <MetastasisList />
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
                  disabled={!tieneRecurrencia}
                  recurrencia={true}
                  icon="plus"
                  filled
                >
                  Agregar Recurrencia
                </Modal>
              </div>
            </SubSection>
            <div className="mt-5">
              <RecurrenciaList />
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
                  disabled={!tieneProgresion}
                  progresion={true}
                  icon="plus"
                  filled
                >
                  Agregar Progresión
                </Modal>
              </div>
            </SubSection>
            <div className="mt-5">
              <ProgresionList />
            </div>
          </Section>
          <Section
            id="tratamiento"
            title="Antecedentes Tratamiento (Estado XXX)"
          >
            <SubSection title="Configuración"></SubSection>
            <div className="grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
              <Controller
                name="clase_caso"
                control={control}
                defaultValue={"Diagnóstico y tratamiento en FALP"}
                render={({ field }) => (
                  <div className="col-span-2">
                    <SelectInput
                      label={"Clase Caso"}
                      options={[
                        { id: 1, name: "Diagnóstico y tratamiento en FALP" },
                        { id: 2, name: "Tratamiento en FALP" },
                        { id: 3, name: "Diagnóstico en FALP" },
                      ]}
                      {...field}
                    />
                  </div>
                )}
              />
              <Controller
                name="clasificacion_dg_ttos"
                control={control}
                defaultValue={"Informe Anatomía Patológica"}
                render={({ field }) => (
                  <SelectInput
                    label={"Clasificación DG/TTOS."}
                    options={[
                      { id: 1, name: "Informe Anatomía Patológica" },
                      { id: 2, name: "Otro" },
                    ]}
                    {...field}
                  />
                )}
              />
            </div>
            <SubSection title="Lista de Tratamientos">
              <div className="grid max-w-5xl grid-cols-1 items-center gap-8 lg:grid-cols-3">
                <div>
                  <Controller
                    name="AgregarTratamiento"
                    control={control}
                    defaultValue={"Informe Anatomía Patológica"}
                    render={({ field }) => (
                      <SelectInput
                        label={"Agregar Tratamiento"}
                        options={[
                          { id: 1, name: "Cosa" },
                          { id: 2, name: "No c" },
                        ]}
                        {...field}
                      />
                    )}
                  />
                </div>
                <Modal
                  className="max-w-[115px]"
                  tratamiento={true}
                  icon="plus"
                  filled
                >
                  Agregar
                </Modal>
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
                      disabled={true}
                      label="Último Contacto"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="flex items-center">
                <Checkbox
                  {...register("sigue_atencion_otro_centro")}
                  label="Seguimiento otro centro"
                  disabled={true}
                />
              </div>
            </div>
            <Separator />
            <SubSection title="Estado Vital"></SubSection>
            <div className="grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
              <Controller
                name="estado_vital"
                control={control}
                defaultValue={"Fallecido"}
                render={({ field }) => (
                  <SelectInput
                    options={[
                      { id: 1, name: "Fallecido" },
                      { id: 2, name: "Vivo sin enfermedad" },
                      { id: 3, name: "Vivo con enfermedad" },
                      { id: 4, name: "Vivo SOE" },
                      { id: 5, name: "Desconocido" },
                    ]}
                    {...field}
                  />
                )}
              />
              <Controller
                name="fecha_defuncion"
                control={control}
                render={({ field }) => (
                  <DatePicker label="Fecha Defunción" {...field} />
                )}
              />
              <div className="flex items-center">
                <Checkbox
                  {...register("EstadoVital-checkbox")}
                  label="Estimada"
                />
              </div>
              <Controller
                name="causa_defuncion"
                control={control}
                defaultValue={"Causa Defunción"}
                render={({ field }) => (
                  <div className="col-start-1">
                    <SelectInput
                      options={[
                        { id: 1, name: "Causa Defunción" },
                        { id: 2, name: "Si" },
                      ]}
                      {...field}
                    />
                  </div>
                )}
              />
            </div>
            <div className="grid max-w-5xl grid-cols-1 gap-8 pt-8 lg:grid-cols-3">
              <div className="col-span-2">
                <TextInput label="Observaciones" />
              </div>
            </div>
          </Section>
          <input type="submit" />
        </form>

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
