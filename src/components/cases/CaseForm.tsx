import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import SelectInput from "../ui/SelectInput";

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
  const { register, watch, handleSubmit, formState, control } = useForm();

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
    <div className="min-h-screen bg-zinc-300">
      <div className="container mx-auto min-h-screen bg-white">
        <div className="sticky top-0 z-10 bg-white">
          <div className="flex items-center justify-between gap-7 border-b px-5 pt-6 pb-5">
            <h1 className="text-4xl font-bold text-font-title">
              Seguimiento de Casos
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
          <Section id="ejemplos" title="Ejemplos">
            <Controller
              name="select-example"
              control={control}
              defaultValue={"ola"}
              render={({ field }) => (
                <SelectInput options={["ola", "wi"]} {...field} />
              )}
            />
            <Checkbox {...register("checkbox1")} />
            <Checkbox {...register("checkbox2")} label="Checkbox con label" />
          </Section>
          <Section id="diagnostico" title="Diagnóstico">
            <SubSection title="Antecedentes">ola</SubSection>
            <Separator />
            <SubSection title="Validación">ola</SubSection>
          </Section>
          <Section id="morfologia" title="Morfología y Topografía">
            <SubSection title="Datos Morfología">ola</SubSection>
            <Separator />
            <SubSection title="Datos Topografía">ola</SubSection>
          </Section>
          <Section id="lateralidad" title="Lateralidad y Estadío">
            <SubSection title="Datos Complementarios">ola</SubSection>
          </Section>
          <Section id="metastasis" title="Metástasis">
            <SubSection title="Lista Metástasis">ola</SubSection>
          </Section>
          <Section id="recurrencia" title="Recurrencia">
            <SubSection title="Lista Recurrencia">ola</SubSection>
          </Section>
          <Section id="progresion" title="Progresión">
            <SubSection title="Lista Progresión">ola</SubSection>
          </Section>
          <Section
            id="tratamiento"
            title="Antecedentes Tratamiento (Estado XXX)"
          >
            <SubSection title="Configuración">ola</SubSection>
            <SubSection title="Lista de Tratamientos">ola</SubSection>
          </Section>
          <Section id="estadovital" title="Antecedentes Estado Vital">
            <SubSection title="Último Contacto">ola</SubSection>
            <SubSection title="Estado Vital">ola</SubSection>
          </Section>
          <input type="submit" />
        </form>

        <div className="h-screen" />
      </div>
    </div>
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

function BoundingBox(props: React.PropsWithChildren) {
  return (
    <div className="mx-5 rounded-xl border border-zinc-400 p-6">
      {props.children}
    </div>
  );
}

function Section(
  props: { title?: string; id?: string } & React.PropsWithChildren
) {
  return (
    <div id={props.id || props.title}>
      <BoundingBox>
        <h2 className="mb-6 text-3xl font-bold text-font-title">
          {props.title}
        </h2>
        {props.children}
      </BoundingBox>
    </div>
  );
}

function SubSection(props: { title?: string } & React.PropsWithChildren) {
  return (
    <>
      <h3 className="mt-5 mb-3 text-xl font-bold text-font-title">
        {props.title}
      </h3>
      {props.children}
    </>
  );
}

function Separator() {
  return <div className="mt-6 h-[1px] w-full bg-zinc-400"></div>;
}
