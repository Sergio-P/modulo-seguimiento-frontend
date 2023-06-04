import Button from "@/components/ui/Button";
import Modal, { ModalProps } from "@/components/ui/Modal";
import { Seguimiento } from "@/types/Seguimiento";
import _ from "lodash";

interface ModalTemplateProps extends Partial<ModalProps> {
  seguimiento: Seguimiento;
}

export default function SignModal(props: ModalTemplateProps) {
  return (
    <Modal
      title="title content"
      render={(props) => <></>}
      {..._.omit(props, "seguimiento")}
    >
      button content
    </Modal>
  );
}
