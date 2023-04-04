import clsx from "clsx";
import Image from "next/image";
import Button from "../ui/Button";

interface CaseFormProps {
  caseId: string;
}

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
  return (
    <div className="container mx-auto">
      <div className="sticky top-0 bg-white">
        <div className="flex gap-7 border-b pt-6 px-5 pb-5">
          <h1 className="text-4xl font-bold text-font-title">
            Seguimiento de Casos
          </h1>
          <select name="" placeholder="Diagnóstico" className="bg-background p-2 text-font-input rounded-lg">
            <option value="">ola1</option>
            <option value="">ola2</option>
          </select>
          <Button icon="GeoLocate" filled className="flex items-center gap-2">
            Seguimientos
          </Button>
          <Button icon="FileIcon" className="flex items-center gap-2">
            Historial
          </Button>
        </div>
        <div className="mt-8 mb-7">
          <BoundingBox>
            <div className="flex justify-between items-center">
              <h2 className="font-bold flex-none text-2xl">{data.patient.name}</h2>
              <Foo label={"RUT"} value={data.patient.rut} />
              <Foo label={"Registro"} value={data.patient.registro} />
              <Foo label={"Ficha"} value={data.patient.ficha} />
              <div className="flex justify-between gap-4">
                <Button icon="2cuadrados" filled/>
                <Button icon="chatbubble" filled/>
              </div>
            </div>
          </BoundingBox>
        </div>
      </div>

      <div className="flex flex-col gap-7 mb-7">
        <Section title="Diagnóstico">
          <SubSection title="Antecedentes">
            ola
          </SubSection>
          <Separator/>
          <SubSection title="Validación">
            ola
          </SubSection>
        </Section>
        <Section title="Morfología y Topografía">
          <SubSection title="Datos Morfología">
            ola
          </SubSection>
          <Separator/>
          <SubSection title="Datos Topografía">
            ola
          </SubSection>
        </Section>
        <Section title="Lateralidad y Estadío">
          <SubSection title="Datos Complementarios">
            ola
          </SubSection>
        </Section>
      </div>


      
    </div>
  );
}

function Foo(props: { label: string; value: string }) {
  const { label, value } = props;
  return (
    <div className="flex gap-1">
      <div className="font-bold">{label}: </div> <div className="font-bold">{value}</div>
    </div>
  );
}

function BoundingBox(props: React.PropsWithChildren) {
  return (
    <div className="mx-5 p-6 rounded-xl border border-zinc-400">
      {props.children}
    </div>
  )
}

function Section(props: {title?: string} & React.PropsWithChildren) {
  return (
    <BoundingBox>
      <h2 className="text-3xl font-bold text-font-title mb-6">{props.title}</h2>
      {props.children}
    </BoundingBox>
  )
}

function SubSection(props: {title?: string} & React.PropsWithChildren) {
  return (
    <>
      <h3 className="text-xl font-bold text-font-title mt-5 mb-3">{props.title}</h3>
      {props.children}
    </>
  )
}

function Separator() {
  return (
    <div className="w-full h-[1px] bg-zinc-400 mt-6"></div>
  )
}