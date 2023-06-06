import Button from "@/components/ui/Button";
import Modal, { ModalProps } from "@/components/ui/Modal";
import { Seguimiento } from "@/types/Seguimiento";
import _ from "lodash";
import { useContext } from "react";
import { SeguimientoContext } from "../context/seguimiento";

interface SignModalProps extends Partial<ModalProps> {}

export default function SignModal(props: SignModalProps) {
  return (
    <Modal
      title="¿Estás seguro/a de firmar seguimiento?"
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
