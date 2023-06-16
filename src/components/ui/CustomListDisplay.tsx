import { Disclosure, Transition, Tab } from "@headlessui/react";
import ComiteList from "../cases/CaseForm/lists/ComiteList";
import MetastasisList from "../cases/CaseForm/lists/MetastasisList";
import ProgresionList from "../cases/CaseForm/lists/ProgresionList";
import RecurrenciaList from "../cases/CaseForm/lists/RecurrenciaList";
import TratamientoEnFALPList from "../cases/CaseForm/lists/TratamientoEnFALPList";
import { useContext } from "react";
import { SeguimientoContext } from "../cases/CaseForm/context/seguimiento";
import { UpdateDataContext } from "../cases/CaseForm/context/updateData";
import TratamientoPostFALPList from "../cases/CaseForm/lists/TratamientoPostFALPList";
import Image from "next/image";
import TratamientoAntesFALPList from "../cases/CaseForm/lists/TratamientoAntesFALPList";

interface CustomListDisplayProps {
  origen: number | null;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  { name: "Metástasis", component: MetastasisList },
  { name: "Recurrencia", component: RecurrenciaList },
  { name: "Progresión", component: ProgresionList },
  { name: "Comité", component: ComiteList },
  { name: "Tratamiento Pre Falp", component: TratamientoAntesFALPList },
  { name: "Tratamiento En Falp", component: TratamientoEnFALPList },
  { name: "Tratamiento Post Falp", component: TratamientoPostFALPList },
];

export default function CustomListDisplay(props: CustomListDisplayProps) {
  const seguimiento = useContext(SeguimientoContext);
  const updateData = useContext(UpdateDataContext);
  const filterFunc = (data: any[]) => {
    return typeof props.origen !== 'undefined'
      ? data.filter(row => row.numero_seguimiento === props.origen)
      : data;
  }
  console.log("origen", props.origen);
  return (
    <div className="my-4 rounded-lg border border-background-dark">
      <Disclosure>
        {({ open }) => (
          <>
            <div className="flex w-full justify-between text-lg rounded-lg px-4 py-2 text-left font-bold text-primary">
              {props.origen === null || props.origen === undefined ? (
                <span className="font-bold">Registro</span>
              ) : (
                <span className="font-bold">Seguimiento {props.origen}</span>
              )}
              <Disclosure.Button>
                <Image
                  src={`/icons/plusButton.svg`}
                  width={24}
                  height={24}
                  alt=""
                  className="m-auto h-6 w-6 rounded-xl hover:bg-background-dark"
                />
              </Disclosure.Button>
            </div>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-primary">
                <Tab.Group>
                  <Tab.List className={"flex border-b-2 border-b-zinc-400"}>
                    {tabs.map((tab, index) => (
                      <Tab
                        key={index}
                        className={({ selected }) =>
                          classNames(
                            "font-bold border-b-white border-b-2 px-4 py-2",
                            selected
                              ? "bg-white border-b-accent text-accent decoration-accent"
                              : "hover:border-b-primary"
                          )
                        }
                      >
                        {tab.name}
                      </Tab>
                    ))}
                  </Tab.List>
                  <Tab.Panels>
                    {tabs.map((tab, index) => {
                      const Component = tab.component;
                      return (
                        <Tab.Panel key={index}>
                          <Component filterFunc={filterFunc} />
                        </Tab.Panel>
                      );
                    })}
                  </Tab.Panels>
                </Tab.Group>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
}
