import { useContext } from "react";
import Image from "next/image";
import Modal, { ModalProps } from "@/components/ui/Modal";
import BoundingBox from "@/components/ui/layout/BoundingBox";
import { Seguimiento } from "@/types/Seguimiento";
import _ from "lodash";
import { Subtitle, Foo } from "../ui";
import MoreInfoModal from "./MoreInfoModal";
import { SeguimientoContext } from "../context/seguimiento";
import TimeLine from "../../TimeLine";
import { Disclosure, Transition, Tab } from "@headlessui/react";
import ComiteList from "../lists/ComiteList";
import MetastasisList from "../lists/MetastasisList";
import ProgresionList from "../lists/ProgresionList";
import RecurrenciaList from "../lists/RecurrenciaList";
import TratamientoEnFALPList from "../lists/TratamientoEnFALPList";

interface TimeLineModalProps extends Partial<ModalProps> {
  seguimiento: Seguimiento;
}

export default function TimeLineModal(props: TimeLineModalProps) {
    const seguimientoData = useContext(SeguimientoContext)
    const caso = props.seguimiento.caso_registro_correspondiente;
    return (
    <Modal
        className="w-48 place-self-center"
        title="Antecedentes Personales"
        width="xl"
        render={(props) => (
        <div>
            <BoundingBox thin className="m-4 border-background-dark">
                <Disclosure>
                    {({ open }) => (
                        <>
                            <div className="flex place-items-center justify-around">
                                <div className="flex-col items-center justify-center">
                                    <h2 className="text-2xl font-bold">
                                        {caso?.nombre} {caso?.apellido}
                                    </h2>
                                    <Subtitle label={"Seguimiento"} value={seguimientoData?.numero_seguimiento?.toString() || ""} />
                                </div>
                                <Foo label={"RUT"} value={caso?.rut_dni || ""} />
                                <Foo
                                    label={"Ficha"}
                                    value={caso?.ficha.toString() || ""} />
                                <Foo
                                    label={"Subcategoría"}
                                    value={caso?.subcategoria || ""} />
                                <Foo
                                    label={"Lateralidad"}
                                    value={caso?.lateralidad || ""} />
                                <Disclosure.Button className="flex w-6 h-6 rounded-lg border-bg-dark bg-primary">
                                    <Image
                                        src={`/icons/plus.svg`}
                                        width={16}
                                        height={16}
                                        alt=""
                                        className="m-auto h-4 w-4"
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
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                    <h1 className="text-2xl font-bold text-center">Info</h1>      
                                </Disclosure.Panel>
                            </Transition>
                        </>     
                    )}
                </Disclosure>
            </BoundingBox>
            <TimeLine />
        </div>
      )}
      {..._.omit(props, "seguimiento")}
    >
      +
    </Modal>
  );
}

function Separator() {
  return <div className="col-span-6 h-[1px] w-full bg-zinc-400"></div>;
}
