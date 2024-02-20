import Modal, { ModalProps } from "@/components/ui/Modal";
import Tooltip from "@/components/ui/Tooltip";
import { Seguimiento } from "@/types/Seguimiento";
import _ from "lodash";

interface MoreInfoModalProps extends Partial<ModalProps> {
  seguimiento: Seguimiento;
}

export default function MoreInfoModal(props: MoreInfoModalProps) {
  const caso = props.seguimiento.caso_registro_correspondiente;
  return (
    <Modal
      className="w-48 place-self-center"
      title="Antecedentes Personales"
      width="lg"
      render={(props) => (
        <div className="grid w-full grid-cols-6 gap-4 rounded-2xl p-2 text-left">
          <div className="contents">
            <div className="font-bold">Nombre Paciente</div>
            <div className="col-span-5">
              {caso?.nombre} {caso?.apellido}
            </div>
            <div className="font-bold">Fecha último contacto</div>
            <div className="">{caso?.ultimo_contacto}</div>
          </div>
          <Separator />
          <div className="contents">
            <div className="font-bold">Ficha</div>
            <div className="">{caso?.ficha}</div>
            <div className="font-bold">RUT/DNI</div>
            <div className="">{caso?.rut_dni}</div>
            <div className="font-bold">Nº Registro</div>
            <div className="">{caso?.id}</div>
          </div>
          <Separator />
          <div className="contents">
            <div className="font-bold">Categoría</div>
            <div className="col-span-5">{caso?.categoria}</div>
          </div>
          <Separator />
          <div className="contents">
            <div className="font-bold">Subcategoría</div>
            <div className="col-span-5">{caso?.subcategoria}</div>
          </div>
          <Separator />
          <div className="contents">
            <div className="font-bold">Fecha Diagnóstico</div>
            <div className="col-span-2">{caso?.fecha_dg.toString()}</div>
            <div className="font-bold">Lateralidad</div>
            <div className="col-span-2">{caso?.lateralidad}</div>
          </div>
          <Separator />
          <div className="contents">
            <div className="font-bold">Estadío Diagnóstico</div>
            <Tooltip className="col-span-5" message={caso?.estadio_dg || ""}>
              <div className="overflow-hidden text-ellipsis">
                {caso?.estadio_dg}
              </div>
            </Tooltip>
          </div>
          <Separator />
          <div className="contents">
            <div className="font-bold">Morfología</div>
            <Tooltip className="col-span-5" message={caso?.morfologia || ""}>
              <div className="overflow-hidden text-ellipsis">
                {caso?.morfologia}
              </div>
            </Tooltip>
          </div>
          <Separator />
          <div className="contents">
            <div className="font-bold">Topografía</div>
            <Tooltip className="col-span-5" message={caso?.topografia || ""}>
              <div className="overflow-hidden text-ellipsis">
                {caso?.topografia}
              </div>
            </Tooltip>
          </div>
        </div>
      )}
      {..._.omit(props, "seguimiento")}
    >
      Más Información
    </Modal>
  );
}

function Separator() {
  return <div className="col-span-6 h-[1px] w-full bg-zinc-400"></div>;
}
