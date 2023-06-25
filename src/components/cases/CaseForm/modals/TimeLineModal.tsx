import Modal, { ModalProps } from "@/components/ui/Modal";
import BoundingBox from "@/components/ui/layout/BoundingBox";
import { Disclosure, Transition } from "@headlessui/react";
import _ from "lodash";
import Image from "next/image";
import { useContext } from "react";
import TimeLine from "../../TimeLine";
import { useQuery } from "@tanstack/react-query";
import * as api from "@/api/api";
import { SeguimientoContext } from "../context/seguimiento";
import { BoldElement, Subtitle } from "../ui";
import { Seguimiento } from "@/types/Seguimiento";
import Tooltip from "@/components/ui/Tooltip";

interface TimeLineModalProps extends Partial<ModalProps> {
  seguimientoId: number | undefined;
}

export default function TimeLineModal(props: TimeLineModalProps) {
  //const seguimiento = useContext(SeguimientoContext);
  const seguimientoId = props.seguimientoId;
  const seguimientoQuery = useQuery<Seguimiento>({
    queryKey: ["seguimiento", seguimientoId],
    queryFn: () => api.getSeguimiento(seguimientoId ? seguimientoId : 0),
    enabled: !!seguimientoId,
    refetchOnWindowFocus: false,
  });
  console.log("seguimientoQuery: ", seguimientoQuery.data);
  const caso = seguimientoQuery.data?.caso_registro_correspondiente;
  return (
    <SeguimientoContext.Provider value={seguimientoQuery?.data}>
      <Modal
        className="w-10 place-self-center"
        title="Antecedentes Personales"
        filled={false}
        width="xl"
        icon="timeLineModal"
        render={(props) => (
          <div className="h-[60vh] overflow-y-scroll">
            <BoundingBox thin className="m-4 border-background-dark">
              <Disclosure>
                {({ open }) => (
                  <>
                    <div className="flex place-items-center justify-around">
                      <div className="flex-col items-center justify-center">
                        <div className="text-2xl font-bold">
                          <Tooltip message={`${caso?.nombre} ${caso?.apellido}`}>
                            {caso?.nombre.split(" ")[0]} {caso?.apellido.split(" ")[0]}
                          </Tooltip>
                        </div>
                        <Subtitle
                          label={"Seguimiento"}
                          value={
                            seguimientoQuery.data?.numero_seguimiento?.toString() ||
                            ""
                          }
                        />
                      </div>
                      <BoldElement label={"RUT"} value={caso?.rut_dni || ""} 
                      />
                      <BoldElement
                        label={"Ficha"}
                        value={caso?.ficha.toString() || ""}
                      />
                      <Tooltip message={caso?.subcategoria || ""}>
                        <BoldElement classData="text-ellipsis overflow-hidden" label={"Subcategoría"} value={caso?.subcategoria || ""} />
                      </Tooltip>
                      <BoldElement
                        label={"Lateralidad"}
                        value={caso?.lateralidad || ""}
                      />
                      <Disclosure.Button>
                        <Image
                          src={`/icons/plusButton.svg`}
                          width={24}
                          height={24}
                          alt=""
                          className="m-auto h-8 w-8 rounded-xl hover:bg-background-dark"
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
                      <Disclosure.Panel className="px-4 pt-4 pb-2">
                        <div className="grid grid-cols-3 gap-4 text-left">
                          <Separator />
                          <BoldElement
                            label={"N° Registro"}
                            value={caso?.num_registro || ""}
                          />
                          <BoldElement
                            label={"Fecha Diagnóstico"}
                            value={caso?.fecha_dg.toString() || ""}
                          />
                          <BoldElement
                            label={"Estadío Diagnóstico"}
                            value={caso?.estadio_dg || ""}
                          />
                          <Separator />
                          <BoldElement
                            label={"Morfología"}
                            value={caso?.morfologia || ""}
                            classData="col-span-3"
                          />
                          <Separator />
                          <BoldElement
                            label={"Topografía"}
                            value={caso?.topografia || ""}
                            classData="col-span-3"
                          />
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </BoundingBox>
            <div className="px-5">
              <TimeLine />
            </div>
          </div>
        )}
        {..._.omit(props, "seguimiento")}
      >
      </Modal>
    </SeguimientoContext.Provider>
  );
}

function Separator() {
  return <div className="col-span-3 h-[1px] w-full bg-zinc-400"></div>;
}
