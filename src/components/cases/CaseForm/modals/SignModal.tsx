import Button from "@/components/ui/Button";
import Modal, { ModalProps } from "@/components/ui/Modal";
import { Seguimiento } from "@/types/Seguimiento";
import _ from "lodash";

interface SignModalProps extends Partial<ModalProps> {
  seguimiento: Seguimiento;
}

export default function SignModal(props: SignModalProps) {
  return (
    <Modal
      title="¿Estás seguro/a de firmar seguimiento?"
      render={(props) => (
        <form onSubmit={props.handleClose}>
          <div className="mt-6 flex justify-end gap-4">
            <Button type="button" onClick={props.handleClose}>
              Cancelar
            </Button>
            <Button filled type="submit">
              Firmar Seguimiento
            </Button>
          </div>
        </form>
      )}
      {..._.omit(props, "seguimiento")}
    >
      Firmar Seguimiento
    </Modal>
  );
}
