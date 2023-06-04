import Button from "@/components/ui/Button";
import CustomDialog from "@/components/ui/CustomDialog";
import { Seguimiento } from "@/types/Seguimiento";
import { useState } from "react";

interface MoreInfoModalProps {
  seguimiento: Seguimiento;
}

export default function MoreInfoModal(props: MoreInfoModalProps) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const caso = props.seguimiento.caso_registro_correspondiente;
  return (
    <>
      <Button
        className="w-48 place-self-center"
        type="button"
        filled
        onClick={handleOpen}
      >
        Más Información
      </Button>
      <CustomDialog
        open={open}
        onClose={handleClose}
        title="Antecedentes Personales"
        width="lg"
      >
        <div className="grid w-full grid-cols-6 gap-4 rounded-2xl p-2 text-left">
          <div className="contents">
            <div className="font-bold">Nombre Paciente</div>
            <div className="col-span-5">
              {caso?.nombre} {caso?.apellido}
            </div>
          </div>
          <Separator />
          <div className="contents">
            <div className="font-bold">Ficha</div>
            <div className="">{caso?.ficha}</div>
            <div className="font-bold">RUT/DNI</div>
            <div className="">{caso?.rut_dni}</div>
            <div className="font-bold">N° Registro</div>
            <div className="">{caso?.num_registro}</div>
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
            <div className="">{caso?.fecha_dg.toString()}</div>
            <div className="font-bold">Lateralidad</div>
            <div className="">{caso?.lateralidad}</div>
            <div className="font-bold">Estadío Diagnóstico</div>
            <div className="">{caso?.estadio_dg}</div>
          </div>
          <Separator />
          <div className="contents">
            <div className="font-bold">Morfología</div>
            <div className="col-span-5">{caso?.morfologia}</div>
          </div>
          <Separator />
          <div className="contents">
            <div className="font-bold">Topografía</div>
            <div className="col-span-5">{caso?.topografia}</div>
          </div>
        </div>
      </CustomDialog>
    </>
  );
}

function Separator() {
  return <div className="col-span-6 h-[1px] w-full bg-zinc-400"></div>;
}
