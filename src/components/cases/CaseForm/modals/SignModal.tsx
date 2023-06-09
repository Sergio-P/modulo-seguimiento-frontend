import Button from "@/components/ui/Button";
import Modal, { ModalProps } from "@/components/ui/Modal";
import { Seguimiento } from "@/types/Seguimiento";
import _ from "lodash";
import { useContext } from "react";
import { SeguimientoContext } from "../context/seguimiento";
import { useFormContext, useWatch } from "react-hook-form";

interface SignModalProps extends Partial<ModalProps> {}

export default function SignModal(props: SignModalProps) {
  const { control } = useFormContext();
  const causaDefuncion = useWatch({
    control,
    name: "causa_defuncion",
  });
  const estadoVital = useWatch({
    control,
    name: "estado_vital",
  });
  return (
    <Modal
      title="¿Estás seguro/a de firmar seguimiento?"
      disabled={estadoVital === "Muerto" && !causaDefuncion}
      render={(props) => (
        <div className="mt-6 flex justify-end gap-4">
          <Button type="button" onClick={props.handleClose}>
            Cancelar
          </Button>
          <Button filled type="submit" onClick={props.handleClose}>
            Firmar Seguimiento
          </Button>
        </div>
      )}
      {...props}
    >
      Firmar Seguimiento
    </Modal>
  );
}
