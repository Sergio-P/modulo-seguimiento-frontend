import { Disclosure, Transition, Tab } from "@headlessui/react";
import ComiteList from "../cases/CaseForm/lists/ComiteList";
import MetastasisList from "../cases/CaseForm/lists/MetastasisList";
import ProgresionList from "../cases/CaseForm/lists/ProgresionList";
import RecurrenciaList from "../cases/CaseForm/lists/RecurrenciaList";
import TratamientoEnFALPList from "../cases/CaseForm/lists/TratamientoEnFALPList";
import { useContext } from "react";
import { SeguimientoContext } from "../cases/CaseForm/context/seguimiento";
import { UpdateDataContext } from "../cases/CaseForm/context/updateData";
import BoundingBox from "./layout/BoundingBox";
import { Section } from "../cases/CaseForm/ui";

interface CustomListDisplayProps {
    origen: number | null;
}

export default function CustomListDisplay(props: CustomListDisplayProps) {
    const seguimiento = useContext(SeguimientoContext)
    const updateData = useContext(UpdateDataContext)
    console.log("origen", props.origen)
    return (
        <div className="m-4 border rounded-lg border-background-dark">
            <Disclosure>
                {({ open }) => (
                    <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-background px-4 py-2 text-left text-md font-medium text-font-subtitle border-background-dark hover:bg-background-dark focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            {props.origen === null || props.origen === undefined ? <span>Registro</span> : <span>Seguimiento {props.origen}</span>}
                        </Disclosure.Button>
                        <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                <Tab.Group>
                                    <Tab.List className={
                                        'flex gap-4'
                                        }>
                                        <Tab>Metástasis</Tab>
                                        <Tab>Recurrencia</Tab>
                                        <Tab>Progresión</Tab>
                                        <Tab>Comité</Tab>
                                        <Tab>Tratamiento</Tab>
                                    </Tab.List>
                                    <Tab.Panels>
                                        <Tab.Panel><MetastasisList/></Tab.Panel>
                                        <Tab.Panel><RecurrenciaList/></Tab.Panel>
                                        <Tab.Panel><ProgresionList/></Tab.Panel>
                                        <Tab.Panel><ComiteList/></Tab.Panel>
                                        <Tab.Panel><TratamientoEnFALPList/></Tab.Panel>
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

