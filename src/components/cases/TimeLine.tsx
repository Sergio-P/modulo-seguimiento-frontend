import { useContext } from "react";
import { SeguimientoContext } from "./CaseForm/context/seguimiento";
import { UpdateDataContext } from "./CaseForm/context/updateData";
import { Disclosure, Transition, Tab } from '@headlessui/react';
import MetastasisList from "./CaseForm/lists/MetastasisList";
import RecurrenciaList from "./CaseForm/lists/RecurrenciaList";
import ProgresionList from "./CaseForm/lists/ProgresionList";
import ComiteList from "./CaseForm/lists/ComiteList";
import TratamientoEnFALPList from "./CaseForm/lists/TratamientoEnFALPList";

interface TimeLineProps {

}

export default function TimeLine(props: TimeLineProps) {
    const seguimiento = useContext(SeguimientoContext)
    const updateData = useContext(UpdateDataContext)

    return (
        <SeguimientoContext.Provider value={seguimiento}>
            <div>
                <div className="flex justify-between">
                    <h2 className="text-2xl font-bold">
                        LÍNEA DE TIEMPO
                    </h2>
                    <div className="flex">
                        <h3 className="font-bold pr-1">
                            Ultimo Contacto:
                        </h3>
                        <h3>
                            {seguimiento?.ultimo_contacto}
                        </h3>
                    </div>
                </div>
                <div className="mx-auto w-full rounded-2xl bg-white p-2">
                    <Disclosure>
                    {({ open }) => (
                        <>
                        <Disclosure.Button className="flex w-full justify-between rounded-lg bg-background px-4 py-2 text-left text-md font-medium text-font-subtitle hover:bg-background-dark focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                            <span>Seguimiento 0</span>
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
            </div>
        </SeguimientoContext.Provider>
    );
}