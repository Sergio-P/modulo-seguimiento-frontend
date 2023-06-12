import { useContext } from "react";
import Modal, { ModalProps } from "@/components/ui/Modal";
import BoundingBox from "@/components/ui/layout/BoundingBox";
import { Seguimiento } from "@/types/Seguimiento";
import _ from "lodash";
import { Subtitle, Foo } from "../ui";
import MoreInfoModal from "./MoreInfoModal";
import { SeguimientoContext } from "../context/seguimiento";
import TimeLine from "../../TimeLine";

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
                </div>
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
