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
        <div className="sticky top-0 z-30 bg-white">
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
              name="example-select"
              control={control}
              defaultValue={"ola"}
              render={({ field }) => (
                <SelectInput options={["ola", "wi"]} {...field} />
              )}
            />
            <Checkbox {...register("example-checkbox1")} />
            <Checkbox
              {...register("example-checkbox2")}
              label="Checkbox con label"
            />
          </Section>
          <Section id="diagnostico" title="Diagnóstico">
            <SubSection title="Antecedentes"></SubSection>
            <div className="grid grid-cols-3 gap-8 max-w-5xl">
              <Controller
                name="Diagnostico-Categoria"
                control={control}
                defaultValue={"Tiroides"}
                render={({ field }) => (
                  <SelectInput
                    label={"Categoría"}
                    options={[
                      { id: 1, name: "Tiroides" },
                      { id: 2, name: "Hola" },
                    ]}
                    {...field}
                  />
                )}
              />
              <Controller
                name="Diagnostico-subategoria"
                control={control}
                defaultValue={"Glandula Tiroides"}
                render={({ field }) => (
                  <SelectInput
                    label={"Subcategoría"}
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
              <div>fechas y despues un checkbox</div>
              <div className="grid grid-cols-3 max-w-5xl">
                <Controller
                  name="Diagnostico-LugarObtencionDiagnostico"
                  control={control}
                  defaultValue={"Informe Anatomía Patológica"}
                  render={({ field }) => (
                    <div className="mr-14 w-72">
                      <SelectInput
                        label={"Lugar Obtención Diagnóstico"}
                        options={[
                          { id: 1, name: "Informe Anatomía Patológica" },
                          { id: 2, name: "Otro" },
                        ]}
                        {...field}
                      />
                    </div>
                  )}
                />
              </div>
            </SubSection>
          </Section>
          <Section id="morfologia" title="Morfología y Topografía">
            <SubSection title="Datos Morfología"></SubSection>
            <div className="grid max-w-5xl grid-cols-1 lg:grid-cols-3 gap-8">
              <Controller
                name="morfologiabusquedaESTOESUNALUPANOESUNSELECTHAYQUECAMBIARLO"
                control={control}
                defaultValue={"(8260/3) Adenocarcinoma Papilar, Sai"}
                render={({ field }) => (
                  <div className="col-span-1 lg:col-span-2">
                    <SelectInput
                      label={"Morfología"}
                      options={[
                        { id: 1, name: "(8260/3) Adenocarcinoma Papilar, Sai" },
                        { id: 2, name: "Opción 2" },
                      ]}
                      {...field}
                    />
                  </div>
                )}
              />
              <Controller
                name="gradodiferenciacion"
                control={control}
                defaultValue={"Desconocido"}
                render={({ field }) => (
                  <SelectInput
                    label={"Grado Diferenciación"}
                    options={[
                      { id: 1, name: "Desconocido" },
                      { id: 2, name: "Conocido" },
                    ]}
                    {...field}
                  />
                )}
              />

              <Controller
                name="lugarobtenciondiagnosticomorf"
                control={control}
                defaultValue={"Informe Anatomía Patológica"}
                render={({ field }) => (
                  <SelectInput
                    label={"Lugar Obtención Diagnóstico"}
                    options={[
                      { id: 1, name: "Informe Anatomía Patológica" },
                      { id: 2, name: "No c" },
                    ]}
                    {...field}
                  />
                )}
              />
              <Controller
                name="fechalugarobtenciondiagmorf"
                control={control}
                defaultValue={"10-01-2022"}
                render={({ field }) => (
                  <SelectInput
                    label={"Fecha Lugar Obtención Diagnóstico"}
                    options={[
                      { id: 1, name: "10-01-2022" },
                      {
                        id: 2,
                        name: "Esto no es un select hay que cambiarlo jeje",
                      },
                    ]}
                    {...field}
                  />
                )}
              />
            </div>
            <Separator />
            <SubSection title="Datos Topografía"></SubSection>
            <div className="grid max-w-5xl grid-cols-3 gap-8">
              <Controller
                name="topografiabusquedaESTOESUNALUPANOESUNSELECTHAYQUECAMBIARLO"
                control={control}
                defaultValue={"(8260/3) Adenocarcinoma Papilar, Sai"}
                render={({ field }) => (
                  <div className="col-span-2">
                    <SelectInput
                      label={"Topografía"}
                      options={[
                        { id: 1, name: "(8260/3) Adenocarcinoma Papilar, Sai" },
                        { id: 2, name: "Opción 2" },
                      ]}
                      {...field}
                    />
                  </div>
                )}
              />
              <Controller
                name="lugarobtenciondiagnosticotop"
                control={control}
                defaultValue={"Informe Anatomía Patológica"}
                render={({ field }) => (
                  <div className="col-start-1">
                    <SelectInput
                      label={"Lugar Obtención Diagnóstico"}
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
                name="fechalugarobtenciondiagtop"
                control={control}
                defaultValue={"10-01-2022"}
                render={({ field }) => (
                  <SelectInput
                    label={"Fecha Lugar Obtención Diagnóstico"}
                    options={[
                      { id: 1, name: "10-01-2022" },
                      {
                        id: 2,
                        name: "Esto no es un select hay que cambiarlo jeje",
                      },
                    ]}
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
                  name="Lateralidad-Lateralidad"
                  control={control}
                  defaultValue={"No aplica"}
                  render={({ field }) => (
                    <SelectInput
                      label={"Lateralidad"}
                      options={[
                        { id: 1, name: "Tiroides" },
                        { id: 2, name: "Hola" },
                      ]}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="Lateralidad-Comportamiento"
                  control={control}
                  defaultValue={"Neoplasias malignas de locali"}
                  render={({ field }) => (
                    <SelectInput
                      label={"Comportamiento"}
                      options={[
                        { id: 1, name: "Neoplasias malignas de locali" },
                        { id: 2, name: "Chao" },
                      ]}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="Lateralidad-Extension"
                  control={control}
                  defaultValue={"Regional"}
                  render={({ field }) => (
                    <div className="col-start-1">
                      <SelectInput
                        label={"Extension Diagnostico"}
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
                  name="Lateralidad-Datos"
                  control={control}
                  defaultValue={"Desconocido"}
                  render={({ field }) => (
                      <SelectInput
                        label={"Estadio Diagnostico"}
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
            <SubSection title="Lista Metástasis">ola</SubSection>
          </Section>
          <Section id="recurrencia" title="Recurrencia">
            <SubSection title="Lista Recurrencia">ola</SubSection>
          </Section>
          <Section id="progresion" title="Progresión">
            <SubSection title="Lista Progresión">ola</SubSection>
          </Section>
          <Section id="tratamiento" title="Antecedentes Tratamiento (Estado XXX)">
            <SubSection title="Configuración"></SubSection>
            <div className="grid max-w-5xl grid-cols-1 lg:grid-cols-3 gap-8">
              <Controller
                name="clasecaso"
                control={control}
                defaultValue={"Diagnóstico y tratamiento en FALP"}
                render={({ field }) => (
                  <div className="col-span-2">
                    <SelectInput
                      label={"Clase Caso"}
                      options={[
                        { id: 1, name: "Diagnóstico y tratamiento en FALP" },
                        { id: 2, name: "M O N G A S" },
                      ]}
                      {...field}
                    />
                  </div>
                )}
              />
              <Controller
                name="clasificaciondg"
                control={control}
                defaultValue={"Informe Anatomía Patológica"}
                render={({ field }) => (
                    <SelectInput
                      label={"Clasificación DG/TTOS."}
                      options={[
                        { id: 1, name: "Informe Anatomía Patológica" },
                        { id: 2, name: "No c" },
                      ]}
                      {...field}
                    />
                )}
              />
            </div>
            <SubSection title="Lista de Tratamientos">ola</SubSection>
          </Section>
          <Section id="estadovital" title="Antecedentes Estado Vital">
            <SubSection title="Último Contacto"></SubSection>
              <div className="grid max-w-5xl grid-cols-1 lg:grid-cols-3 gap-8">
                <Controller
                  name="ultimocontacto"
                  control={control}
                  defaultValue={"10-01-2022"}
                  render={({ field }) => (
                    <SelectInput
                      label={"Último contacto"}
                      options={[
                        { id: 1, name: "10-01-2022" },
                        { id: 2, name: "Opción 2" },
                      ]}
                      {...field}
                    />
                  )}
                />
              </div>
            <Separator/>
            <SubSection title="Estado Vital"></SubSection>
              <div className="grid max-w-5xl grid-cols-1 lg:grid-cols-3 gap-8">
                  <Controller
                    name="estadovitalselect"
                    control={control}
                    defaultValue={"Fallecido"}
                    render={({ field }) => (
                      <SelectInput
                        options={[
                          { id: 1, name: "Fallecido" },
                          { id: 2, name: "Vivito y coleando" },
                        ]}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="fechadefuncion"
                    control={control}
                    defaultValue={"10-01-2022"}
                    render={({ field }) => (
                      <SelectInput
                        label={"Fecha Defunción"}
                        options={[
                          { id: 1, name: "10-01-2022" },
                          { id: 2, name: "Otro día" },
                        ]}
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    name="causadefuncion"
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
        <h2 className="mb-9 text-3xl font-bold text-font-title">
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
