import Modal, { ModalProps } from "@/components/ui/Modal";
import BoundingBox from "@/components/ui/layout/BoundingBox";
import { Disclosure, Transition } from "@headlessui/react";
import _ from "lodash";
import Image from "next/image";
import { useContext } from "react";
import TimeLine from "../../TimeLine";
import { SeguimientoContext } from "../context/seguimiento";
import { Foo, Subtitle } from "../ui";

interface TimeLineModalProps extends Partial<ModalProps> {}

export default function TimeLineModal(props: TimeLineModalProps) {
  const seguimiento = useContext(SeguimientoContext);
  const caso = seguimiento?.caso_registro_correspondiente;
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
                      <Subtitle
                        label={"Seguimiento"}
                        value={
                          seguimiento?.numero_seguimiento?.toString() || ""
                        }
                      />
                    </div>
                    <Foo label={"RUT"} value={caso?.rut_dni || ""} />
                    <Foo label={"Ficha"} value={caso?.ficha.toString() || ""} />
                    <Foo
                      label={"Subcategoría"}
                      value={caso?.subcategoria || ""}
                    />
                    <Foo
                      label={"Lateralidad"}
                      value={caso?.lateralidad || ""}
                    />
                    <Disclosure.Button className="border-bg-dark flex h-6 w-6 rounded-lg bg-primary">
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
                      <h1 className="text-center text-2xl font-bold">Info</h1>
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
