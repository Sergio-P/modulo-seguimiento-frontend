import clsx from "clsx";
import Image from "next/image";
import Button from "../ui/Button";
import { useState } from "react";
import { Listbox } from "@headlessui/react";


interface CaseFormProps {
  caseId: string;
}

const secciones = [
  { id: 1, name: 'Diagnostico'},
  { id: 2, name: 'Morfologia y Topografía'},
  { id: 3, name: 'Lateralidad y Estadio'},
  { id: 4, name: 'Recurrencia'},
  { id: 5, name: 'Tratamiento'},
  { id: 6, name: 'Estado Vital'},
]

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
          <MyListbox />
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

function MyListbox() {
  const [selected, setSelected] = useState(secciones[0])

  return (
    <div className="top-16 w-72">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="bg-background p-2 text-font-input rounded-lg w-full text-left">
            <span className="block truncate">{selected.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            </span>
          </Listbox.Button>
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-background py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {secciones.map((seccion, seccionIdx) => (
                <Listbox.Option
                  key={seccionIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-background-dark text-amber-900' : 'text-font-input'
                    }`
                  }
                  value={seccion}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {seccion.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
        </div>
      </Listbox>
    </div>
  )
}