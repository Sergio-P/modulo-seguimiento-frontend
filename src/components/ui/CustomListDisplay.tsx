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
    <div className="m-4 rounded-lg border border-background-dark">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="text-md flex w-full justify-between rounded-lg border-background-dark bg-background px-4 py-2 text-left font-medium text-font-subtitle hover:bg-background-dark focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              {props.origen === null || props.origen === undefined ? (
                <span className="font-bold">Registro</span>
              ) : (
                <span className="font-bold">Seguimiento {props.origen}</span>
              )}
            </Disclosure.Button>
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
                  <Tab.List className={"flex gap-4"}>
                    {tabs.map((tab, index) => (
                      <Tab
                        key={index}
                        className={({ selected }) =>
                          classNames(
                            "font-bold",
                            selected
                              ? "bg-white text-accent underline decoration-accent shadow"
                              : "hover:underline"
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
